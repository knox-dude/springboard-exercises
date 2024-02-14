const fs = require('fs');

function cat(path) {
    const f = fs.readFile("./"+path, 'utf8', (err, data) => {
        if (err) {
            console.log(`\nError reading ${path}:`);
            console.log(`    ${err.message}\n`);
            process.exit(1);
        } 
        console.log(data);
    });
}

// cat(process.argv[2]);
