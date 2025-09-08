import fs from 'fs';

// Function to process the dictionary file
function processDictionary() {
    const inputFile = 'dictionary-octopus.txt';
    const outputFile = 'dictionary-octopus.txt';
    
    try {
        // Check if input file exists
        if (!fs.existsSync(inputFile)) {
            console.error(`Error: File '${inputFile}' not found.`);
            return;
        }
        
        // Read the file
        console.log(`Reading ${inputFile}...`);
        const data = fs.readFileSync(inputFile, 'utf8');
        
        // Split into lines, filter out empty lines, and trim whitespace
        const lines = data
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        console.log(`Original entries: ${lines.length}`);
        
        // Remove duplicates using Set (case-insensitive)
        const uniqueLines = [...new Set(lines.map(line => line.toLowerCase()))]
            .map(lowerLine => {
                // Find the original case version of each unique line
                return lines.find(originalLine => 
                    originalLine.toLowerCase() === lowerLine
                );
            });
        
        console.log(`Unique entries: ${uniqueLines.length}`);
        console.log(`Duplicates removed: ${lines.length - uniqueLines.length}`);
        
        // Sort alphabetically (case-insensitive)
        const sortedLines = uniqueLines.sort((a, b) => 
            a.toLowerCase().localeCompare(b.toLowerCase())
        );
        
        // Write to output file
        const output = sortedLines.join('\n') + '\n';
        fs.writeFileSync(outputFile, output, 'utf8');
        
        console.log(`✅ Processed dictionary saved to ${outputFile}`);
        console.log(`First few entries:`);
        sortedLines.slice(0, 5).forEach((line, i) => {
            console.log(`  ${i + 1}. ${line}`);
        });
        
        if (sortedLines.length > 5) {
            console.log(`  ... and ${sortedLines.length - 5} more`);
        }
        
    } catch (error) {
        console.error('Error processing file:', error.message);
    }
}

// Run the function
processDictionary();