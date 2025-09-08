#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';

const DOCS_DIR = './public/docs';
const IMG_DIR = './public/docs/img';
const EXCLUDED_DIRS = ['i', 'icons', 'js', 'img']; // Added 'img' to avoid processing destination
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function ensureDirectory(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function findFiles(dir, extensions, excludeDirs = []) {
  const files = [];
  
  async function traverse(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        const relativeDirName = path.relative(DOCS_DIR, fullPath);
        const dirName = relativeDirName.split(path.sep)[0];
        
        // Skip excluded directories
        if (!excludeDirs.includes(dirName)) {
          await traverse(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  await traverse(dir);
  return files;
}

async function findMarkdownFiles(dir) {
  const mdFiles = [];
  
  async function traverse(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        mdFiles.push(fullPath);
      }
    }
  }
  
  await traverse(dir);
  return mdFiles;
}

async function moveImage(sourcePath, destBaseDir) {
  const fileName = path.basename(sourcePath);
  
  // Get the relative path from the docs directory
  const relativePath = path.relative(DOCS_DIR, path.dirname(sourcePath));
  
  // Create the destination path maintaining folder structure
  const destDir = path.join(destBaseDir, relativePath);
  const destPath = path.join(destDir, fileName);
  
  // Ensure the destination directory exists
  await ensureDirectory(destDir);
  
  // Handle filename conflicts by adding a number suffix
  let finalDestPath = destPath;
  let counter = 1;
  
  while (true) {
    try {
      await fs.access(finalDestPath);
      // File exists, try with counter
      const ext = path.extname(fileName);
      const baseName = path.basename(fileName, ext);
      finalDestPath = path.join(destDir, `${baseName}_${counter}${ext}`);
      counter++;
    } catch {
      // File doesn't exist, we can use this path
      break;
    }
  }
  
  await fs.rename(sourcePath, finalDestPath);
  
  // Return the relative path from the img directory for markdown updates
  const relativeFromImg = path.relative(IMG_DIR, finalDestPath);
  
  return {
    oldPath: sourcePath,
    newPath: finalDestPath,
    relativeNewPath: relativeFromImg
  };
}

async function updateMarkdownReferences(mdFilePath, movedImages) {
  let content = await fs.readFile(mdFilePath, 'utf8');
  let updated = false;
  
  for (const { oldPath, relativeNewPath } of movedImages) {
    // Convert absolute paths to relative from the docs directory
    const oldRelativePath = path.relative('./public', oldPath).replace(/\\/g, '/');
    const newRelativePath = `docs/img/${relativeNewPath.replace(/\\/g, '/')}`;
    
    // Escape special regex characters in the old path
    const escapedOldPath = oldRelativePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Common markdown image patterns
    const patterns = [
      // ![alt](path)
      new RegExp(`!\\[([^\\]]*)\\]\\(\\s*/?${escapedOldPath}\\s*\\)`, 'g'),
      // ![alt](path "title")  
      new RegExp(`!\\[([^\\]]*)\\]\\(\\s*/?${escapedOldPath}\\s+"[^"]*"\\s*\\)`, 'g'),
      // <img src="path"
      new RegExp(`(<img[^>]+src=["']?)/?${escapedOldPath}(["'][^>]*>)`, 'gi'),
    ];
    
    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const oldContent = content;
      
      if (i < 2) {
        // Markdown image patterns
        content = content.replace(pattern, (match, altText) => {
          updated = true;
          return `![${altText}](/${newRelativePath})`;
        });
      } else {
        // HTML img tag pattern  
        content = content.replace(pattern, (match, prefix, suffix) => {
          updated = true;
          return `${prefix}/${newRelativePath}${suffix}`;
        });
      }
      
      if (content !== oldContent) {
        console.log(`  Updated reference in ${mdFilePath}: ${oldRelativePath} -> ${newRelativePath}`);
      }
    }
  }
  
  if (updated) {
    await fs.writeFile(mdFilePath, content, 'utf8');
    return true;
  }
  return false;
}

async function cleanupEmptyDirs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      const relativeDirName = path.relative(DOCS_DIR, fullPath);
      const dirName = relativeDirName.split(path.sep)[0];
      
      // Skip excluded directories and the img directory
      if (!EXCLUDED_DIRS.includes(dirName)) {
        await cleanupEmptyDirs(fullPath);
        
        // Check if directory is now empty
        try {
          const remainingEntries = await fs.readdir(fullPath);
          if (remainingEntries.length === 0) {
            await fs.rmdir(fullPath);
            console.log(`  🗑️  Removed empty directory: ${fullPath}`);
          }
        } catch (error) {
          // Directory might not be empty or might not exist, that's ok
        }
      }
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting image migration process...\n');
    
    // Ensure the destination directory exists
    await ensureDirectory(IMG_DIR);
    
    // Find all images to move
    console.log('📁 Finding images to move...');
    const imagePaths = await findFiles(DOCS_DIR, IMAGE_EXTENSIONS, EXCLUDED_DIRS);
    
    if (imagePaths.length === 0) {
      console.log('✨ No images found to move!');
      return;
    }
    
    console.log(`Found ${imagePaths.length} images to move:`);
    imagePaths.forEach(img => console.log(`  - ${img}`));
    
    // Move images
    console.log('\n📦 Moving images...');
    const movedImages = [];
    
    for (const imagePath of imagePaths) {
      const result = await moveImage(imagePath, IMG_DIR);
      movedImages.push(result);
      console.log(`  Moved: ${result.oldPath} -> ${result.newPath}`);
    }
    
    // Find all markdown files
    console.log('\n📝 Finding markdown files to update...');
    const mdFiles = await findMarkdownFiles('./');
    console.log(`Found ${mdFiles.length} markdown files`);
    
    // Update markdown references
    console.log('\n🔄 Updating markdown references...');
    let updatedFiles = 0;
    
    for (const mdFile of mdFiles) {
      const wasUpdated = await updateMarkdownReferences(mdFile, movedImages);
      if (wasUpdated) {
        updatedFiles++;
        console.log(`  ✅ Updated ${mdFile}`);
      }
    }
    
    console.log(`\n✨ Migration complete!`);
    console.log(`   📦 Moved ${movedImages.length} images to ./public/docs/img/`);
    console.log(`   📝 Updated ${updatedFiles} markdown files`);
    
    // Clean up empty directories (optional)
    console.log('\n🧹 Cleaning up empty directories...');
    await cleanupEmptyDirs(DOCS_DIR);
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run the script
main();