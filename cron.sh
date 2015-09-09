#/bin/bash

wget -x -nv -i urls.txt

git commit -a -m "$(date +"%x %T")" && git push
