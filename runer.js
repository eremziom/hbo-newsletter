const HTMLParser = require('node-html-parser');
const fs = require('fs');
const path = require('path');
const {createJson} = require('./switch.js');

const srcExchanger = function(number, db){

    let htmlFile = fs.readFileSync(path.resolve(__dirname, `hbo-${number}.html`), 'utf8')
    const root = HTMLParser.parse(htmlFile);

    for(let src of root.querySelectorAll('img')){
        srcName = src.rawAttributes.src;
        slicedName = srcName.slice(0, -4);
        replacedName = slicedName.replace(/_/g, '-');
        for(let name of db){
            const pureFileName = name.filename.slice(15);
            if(replacedName == pureFileName){
                src.rawAttrs = src.rawAttrs.replace(`${src.rawAttributes.src}`, `${name.url}`);
            };
        };
    };
    let newRoot = root;
    fileCreator(number, newRoot)
}

const fileCreator = function(number, newRoot){
    fs.writeFile(`hbo-${number}-new.html`, newRoot, function (err) {
    if (err) throw err;
        console.log('HTML File was created successfully.');
    });
}

const dbCreator = function(number){
    const data = require(`./data-${number}.json`);
    let db = data;
    console.log('DB File created successfully');
    setTimeout(srcExchanger, 500, number, db);
}

const createHTML = () => {
    for(let x = 3; x <= 5; x++){
        createJson(x);
        setTimeout(dbCreator, 2000, x);
    }
}

createHTML();

