# extract_logs
Tool untuk mengekstrak file logs di server linux menjadi file json atau plaintext

## requirement
- nodejs version > 10*
- npm version > 6*

## Cara install tool extract_logs
- npm install

## Cara Penggunaan tool extract_logs
$ node main.js -h
- USAGE: node E:\mytool\extract_logs\main.js [OPTION1] [OPTION2]... arg1 arg2...
  The following options are supported:
    -t, --type    Type Output File
    -o, --output  Path Output File

$ node main.js /var/log/nginx/error.log
- output file E:\mytool\extract_logs\log/error.txt

$ node main.js /var/log/nginx/error.log -t json
- output file E:\mytool\extract_logs\log/error.json

$ node main.js /var/log/nginx/error.log -t text
- output file E:\mytool\extract_logs\log/error.txt

$ node main.js /var/log/nginx/error.log -o /path/to/file/name.txt
- output file /path/to/file/name.txt
