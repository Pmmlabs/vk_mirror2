#/bin/bash

git pull

wget -x -nv -w 1 --random-wait -i urls.txt
./xhr.sh

git commit -a -m "$(date +"%x %T")" && git push

wget -U "vk_mirror" -O /dev/null http://pmmlabs.ru
