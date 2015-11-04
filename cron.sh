#/bin/bash

git pull

wget -x -nv -w 1 --random-wait -i urls.txt

git commit -a -m "$(date +"%x %T")" && git push
