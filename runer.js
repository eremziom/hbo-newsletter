
const HTMLParser = require('node-html-parser');
const fs = require('fs');
const path = require('path');
const {createJson} = require('./switch.js');


let db = '';
let newRoot = '';
let htmlFile = fs.readFileSync(path.resolve(__dirname, 'hbo-3.html'), 'utf8')

const srcExchanger = async function(){

    const root = HTMLParser.parse(htmlFile);

    for(let src of await root.querySelectorAll('img')){
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
    newRoot = root;
}

const fileCreator = function(){
    fs.writeFile('hbo-3-new.html', newRoot, function (err) {
    if (err) throw err;
        console.log('HTML File was created successfully.');
    });
}

const dbCreator = function(){
    const data = require('./data.json');
    db = data;
    console.log('DB File created successfully');
}

const createHTML = async function(){
    await createJson();
    await setTimeout(dbCreator, 2000);
    await setTimeout(srcExchanger, 2500);
    await setTimeout(fileCreator, 2500);
}

createHTML();

