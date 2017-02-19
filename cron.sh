#/bin/bash

git pull

wget -x -nv -w 1 --random-wait -i urls.txt
find vk.com -name "*.js" | xargs -I _ ./node_modules/.bin/js-beautify -f _ -r
find vk.com -name "*.css" | xargs -I _ ./node_modules/.bin/css-beautify -f _ -r
./xhr.sh

git commit -a -m "$(date +"%x %T")" && git push
