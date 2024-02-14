const fs = require('fs');
const axios = require('axios');

function cat(path, callback) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching webpage:', error);
        process.exit(1);
    }
}

async function readFileOrUrl(text_or_url) {
    if (text_or_url.startsWith('http')) {
        return await webCat(text_or_url);
    } else {
        return new Promise((resolve, reject) => {
            cat(text_or_url, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}

async function writeOut(data, file_path) {
    fs.writeFile(file_path, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            process.exit(1);
        } else {
            console.log('Successfully wrote to file');
        }
    });
}

const arg2 = process.argv[2];

if (arg2 == '--out') {
    const data = readFileOrUrl(process.argv[4]);
    data.then((content) => {
        writeOut(content, process.argv[3]);
    }).catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
} else {
    const data = readFileOrUrl(arg2);
    data.then((content) => {
        console.log(content);
    }).catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}
