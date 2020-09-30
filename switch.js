const fs = require('fs');
const parse = require('csv-parse');


module.exports = {
    createJson: function(){

        let csvData=[];
        
        fs.createReadStream('./data.csv')
            .pipe(parse({delimiter: ';', columns: true}))
            .on('data', function(csvrow) {
                csvData.push(csvrow);        
            })
            .on('end', function() {
            let newjson = JSON.stringify(csvData)
            fs.writeFile('data.json', newjson, function (err) {
                if (err) throw err;
                    console.log('JSON File was created successfully.');
            });
        });
    }
}

//     const fileInfo = function(){
//         console.log('File added');
//     }

//     module.exports = {

//         createJson: function(){
//             create();
//             setTimeout(fileInfo, 2000)
//         }
// }
    
