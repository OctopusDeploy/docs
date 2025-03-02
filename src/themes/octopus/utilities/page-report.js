import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getFiles(folder, allFiles) {
    const files = fs.readdirSync(folder);
    allFiles = allFiles || [];

    files.forEach(file => {
        const name = path.join(folder, file);
        const stat = fs.statSync(name);
        const isDirectory = stat.isDirectory();

        if (isDirectory) {
            allFiles = getFiles(name, allFiles);
        } else {
            const ext = path.extname(name);
            const url = name
                .replace(/\\/g, '/')
                .replace(/src\/pages\/docs/, '/docs')
                .replace(/\/index.mdx/, '')
                .replace(/\/index.md/, '')
                .replace(/.mdx/, '')
                .replace(/.md/, '');

            if (['.md', '.mdx'].indexOf(ext) > -1) {
                const content = fs.readFileSync(name);
                const frontmatter = matter(content);

                if (frontmatter.data.title !== 'Redirect') {
                    allFiles.push({
                        url: url,
                        title: frontmatter.data.title,
                        date: (frontmatter.data.modDate || frontmatter.data.pubDate)
                    });
                }
            }
        }
    });

    return allFiles;
}

function noQuotes(str) {
    return str.replace(/"/g, '');
}

const source = './src/pages/docs';
const dest = './dist/report/page-report.csv';
const everything = getFiles(source);
const output = 'Path,Title,Updated\n' +
    everything.map(info => `"${noQuotes(info.url)}","${noQuotes(info.title)}","${info.date}"`).join('\n');

fs.writeFileSync(dest, output);

console.log('Report stored to', dest);