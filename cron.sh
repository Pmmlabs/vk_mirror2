#/bin/bash

wget -x -N -nv -i urls.txt

git commit -a -m "$(date +%x)" && git push
