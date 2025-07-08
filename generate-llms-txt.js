#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to extract frontmatter from markdown files
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  if (!match) return {};
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;
    
    if (line.includes(':')) {
      const colonIndex = line.indexOf(':');
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle arrays (tags, authors, etc.)
      if (value === '') {
        const arrayItems = [];
        i++; // Move to next line
        while (i < lines.length && (lines[i].startsWith('  -') || lines[i].trim() === '')) {
          const item = lines[i].trim();
          if (item.startsWith('- ')) {
            arrayItems.push(item.substring(2).trim());
          }
          i++;
        }
        i--; // Step back one since the loop will increment
        frontmatter[key] = arrayItems;
      } else {
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        frontmatter[key] = value;
      }
    }
  }
  
  return frontmatter;
}

// Function to recursively find all documentation pages
function findDocumentationPages(dir) {
  const pages = [];
  
  if (!fs.existsSync(dir)) {
    console.error(`Directory ${dir} does not exist`);
    return pages;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      pages.push(...findDocumentationPages(fullPath));
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const frontmatter = extractFrontmatter(content);
        
        // Skip drafts and redirect pages
        if (frontmatter.draft === true || frontmatter.draft === 'true') {
          continue;
        }
        
        // Skip redirect pages
        if (frontmatter.layout && frontmatter.layout.includes('Redirect')) {
          continue;
        }
        
        // Extract URL slug from directory structure
        const relativePath = path.relative('src/pages/docs', fullPath);
        let slug = relativePath.replace(/\\/g, '/'); // Normalize path separators
        
        // Remove file extension
        slug = slug.replace(/\.(md|mdx)$/, '');
        
        // Handle index files - remove the /index part
        slug = slug.replace(/\/index$/, '');
        
        // Handle root index files
        if (slug === 'index') {
          slug = '';
        }
        
        const url = slug ? `https://octopus.com/docs/${slug}` : 'https://octopus.com/docs';
        
        pages.push({
          title: frontmatter.title || 'Untitled',
          description: frontmatter.description || '',
          url: url,
          slug: slug,
          navOrder: frontmatter.navOrder || 999999, // Default to high number for pages without navOrder
          navSection: frontmatter.navSection || '',
          pubDate: frontmatter.pubDate,
          modDate: frontmatter.modDate,
          filePath: relativePath
        });
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error.message);
      }
    }
  }
  
  return pages;
}

// Function to generate the LLMs.txt content
function generateLLMsTxt(pages) {
  let content = '## Documentation\n\n';

  // Add all pages sorted by path (alphabetical)
  pages.forEach(page => {
    const title = page.title.replace(/[[\]]/g, ''); // Remove square brackets that might break markdown
    const description = page.description || 'Documentation page for Octopus Deploy';
    content += `- [${title}](${page.url}): ${description}\n`;
  });

  return content;
}

// Main execution
function main() {
  console.log('🐙 Generating Octopus Deploy Documentation LLMs.txt...');
  
  const docsDir = 'src/pages/docs';
  
  // Extract all documentation pages
  console.log('📖 Extracting documentation pages...');
  const docPages = findDocumentationPages(docsDir);
  
  if (docPages.length === 0) {
    console.error('❌ No documentation pages found. Make sure you are running this from the docs project root.');
    process.exit(1);
  }
  
  // Sort by path (alphabetical), but respect navOrder when available
  docPages.sort((a, b) => {
    // First, sort by navSection alphabetically
    const sectionA = a.navSection || '';
    const sectionB = b.navSection || '';
    if (sectionA !== sectionB) {
      return sectionA.localeCompare(sectionB);
    }
    
    // Within the same section, sort by navOrder first
    if (a.navOrder !== b.navOrder) {
      return a.navOrder - b.navOrder;
    }
    
    // If navOrder is the same, sort by slug alphabetically
    return a.slug.localeCompare(b.slug);
  });
  
  console.log(`📊 Found ${docPages.length} documentation pages`);
  
  // Generate the LLMs.txt content
  console.log('🔨 Generating LLMs.txt content...');
  const llmsContent = generateLLMsTxt(docPages);
  
  // Write to file
  const outputFile = 'llms.txt';
  fs.writeFileSync(outputFile, llmsContent, 'utf8');
  
  console.log(`✅ Generated ${outputFile} with ${docPages.length} documentation pages!`);
  console.log(`📁 File size: ${Math.round(fs.statSync(outputFile).size / 1024)}KB`);
  console.log(`📍 File location: ${path.resolve(outputFile)}`);
  
  // Show first few pages as preview
  console.log('\n📋 Preview of documentation pages:');
  docPages.slice(0, 5).forEach(page => {
    console.log(`   - ${page.title} (${page.slug || '/'})`);
  });
  
  // Show section breakdown
  const sections = {};
  docPages.forEach(page => {
    const section = page.navSection || 'Other';
    sections[section] = (sections[section] || 0) + 1;
  });
  
  console.log(`\n📂 Documentation sections:`);
  Object.entries(sections)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 10)
    .forEach(([section, count]) => {
      console.log(`   - ${section}: ${count} pages`);
    });
}

// Run the script
main();

export { findDocumentationPages, extractFrontmatter, generateLLMsTxt }; 