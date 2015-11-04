#!/bin/bash

array=(
"vk.com/al_video.php?act=show&al=1&autoplay=1&module=video&show_next=1&video=-22822305_171359037"
)
for url in ${array[@]}
do
    wget -nv -O - "http://$url" | awk -F '<!>' 'BEGIN{RS="~"}{print $8}' | iconv -f CP1251 -t UTF8 > $url
    sleep 1
done

