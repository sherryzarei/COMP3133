const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';


[canadaFile, usaFile].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Deleted ${file}`); 
    }
});

const canadaStrm = fs.createWriteStream(canadaFile, { flags: 'a' });
const usaStrm = fs.createWriteStream(usaFile, { flags: 'a' });

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            canadaStrm.write(`${JSON.stringify(row)}\n`);
        } else if (row.country === 'United States') {
            usaStrm.write(`${JSON.stringify(row)}\n`);
        }
    })
    .on('end', () => {
        console.log('Data processing completed.');
        canadaStrm.end();
        usaStrm.end();
    });