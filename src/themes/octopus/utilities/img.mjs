/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 *
 * @format
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const workingDirectory = process.cwd();

const imageSize = await import(
    'file://' + path.join(workingDirectory, 'src/data/image-size.mjs')
);
const imageModule = await import(
    'file://' + path.join(workingDirectory, 'src/data/images.mjs')
);
const size = imageSize.size;
const imagePaths = imageModule.imagePaths;

const imagePath = path.join('public', imagePaths.src);
const outputPath = path.join('public', imagePaths.dest);
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

async function createDestinationFolder(destinationFile) {
    const file = path.parse(destinationFile + '.txt');

    await fs.promises.mkdir(file.dir, { recursive: true });
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

                    const fullDestination = path.join(
                        workingDirectory,
                        outputPath,
                        'x',
                        info.path
                    );

                    // Only processes images where there is no json metadata file
                    const metaPath = path.join(
                        workingDirectory,
                        imagePath,
                        sourcePath + '.json'
                    );

                    if (!fs.existsSync(metaPath)) {
                        console.log('Processing:', metaPath);
                        filesToProcess.push(info);
                    } else {
                        const data = fs.readFileSync(metaPath, 'utf8');
                        const jsonData = JSON.parse(data);
                        const date90DaysAgo = new Date(
                            Date.now() - 90 * 24 * 60 * 60 * 1000
                        );

                        if (
                            !jsonData.updated ||
                            new Date(jsonData.updated) < date90DaysAgo
                        ) {
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
    await createDestinationFolder(destination);

    const ext = path.parse(source).ext;

    switch (ext) {
        case '.png':
            sharp(source)
                .png()
                .toFile(destination + '.png');
            break;
        case '.jpg':
        case '.jpeg':
            sharp(source)
                .jpeg({ mozjpeg: true })
                .toFile(destination + '.jpg');
            break;
        case '.webp':
            sharp(source)
                .webp({ quality: 80 })
                .toFile(destination + '.webp');
            break;
    }

    const info = await sharp(source).metadata();

    const metadata = {
        width: info.width,
        height: info.height,
        sizeInBytes: info.size,
        updated: new Date().toISOString(),
    };

    const metaFile = source + '.json';
    await fs.promises.writeFile(metaFile, JSON.stringify(metadata));

    // Create resized images
    for (const key in size) {
        const resizeDestination = getDestinationFilePathless(
            file.path,
            size[key]
        );
        await createDestinationFolder(resizeDestination);

        const metadata = await sharp(source).metadata();

        if (metadata.width > size[key]) {
            // Only resize if the image is larger than the target size
            sharp(source)
                .resize(size[key], null)
                .webp({ quality: 90 })
                .toFile(resizeDestination + '.webp');
        } else {
            // Don't resize as it's smaller than target size
            sharp(source)
                .webp({ quality: 90 })
                .toFile(resizeDestination + '.webp');
        }
    }
}