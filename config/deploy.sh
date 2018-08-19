#!/bin/sh

npm run build
ssh -t mai "rm -rf /data/www/"
scp -r ./build mai:/data/www/