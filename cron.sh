#/bin/bash

wget -N -nv -i urls.txt

git commit -a -m "$(date +%x)" && git push
