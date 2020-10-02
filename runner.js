const HTMLParser = require('node-html-parser');
const fs = require('fs');
const path = require('path');
const {createJson} = require('./switch.js');

//This function is responsible for import html file, find photos src, and exchange them for static links from json file
const srcExchanger = function(number, db){ //number is argument passed to create correct file names

    let htmlFile = fs.readFileSync(path.resolve(__dirname, `hbo-${number}.html`), 'utf8') //import direct html file
    const root = HTMLParser.parse(htmlFile); //parse html file

    for(let src of root.querySelectorAll('img')){ // get all img elemnts from html
        srcName = src.rawAttributes.src; //get src atribute from each img
        slicedName = srcName.slice(0, -4); //cut off .jpg/.png extension
        replacedName = slicedName.replace(/_/g, '-'); //replace _ to - signs, to match links template
        for(let name of db){ //get each static link name from json
            const pureFileName = name.filename.slice(15); //cut link prefix, to match img src name
            if(replacedName == pureFileName){ //compare perpared src attributes with prepared link names
                src.rawAttrs = src.rawAttrs.replace(`${src.rawAttributes.src}`, `${name.url}`); //replace old attributes to static links url
            };
        };
    };
    let newRoot = root; //save new parsed html to variable
    root.querySelector('table').insertAdjacentHTML("afterend", //add footer to mail
    `<div id="toya-mailing-footer" style="width:1px; height:1px; font-size:1px; line-height:1px;">
    <img alt="" style="width: 1px; height: 1px;" width="1" height="1" src="https://toya.net.pl/tracking_pixel/pixel.png?%%token%%" />
    </div>`);
    fileCreator(number, newRoot) //number is argument passed to create correct file names
}

//This function is responsible for creating new html file, based on newRoot variable
const fileCreator = function(number, newRoot){
    fs.writeFile(`hbo-${number}-new.html`, newRoot, function (err) { //save new html file with correct name
    if (err) throw err;
        console.log('HTML File was created successfully.');
    });
}

//This function is responsible for saving json file with cms data to db variable
const dbCreator = function(number){ //number is argument passed to import correct file names
    const data = require(`./data-${number}.json`); //import json file
    let db = data; //save json to variable
    console.log('DB File created successfully');
    setTimeout(srcExchanger, 500, number, db); //call function with timeout 0,5 sec
}

//This function is responsible for runing script 3 times
const createHTML = () => {
    for(let x = 3; x <= 5; x++){
        createJson(x); //function imported from switch.js
        setTimeout(dbCreator, 2000, x); //function called with timeout 2s - time needed to create json files in createJson function.
    }
}

createHTML();

