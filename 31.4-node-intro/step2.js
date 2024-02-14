const fs = require('fs');
const axios = require('axios');

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


async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching webpage:', error);
        process.exit(1);
    }
}

if (process.argv[2].startsWith('http')) {
    webCat(process.argv[2])
} else {
    cat(process.argv[2])
}