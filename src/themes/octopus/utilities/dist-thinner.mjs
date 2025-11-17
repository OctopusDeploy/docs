/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 *
 * @format
 */

import fs from 'fs';
import path from 'path';

const workingDirectory = process.cwd();

const imageSize = await import(
    'file://' + path.join(workingDirectory, 'src/data/image-size.mjs')
);
const imageModule = await import(
    'file://' + path.join(workingDirectory, 'src/data/images.mjs')
);
const size = imageSize.size;
const imagePaths = imageModule.imagePaths;

const imagePath = path.join('dist', imagePaths.src);
const outputPath = path.join('dist', imagePaths.dest);
const imageDirectory = path.join(workingDirectory, imagePath);

 const filesToProcess = [];

function getDestinationFilePathless(source, s) {
    let destination = path.join(
        workingDirectory,
        outputPath,
        s.toString(),
        source
    );
    destination = destination.replace(path.parse(destination).ext, '');
    return destination;
}

function unlinkFile(path) {
    if (fs.existsSync(path)) {
        fs.unlink(path)
    }
}

async function recurseFiles(directory) {
    const f = await fs.promises.readdir(path.join(imageDirectory, directory), {
        withFileTypes: true,
    });

    for (const file of f) {
        if (file.isDirectory()) {
            const nextDirectory = path.join(directory, file.name);
            await recurseFiles(nextDirectory);
        } else {
            const ext = path.parse(file.name).ext;

            switch (ext) {
                case '.jpg':
                case '.jpeg':
                case '.png':
                case '.webp':
                    const sourcePath = path.join(directory, file.name);

                    const webP = sourcePath.replace(
                        /.jpg$|.jpeg$|.png$/,
                        '.webp'
                    );
                    const info = {
                        path: sourcePath,
                        webP: webP,
                    };

                    // Only processes images where there is no json metadata file
                    const metaPath = path.join(
                        workingDirectory,
                        imagePath,
                        sourcePath + '.json'
                    );

                    
                    if (fs.existsSync(metaPath)) {
                        const data = fs.readFileSync(metaPath, 'utf8');
                        const jsonData = JSON.parse(data);
                        const date90DaysAgo = new Date(
                            Date.now() - 14 /* <- days */ * 24 * 60 * 60 * 1000
                        );

                        //console.log('Checking:', metaPath);

                        if (jsonData.updated && new Date(jsonData.updated) < date90DaysAgo) {
                            console.log('Processing:', metaPath);
                            filesToProcess.push(info);
                        }
                    }

                    break;
            }
        }
    }
}

await recurseFiles('');

for (const file of filesToProcess) {
    const source = path.join(imageDirectory, file.path);
    const destination = getDestinationFilePathless(file.path, 'x');

    const ext = path.parse(source).ext;

    // Delete original file
    unlinkFile(source);

    // Delete the fallback file
    switch (ext) {
        case '.png':
            unlinkFile(destination + '.png');
            break;
        case '.jpg':
        case '.jpeg':
            unlinkFile(destination + '.jpg');
            break;
        case '.webp':
            unlinkFile(destination + '.webp');
            break;
    }

    const metaFile = source + '.json';

    // Delete metadata file
    fs.unlinkSync(metaFile);

    // Delete resized images
    for (const key in size) {
        const resizeDestination = getDestinationFilePathless(
            file.path,
            size[key]
        );

        unlinkFile(resizeDestination + '.webp')
    }
}

