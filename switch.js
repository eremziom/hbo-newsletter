const fs = require('fs');
const parse = require('csv-parse');

// This function is responsible for convertion of "data-$number.csv file into data-$number.json file"
module.exports = {
    createJson: function(number){

        let csvData=[];
        
        fs.createReadStream(`./data-${number}.csv`)
            .pipe(parse({delimiter: ';', columns: true}))
            .on('data', function(csvrow) {
                csvData.push(csvrow);        
            })
            .on('end', function() {
            let newjson = JSON.stringify(csvData)
            fs.writeFile(`data-${number}.json`, newjson, function (err) {
                if (err) throw err;
                    console.log('JSON File was created successfully.');
            });
        });
    }
}
    
