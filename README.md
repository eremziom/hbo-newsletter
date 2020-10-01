# hbo-newsletter v-1

This program is responsible for newsletter preparation. It automaticly creates new html files, containing static links in place of photos delivered by template. All it needs, is delivered html templates and csv files with names and urls from static cms storage.

### To use this script, you need to run npm install first.

### Paste 3 html template files inside main folder of app. Name them hbo-3.html, hbo-4.html and hbo-5.html.

### Upload to cms all photos, that need to be placed in newsletter.

### Export all photos from cms for one newsletter only, and keep just file_name and url datas. You need 3 seperate files.

### Paste 3 exported csv files inside main folder. Name them data-3.csv, data-4.csv and data-5.csv.

### From main directory, run node runner.js.

### Program will generate 3 new html files in main folder. Those files has all photos exchanged for static links. 

This is program is during development. Will be improved asap. This verison is stable.

Good Luck & Have Fun