var Feed = {
  videoRecomsBlockHideCancel: function() {
    ajax.post('/al_feed.php', { act: 'a_video_recom_hide_cancel' });
    debugger;
    feed.restorePost('video_recoms');
  },
  videoRecomsBlockHideReason: function(reasonHash, reason) {
    re(geByClass1('feed_rb_video_reason_wrap'));
    show(geByClass1('feed_rb_video_reason_thankyou'));
    ajax.post('/al_feed.php', { act: 'a_video_recom_hide_reason', reason: reason, reason_hash: reasonHash });
  },
  expandVideosPost: function(event, btn) {
    var wrapEl = geByClass1('page_post_sized_thumbs', domPN(btn));
    var shownCount = 0;
    each(wrapEl.children, function() {
      if (!isVisible(this)) {
        show(this);
        shownCount ++;

        if (shownCount > 5) return false;
      }
    });

    toggle(btn, !isVisible(wrapEl.children[wrapEl.children.length - 1]));
  },
  closeVideoBlock: function(hash) {
    ajax.post('al_feed.php', { act: 'a_close_video_block', hash: hash });
    var recomsEl = ge('feed_recommends');
    setStyle(recomsEl, { height: getSize(recomsEl)[1], opacity: 1 });
    setTimeout(function() {
      addClass(recomsEl, 'recoms_hidden');
    });
  },
  update: function (afterPost) {
    if (cur.feedUpdateLoading) return;
    if (cur.add_queue && window.Notifier &&
        Notifier.addKey(cur.add_queue, feed.updated) &&
        cur.section != 'news') {
      return;
    }
    if (cur.subsection == 'top' || inArray(cur.section, ['search', 'photos_search', 'mentions', 'articles', 'articles_search', 'likes'])) {
      return;
    }
    var rnd = Math.random();
    if (cur.section != 'news' && cur.section != 'comments' && rnd > 0.3 ||
        cur.section == 'news' && (afterPost || rnd > 0.05)) {
      return;
    }
    cur.feedUpdateLoading = true;
    ajax.post('al_feed.php?au_' + cur.section, extend(feed.getSectionParams(cur.section), {timestamp: cur.timestamp, posted: afterPost ? 1 : '', queue: cur.add_queue ? 1 : 0}), {
      onDone: function (options, rows, updates_timestamp) {
        cur.feedUpdateLoading = false;
        if (afterPost == 1 &&
            (!rows || rows.indexOf(vk.id + '') == -1)) {
          setTimeout(feed.update.pbind(2), 2000);
          return;
        }
        if (options.section != cur.section ||
            options.timestamp < cur.timestamp ||
            updates_timestamp < cur.timestamp) {
          return;
        }
        options.count += cur.count;
        var feed_rows = cur.rowsCont, au = ce('div'), el, postEl, post_raw, startST, updH = 0;
        if (cur.section == 'news') {
          startST = scrollGetY()
          if (rows) {
            au.innerHTML = rows;
            while (au.lastChild) {
              feed_rows.insertBefore(au.lastChild, feed_rows.firstChild);
            }
            each(geByClass('ts' + updates_timestamp, feed_rows), function() {
              var self = this;
              updH += this.offsetHeight;
              self.style.backgroundColor = '#FEFAE4';
              animate(self, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
              cur.feedUnreadCount++;
            });
          }
          if (updH && startST > 100) {
            scrollToY(startST + updH, 0);
          }
        } else {
          if (rows) {
            au.innerHTML = rows;
            while (el = au.lastChild) {
              if (el.tagName != 'DIV') {
                au.removeChild(el);
                continue;
              }
              post_raw = el.firstChild.id.substr(4);
              if (post_raw && cur.wallLayer == post_raw) {
                continue;
              }
              if (!(postEl = ge('post' + post_raw))) {
                startST = scrollGetY();
                feed_rows.insertBefore(el, feed_rows.firstChild);
                el.style.backgroundColor = '#FEFAE4';
                animate(el, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
                updH = el.offsetHeight;
                if (startST > 100) {
                  scrollToY(startST + updH, 0);
                }
              } else {
                if (!hasClass(postEl.parentNode, 'feed_row')) {
                  return;
                }
                var repliesCont = ge('replies' + post_raw), openEl = repliesCont.nextSibling, cnt = 0;
                each ([].slice.call(geByClass('reply', el, 'div')), function () {
                  if (ge(this.id)) return;
                  addClass(this, 'new_reply');
                  repliesCont.appendChild(this);
                  cnt++;
                });
                if (cnt) {
                  var stDelta = postEl.parentNode.offsetHeight, newCnt = geByClass('new_reply', repliesCont, 'div').length;
                  if (!openEl || openEl.className != 'replies_open') {
                    openEl = ce('div', {className: 'replies_open', onclick: wall.openNewComments.pbind(post_raw)});
                    repliesCont.parentNode.insertBefore(openEl, repliesCont.nextSibling);
                  }
                  openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
                  openEl.newCnt = newCnt;

                  var st = scrollGetY(),
                      ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
                      btnY = getXY(openEl)[1],
                      h = postEl.parentNode.offsetHeight;

                  stDelta = h - stDelta;

                  if (!inArray(post_raw, cur.feedUnread)) {
                    cur.feedUnread.unshift(post_raw);
                  }
                  if (!cur.idleManager.isIdle && btnY > st + 100 && btnY < st + ch + 100) {
                    feed_rows.insertBefore(ge('post_ph' + post_raw) || ce('div', {id: 'post_ph' + post_raw}), feed_rows.firstChild);
                    if (!inArray(post_raw, cur.feedToSort)) {
                      cur.feedToSort.push(post_raw);
                    }
                  } else {
                    re(postEl.parentNode);
                    feed_rows.insertBefore(postEl.parentNode, feed_rows.firstChild);
                    if (btnY > st + ch + 100) {
                      stDelta = h;
                    }
                    if (stDelta) {
                      scrollToY(scrollGetY() + stDelta, 0);
                    }
                  }
                  cur.feedUnreadCount += cnt;
                }
                au.removeChild(el);
              }
            }
          }
        }
        feed.applyOptions(options);
        feed.updateTitle();
      },
      onFail: function () {
        cur.feedUpdateLoading = false;
        return false;
      },
      showProgress: function () {
        cur.feedUpdateLoading = true;
      },
      hideProgress: function () {
        cur.feedUpdateLoading = false;
      }
    });
  },
  getNewQKey: function (to) {
    var params = {
      act: 'a_get_key',
      only_update: cur.add_queue ? 1 : 0,
      need_ignore: !isArray(cur.ignore_owners) ? 1 : 0
    };
    var options = {onDone: onDone, local: 1};
    var section = cur.section;
    ajax.post('al_feed.php?queue', extend(feed.getSectionParams(cur.section), params), options);
    function onDone(key, ignore_owners) {
      if (cur.section != section) return;
      if (key) {
        cur.add_queue = key;
        setTimeout(feed.update.pbind(0), 0);
      } else if (!params.only_update) {
        var ts = ignore_owners;
        cur.timestamp = (ts || (vkNow() / 1000)) - to;
        return;
      }
      if (isArray(ignore_owners)) {
        cur.ignore_owners = ignore_owners;
      }
    }
  },
  updated: function (key, data) {
    if ((cur.section != 'search' && cur.section != 'news' && cur.section) || !cur.add_queue || cur.add_queue.key != key) {
      return;
    }
    if (data.failed) {
      cur.add_queue = false;
      var timeout = curNotifier.error_timeout || 1;
      clearTimeout(cur.lp_error_to);
      cur.lp_error_to = setTimeout(feed.getNewQKey.bind(feed).pbind(timeout), timeout * 1000);
      return;
    }
    if (!isArray(data.events) || !data.events.length) {
      return;
    }
    cur.add_queue.ts = data.ts;
    if (data.key) {
      cur.add_queue.key = data.key;
    }
    var startST = scrollGetY(),
        updH = 0;

    each(data.events, function () {
      updH += feed.pushEvent(this.split('<!>'), startST);
    });
    var endST = scrollGetY();
    if (updH && startST > 100 && Math.abs(startST - endST) < 100) {
      scrollToY(endST + updH, 0);
    }
    feed.updateTitle();
    if (window.mvcur && mvcur.mvShown) {
      Videoview.updatePlaylistBoxPosition();
    }
    if (cur.gifAutoplayScrollHandler) {
      cur.gifAutoplayScrollHandler();
    }
  },
  pushEvent: function (ev, st) {
    var ev_ver = ev[0],
        ev_type = ev[1],
        post_id = ev[2],
        el = ge('post' + post_id),
        s = cur.section,
        flags = s != 'search' ? intval(ev.pop()) : 0,
        deltaH = 0;

    if (!cur.options || ev_ver != cur.options.qversion) {
      return;
    }
    switch (ev_type) {
      case 'new_post': {
        if (el) break;
        var adminLevel = 0;
        if (intval(ev[11]) && intval(ev[11]) != vk.id) { // own reply owner
          ajax.post('al_feed.php', {act: 'a_need_own_reply', oid: intval(ev[11])}, {
            onDone: function(need) {
              if (need) {
                ev[11] = 0;
                feed.pushEvent(ev);
              }
            }
          });
          return;
        }
        if (s != 'search') {
          var oid = post_id.split('_')[0];
          ev[8] = (intval(ev[8]) > 0 && (flags & 4) == 4) ? 1 : 0;
          if (oid < 0) {
            adminLevel = (flags & 8) ? 2 : ((flags & 2) ? 1 : 0);
          }
        }
        if (s == 'search') {
          statlogsValueEvent('feed_switch', 0, 'search_update', (cur.options.q && cur.options.q.charAt(0) == '#') ? 'hashtag' : '');
        }
        var cont = cur.rowsCont,
            cnodes = cont.childNodes,
            postHTML = wall.getNewPostHTML(ev, adminLevel, feed.feedPostRepl),
            place = ev[12],
            newEl, grouped, first, others, moreLink, singleOthers;

        var showCollapsed = s != 'search' && (window._wf <= 0 || isVisible('feed_new_posts'));
        var addedToStart = false;
        var _postHTML = postHTML;
        if (showCollapsed) {
          postHTML = wall.updatePostImages(postHTML);
        }

        if (place) { // Client-side grouping posts
          if (cur.ignore_owners.length && inArray(intval(place), cur.ignore_owners)) {
            break;
          }
          if (grouped = geByClass1('feed_reposts_wrap' + place, cont, 'div')) {
            first = geByClass1('feed_reposts_first', grouped, 'div').firstChild;
            others = geByClass1('feed_reposts_group', grouped, 'div');
            moreLink = geByClass1('feed_reposts_more_link', grouped, 'a');
            if (st > getXY(first)[1]) {
              deltaH -= first.offsetHeight;
            }
            first.parentNode.replaceChild(newEl = se(_postHTML), first);
            others.insertBefore(first, others.firstChild);
            if (!isVisible(others)) {
              val(moreLink, getLang('news_show_X_reposts', others.childNodes.length));
            }
            grouped = grouped.parentNode;
            if (cont.firstChild != grouped) {
              cont.insertBefore(grouped, cont.firstChild);
            }
            if (st > getXY(grouped)[1]) {
              deltaH += grouped.offsetHeight;
            }
            grouped.bits = 0;
          } else if ((singleOthers = geByClass('feed_repost' + place, cont, 'div')) && singleOthers.length) {
            postHTML = rs(cur.wallTpl.grouped_posts, {
              place: place,
              random: irand(100000000, 200000000),
              first: postHTML,
              other: '',
              label: getLang('news_show_X_reposts', singleOthers.length)
            });
            var frow = se('<div class="feed_row"' + (showCollapsed ? ' style="display:none"' : '') + '>' + postHTML + '</div>');
            cont.insertBefore(frow, cont.firstChild);
            if (!showCollapsed && st > getXY(frow)[1]) {
              deltaH += frow.offsetHeight;
            }
            addedToStart = true;
            grouped = frow.firstChild;
            newEl = geByClass1('feed_reposts_first', grouped, 'div');
            others = geByClass1('feed_reposts_group', grouped, 'div');
            each(clone(singleOthers), function () {
              if (st > getXY(this)[1]) {
                deltaH -= this.offsetHeight;
              }
              re(this.parentNode);
              others.appendChild(this.firstChild);
            });
          } else {
            newEl = se('<div class="feed_row"' + (showCollapsed ? ' style="display:none"' : '') + '><div class="feed_repost' + place + '">' + postHTML + '</div></div>');
            cont.insertBefore(newEl, cont.firstChild);
            addedToStart = true;
            if (!showCollapsed && st > getXY(newEl)[1]) {
              deltaH += newEl.offsetHeight;
            }
          }
        } else {
          newEl = se('<div class="feed_row"' + (showCollapsed ? ' style="display:none"' : '') + '>' + postHTML + '</div>');
          cont.insertBefore(newEl, cont.firstChild);
          addedToStart = true;
          if (!showCollapsed && st > getXY(newEl)[1]) {
            deltaH += newEl.offsetHeight;
          }
        }

        if (showCollapsed && addedToStart) {
          cur.newPostsCount = cur.newPostsCount ? cur.newPostsCount + 1 : 1;
          ge('feed_new_posts').innerHTML = getLang('news_new_posts', cur.newPostsCount);;
          show('feed_new_posts');
        }

        if (ge('post_poll_id' + post_id)) {
          wall.updatePoll(post_id);
        }
        cur.feedUnreadCount++;
        if (s != 'search') {
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
        }
        if (cnodes.length > 300) {
          cont.removeChild(cnodes[300]);
        } else if (cnodes.length <= 1) {
          hide('feed_empty');
        }
        Wall.updateMentionsIndex();
        break;
      }
      case 'new_post_reply': {
        if (el) break;
        var cont = cur.rowsCont,
            cnodes = cont.childNodes,
            postHTML = wall.getNewPostHTML(ev, false, feed.feedPostRepl),
            newEl = se('<div class="feed_row">' + postHTML + '</div>');

        cont.insertBefore(newEl, cont.firstChild);
        if (st > getXY(newEl)[1]) {
          deltaH += newEl.offsetHeight;
        }
        cur.feedUnreadCount++;
        if (cnodes.length > 300) {
          cont.removeChild(cnodes[300]);
        } else if (cnodes.length <= 1) {
          hide('feed_empty');
        }
        break;
      }
      case 'edit_post': {
        var editEl = ge('wpt' + post_id),
            stUnder;
        if (!isVisible(el) || !editEl) break;

        var wasExpanded = geByClass1('wall_post_more', editEl);
        if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

        if (stUnder = (st > getXY(editEl)[1])) {
          deltaH -= editEl.offsetHeight;
        }
        var text = psr(rs(ev[3], {
          poll_hash: cur.wallTpl.poll_hash
        }));
        var cont = ge('post' + post_id);
        if (cont && !isVisible(cont.parentNode)) {
          text = wall.updatePostImages(text);
        }
        val(editEl, text);
        if (wasExpanded) {
          wasExpanded = geByClass1('wall_post_more', editEl);
          if (wasExpanded) wasExpanded.onclick();
        }
        if (ge('post_poll_id' + post_id)) {
          wall.updatePoll(post_id);
        }
        if (stUnder) {
          deltaH += editEl.offsetHeight;
        }

        setStyle(editEl, {backgroundColor: '#FEFAE4'});
        animate(editEl, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
        break;
      }
      case 'edit_reply': {
        var reply_id = ev[3],
            editEl = ge('wpt' + reply_id);
        if (!isVisible('post' + reply_id) || !editEl) break;

        var wasExpanded = geByClass1('wall_reply_more', editEl);
        if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

        updH = -editEl.offsetHeight;
        updY = getXY(editEl)[1];
        val(editEl, psr(ev[4]));
        if (wasExpanded) {
          wasExpanded = geByClass1('wall_reply_more', editEl);
          if (wasExpanded) wasExpanded.onclick();
        }
        updH += editEl.offsetHeight;
        setStyle(editEl, {backgroundColor: '#FEFAE4'});
        animate(editEl, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
        break;
      }
      case 'post_parsed_link': {
        if (!el) break;
        var btnWrap = geByClass1('wall_postlink_preview_btn_disabled', el);
        if (!btnWrap) break;
        if (intval(ev[3])) {
          removeClass(btnWrap, 'wall_postlink_preview_btn_disabled');
        } else {
          re(btnWrap);
        }
        break;
      }
      case 'del_post': {
        if (el) {
          if (!cur.wallMyDeleted[post_id]) {
            if (st > getXY(el)[1]) {
              deltaH -= el.offsetHeight;
            }
            revertLastInlineVideo(el);
            hide(el);
          }
          cur.options.offset--;
          var row = el.parentNode;
          if (!hasClass(row, 'feed_row')) {
            row = row.parentNode;
          }
          if (isVisible('feed_new_posts') && !isVisible(row)) {
            cur.newPostsCount--;
            if (cur.newPostsCount == 0) {
              hide('feed_new_posts');
            } else {
              ge('feed_new_posts').innerHTML = getLang('news_new_posts', cur.newPostsCount);
            }
          }
        }
        break;
      }
      case 'res_post': {
        el && cur.options.offset++;
        break;
      }
      case 'new_reply': {
        if (!el || cur.wallMyReplied[post_id] || ge('post' + ev[3])) break;

        var repliesEl = ge('replies' + post_id),
            repliesWrap = ge('replies_wrap' + post_id),
            startH = el.offsetHeight,
            oid = post_id.split('_')[0],
            adminLevel = (oid < 0) ? ((flags & 8) ? 2 : ((flags & 2) ? 1 : 0)) : 0,
            replyHTML = wall.getNewReplyHTML(ev, adminLevel),
            newEl = false,
            highlight = false;

        if (!isVisible(repliesEl) || !isVisible(repliesWrap) || isVisible('reply_link' + post_id)) {
          re('reply_link' + post_id);
          show(repliesWrap, repliesEl);
          highlight = true;
        } else {
          var openEl = repliesEl.nextSibling,
              newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;

          if (!cur.wallMyOpened[post_id]) {
            replyHTML = wall.updatePostImages(replyHTML);
            newEl = se(replyHTML);
            addClass(newEl, 'new_reply');
            if (!openEl || openEl.className != 'replies_open') {
              openEl = ce('div', {className: 'replies_open', onclick: wall.openNewComments.pbind(post_id)});
              repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
            }
            openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
            openEl.newCnt = newCnt;
          } else {
            if (openEl && openEl.className == 'replies_open') re(openEl);
            highlight = true;
            var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                shown = geByClass('reply', repliesEl, 'div').length + 1,
                total = shown;
            if (headerEl) {
              total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
            }
            if (total > 5 || shown < total) {
              if (!headerEl) {
                repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
              }
              wall.updateRepliesHeader(post_id, headerEl, shown, total);
            }
          }
        }
        if (post_id.split('_')[0] == vk.id) {
          cur.feedUnreadCount++;
        }
        if (!newEl) {
          newEl = se(replyHTML);
        }
        repliesEl.appendChild(newEl);
        if (st > getXY(highlight ? newEl : openEl)[1]) {
          deltaH += el.offsetHeight - startH;
        }
        if (highlight) {
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
        }
        Wall.repliesSideSetup(post_id);
        Wall.updateMentionsIndex();
        break;
      }
      case 'del_reply': {
        if (!cur.wallMyDeleted[post_id] && el) {
          if (st > getXY(el)[1]) {
            deltaH -= el.offsetHeight;
          }

          var post = el.parentNode.id.match(/replies(-?\d+_\d+)/);
          revertLastInlineVideo(el);
          re(el);
          if (post) {
            Wall.repliesSideSetup(post[1]);
          }
        }
        break;
      }
      case 'like_post':
      case 'like_reply': {
        var likePost = (ev_type == 'like_reply' ? post_id.replace('_', '_wall_reply') : post_id);
        var cntEl = ge('like_count' + likePost);
        var iconEl = ge('like_icon' + likePost);

        if (!el && !cntEl) break;

        var ttEl = (iconEl && iconEl.parentNode);
        var cnum = intval(val(cntEl));
        var num = intval(ev[3]);

        animateCount(cntEl, num);
        val('like_real_count_wall' + post_id, num);
        toggleClass(iconEl, 'no_likes', num <= 0);
        if (ttEl && ttEl.tt && !isVisible(ttEl.tt.container)) {
          ttEl && ttEl.tt && ttEl.tt.destroy();
        }
        setStyle(iconEl, {opacity: '', visibility: ''});
        break;
      }
      case 'vote_poll': {
        if (!ge('post_poll' + post_id)) {
          break;
        }
        wall.updatePollResults(post_id, ev[3]);
        break;
      }
      case 'new_photos_private': {
        break;
        ajax.post('al_feed.php', {act: 'a_get_private', oid: ev[2], key: ev[3], hash: ev[4], num: ev[5]}, {
          onDone: function (ev) {
            if (isArray(ev) && ev.length) {
              feed.pushEvent(ev);
            }
          }
        });
        break;
      }
      case 'new_photos':
      case 'new_tagged': {
        break;
        var cont = cur.rowsCont,
            cnodes = cont.childNodes,
            thumbs = ev.splice(7, ev.length - 7),
            place = ev[2].split('_')[1] + '_' + (ev_type == 'new_photos' ? 1 : 3),
            grouped, newEl;

        if (grouped = geByClass1('post_photos' + place, cont, 'div')) {
          if (st > getXY(grouped)[1]) {
            deltaH -= grouped.offsetHeight;
          }
          var numEl = geByClass1('feed_photos_num', grouped, 'small'),
              thumbsEl = geByClass1('post_media', grouped, 'div'),
              num = intval(numEl.getAttribute('num')) + thumbs.length / 3,
              thumbs_html = [], i;
          val(numEl, getLang('news_x_photos', num) + ', ' + wall.getNowRelTime());
          numEl.setAttribute('num', num);
          for (i = 0; i < thumbs.length; i += 3) {
            thumbs_html.push(cur.wallTpl.photo_thumb.replace(/%photo_id%/g, thumbs[i]).replace(/%thumb%/g, thumbs[i+1]).replace(/%temp%/g, thumbs[i+2].replace(/"/g, '&quot;')).replace('%full_id%', ev[2]));
          }
          if (thumbs_html.length >= 8) {
            thumbs_html.splice(8, thumbs_html.length - 8);
            val(thumbsEl, thumbs_html.join(' '));
          } else {
            var t = ce('div', {innerHTML: thumbs_html});
            while (t.lastChild) {
              thumbsEl.insertBefore(t.lastChild, thumbsEl.firstChild);
              if (thumbsEl.childNodes.length > 8) {
                re(thumbsEl.lastChild);
              }
            }
          }
          newEl = grouped.parentNode;
          if (cont.firstChild != newEl) {
            cont.insertBefore(newEl, cont.firstChild);
          }
          if (st > getXY(newEl)[1]) {
            deltaH += newEl.offsetHeight;
          }
        } else {
          newEl = se('<div class="feed_row">' + wall.getNewPostHTML(ev, false, feed.feedPhotoRepl.pbind(thumbs)) + '</div>');
          addClass(newEl.firstChild, 'post_photos post_photos' + place);
          cont.insertBefore(newEl, cont.firstChild);
          if (st > getXY(newEl)[1]) {
            deltaH += newEl.offsetHeight;
          }
        }
        if (s != 'search') {
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
        }
        if (cnodes.length > 300) {
          cont.removeChild(cnodes[300]);
        } else if (cnodes.length == 1) {
          hide('feed_empty');
        }
        break;
      }
    }
    return deltaH;
  },
  feedPostRepl: function (repl, ev) {
    repl.replies = cur.wallTpl.post_replies;
    var ext = {
      full_id: ev[2],
      item_id: 'wall_' + ev[2],
      sec_name: stripHTML(ev[3]),
      date: wall.getNowRelTime(),
      del: /*ev[9] == vk.id ? cur.wallTpl.del : */cur.wallTpl.spam // always hiding from feed
    };
    if (cur.section == 'search' && cur.q) {
      var text = repl.text || '',
          q = cur.q, q_words = q.toLowerCase().split(/[\s.,:;!?()]/),
          links = [];
      text = text.replace(/<.+?>/g, function (tag) {
        links.push(tag);
        return "\x01";
      });
      var text_l = text.toLowerCase(), i, pos, word;
      for (i = q_words.length - 1; i >= 0; i--) {
        word = q_words[i];
        if (!trim(word)) continue;
        pos = 0;
        while ((pos = text_l.indexOf(word, pos)) != -1) {
          if (text.charAt(pos - 1) == String.fromCharCode(2)) {
            pos += 2;
            continue;
          }
          text = text.substr(0, pos) + "\x02" + i + "\x02" + text.substr(pos + word.length);
          text_l = text_l.substr(0, pos) + "\x02" + i + "\x02" + text_l.substr(pos + word.length);
        }
      }
      text = text.replace(/\x02(\d+)\x02/g, function (a, i) {
        return '<span class="match">' + q_words[i] + '</span>';
      });
      text = text.replace(/\x01/g, function () {
        return links.shift() || '';
      });
      ext.text = text;
      if (ev[1] == 'new_post_reply') {
        ext.date_postfix = ev[7];
      }
    }
    return ext;
  },
  feedPhotoRepl: function (thumbs, repl, ev) {
    var thumbs_html = [], i, ext, explain = '', cnt = 1;

    for (i = 0; i < thumbs.length; i += 3) {
      thumbs_html.push(cur.wallTpl.photo_thumb.replace(/%photo_id%/g, thumbs[i]).replace(/%thumb%/g, thumbs[i+1]).replace(/%temp%/g, thumbs[i+2].replace(/"/g, '&quot;')));
    }
    if (ev[1] == 'new_tagged') {
      explain = cur.wallTpl.tagged_explain.replace('%explain_text%', langSex(ev[6], cur.lang.wall_user_was_tagged_on_photos));
    } else {
      cnt = ev[6];
    }
    ext = {
      text: cur.wallTpl.photos,
      reply_link: '',
      reply_box: '',
      oid: ev[2].split('_')[1],
      explain: explain,
      photos: thumbs_html.join(' '),
      replies: cur.wallTpl.photo_replies.replace('%date%', getLang('news_x_photos', cnt) + ', ' + wall.getNowRelTime()),
      count: cnt,
      full_id: ev[2],
      item_id: ev[2].replace(/^1_/, 'photos_').replace(/^3_/, 'tagged_'),
      sec_name: stripHTML(ev[3])
    };
    return ext;
  },
  reSortItems: function () {
    if (!cur.feedToSort || !cur.feedToSort.length) return;
    each (cur.feedToSort, function (k, v) {
      var ph = ge('post_ph' + v), el = ge('post' + v).parentNode;
      if (ph && el) {
        ph.parentNode.insertBefore(el, ph);
        re(ph);
      }
    });
    cur.feedToSort = [];
    scrollToY(0, 0);
  },
  showNewPosts: function() {
    var newPostsButton = ge('feed_new_posts');
    var deltaH = -newPostsButton.offsetHeight - intval(getStyle(newPostsButton, 'marginTop')) - intval(getStyle(newPostsButton, 'marginBottom'));
    hide('feed_new_posts');
    cur.newPostsCount = 0;
    var container = ge('feed_rows');
    var startST = scrollGetY();
    Wall.loadPostImages(container);
    each (geByClass('feed_row', container, 'div'), function () {
      if (!isVisible(this)) {
        show(this);
        deltaH += this.offsetHeight;
        this.style.backgroundColor = '#FEFAE4';
        animate(this, {backgroundColor: '#FFF'}, 6000, function(el) { el.style.backgroundColor = null;});
      }
    });

    var endST = scrollGetY();
    if (deltaH && Math.abs(startST - endST) < 100) {
      scrollToY(endST + deltaH, 0);
    }

  },
  updateTitle: function () {
    if (!cur.idleManager) return;
    if (!cur.idleManager.isIdle) {
      cur.feedUnreadCount = 0;
    }
    document.title = (cur.feedUnreadCount ? '('+ cur.feedUnreadCount + ') ' : '') + cur.feedInitialTitle;
  },
  toggleTabsMenu: function (on) {
    var feedMenu = ge('feed_tab_add_menu');
    if (on === undefined) {
      on = !isVisible(feedMenu);
    }
    if (browser.mozilla) {
      setStyle('page_body', {overflow: on ? 'visible' : ''});
    }
    toggle(feedMenu, on);
    if (on) {
      addEvent(document, 'mousedown', function (e) {
        Feed.toggleTabsMenu(0);
        removeEvent(document, 'mousedown', arguments.callee);
      });
    }
  },
  toggleMenu: function (on) {
    var feedMenu = ge('feed_menu');
    if (on === undefined) {
      on = !isVisible(feedMenu);
    }
    val('feed_menu_toggler', on ? getLang('news_hide_menu') : getLang('news_show_menu'));
    toggle(feedMenu, on);
    if (on) {
      addEvent(document, 'mousedown', function (e) {
        var target = e.target;
        while (target) {
          if (hasClass(target, 'dd_menu_header')) {
            return true;
          }
          target = target.parentNode;
        }
        Feed.toggleMenu(0);
        removeEvent(document, 'mousedown', arguments.callee);
      });
    }
  },
  getSectionParams: function(section) {
    var params = {section: section};
    switch (section) {
      case 'news':
      case 'recommended':
        if ((params.subsection = cur.subsections[section]) === undefined) {
          delete params.subsection;
        }
        break;

      case 'owner':
        if (!(params.owner = cur.owner)) {
          delete params.section;
        }
        break;

      case 'source':
        if (!(params.source = cur.source)) {
          delete params.source;
        }
        break;

      case 'list':
        if (!(params.list = cur.list)) {
          delete params.list;
        }
        break;

      case 'notifications':
        if (!(params.source = cur.source)) {
          delete params.source;
        }
        break;

      case 'articles':
        params.percent = cur.periodPercent;
        if ((params.subsection = cur.subsections[section]) === undefined) {
          delete params.subsection;
        }
        break;

      case 'search':
      case 'photos_search':
        if (!(params.q = trim(val('feed_search')))) {
          delete params.section;
        }
        // if (!(params.sort = intval(cur.searchSortMenu && cur.searchSortMenu.val()))) {
        if (!(params.sort = intval(cur.search_sort_value))) {
          delete params.sort;
        }
        break;

      case 'articles_search':
        if (!(params.q = trim(val('feed_search')))) {
          params.section = 'articles';
        }
        break;

      case 'comments':
        if (cur.reposts) {
          params.reposts = cur.reposts;
        }
        break;

      case 'mentions':
        if (cur.mentionObj && cur.mentionObj != vk.id) {
          params.obj = cur.mentionObj;
        }
        break;
    }
    return params;
  },
  switchSection: function(newSection, e) {
    if (e && checkEvent(e)) {
      return true;
    }

    if (cur.feedVideoTabHintEl) {
      cur.feedVideoTabHintEl.destroy();
    }

    Feed.searchToggleHotHashtags(false);
    hide('feed_new_posts');
    cur.newPostsCount = 0;
    if (newSection == 'search' && !trim(val('feed_search'))) {
      if (cur.section != 'search') return false;
      newSection = 'news';
    }
    if (newSection == 'photos_search' && !trim(val('feed_search'))) {
      if (cur.section != 'photos_search') return false;
      newSection = 'photos';
    }
    if (newSection == 'comments') {
      cur.reposts = cur.options.reposts = '';
    }
    statlogsValueEvent('feed_switch', 0, newSection);
    feed.setSection(newSection, 1);
    var params = feed.getSectionParams(newSection || 'news');
    delete cur.feedUpdateLoading;
    delete cur.isFeedLoading;
    nav.go(extend(params || {}, {'0': 'feed'}));
    return false;
  },
  setSection: function (newSection, from) {
    from = from || 0;
    cur.prevSection = cur.section;
    if (newSection == cur.section && from < 2 || !newSection) return;

    var splitt = !!ge('feedtab_updates') || !ge('feedtab_news');

    hide('feed_progress');

    var feedBar = ge('feed_bar'),
        curSection = cur.section,
        curTopTab = 'news',
        newTopTab = 'news',
        curTab, newTab;

    if (from >= 2 && newSection == cur.section) {
      curSection = cur.prevSection || cur.section;
    }
    if (curSection == 'articles_search') {
      curTab = 'articles';
    } else if (curSection == 'photos_search') {
      curTab = 'photos';
    } else if (curSection == 'list') {
      curTab = 'list' + (newSection == 'list' ? cur.prevList : cur.list);
    } else {
      curTab = curSection || '';
    }

    if (newSection == 'articles_search') {
      newTab = 'articles';
    } else if (newSection == 'photos_search') {
      newTab = 'photos';
    } else if (newSection == 'list') {
      newTab = 'list' + cur.list;
    } else {
      newTab = newSection || '';
    }

    switch (cur.section) {
      case 'notifications':
        curTopTab = 'notifications';
        break;

      case 'replies':
        curTopTab = 'replies';
        break;

      case 'updates':
        if (splitt) {
          curTopTab = 'updates';
          break;
        }
      case 'comments':
        curTopTab = 'comments';
        break;

      case 'owner': curTopTab = 'owner'; break;
      case 'source': curTopTab = 'source'; break;
    }
    switch (newSection) {
      case 'notifications':
        newTopTab = 'notifications';
        break;

      case 'replies':
        newTopTab = 'replies';
        break;

      case 'updates':
        if (splitt) {
          newTopTab = 'updates';
          break;
        }
      case 'comments':
        newTopTab = 'comments';
        break;

      case 'owner':
        newTopTab = 'owner';
        break;

      case 'source':
        newTopTab = 'source';
        break;
    }

    var curTabEl = curTab && curTab != newTab && geByClass1('feed_tab_' + curTab, feedBar, 'div');
        newTabEl = newTab && geByClass1('feed_tab_' + newTab, feedBar, 'div');

    curTabEl && replaceClass(curTabEl, 'summary_tab_sel', 'summary_tab');

    if (newTabEl) {
      var tabLink = geByTag1('a', newTabEl),
          tween = data(tabLink, 'tween');

      if (tween && tween.isTweening) {
        tween.stop(false);
      }
      tabLink.style.backgroundColor = '';
      replaceClass(newTabEl, 'summary_tab', 'summary_tab_sel');
    }

    if (curTopTab != newTopTab || from > 1) {
      removeClass(ge('feedtab_' + curTopTab), 'active_link');
      addClass(ge('feedtab_' + newTopTab), 'active_link');
      if (from < 2) {
        if (cur.section != 'owner') {
          hide(feed.getTypesSection() + '_filters');
        } else {
          hide('person_filters', 'group_filters');
        }
        if (curTopTab == 'news' || cur.section == 'articles') {
          hide('feed_rate_slider_wrap');
        }
        cur.section = newSection;
        return;
      }

      toggle('feed_news_bar', newTopTab == 'news');
      toggle('feed_comments_bar', newTopTab == 'comments');
      toggle('feed_search_bar', inArray(newSection, ['articles_search', 'articles', 'notifications', 'search', 'photos_search', 'photos']));
      if (splitt) {
        toggle('feed_bar', newTopTab != 'updates' && newTopTab != 'notifications' && newTopTab != 'replies' && newTopTab != 'comments' && newTopTab != 'source');
      } else {
        toggle('feed_bar', newTopTab != 'source');
      }

      if (cur.section != 'search') {
        toggle('feed_search_toggle_ext', newSection == 'search');
        if (from == 3) {
          Feed.searchToggleExtended(newSection == 'search');
        }
        Feed.toggleAdvancedSearch(false);
        Feed.searchToggleHotHashtags(newSection == 'search');
      }

      toggle('feed_recommends', newSection == 'news');
    }

    if (from > 1 && newSection.indexOf('search') == -1 && val('feed_search')) {
      Feed.searchReset();
    }

    var oldFilters = ge(feed.getTypesSection() + '_filters');
    cur.section = newSection;
    if (from == 4) {
      Feed.searchUpdate();
      return;
    }

    if (cur.section != 'owner') {
      hide(oldFilters);
    } else {
      hide('person_filters', 'group_filters');
    }

    var newFilters = ge(feed.getTypesSection() + '_filters');
    if (newFilters) {
      show(newFilters, 'feed_menu_toggle');
    } else {
      hide('feed_menu_toggle');
    }
    toggle('feed_edit_hidden', newSection == 'news' || newSection == 'photos');
    // toggle('feed_search_sort', inArray(newSection, ['search'/*, 'photos_search'*/]));
    toggle('feed_period_select', newSection == 'articles' && cur.subsection == 'top');
    toggle('feed_rate_slider_wrap', newSection == 'articles' && cur.subsection == 'top');

    cur.editingHide = (newSection == 'notifications' || newSection == 'replies') ? feed.notifyCheckHideReply : false;

    if (inArray(newSection, ['search', 'photos_search']) && !cur.searchSortMenu) {
      stManager.add(['ui_controls.js', 'ui_controls.css'], feed.initUi);
    }

    if (cur.gifAutoplayScrollHandler) {
      cur.gifAutoplayScrollHandler();
    }
  },
  // from: 3 - init, 2 - navigation, undefined - other
  applyOptions: function(options, from) {
    from = from || 0;
    if (options.owner) {
      cur.owner = options.owner;
    }
    cur.subsection = options.subsection || '';
    feed.setSection(options.section, from);
    if (!cur.options) cur.options = {reply_names: {}};
    extend(cur.options.reply_names, options.reply_names);
    delete options.reply_names;
    extend(cur, options);

    cur.subsections[cur.section] = cur.subsection;

    if (options.loc && from == 2) {
      nav.setLoc(options.loc);
    }

    if (options.section && options.section == 'news' && options.subsection && options.subsection == 'top') {
      statlogsValueEvent('feed_switch', 0, 'top_news', from);
    }

    if (options.summary) {
      val('feed_summary', options.summary);
    }
    if (options.owner_name) {
      val(geByTag1('nobr', ge('feedtab_owner')), options.owner_name);
    }
    if (options.source_name) {
      val(geByTag1('nobr', ge('feedtab_source')), options.source_name);
    }
    if (options.htitle) {
      cur.feedInitialTitle = document.title = replaceEntities(stripHTML(options.htitle));
    }
    if (options.add_queue !== undefined && options.add_queue !== null) {
      if (from || true) {
        if (options.add_queue === true) {
          cur.add_queue = options.add_queue = false;
        }
      }
      feed.getNewQKey(0);
      if (options.add_queue !== true && (cur.add_queue = options.add_queue)) {
        setTimeout(feed.update.pbind(0), 0);
      }
    } else if (from && cur.section != 'search' && cur.section != 'news' && cur.section) {
      cur.add_queue = false;
    }
    if (options.q) {
      val('feed_search', replaceEntities(options.q));
      var query = options.q;
      if (query.length > 30) {
        query = trim(query.substr(0, 30)) + '...';
      }
    }
    if (options.last_view) cur.options.last_view = options.last_view;
    Feed.searchUpdate();
    if (cur.section == 'comments' && !cur.reposts) {
      toggle('comments_filters', !cur.reposts);
    }
    if (cur.all_shown_text) {
      val('all_shown', cur.all_shown_text);
    }
    if (cur.empty_text) {
      val('feed_empty', cur.empty_text);
    }
    if (cur.percent !== undefined && cur.percent !== null) {
      feed.sliderUpdate(cur.percent, true);
      delete cur.percent;
    }
    if (cur.count >= 0) {
      re('feed_error_wrap');
    }
    var hasNews = geByClass1('feed_row', cur.rowsCont, 'div') || false,
        isEmpty = !hasNews,
        nextRows = ge('feed_rows_next');

    if (isEmpty) {
      toggle('feed_empty', !isVisible('feed_error_wrap'));
      hide('all_shown');
      toggle('show_more_link', cur.count > 0 && !cur.all_shown);
    } else if (cur.all_shown && (!nextRows || !nextRows.firstChild)) {
      hide('feed_empty', 'show_more_link');
      show('all_shown');
      re(nextRows);
    } else {
      hide('feed_empty', 'all_shown');
      show('show_more_link');
    }

    if (options.plb_tpl) {
      cur.plb_tpl = options.plb_tpl;
    }

    if (options.plb_item_tpl) {
      cur.plb_item_tpl = options.plb_item_tpl;
    }

    if (options.playlistsData && window.Videocat) {
      options.playlistsData = JSON.parse(options.playlistsData);
      Videocat.addList(options.playlistsData);
    }

    if (options.showVideoTabHint) {
      stManager.add(['ui_controls.js', 'ui_controls.css'], function() {
        var videoTabEl = geByClass1('feed_tab_videos');
        if (videoTabEl && isVisible(videoTabEl)) {
          ajax.post('al_feed.php', {act:'a_vhint_shown'});
          cur.feedVideoTabHintEl = new ElementTooltip(videoTabEl, {
            showImmediate: true,
            content: options.showVideoTabHint,
            offset: [0, -4],
            noHideOnMouseLeave: true,
            onHide: function() {
              setTimeout(function() {
                cur.feedVideoTabHintEl.destroy();
              }, 100);
            }
          });
        }
      });
    }

    if (options.showSubsectionTopHint) {
      stManager.add(['ui_controls.js', 'ui_controls.css'], function() {
        var feedSummary = ge('feed_summary');
        if (!feedSummary) return;

        var feedTopLinkEl = geByClass1('feed_summary_top', feedSummary);
        cur.feedTopHintEl = new ElementTooltip(feedTopLinkEl, {
          showImmediate: true,
          content: options.showSubsectionTopHint,
          offset: [4, 2],
          noHideOnMouseLeave: true,
          onHide: function() {
            setTimeout(function() {
              cur.feedTopHintEl.destroy();
            }, 100);
          }
        });

        cur.closeFeedTopHint = function() {
          cur.feedTopHintEl.destroy();
          delete cur.feedTopHintEl;
          delete cur.closeFeedTopHint;
          statlogsValueEvent('newsfeed_tooltip_close', 1, 'usetop');
        };
      });
    }

    if ((cur.section == 'notifications' || cur.section == 'replies') && cur.notify) {
      var el = ge('feedback_row_' + cur.notify);
      if (el) {
        setTimeout(function () {el.onclick()}, browser.msie ? 100 : 0);
        delete cur.notify;
      }
    }
    Feed.applyUi();
  },
  closeVideoTabHint: function() {
    if (cur.feedVideoTabHintEl) {
      cur.feedVideoTabHintEl.hide();
    }
  },
  showMore: function() {
    if (cur.isFeedLoading) return;
    cur.disableAutoMore = false;
    var nextRows = ge('feed_rows_next');
    if (nextRows) {
      if (nextRows.firstChild) {
        while (nextRows.firstChild) {
          cur.rowsCont.insertBefore(nextRows.firstChild, nextRows);
        }
      }
      re(nextRows);
    }
    if (cur.all_shown) {
      hide('show_more_link');
      show('all_shown');
    }
    hide('show_more');
    show('show_more_progress');
    var escPressed = false;
    var tmp = function (e) { if (e.keyCode == KEY.ESC) { escPressed = true; } };
    addEvent(document, 'keyup', tmp);
    var params = feed.getSectionParams(cur.section || 'news');
    extend(params, {offset: cur.offset, from: cur.from, part: 1, more: 1, last_view: ge('feedback_unread_bar') ? 1 : cur.options.last_view});
    var section = cur.section;
    ajax.post('al_feed.php?sm_' + cur.section, params, {
      onDone: function (options, rows) {
        removeEvent(document, 'keyup', tmp);
        if (section != cur.section) return;
        if (escPressed) {
          show('show_more');
          hide('show_more_progress');
          cur.disableAutoMore = true;
          return;
        }
        if (rows) {
          var au = ce('div'), row;
          au.innerHTML = rows;
          while (row = au.firstChild) {
            if (!row.firstChild || !row.firstChild.id || ge(row.firstChild.id)) {
              if (row.id != 'feedback_unread_bar' && row.className != 'feed_row_fb_hidden') {
                au.removeChild(row);
                continue;
              }
            }
            cur.rowsCont.appendChild(row);
          }
        }
        shortCurrency();
        show('show_more');
        hide('show_more_progress');
        feed.applyOptions(options);
        setTimeout(feed.scrollCheck, 200);
      },
      showProgress: function () {
        cur.isFeedLoading = true;
      },
      hideProgress: function () {
        cur.isFeedLoading = false;
      },
      cache: 1
    });
  },
  getTypesSection: function () {
    switch (cur.section) {
      case 'owner':
        return (cur.owner > 0 ? 'person' : 'group');

      default:
        return cur.section;
    }
  },
  checkTabsFilter: function (option, option_id) {
    switch (option) {
      case 'news': return false;
      case 'newlist': return Feed.addList();
      default:
        if (listMatches = option.match(/list(\d+)/)) {
          return Feed.editList(listMatches[1]);
        }
    }

    var cont = ge('tabs_type_filter'),
        filter_row = ge('filter_' + option_id),
        my_types = cur.my_feed_types.tabs,
        types = cur.feed_types.tabs,
        found, pos, listMatches;

    found = (pos = indexOf(my_types, option)) != -1;
    toggleClass(filter_row, 'checked', !found);
    if (found) {
      my_types.splice(pos, 1);
      if (cur.section == option) {
        feed.switchSection('news');
      }
    } else {
      my_types.push(option);
    }

    cur.my_feed_types.tabs = my_types;
    var tabEl = geByClass1('feed_tab_' + option, ge('feed_news_bar'))
        tabLink = geByTag1('a', tabEl),
        vis = isVisible(tabEl);
    toggleClass(tabEl, 'feed_tab_hidden', found);
    var onComplete = function () {
      tabLink.style.backgroundColor = '';
    };
    if (!vis && !found) {
      setStyle(tabLink, {backgroundColor: '#E1E7ED'});
      animate(tabLink, {backgroundColor: '#F7F7F7'}, 1000, onComplete);
      tabLink.oncompleteTO = setTimeout(onComplete, 1000);
    } else {
      onComplete();
    }
    clearTimeout(cur.saveTabsTO);
    cur.saveTabsTO = setTimeout(Feed.saveTabs, 500);
  },
  checkFilter: function(option, option_id) {
    var typesSection = feed.getTypesSection(),
        cont = ge(typesSection + '_type_filter'),
        filter_row = ge('filter_' + option_id),
        my_types = cur.my_feed_types[typesSection],
        types = cur.feed_types[typesSection],
        found, pos;

    if (my_types === true) {
      my_types = clone(cur.feed_types[typesSection]);
    }
    found = (pos = indexOf(my_types, option)) != -1;
    if (found) {
      my_types.splice(pos, 1);
      removeClass(filter_row, 'checked');
    } else {
      my_types.push(option);
      if (my_types.length == types.length) {
        my_types = true;
      }
      addClass(filter_row, 'checked');
    }

    cur.my_feed_types[typesSection] = my_types;
    feed.updateTypesCookie();
    feed.switchSection(cur.section);
  },
  setFilter: function (option, option_id) {
    var typesSection = feed.getTypesSection(),
        cont = ge(typesSection + '_type_filter'),
        filter_row = ge('filter_' + option_id),
        my_types = cur.my_feed_types[typesSection],
        types = cur.feed_types[typesSection],
        pos,
        all_unchecked = true;

    each (geByClass('checked', cont, 'div'), function () {
      if (this != filter_row) return (all_unchecked = false);
    });
    if (all_unchecked) {
      cur.my_feed_types[typesSection] = true;
      each(geByClass('feed_filter_row', cont, 'div'), function () {
        addClass(this, 'checked');
      });
    } else {
      each([].slice.apply(geByClass('checked', cont, 'div')), function () {
        removeClass(this, 'checked');
      });
      cur.my_feed_types[typesSection] = [option];
      addClass(filter_row, 'checked');
    }

    feed.updateTypesCookie();
    feed.switchSection(cur.section);
  },
  updateTypesCookie: function () {
    var new_cookie = [];
    each(cur.my_feed_types, function (section, types) {
      if (section == 'tabs') return;
      new_cookie.push(
        types === true ? '*' : types.join(',')
      );
    });
    setCookie('remixfeed', new_cookie.join('.'), 365);
  },
  flistToggleReposts: function (value, hash) {
    ajax.post('al_feed.php', {act: 'a_toggle_reposts', value: value, hash: hash}, {
      onDone: function () {
        feed.getNewQKey(0);
      }
    });
  },
  switchPhotos: function (loc, el, event) {
    if (wall.checkPostClick(el, event)) {
      return nav.go(loc, event);
    }
  },
  switchOwner: function (owner_id, owner_name, el, event) {
    if (el && event && !wall.checkPostClick(el, event)) return;
    var ownerLabel = geByTag1('nobr', ge('feedtab_owner')),
        loadCb = inArray(cur.section, ['comments', 'photos']) ? false : feed.onLocalTabLoad;
    val(ownerLabel, owner_name);
    cur.owner = owner_id;
    feed.setSection('owner', 1);
    feed.go(feed.getSectionParams(cur.section), loadCb);
  },
  switchSearch: function () {

    if (cur.section == 'vk2016') {
      re('feed_vk2016_hashtags');
    }

    Feed.setSection('search', 4);
    Feed.searchToggleExtended(true);
    Feed.searchToggleHotHashtags(true);
    setTimeout(elfocus.pbind('feed_search'), 10);
    statlogsValueEvent('feed_switch', 0, 'search');
  },
  switchList: function (list_id) {
    cur.prevList = cur.list;
    cur.list = list_id;
    feed.setSection('list', 1);
    feed.go(feed.getSectionParams(cur.section));
  },
  submitSearch: function (query, section) {
    if (query === undefined) {
      query = trim(val('feed_search'));
    } else {
      val('feed_search', query);
      Feed.searchUpdate();
    }
    var section = (section === undefined ? cur.section : section) || '',
        switchTo = 'search',
        switchToBad = 'news';
    if (!section.indexOf('articles')) {
      switchTo = 'articles_search';
      switchToBad = 'articles';
    } else if (!section.indexOf('photos')) {
      switchTo = 'photos_search';
      switchToBad = 'photos';
    }
    if (!query) {
      feed.switchSection(switchToBad);
      return;
    }
    toggle('feed_search_hashtags', section == 'search' && Feed.highlightHotHashtag(query));
    var loadCb = false; // inArray(cur.section, ['comments', 'photos', 'search', 'articles_search']) ? false : feed.onLocalTabLoad;
    feed.setSection(switchTo, 1);
    feed.go(feed.getSectionParams(cur.section), loadCb);
  },
  setSearchSort: function(value) {
    cur.search_sort_value = value;
    Feed.submitSearch();
  },
  onLocalTabLoad: function (content) {
    if (window.wall) wall.cancelEdit();
    var _back = cur._back, wNode = cur.rowsCont, cur_loc = hab.getLoc();
    var newW = ce('div', {id: 'feed_rows', innerHTML: content}), st = scrollGetY();
    cur._back_local = {
      content: wNode.parentNode.replaceChild(newW, wNode),
      section: cur.prevSection || cur.section || 'news',
      subsection: cur.subsection,
      percent: cur.percent,
      owner: cur.owner,
      source: cur.source,
      q: cur.q,
      reposts: cur.reposts,
      add_queue: cur.add_queue,
      loc: cur_loc,
      scrollTop: st,
      back: (window._tbLink && _tbLink.loc) ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : false,
      count: cur.count,
      offset: cur.offset,
      from: cur.from,
      timestamp: cur.timestamp,
      summary: cur.summary,
      all_shown: cur.all_shown,
      all_shown_text: cur.all_shown_text,
      empty_text: cur.empty_text,
      htitle: cur.feedInitialTitle
    };
    cur.rowsCont = newW;
    scrollToY(0, 0);
    showBackLink(cur._back_local.loc, getLang('news_return_to_news'), true);
  },
  returnToFeed: function (params, back) {
    if (!cur._back_local) {
      return true;
    }

    var hist = cur._back_local;
    if (params !== false) {
      var next_section = params.section || 'news';
      if (hist.section != next_section) {
        return true;
      }
    } else {
      params = {section: hist.section};
    }
    setTimeout(function() {
      cur._back_local = false;
      var _back = cur._back, wNode = cur.rowsCont;
      cur.rowsCont = wNode.parentNode.replaceChild(hist.content, wNode);
      feed.applyOptions({
        section: hist.section,
        subsection: hist.subsection,
        percent: hist.percent,
        owner: hist.owner,
        source: hist.source,
        q: hist.q,
        reposts: hist.reposts,
        add_queue: hist.add_queue,
        count: hist.count,
        offset: hist.offset,
        from: hist.from,
        timestamp: hist.timestamp,
        options: hist.options,
        all_shown: hist.all_shown,
        all_shown_text: hist.all_shown_text,
        empty_text: hist.empty_text,
        htitle: hist.htitle,
        summary: hist.summary
      }, 3);
      if (hist.back) {
        showBackLink(hist.back[0], hist.back[1], hist.back[2]);
      } else {
        showBackLink(false);
      }
      nav.setLoc(hist.loc);
      if (back) {
        scrollToY(hist.scrollTop, 0);
      } else {
        scrollToY(0, 0);
        feed.go(params);
      }
    }, 10);
    return false;
  },

  updFeedbackUnreadBar: function() {
    var el = ge('feedback_unread_bar'), prev = domPS(el);
    prev = hasClass(prev, 'feed_row_fb_hidden') ? (isVisible(prev) ? domLC(prev) : domFC(domPS(prev))) : domFC(prev);
    if (el) toggleClass(el, 'feedback_after_clickable', !!(prev && hasClass(prev, 'feedback_row_clickable') && hasClass(prev, 'feedback_row_clickable_over')));
  },

  emojiOpts: {},
  emojiShowTT: function(item, obj, ev) {
    if (Feed.emojiOpts[item] === undefined) {
      return false;
    }
    return Emoji.ttShow(Feed.emojiOpts[item], obj, ev);
  },
  emojiHideTT: function(item, obj, ev) {
    if (Feed.emojiOpts[item] === undefined) {
      return false;
    }
    return Emoji.ttHide(Feed.emojiOpts[item], obj, ev);
  },
  showEmojiTT: function(item, obj, ev) {
    if (Feed.emojiOpts[item] === undefined) {
      return false;
    }
    return Emoji.ttClick(Feed.emojiOpts[item], obj, false, false, ev);
  },

  notifyInitEmoji: function(ta, item, opts) {
    if (!ta.emojiLoaded) {
      stManager.add(['emoji.js', 'notifier.css'], function() {
        var optId = Emoji.init(ta, {
          ttDiff: -48,
          rPointer: true,
          controlsCont: ta.parentNode,
          shouldFocus: true,
          onSend: function() {
            Feed.notifySendReply(item);
          },
          ctrlSend: function() {
            return cur.wallTpl.reply_multiline;
          },
          checkEditable: function() {
            //Wall.checkTextLen.pbind(txt, 'reply_warn'+post);
          },
          onStickerSend: function(stNum) {
            Feed.notifySendReply(item, stNum);
          }
        });
        Feed.emojiOpts[item] = optId;
        Emoji.val(ta, opts.greet.replace(/ $/, '&nbsp;'));
        setTimeout(Emoji.editableFocus.pbind(ta, false, true), 0);
      });
      ta.emojiLoaded = true;
    } else if (window.Emoji) {
      ta.innerHTML = opts.greet+'&nbsp;';
      setTimeout(Emoji.editableFocus.pbind(ta, false, true), 0);
    }
  },

  notifyShowEditReply: function (item, opts) {
    if (cur.editing && cur.notifyReplyData && cur.notifyReplyData[cur.editing].disabled) {
      feed.notifyCheckHideReply(cur.editing, (window.event || {}).target);
    }
    var replyWrap = ge(item + '_reply_wrap');
    if (replyWrap) {
      if (isVisible(replyWrap)) {
        feed.notifyCheckHideReply(item, false);
      } else {
        show(replyWrap);
        var pEl = domPN(ge('feedback_row_' + item));
        removeClass(pEl, 'feedback_row_clickable');
        Feed.updFeedbackUnreadBar();
        if (opts.disabled) {
          setTimeout(function() { cur.editing = item; }, 0);
        } else {
          var ta = ge(item + '_field');
          Feed.notifyInitEmoji(ta, item, opts);
        }
        feed.notifyRowOver(item, 0);
      }
      return;
    }

    var itemEl = ge('feedback_row_' + item), pEl = domPN(itemEl),
        acts = '',
        repl = {
          hint: opts.hint || '',
          bighint: opts.bighint || '',
          placeholder: opts.ph,
          submit: opts.btn,
          greeting: opts.greet,
          item: item
        };

    removeClass(pEl, 'feedback_row_clickable');
    Feed.updFeedbackUnreadBar();

    if (cur.notifyReplyData === undefined) {
      cur.notifyReplyData = {};
    }
    cur.notifyReplyData[item] = opts;
    if (opts.disabled) {
      itemEl.parentNode.appendChild(se(rs(cur.options.feedback_dis, {item: item, text: opts.disabled})));
      setTimeout(function() { cur.editing = item; }, 0);
    } else {
      itemEl.parentNode.appendChild(se(rs(cur.options.feedback_form, repl)));
      var ta = ge(item + '_field');
      Feed.notifyInitEmoji(ta, item, opts);
      ta.onfocus = function() {cur.editing = item};

      if (!data(ta, 'composer')) {
        var mediaTypes = [];
        each (cur.options.rmedia_types || cur.options.media_types || [], function () {
          if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'link', 'page'])) {
            mediaTypes.push(this);
          }
        });
        var media;
        if (mediaTypes.length > 0 && item.match(/^(topic_comment|video_comment|photo_comment|wall_reply|wall)-?\d+_\d+$/)) {
          media = {
            lnk: ge('reply_media_lnk' + item).firstChild,
            preview: ge('reply_media_preview' + item),
            types: mediaTypes,
            options: {limit: 2, disabledTypes: ['album'], toggleLnk: true}
          };
          if (item.match(/^topic_comment-?\d+/)) {
            extend(media.options, {
              disabledTypes: ['album', 'share', 'link', 'page'],
              limit: 10,
              editable: 1,
              sortable: 1,
              teWidth: 280,
              teHeight: 200
            });
          }
        } else {
          re('reply_media_lnk' + item);
        }
        Wall.initComposer(ta, {
          lang: {
            introText: getLang('profile_mention_start_typing'),
            noResult: getLang('profile_mention_not_found')
          },
          wddClass: 'reply_composer_dd',
          width: getSize(ta.parentNode)[0],
          media: media
        });
      }
    }
    feed.notifyRowOver(item, 0);
  },
  onNotifyReplySubmit: function (item, e) {
    var rf = ge(item + '_field');
    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      var composer = data(rf, 'composer'),
          isListVisible = composer && composer.wdd && composer.wdd.listWrap && isVisible(composer.wdd.listWrap);

      if (cur.wallTpl.reply_multiline && (e.ctrlKey || browser.mac && e.metaKey) ||
          !cur.wallTpl.reply_multiline && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey) && !isListVisible) {
        feed.notifySendReply(item);
        return cancelEvent(e);
      }
    }
    if (e.ctrlKey && e.keyCode == KEY.RETURN) {
      var v = Emoji.editableVal(rf),
          pos = Composer.getCursorPosition(rf);

      Emoji.val(rf, v.substr(0, pos) + "\n" + v.substr(pos));
      Emoji.editableFocus(rf, false, true);

      return cancelEvent(e);
    }
  },
  notifySendReply: function (item, stickerNum) {
    var opts = cur.notifyReplyData[item];
    if (!opts || opts.sending) return;

    var ta = ge(item + '_field'),
        btn = ge(item + '_btn'),
        composer = ta && data(ta, 'composer'), state;

    if (stickerNum) {
      var params = {message: '', attach1_type: "sticker", attach1: stickerNum};
    } else {
      var params = composer ? Composer.getSendParams(composer, feed.notifySendReply.pbind(item)) : {message: trim(val(ta))};
    }

    params = extend({
      act: 'post',
      from: 'feedback',
      item: item
    }, params);
    extend(params, opts.params || {});
    if (!params.attach1_type) {
      if (!params.message || opts.greet && !opts.greet.indexOf(params.message)) {
        notaBene(ta);
        return;
      }
    }
    opts.sending = 1;
    ajax.post('al_wall.php', params, {
      onDone: function (text, answer) {
        delete opts.sending;
        if (composer) {
          Composer.reset(composer);
        }
        feed.notifyHideReply(item);
        if (answer) {
          var answerWrap = ge(item + '_answer_wrap');
          val(answerWrap, answer);
          show(answerWrap);
        } else if (text) {
          showDoneBox(text);
        }
      },
      onFail: function () {
        delete opts.sending;
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  notifyCheckHideReply: function (item, target) {
    var opts = cur.notifyReplyData[item],
        toggled = target === false;
    if (!opts || opts.sending || !isVisible(item + '_reply_wrap')) return;

    var i = 8, foundGood = false;
    do {
      if (!target || (foundGood = (target.id == (item + '_reply_wrap') || target.id == ('feedback_row_' + item) || hasClass(target, 'emoji_block_cont')))) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (foundGood) {
      return;
    }
    cur.editing = false;
    if (!opts.disabled) {
      var ta = ge(item + '_field'), msg = trim(Emoji.editableVal(ta)),
          composer = data(ta, 'composer'),
          addmedia = composer ? composer.addMedia || {} : {},
          empty = true;
      each (addmedia.chosenMedias || [], function (k, v) {
        if (v) {
          empty = false;
          return false;
        }
      });

      if (msg && !opts.greet || opts.greet.indexOf(msg) || !empty) {
        return;
      }
    }
    feed.notifyHideReply(item, toggled);
  },
  notifyHideReply: function (item, toggled) {
    if (cur.editing == item) {
      cur.editing = false;
    }
    var pEl = domPN(ge('feedback_row_' + item));
    addClass(pEl, 'feedback_row_clickable');
    Feed.updFeedbackUnreadBar();
    hide(item + '_reply_wrap');
    if (toggled) {
      feed.notifyRowOver(item, 1);
    }
  },

  notifyRowOver: function (item, state) {
    var el = ge('feedback_row_' + item).parentNode,
        prevRow = el.parentNode.previousSibling,
        over = 2,
        likeEl;

    while (prevRow && prevRow.nodeType == 3) { // skipping text nodes
      prevRow = prevRow.previousSibling;
    }

    if (state && hasClass(el, 'feedback_row_clickable')) {
      if (prevRow && prevRow.className == 'feed_row' && isVisible(geByClass1('feedback_reply_row_wrap', prevRow, 'div'))) {
        over = 2;
      } else if (!prevRow) {
        over = 3;
      } else if (prevRow.id == 'feedback_unread_bar') {
        over = 4;
      }
      addClass(el, 'feedback_row_clickable_over' + over);
      addClass(el, 'feedback_row_clickable_over');
    } else {
      removeClass(el, 'feedback_row_clickable_over1');
      removeClass(el, 'feedback_row_clickable_over2');
      removeClass(el, 'feedback_row_clickable_over3');
      removeClass(el, 'feedback_row_clickable_over4');
      removeClass(el, 'feedback_row_clickable_over');
      if (likeEl = geByTag1('div', geByClass1('like_wrap', ge(el), 'div'))) {
        var to = data(likeEl, 'likeoutTO'), tween = data(likeEl, 'tween');
        to && clearTimeout(to);
        tween && tween.stop(true);
        setStyle(likeEl, {display: '', opacity: ''});
      }
    }
    Feed.updFeedbackUnreadBar();
  },
  expandAppend: function(item, cont, data, right, onlyClient) {
    var langs = ['', val('fbgr_' + item + '_1'), val('fbgr_' + item + '_2')];
    if (data.date) {
      if (ge('feedback_grouped_' + item + '_' + data.mid)) {
        val(geByClass1('feedback_row_date', ge('feedback_grouped_' + item + '_' + data.mid)), data.date);
        return;
      }
      if (ge('feedback_grouped_' + item).getAttribute('data-mid') == data.mid) {
        return;
      }
    }
    if (onlyClient) return;
    var cl = (geByClass1('feedback_grouped_row', ge('feedback_grouped_' + item)) || {}).className || 'feedback_grouped_row';
    cont.appendChild(domFC(ce('div', {innerHTML: '\
<div class="feedback_grouped_row_wrap" id="feedback_grouped_' + item + '_' + data.mid + '" data-mid="' + data.mid + '" data-sex="' + data.sex + '"' + (data.date ? '' : ' data-auto="1"') + '>\
  <div class="' + cl + '">\
    <table class="feedback_row_t" cellpadding="0" cellspacing="0">\
      <tr>\
        <td class="feedback_row_photo">\
          <div class="feedback_row_photo" onclick="event.cancelBubble = true;">\
            <a class="feedback_row_photo_lnk" href="' + data.href + '" onclick="return nav.go(this, event);">\
              <div class="feedback_photo_icon"></div>\
              <img class="feedback_row_photo" src="' + data.img + '" />\
            </a>\
          </div>\
        </td>\
        <td class="feedback_row_content">\
          <div class="feedback_row_group_names">' + langSex(data.sex, langs).replace('{names}', data.lnk) + '</div>\
          <div class="feedback_row_group_photos clear_fix"></div>\
          <div class="feedback_row_date">' + (data.date || '&nbsp;') + '</div>\
        </td>\
        ' + right + '\
      </tr>\
    </table>\
  </div>\
</div>'})));
  },
  expanded: function(item, data, onlyClient) {
    var el = ge('feedback_grouped_' + item);
    if (!el) return;

    var phs = geByClass1('feedback_row_group_photos', el), tmp = ce('div');
    if (domFC(phs)) return;

    var exp = domNS(domPN(el));
    if (!hasClass(exp, 'feed_row_fb_expanded')) return;

    var cls = geByClass1('feedback_row_t', el).rows[0].cells,
        right = (cls.length > 2) ? '<td class="' + cls[2].className + '">' + val(cls[2]) + '</td>' : '';
    for (var i in data) {
      feed.expandAppend(item, exp, data[i], right, onlyClient);
    }
    Feed.updFeedbackUnreadBar();
  },
  expand: function(ev, item) {
    ev = ev || window.event;
    if (checkEvent(ev) || ev && ev.target && hasClass(ev.target, 'mem_link')) return;

    var el = ge('feedback_grouped_' + item);
    if (!el) return;

    var phs = geByClass1('feedback_row_group_photos', el), tmp = ce('div'), thumbs = !!domFC(phs);
    if (thumbs) {
      var exp = ce('div', {className: 'feed_row_fb_expanded'}),
          langs = ['', val('fbgr_' + item + '_1'), val('fbgr_' + item + '_2')],
          cls = geByClass1('feedback_row_t', el).rows[0].cells,
          right = (cls.length > 2) ? '<td class="' + cls[2].className + '">' + val(cls[2]) + '</td>' : '';
      domPN(domPN(el)).insertBefore(exp, domNS(domPN(el)));
      for (var e = domFC(phs); e; e = domFC(phs)) {
        if (hasClass(e, 'feedback_group_photo_wrap')) {
          var mid = e.getAttribute('data-mid'),
              sex = e.getAttribute('data-sex'),
              a = geByClass1('feedback_group_photo', e),
              name = (a || {}).title || 'DELETED',
              href = (a || {}).href || '/',
              lnk = '<a href="' + href + '" class="mem_link">' + replaceEntities(name) + '</a>',
              img = (domFC(a) || {}).src || '/images/camera_c.gif';
          feed.expandAppend(item, exp, {mid: mid, sex: sex, href: href, img: img, lnk: lnk}, right);
        }
        re(e);
      }
      ajax.post('al_feed.php', {act: 'expand', item: item}, {onDone: feed.expanded.pbind(item), cache: 1});
    } else {
      var exp = domNS(domPN(el));
      if (!hasClass(exp, 'feed_row_fb_expanded')) return;
      for (var e = domFC(exp); e; e = domFC(exp)) {
        if (hasClass(e, 'feedback_grouped_row_wrap') && e.getAttribute('data-auto')) {
          var name = geByClass1('mem_link', e) || {};
          phs.appendChild(domFC(ce('div', {innerHTML: '\
<div class="feedback_group_photo_wrap fl_l" data-mid="' + e.getAttribute('data-mid') + '" data-sex="' + e.getAttribute('data-sex') + '">\
  <a href="' + name.href + '" class="feedback_group_photo" title="' + replaceEntities(val(name)) + '"><img src="' + ((geByClass1('feedback_row_photo', geByClass1('feedback_row_photo_lnk', e)) || {}).src || '/images/camera_c.gif') + '" class="feedback_group_photo" /></a>\
</div>'})));
        }
        re(e);
      }
      re(exp);
    }
    Feed.updFeedbackUnreadBar();
    toggleClass(geByClass1('feedback_expand', el), 'feedback_expanded', thumbs);
    var names = geByClass1('feedback_row_group_names', el), tmp = val(names),
        name = ge('fbgr_' + item + '_this');
    val(names, val(name));
    val(name, tmp);

    return cancelEvent(ev);
  },
  ungroup: function(ev, item) {
    ev = ev || window.event;
    if (checkEvent(ev) || ev && ev.target && hasClass(ev.target, 'mem_link')) return;

    var el = ge('feedback_grouped_' + item + '_wrap');
    if (!el) return;

    var hid = domNS(domPN(el)),
        names = geByClass1('feedback_row_group_names', el), tmp = val(names),
        name = ge('fbgr_' + item + '_that');
    toggle(hid);
    toggleClass(geByClass1('feedback_expand', el), 'feedback_expanded', isVisible(hid));
    val(names, val(name));
    val(name, tmp);

    Feed.updFeedbackUnreadBar();
  },

  notifyPostTooltip: function(el, post, opts) {
    var reply = (opts || {}).reply, url = 'al_wall.php';

    if (!post.indexOf('topic_comment')) {
      url = 'al_board.php';
      post = post.replace('topic_comment', '');
    } else {
      post = post.replace('wall_reply', '').replace('wall', '');
    }

    showTooltip(el, {
      url: url,
      params: extend({act: 'post_tt', post: post, self: 1, from: 'feedback'}, opts || {}),
      slide: 15,
      shift: [35, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich wall_tt'
    });
  },
  notifyDeleteOver: function(item, el, label) {
    if (label) showTooltip(el, {text: label});
    wall && wall._animDelX(1, item);
  },
  notifyDeleteOut: function (item) {
    wall && wall._animDelX(0.6, item);
  },
  notifyDelete: function (item, types, hash, el, canDel) {
    el.tt && el.tt.el && el.tt.hide();
    ajax.post('al_feed.php', {act: 'a_feedback_delete', item: item, hash: hash, types: types, candel: canDel}, {
      onDone: function (html) {
        feed.notifyHideReply(item);
        var row = ge('feedback_row_' + item).parentNode;
        row.parentNode.replaceChild(se(html), row);
        cur.feedEntriesHTML['fb_' + item] = row;
      }
    })
  },
  notifyUndelete: function (item, types, hash) {
    ajax.post('al_feed.php', {act: 'a_feedback_undelete', item: item, hash: hash, types: types}, {
      onDone: function (text) {
        var row = ge('feedback_row_' + item);
        row.parentNode.replaceChild(cur.feedEntriesHTML['fb_' + item], row);
        delete cur.feedEntriesHTML['fb_' + item];
      }
    })
  },
  notifyMarkSpam: function (item, types, hash) {
    ajax.post('al_feed.php', {act: 'a_feedback_mark_spam', item: item, hash: hash, types: types}, {
      onDone: function (html) {
        ge('notify_mark_spam_' + item).innerHTML = html;
      }
    })
  },
  notifyDeleteAll: function (uid, hash, btn, item) {
    ajax.post('al_feed.php', {act: 'a_feedback_delete_all', uid: uid, item: item, hash: hash}, {
      onDone: function (text) {
        showDoneBox(text);
        var rows = cur.rowsCont, row;
        if (rows && (row = rows.firstChild)) {
          var startY = false,
              st = scrollGetY(),
              h, y;
          do {
            if (row.className &&
                hasClass(row, 'feed_row') &&
                row.firstChild &&
                uid == row.firstChild.getAttribute('author')) {
              h = row.offsetHeight;
              y = row.offsetTop;
              if (startY === false) {
                startY = getXY(row.offsetParent)[1]
              }
              hide(row);
              if (y + startY < st) {
                st -= h;
                scrollToY(st, 0);
              }
            }
          } while (row = row.nextSibling);

          if (cur.wasScroll === 0 || cur.wasScroll > 0) {
            cur.wasScroll = st;
          }
          feed.scrollCheck();
        }
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    })
  },


  ignoreItem: function (post_raw, feed_raw, hash) {
    var adData = ge('post' + post_raw).getAttribute('data-ad');
    triggerEvent(ge('post_delete' + post_raw), 'mouseout');
    revertLastInlineVideo('post' + post_raw);
    cur.feedEntriesHTML[post_raw] = val('post' + post_raw);
    ajax.post('/al_feed.php?misc', {act: 'a_ignore_item', post_raw: post_raw, feed_raw: feed_raw, hash: hash, ad_data: adData}, {
      onDone: function (html, js) {
        val('post' + post_raw, html);
        eval(js);
      },
      stat: ['privacy.js', 'privacy.css']
    });
  },
  unignoreItem: function (post_raw, feed_raw, hash) {
    ajax.post('/al_feed.php?misc', {act: 'a_unignore_item', post_raw: post_raw, feed_raw: feed_raw, hash: hash}, {
      onDone: function () {
        feed.restorePost(post_raw);
      }
    });
  },
  reportIgnoredItem: function (post, hash) {
    ajax.post('al_wall.php', {act: 'spam', post: post, hash: hash}, {
      onDone: function(msg) {
        var r = ge('post' + post), label = r && geByClass1('feed_post_report', r, 'div');
        val(label, msg);
      }
    });
  },
  ignoreOwner: function (post_raw, owner_id, hash, btn) {
    if (post_raw) {
      cur.feedEntriesHTML[post_raw + '_ignored'] = val('post' + post_raw);
    }
    ajax.post('/al_feed.php?misc', {act: 'a_ignore_owner', post_raw: post_raw, owner_id: owner_id, hash: hash, list: cur.section == 'list' && cur.list || 0}, {
      onDone:function(html) {
        val('post' + post_raw, html);
        each(geByClass('post', cur.rowsCont), function(i,v) {
          var ids = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
          if (ids[1] != post_raw && (!ids[4] && ids[2] == owner_id || ids[4] && ids[3] == owner_id)) {
            revertLastInlineVideo(this);
            hide(this.parentNode);
          }
        });
      },
      showProgress: btn && lockButton.pbind(btn),
      hideProgress: btn && unlockButton.pbind(btn)
    });
  },
  unignoreOwner: function (post_raw, owner_id, hash) {
    ajax.post('/al_feed.php?misc', {act: 'a_unignore_owner', post_raw: post_raw || '', owner_id: owner_id, hash: hash, list: cur.section == 'list' && cur.list || 0}, {
      onDone:function(html) {
        if (post_raw) {
          val('post' + post_raw, cur.feedEntriesHTML[post_raw + '_ignored']);
        } else {
          val('ignore_row' + owner_id, html);
        }
        each(geByClass('post', cur.rowsCont), function(i,v) {
          var ids = this.id.match(/post((-?\d+)_(-?\d+)(_\d+)?)/);
          if (!ids[4] && ids[2] == owner_id || ids[4] && ids[3] == owner_id) {
            show(this.parentNode);
          }
        });
      }
    });
  },
  unsubscribe: function (post_raw, hash) {
    triggerEvent(ge('post_delete' + post_raw), 'mouseout');
    cur.feedEntriesHTML[post_raw] = ge('post' + post_raw).innerHTML;
    var matches = post_raw.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
    if (!matches) return;
    ajax.post('al_feed.php', {act: 'unsubscribe', type: {'': 24, photo: 21, video: 22, topic: 20, note: 23, market: 25}[matches[2]], owner_id: matches[1], place_id: matches[3], hash: hash, feed: 1}, {
      onDone: function(html) { ge('post' + post_raw).innerHTML = html.replace('%post_raw%', post_raw); }
    });
  },
  subscribe: function (post_raw, hash) {
    var matches = post_raw.match(/(\-?\d+)_(photo|video|topic|note|market|)(\d+)/);
    if (!matches) return;
    ajax.post('al_feed.php', {act: 'subscribe', type: {'': 24, photo: 21, video: 22, topic: 20, note: 23, market: 25}[matches[2]], owner_id: matches[1], place_id: matches[3], hash: hash, feed: 1}, {
      onDone: feed.restorePost.pbind(post_raw)
    });
  },
  restorePost: function (post_raw) {
    ge('post' + post_raw).innerHTML = cur.feedEntriesHTML[post_raw];
    var ph_back = geByClass1('input_back', ge('post' + post_raw), 'div');
    var ta = geByTag1('textarea', ge('post' + post_raw));
    if (!ta) return;
    ta.placeholder = ph_back.innerHTML;
    ph_back.parentNode.removeChild(ph_back);
    placeholderSetup(ta);
  },
  toggleReposts: function (place, rand, e) {
    if (checkEvent(e)) return true;

    var lnk = ge('feed_reposts_more' + place + '_' + rand),
        cont = ge('feed_reposts' + place + '_' + rand),
        h = 0,
        st = scrollGetY(),
        vis = isVisible(cont);
    if (!cont) {
      lnk && re(lnk.parentNode.parentNode);
      return;
    }

    if (vis) {
      h -= cont.offsetHeight;
    } else {
      (domPN(domPN(cont)) || {}).bits = 0;
    }
    toggle(cont, !vis);
    val(lnk, !vis ? getLang('news_hide_reposts') : getLang('news_show_X_reposts', cont.childNodes.length));
    if (h) {
      scrollToY(st + h, 0);
    }
    return false;
  },

  sliderScaleClick: function (e) {
    if (checkEvent(e)) return;
    var slider = ge('feed_rate_slider'),
        scale = slider.parentNode,
        maxX = (scale.clientWidth || 100) - slider.offsetWidth,
        margin = Math.max(0, Math.min(maxX, (e.offsetX || e.layerX) - slider.offsetWidth / 2)),
        percent = margin / maxX * 100;

    setStyle('feed_rate_slider', 'marginLeft', margin);
    feed.sliderUpdate(percent);
    feed.sliderClick(e);
  },
  sliderClick: function (e) {
    if (checkEvent(e)) return;
    e.cancelBubble = true;

    var startX = e.clientX || e.pageX,
        slider = ge('feed_rate_slider'),
        scale = slider.parentNode,
        startMargin = slider.offsetLeft || 0,
        maxX = (scale.clientWidth || 100) - slider.offsetWidth,
        selectEvent = 'mousedown selectstart',
        defPercent = intval(cur.default_percent),
        margin, percent;

    var _temp = function (e) {
      margin = Math.max(0, Math.min(maxX, startMargin + (e.clientX || e.pageX)- startX));
      percent = margin / maxX * 100;

      if (Math.abs(percent - 100) < 8) {
        percent = 100;
      }
      if (defPercent > 0 && Math.abs(percent - defPercent) < 3) {
        percent = defPercent;
      }
      percent = intval(percent);
      margin = maxX * percent / 100;
      slider.style.marginLeft = margin + 'px';
      feed.sliderUpdate(percent);
      return cancelEvent(e);
    }, _temp2 = function () {
      removeEvent(document, 'mousemove', _temp);
      removeEvent(document, 'mouseup', _temp2);
      removeEvent(document, selectEvent, cancelEvent);
      setStyle(bodyNode, 'cursor', '');
      setStyle(scale, 'cursor', '');
      feed.sliderApply();
    };

    addEvent(document, 'mousemove', _temp);
    addEvent(document, 'mouseup', _temp2);
    addEvent(document, selectEvent, cancelEvent);
    setStyle(bodyNode, 'cursor', 'pointer');
    setStyle(scale, 'cursor', 'pointer');
    return false;
  },
  sliderSelectChanged: function (e) {
    var percent = ge(cur.section == 'articles' ? 'feed_period_select' : 'feed_rate_select').value;
    feed.sliderUpdate(percent);
    feed.sliderApply();
  },
  sliderUpdate: function (percent, upd) {
    percent = intval(percent);
    switch (cur.section) {
      case 'articles':
      case 'articles_search':
        cur.periodPercent = percent;
        var label = getLang('news_top_no_articles');
        each (cur.top_periods, function (p, key) {
          if (percent < p) {
            return false;
          }
          label = key;
        });
        val('feed_rate_slider_label', label);
        break;
    }
    if (upd) {
      if (isVisible('feed_rate_slider_wrap')) {
        var slider = ge('feed_rate_slider'),
            maxX = (slider.parentNode.clientWidth || 100) - slider.offsetWidth;
        setStyle('feed_rate_slider', 'marginLeft', maxX * percent / 100);
      }
      var wasSelected = false, select = ge('feed_period_select');
      each(select && select.childNodes || [], function () {
        if (this.tagName != 'OPTION') return;
        if (wasSelected === false && this.value >= percent) {
          this.setAttribute('selected', 'selected');
          select.value = this.value;
          wasSelected = true;
        } else {
          removeAttr(this, 'selected');
        }
      });
    }
  },
  sliderApply: function () {
    if (!cur.section.indexOf('articles')) {
      feed.switchSection(cur.section);
      return;
    }
  },
  sliderShowProgress: function () {
    addClass('feed_rate_slider_wrap', 'feed_rate_wait');
  },
  sliderHideProgress: function () {
    removeClass('feed_rate_slider_wrap', 'feed_rate_wait');
  },

  editHidden: function () {
    showTabbedBox('al_settings.php', {act: 'a_edit_owners_list', list: 'feed', height: lastWindowHeight}, {stat: ['privacy.js', 'privacy.css', 'ui_controls.js', 'ui_controls.css', 'indexer.js'], dark: 1});
    cur.onOListSave = feed.onHiddenSave;
    return false;
  },
  onHiddenSave: function (white, black, list, options) {
    var box = curBox(), params = {act: 'a_ignore_olist', hash: options.hash};
    if (white.length < black.length) {
      params.White = white.join(',');
    } else {
      params.Black = black.join(',');
    }
    ajax.post('al_feed.php', params, {
      onDone: function(control, rules) {
        box.hide();
        feed.switchSection(cur.section == 'photos' ? 'photos' : 'news');
      },
      showProgress: box.showProgress,
      hiderogress: box.hideProgress
    });
    return false;
  },

  addList: function () {
    Feed.toggleTabsMenu(0);
    showTabbedBox('al_settings.php', {act: 'a_edit_owners_list', list: 'feed', list_id: -1, height: lastWindowHeight}, {
      stat: ['privacy.js', 'privacy.css', 'ui_controls.js', 'ui_controls.css', 'indexer.js'],
      dark: 1,
      onFail: function (text) {
        setTimeout(showFastBox({title: getLang('global_error'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, text, getLang('global_close')).hide, 4500);
        return true;
      }
    });
    cur.onOListSave = feed.onListSave.pbind(-1);
    return false;
  },
  editList: function (list_id) {
    Feed.toggleTabsMenu(0);
    showTabbedBox('al_settings.php', {act: 'a_edit_owners_list', list: 'feed', list_id: list_id, height: lastWindowHeight}, {stat: ['privacy.js', 'privacy.css', 'ui_controls.js', 'ui_controls.css', 'indexer.js'], dark: 1});
    cur.onOListSave = feed.onListSave.pbind(list_id);
    return false;
  },
  onListSave: function (list_id, white, black, list, options) {
    var listName = val('feed_list_name');
    if (!trim(listName)) {
      notaBene('feed_list_name');
      return false;
    }
    if (!white.length) {
      return false;
    }
    var box = curBox();
    ajax.post('al_feed.php', {
      act: 'a_save_list',
      hash: cur.tabs_hash,
      White: white.join(','),
      title: listName,
      list_id: list_id,
      no_reposts: ge('feed_list_reposts') && !isChecked('feed_list_reposts') ? 1 : 0
    }, {
      onDone: function(new_list_id) {
        var topTab = geByClass1('feed_tab_list' + list_id, ge('feed_news_bar')),
            filterTab = ge('filter_t_list' + list_id);
        val(geByTag1('nobr', topTab), clean(listName));
        val(geByClass1('feed_filter_tabs_title', filterTab), clean(listName));
        box.hide();
        if (list_id > 0) {
          Feed.switchList(list_id);
        } else {
          nav.go({'0': 'feed', section: 'list', list: new_list_id}, null, {nocur: true});
        }
      },
      showProgress: box.showProgress,
      hiderogress: box.hideProgress
    });
    return false;
  },
  deleteList: function (list_id, force) {
    if (list_id <= 0) {
      return false;
    }

    if (!force) {
      var box = showFastBox({title: getLang('news_delete_list_confirm_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('news_delete_list_confirm'), getLang('global_delete'), function () {
        Feed.deleteList(list_id, true);
      }, getLang('global_cancel'), function () {
        box.hide();
      });
      return;
    }
    var box = curBox();
    ajax.post('al_feed.php', extend({act: 'a_delete_list', list_id: list_id, hash: cur.tabs_hash}), {
      onDone: function () {
        re(geByClass1('feed_tab_list' + list_id, ge('feed_news_bar')));
        re('filter_t_list' + list_id);
        boxQueue.hideAll();
        if (cur.section == 'list' && cur.list == list_id) {
          feed.switchSection('news');
        }
      },
      showProgress: box.showProgress,
      hideProgress: box.hideProgress
    });
  },

  saveTabs: function () {
    ajax.post('al_feed.php', {act: 'a_save_tabs', hash: cur.tabs_hash, tabs: cur.my_feed_types.tabs.join(',')});
  },

  statsShow: function (e, opts) {
    return showWiki({w: 'stats' + (cur.source || '')}, false, e);
  },

  // scrollTop check
  scrollCheck: function(params) {
    if (!cur.idleManager || cur.isFeedLoading || cur.idleManager.isIdle || cur.disableAutoMore) return;
    var el = ge('show_more_link');
    if (!isVisible(el)) return;

    var ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
        st = scrollGetY(), top, ntop = 0, el, nel, bits, posts = [];

    if (st + ch + 1000 > el.offsetTop) {
      feed.showMore();
    }

    if (
      domPN(cur.topRow) != cur.rowsCont ||
      (cur.topRow || {}).id == 'feed_rows_next'
    ) {
      cur.topRow = domFC(cur.rowsCont);
    }

    if (
      !vk.id ||
      !cur.topRow ||
      cur.topRow.id == 'feed_rows_next' ||
      cur.section != 'news' && cur.section != 'recommended' && cur.section != 'search' ||
      (((window.curNotifier || {}).idle_manager || {}).is_idle && (params || {}).type != 'init')
    ) {
      return;
    }
    postsUnseen = [];
    for (el = domPS(cur.topRow); el; el = domPS(el)) {
      if (cur.topRow.offsetTop > st) cur.topRow = el;
      if (!el.unseen) {
        el.unseen = true;
        postsUnseen.push(Feed.postsGetRaws(el));
      }
    }
    Page.postsUnseen(postsUnseen);
    for (el = cur.topRow; el; el = nel) {
      top = ntop ? ntop : el.offsetTop;
      if (top >= st + ch) break;

      nel = domNS(el);
      if ((nel || {}).id == 'feed_rows_next') nel = null;

      ntop = nel ? nel.offsetTop : top + el.offsetHeight;
      if (ntop < st && nel) cur.topRow = nel;

      bits = el.bits || 0;
      if (bits >= 3) continue;

      bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0);
      if (bits) {
        el.bits = bits;
        if (bits == 3) {
          posts.push(Feed.postsGetRaws(el));
        }
      }
    }
    Page.postsSeen(posts);
  },

  postsGetRaws: function(el) {
    var index = indexOf(domPN(el).children, el);
    var f = domFC(el);
    var r = /^post(-?\d+_\d+)$/;
    var res = {};
    var c, m, p;
    if (!f) return res;

    res.module = cur.module;
    res.index = index;
    if (cur.module == 'feed') {
      if (cur.section == 'search') {
        res.module = 'feed_search';
        res.q = cur.q;
      } else if (cur.section == 'news') {
        res.module = cur.subsection ? 'feed_news_' + cur.subsection : 'feed_news';
      } else {
        res.module = 'feed_other';
      }
    }

    var dataAdView = f.getAttribute('data-ad-view');
    if (dataAdView) {
      res['ad_' + dataAdView] = 1;
      __adsUpdateExternalStats(f);
    }

    if (m = f.id.match(r)) {
      res[m[1]] = 1;
    } else {
      c = f.className;
      if (m = c.match(/feed_reposts_wrap(-?\d+_\d+)/)) {
        p = domFC(f);
        if (hasClass(domFC(p), 'post_copy')) {
          res[m[1]] = -1;
        }
        if (m = domFC(p).id.match(r)) {
          res[m[1]] = 1;
        }
        if (isVisible(p = domNS(p))) {
          for (p = domFC(p); p; p = domNS(p)) {
            if (m = p.id.match(r)) {
              res[m[1]] = 1;
            }
          }
        }
      } else if (m = c.match(/feed_repost(-?\d+_\d+)/)) {
        p = domFC(f);
        if (hasClass(p, 'post_copy')) {
          res[m[1]] = -1;
        }
        if (m = p.id.match(r)) {
          res[m[1]] = 1;
        }
      } else {
        res[f.id] = 1;
      }
    }
    return res;
  },
  searchPreloadExtended: function () {
    if (cur.feedSearchExtendedLoaded || cur.feedSearchExtendedPreloaded) {
      return false;
    }
    cur.feedSearchExtendedPreloaded = true;
    ajax.post('al_feed.php', {act: 'a_get_search_extended'}, {cache: 1});
  },
  searchToggleExtended: function (enabled) {
    if (cur.feedSearchExtendedLoaded || enabled === false) {
      toggle('feed_search_extform', enabled);
      return;
    }
    var visibleBefore = [isVisible('feed_menu_toggle'), isVisible('feed_edit_hidden'), isVisible('feed_search_sort')];
    ajax.post('al_feed.php', {act: 'a_get_search_extended'}, {
      stat: ['ui_controls.css', 'ui_controls.js'],
      showProgress: function () {
        show('feed_progress');
        hide('feed_menu_toggle', 'feed_edit_hidden', 'feed_search_sort');
      },
      hideProgress: function () {
        hide('feed_progress');
        toggle('feed_menu_toggle', visibleBefore[0]);
        toggle('feed_edit_hidden', visibleBefore[1]);
        // toggle('feed_search_sort', visibleBefore[2]);
      },
      cache: 1,
      onDone: function (html, js) {
        cur.feedSearchExtendedLoaded = true;
        val('feed_search_extform', html);
        show('feed_search_extform');
        eval(js);
      }
    });
  },
  searchPreloadHotHashtags: function() {
    ajax.post('al_feed.php', {act: 'a_get_hot_hashtags'}, {cache: 1});
  },
  searchToggleHotHashtags: function(visible) {
    if (cur.feedSearchHashtagsLoaded || visible === false) {
      toggle('feed_search_hashtags', visible);
      return;
    }

    ajax.post('al_feed.php', {act: 'a_get_hot_hashtags'}, {cache: 1, onDone: onDone});
    function onDone(html) {
      if (cur.feedSearchHashtagsLoaded) return;
      cur.feedSearchHashtagsLoaded = true;
      if (html) {
        ge('feed_bar').insertAdjacentHTML('afterend', html);
      }
      if (cur.section == 'search' && cur.q) {
        toggle('feed_search_hashtags', Feed.highlightHotHashtag(cur.q));
      }
    }
  },
  searchSelectHotHashtag: function(el) {
    Feed.submitSearch(val(el));
    statlogsValueEvent('top_hashtag_search', 0, 'click');
    return false;
  },
  highlightHotHashtag: function(q) {
    if (!cur.feedSearchHashtagsLoaded) return false;

    q = q.toLowerCase();
    var isHot = false;
    var hashtags = geByClass('feed_top_hashtags_item', 'feed_search_hashtags');

    each(hashtags, function(i, item) {
      if (val(item).toLowerCase() == q) {
        isHot = true;
        addClass(item, 'feed_top_hashtags_item_active');
        cur.hashtag = item;
      } else {
        removeClass(item, 'feed_top_hashtags_item_active');
      }
    });
    return isHot;
  },
  searchAppendTag: function (tag, pattern, nosubmit) {
    if (!trim(tag) && !pattern) {
      return;
    }
    var text = val('feed_search');
    try {
      text = text.replace(pattern || new RegExp('(^|\\s)' + tag + '(\\s|$)', 'i'), ' ');
    } catch (e) {};
    text += ' ' + tag + ' ';
    text = text.replace(/\s{2,}/g, ' ').replace(/^\s+/, '');
    val('feed_search', text);
    if (trim(text).length && !nosubmit) {
      Feed.submitSearch();
    }
    Feed.searchUpdate();
  },
  searchUnchooseGeoPoint: function () {
    var map = ge('feed_searchext_map'),
        x = ge('feed_searchext_map_delete_wrap');

    removeClass(map, 'feed_searchext_map_selected');
    setStyle(map, {background: ''});
    x && x.tt && x.tt.hide && x.tt.hide();
    Feed.searchAppendTag('', /near:[0-9\.,\-\+]+/);
  },
  searchChooseGeoPoint: function () {
    var params = {act: 'a_choose_place_box', search: 1},
        text = val('feed_search'),
        currentPointMatches = text.match(/near\:(\-?\d{1,3}(?:\.\d+)?)\,(\-?\d{1,3}(?:\.\d+)?)(\+{0,4})/);

    if (currentPointMatches) {
      params.lat = floatval(currentPointMatches[1]);
      params.lon = floatval(currentPointMatches[2]);
      params.zoom = [8, 11, 14, 17, 20][(currentPointMatches[3] || '').length]
    }
    showBox('al_places.php', params, {dark: 1});
    cur.chooseGeoPoint = function (lat, lon, zoom) {
      var num = 0;
      each([8, 11, 14, 17, 20], function (k, zoomLevel) {
        if (zoom <= zoomLevel) {
          return false;
        }
        num = k;
      });
      boxQueue.hideLast();
      var postfix = (new Array(num + 1)).join('+');
      var mult = Math.pow(10, 10);
      lat = Math.round(lat * mult) / mult;
      lon = Math.round(lon * mult) / mult;

      var map = ge('feed_searchext_map');
      addClass(map, 'feed_searchext_map_selected');
      setStyle(map, {
        background: 'url(/maps?lat='+lat+'&lng='+lon+'&z='+zoom+'&'+(window.devicePixelRatio >= 2 ? 'w=260&h=160' : 'w=130&h=80')+')'
      });
      Feed.searchAppendTag('near:' + lat + ',' + lon + postfix, /near:[0-9\.,\-\+]+/);
    };
  },
  searchChooseFilter: function (filter, item) {
    var uiDropdown;
    switch (filter) {
      case 'type':
        uiDropdown = cur.uiSearchPostType; break;
      case 'has':
        uiDropdown = cur.uiSearchPostAttach; break;
      case 'likes':
        uiDropdown = cur.uiSearchPostLikes; break;

      default: return false;
    }
    var sel = (uiDropdown.selectedItems() || [])[0];

    Feed.searchAppendTag(sel && intval(sel[0]) ? (filter + ':' + (sel[3] || sel[0])) : '', new RegExp(filter + ':' + '[\\S]+', 'g'));
  },
  searchExcludeOnChange: function (input, nosubmit) {
    var exclude = trim(val(input));
    if (!exclude) {
      return false;
    }
    var words = trim(exclude).split(/[\s\,\.\/\!\@\#\$\%\^\&\*\(\)\-\=\:\~\;\'\"\|\}\{\+]+/),
        len = words.length,
        newTag = len > 0 && ('-' + words.join(' -')) || '';

    Feed.searchAppendTag(newTag, /(?:\s|^)\-\S+/g, nosubmit);
  },
  searchUrlOnChange: function (fromTooltip) {
    var urls = extractUrls(val('feed_searchext_link') || '', true);
    var parsedUrl = urls[0];
    var newTag = '';

    if (parsedUrl) {
      var url = parsedUrl['domain'] + parsedUrl['query'],
          domain = parsedUrl['domain'],
          newTag = radioBtns.feed_searchext_domain.val ? ('domain:' + domain) : ('url:' + url);
    }
    Feed.searchAppendTag(newTag, cur.feedSearchPrevLinkTag);
    cur.feedSearchPrevLinkTag = newTag;

    if (fromTooltip) {
      elfocus('feed_searchext_link');
    }
  },
  searchContentOnChange: function () {
    var urls = extractUrls(val('feed_searchext_content') || '', true);
    var url = urls[0];

    var domainMatches = url && url['domain'].match(/(^|\.|\/\/)vkontakte\.ru|vk\.com/),
        mediaMatches = domainMatches && url['query'].match(/(?:#(photo)|^\/(photo|video|album|page|audio|wall)|z=(album|photo|video)|w=(page|wall))(-?\d+_)?(\d+)(?:\?reply=(\d+))?$/),
        newTag = '';

    if (mediaMatches) {
      var mediaType = mediaMatches[1] || mediaMatches[2] || mediaMatches[3] || mediaMatches[4],
          mediaID = mediaMatches[5] + (mediaMatches[7] || mediaMatches[6]),
          newTag = 'copy:' + mediaType + mediaID;
    }
    Feed.searchAppendTag(newTag, /copy\:\S+/);
  },
  searchUpdate: function () {
    val(cur.searchPh, !cur.section.indexOf('photos') ? getLang('news_photo_search') : getLang('news_search'));

    toggle('feed_query_reset', trim(val('feed_search')));
  },
  searchReset: function (fire) {
    console.trace();
    val('feed_search', '');
    each ([cur.uiSearchPostType, cur.uiSearchPostAttach, cur.uiSearchPostLikes], function () {
      this.val(0);
    });
    each(['feed_searchext_exclude', 'feed_searchext_link', 'feed_searchext_content'], function (k, input) {
      val(input, '');
    });
    Feed.searchUnchooseGeoPoint();
    Feed.searchUpdate();

    if (cur.hashtag) {
      removeClass(cur.hashtag, 'feed_top_hashtags_item_active');
      cur.hashtag = null;
    }
    if (cur.section == 'search') {
      Feed.searchToggleHotHashtags(true);
    }
    if (!fire) {
      return;
    }

    var switchTo = 'news';
    switch (cur.section) {
      case 'articles':
      case 'articles_search':
        switchTo = 'articles';
        break;

      case 'photos_search':
      case 'photos':
        switchTo = 'photos';
        break;
    }
    Feed.switchSection(switchTo);
  },

  sinceOwnerOver: function (obj, oid, name) {
    if (!obj.nophoto) {
      Feed.sinceOwnerBigphOver(obj, oid);
    }
    showTooltip(obj, {
      text: name,
      showdt: 0,
      hidedt: 0,
      black: 1,
      shift: [12, 3, 3],
      forcetoup: true,
      className: 'feed_since_owner_tt'
    });
  },
  sinceOwnerBigphOver: function(obj, oid) {
    if (!cur.lang || !cur.lang.global_photo_full_size || browser.mobile) return;
    var o = obj.firstChild,
        ch = cur.phCache[oid];
    if (o.tagName != 'A' || o.className != 'feed_since_ownerph') {
      o = obj.insertBefore(ce('a', {className: 'feed_since_ownerph', href: ch && ch._id ? ('/photo' + ch._id + '?all=1') : ('/albums' + oid), innerHTML: '<span class="feed_since_ownerph_label">' + cur.lang.global_photo_full_size + '</span>'}), obj.firstChild);
      o.onclick = Feed.sinceOwnerBigphClick.pbind(oid, obj);
      o._oid = oid;
    }

    clearTimeout(o.hideTO);
    var sz = getSize(obj)[1] || 90;
    animate(o, {marginTop: sz - 25}, {duration: 200, transition: Fx.Transitions.easeOutCirc});
    cur.phShown[oid] = o;

    if (!obj.onmouseout) obj.onmouseout = Feed.sinceOwnerBigphOut.pbind(obj);
  },
  sinceOwnerBigphOut: function(obj) {
    var o = obj.firstChild;
    if (!o || o.tagName != 'A' || o.className != 'feed_since_ownerph') return;

    clearTimeout(o.hideTO);
    o.hideTO = setTimeout(function() {
      var sz = getSize(obj)[1] || 90;
      animate(o, {marginTop: sz}, 200);
      delete cur.phShown[o._oid];
    }, 150);
  },
  sinceOwnerBigphClick: function(oid, obj, ev) {
    if (checkEvent(ev) !== false) return;

    obj && obj.tt && obj.tt.destroy();
    var ch = cur.phCache[oid]
        o = cur.phShown[oid],
        obj = domPN(o);

    if (!o || !obj) return;
    if (ch === undefined) {
      ch = cur.phCache[oid] = 'show';
      ajax.post('al_photos.php', {act: 'fast_get_photo', oid: oid}, {onDone: function(res) {
        if (!res) {
          obj.onmouseover = function() {};
          re(o);
          return;
        }
        var sh = (cur.phCache[oid] == 'show');
        cur.phCache[oid] = res;
        o.href = '/photo' + res._id + '?all=1';
        if (sh) Feed.sinceOwnerBigphClick(oid, obj);
      }, onFail: function() {
        obj.nophoto = true;
        re(o);
        return true;
      }});
    }
    if (ch == 'show') {
      return cancelEvent(ev);
    }
    if (!ch) return;
    extend(ch, {
      jumpTo: {z: 'albums' + oid}
    });
    return showPhoto(ch._id, 'album' + oid + '_0/rev', ch, ev);
  },

  go: function(params, onBeforeReplace, noscroll) {
    if (cur._back_local) {
      var hist = cur._back_local;
      if (hist.back) {
        showBackLink(hist.back[0], hist.back[1], hist.back[2]);
      } else {
        showBackLink(false);
      }
      cur._back_local = false;
    }
    if (cur.feedReq) {
      try {
        cur.feedReq.abort();
      } catch (e) {debugLog(e);}
    }
    var frame = 1, hideProgress = function () {
      cur.isFeedLoading = false;
    };
    if (browser.msie || noscroll) {
      frame = false;
      hideProgress = cur.onFrameBlocksDone;
    }
    cur.wasScroll = noscroll ? scrollGetY() : false;
    cur.feedReq = ajax.post('al_feed.php', extend(params, {part: 1}), {
      onDone: function (options, rows, js) {
        revertLastInlineVideo();
        hide('feed_new_posts');
        cur.newPostsCount = 0;
        if (window.tooltips) tooltips.destroyAll(ge('feed_rows'));
        boxQueue.hideAll();
        if (layers.fullhide) layers.fullhide(true);

        if (frame) {
          ajax._framenext();
        }
        if (window.wall) wall.cancelEdit();
        boxQueue.hideAll();
        if (onBeforeReplace) {
          onBeforeReplace(rows || '');
        } else {
          val(cur.rowsCont, rows || '');
        }
        feed.applyOptions(options, 2);
        js && eval(js);

        if (!params.norecom) {
          val('feed_recommends', options.recommends || '');
          var str = '/al_feed.php#' + ajx2q({act: 'recom'});
          if (ajaxCache[str]) delete(ajaxCache[str]);
          cur.recomPreload = false;
        }
        shortCurrency();
        toggle('feed_recommends', cur.section == 'news' || cur.section == 'recommended' || cur.section == 'videos');
        toggle('feed_info_bar', cur.section == 'may9');
        Feed.searchToggleHotHashtags(cur.section == 'search');

        var _a = window.audioPlayer, aid = currentAudioId();
        if (_a && aid && _a.showCurrentTrack) _a.showCurrentTrack();
        setTimeout(function () {
          var aid = currentAudioId();
          if (_a && aid && _a.showCurrentTrack) _a.showCurrentTrack();
        }, 100);
        setTimeout(feed.scrollCheck, 200);
      },
      onFail: function () {return false;},
      showProgress: function () {
        hide('feed_menu_toggle', 'feed_edit_hidden', 'feed_search_sort');
        if (cur.section == 'articles') {
          feed.sliderShowProgress();
        }
        show('feed_progress');
        cur.isFeedLoading = true;
      },
      frame: frame,
      ads: 1,
      hideProgress: hideProgress
    });
  },

  init: function (options) {
    var searchEl = ge('feed_search');
    placeholderSetup(searchEl, {back: 1});
    cur.searchPh = geByClass1('input_back_content', ge('feed_isearch'));

    FeedSearch.init(searchEl);

    if (!window.Select) {
      addEvent(searchEl, 'focus', function (e) {
        stManager.add(['ui_controls.js', 'ui_controls.css'], feed.initUi);
        removeEvent(searchEl, 'focus', arguments.callee);
      });
    }

    addEvent(searchEl, 'keydown focus', function (e) {
      if (e.type == 'focus') {
        // if (cur.section.indexOf('articles') && cur.section.indexOf('photos')) { // TODO: remove
        //   addClass('feed_bar', 'feed_bar_extended_search');
        // }
        return;
      }
      if (e.keyCode == KEY.RETURN && (!FeedSearch.select || FeedSearch.select.active < 0)) {
        var queryText = val(searchEl);
        if (queryText) {
          feed.submitSearch();
        }
        //  else if (cur.section == 'search' || cur.section == 'articles_search') {
        //   if (feed.returnToFeed(false, false)) {
        //     feed.go(feed.getSectionParams(cur.section == 'search' ? 'news' : 'articles'));
        //   }
        // }
        searchEl.blur();
        clearTimeout(cur.requestTimeout);
        return cancelEvent(e);
      }
      setTimeout(Feed.searchUpdate, 0);
    });
    setTimeout(function () {
      each(geByTag('textarea', cur.rowsCont), function() { placeholderSetup(this); });
    }, 200);

    extend(cur, {
      oid: options.user_id,
      postTo: options.user_id,
      phCache: {},
      phShown: {},
      subsections: {},
      feed_session_id: options.feed_session_id || 'na',
      module: 'feed',
      isFeedLoading: false,
      wallPostCb: function () {
        if (cur.section == 'news') {
          setTimeout(feed.update.pbind(1), 1000);
        } else {
          setTimeout(feed.switchSection.pbind('news'), 1000);
        }
      },
      // Decomment
      // disableAutoMore: true,


      idleManager: (function () {
        var setIdleTo, checkIdleCb, checkIdleCbTo, onActive, onInActive, onFocusBlur, params = {
          isIdle: false,
          onIdle: null,
          onUnIdle: null,
          stop: function () {
            removeEvent(document, 'mousemove keydown', onActive);
            removeEvent(window, 'focus blur', onFocusBlur);
          },
          start: function () {
            if (browser.mobile) return;
            onActive = function () {
              if (!cur.idleManager) return;
              if (params.isIdle) {
                params.isIdle = false;
                if (params.onUnIdle) params.onUnIdle();
              }
            };
            onInActive = function () {
              if (!cur.idleManager) return;
              params.isIdle = true;
              if (params.onIdle) params.onIdle();
            };
            onFocusBlur = function (e) {
              if (e.type == 'focus') {
                onActive();
              } else {
                onInActive();
              }
            };
            addEvent(window, 'focus blur', onFocusBlur);
          }
        };
        return params;
      }()),

      onFrameBlocksDone: /*vkLocal(*/function () {
        if (cur.section != 'search') {
          hide('feed_progress');
        }
        feed.sliderHideProgress();
        toggle('feed_edit_hidden', cur.section == 'news' || cur.section == 'photos');
        // toggle('feed_search_sort', cur.section == 'search'/* || cur.section == 'photos_search'*/);
        toggle('feed_menu_toggle', ge(feed.getTypesSection() + '_filters'));
        toggle('feed_rate_slider_wrap', cur.section == 'articles' && cur.subsection == 'top');
        cur.isFeedLoading = false;
        if (cur.wasScroll === 0 || cur.wasScroll > 0 || (cur.wasScroll === false && cur.section == 'search' && cur.q && cur.q.substr(0, 1) == '#')) {
          scrollToY(st, 0);
          cur.wasScroll = false;
        }
      }/*)*/,

      // Cached entries' HTML
      feedEntriesHTML: {},
      feedUnreadCount: 0,
      feedInitialTitle: '',
      feedUnread: [],
      feedToSort: []
    });

    cur.nav.push(function(changed, old, n, opts) {
      if (changed[0] !== undefined) return;
      var params = clone(n);
      delete(params[0]);
      var splitt = !!ge('feedtab_updates') || !ge('feedtab_news');
      if (splitt && changed.section !== undefined && ((cur.section == 'notifications' || cur.section == 'replies') && changed.section != 'notifications' && changed.section != 'replies' || cur.section != 'notifications' && cur.section != 'replies' && (changed.section == 'notifications' || changed.section == 'replies'))) {
        return;
      }
      if ((cur.section == 'owner' || cur.section == 'search') && !feed.returnToFeed(params, opts.back || opts.hist)) {
        return false;
      }
      if (changed.q) {
        feed.submitSearch(changed.q, params.section || '');
        return false;
      }
      if (changed.list) {
        Feed.switchList(changed.list);
        return false;
      }
      feed.go(extend(params, opts.params || {}));
      return false;
    });
    cur.idleManager.onUnIdle = feed.updateTitle;
    cur.idleManager.onIdle = feed.reSortItems;

    cur.options = cur.options || {};
    extend(cur.options, options);
    feed.applyOptions(options, 3);

    // Extrnal static requred
    // page.js
    cur.rowsCont = options.wallCont = ge('feed_rows');
    wall.init(options);

    // Scroll check routine
    feed.scrollNode = browser.msie6 ? pageNode : window;

    cur._back = {
      text: getLang('news_return_to_news'),
      show: [feed.startEvents],
      hide: [function () {
        clearInterval(cur.updateInt);
        removeEvent(feed.scrollNode, 'scroll', feed.scrollCheck);
        removeEvent(window, 'resize', feed.scrollCheck);
        cur.idleManager.stop();
        clearTimeout(cur.lp_error_to);
      }],
      loc: false
    };
    feed.startEvents();
    var _a = window.audioPlayer,
        aid = currentAudioId();
    if (_a && aid && _a.showCurrentTrack) _a.showCurrentTrack();

    if (browser.mobile) {
      setStyle('feed_rate_slider_wrap', {width: 150});
      hide('feed_rate_full');
      show('feed_rate_mobile');
    }

    setTimeout(function () {feed.scrollCheck({type: 'init'});}, 200);
  },
  startEvents: function () {
    // IDLE manager
    cur.idleManager.start();

    // Feed update interval
    cur.updateInt = setInterval(function () {feed.update(0);}, 20000);

    // Scroll check routine for auto preload next news
    addEvent(feed.scrollNode, 'scroll', feed.scrollCheck);
    addEvent(window, 'resize', feed.scrollCheck);
  },
  initUi: function () {
    cur.searchSortMenu = new DropdownMenu(cur.options.search_sorts, {
      target: ge('feed_search_sort_dd'),
      onSelect: function (e) {
        if (cur && cur.section == 'search') {
          statlogsValueEvent('feed_change_sort', 0, e && e.currentTarget ? e.currentTarget.index : -1);
        }
        feed.submitSearch()
      },
      fadeSpeed: 0
    });

    FeedSearch.initSelect();
    cur.destroy.push(function () {
      FeedSearch.destroy();
    });
  },
  applyUi: function () {
    if (!cur.searchSortMenu) return;
    cur.searchSortMenu.setOptions({title: cur.search_sort[1]});
    cur.searchSortMenu.value = cur.search_sort[0];
    val('feed_search_sort_dd', cur.search_sort[1].replace(/\s+/g, '&nbsp;'));
  },
  mentionClick: function(el, ev) {
    var post = ((el.getAttribute('mention') || '').match(/^bp(-?\d+_\d+)$/) || {})[1];
    if (!post) return nav.go(el, ev);

    post = post.split('_');
    for (; el; el = el.parentNode) {
      var m = (el.id || '').match(/^replies(-?\d+_topic\d+)$/);
      if (m) {
        var topic = m[1].split('_');
        if (topic[0] == post[0]) {
          return wall.showReply(m[1], post[0] + 'topic_' + post[1]);
        } else {
          break;
        }
      }
    }
    return nav.go(el, ev);
  },

  hideMay9Bar: function(el, hash) {
    slideUp(el, 200, re.pbind(el));
    ajax.post('al_feed.php', {act: 'hide_may9_bar', hash: hash});
    return false;
  },

  toggleMay9Tab: function(el, hash) {
    var hidden = hasClass(el, 'feed_tab_link_hidden'),
        tab = domPN(ge('feed_may9_tab'));

    if (!hidden) {
      addClass(tab, 'feed_tab_hidden');
      var box = showFastBox({title: getLang('news_hide_list_confirm_title'), dark: 1, bodyStyle: 'padding: 20px; line-height: 160%;'}, getLang('news_hide_named_list').replace('{title}', getLang('news_list_may9')), getLang('news_hide'), function() {
        feed.checkTabsFilter('may9', 't_may9');
        box.hide();
      });
    } else {
      removeClass(tab, 'feed_tab_hidden');
      removeClass(el, 'feed_tab_link_hidden');
      feed.checkTabsFilter('may9', 't_may9');
    }
    return false;
  },
  recomPreload: function() {
    if (cur.recomPreload) return;
    cur.recomPreload = true;
    ajax.post('/al_feed.php', {act: 'recom', section: cur.section}, {cache: 1});
  },
  recomMore: function(ev) {
    if (checkEvent(ev) !== false) return;
    var cont = ge('feed_recom_rows'), lnk = ge('feed_recom_more');
    if (cont.childNodes.length > 2) {
      var old = getSize(cont)[1];
      while (cont.childNodes.length > 2) {
        cont.removeChild(cont.lastChild);
      }
      scrollToY(0, 0);
      hide(lnk.firstChild.nextSibling);
      show(lnk.firstChild);
      return cancelEvent(ev);
    }

    ajax.post('/al_feed.php', {act: 'recom', section: cur.section}, {cache: 1, onDone: function(rows) {
      hide(lnk.firstChild);
      show(lnk.firstChild.nextSibling);
      var e = ce('div', {innerHTML: rows}), c = ge('feed_recom_rows'), el;
      while (el = e.firstChild) {
        if (ge(el.id)) {
          re(el);
        } else {
          c.appendChild(el);
        }
      }
      if (c.childNodes.length % 2) re(c.lastChild);
    }, showProgress: function() {
      hide(lnk.firstChild);
      show(lnk.lastChild);
    }, hideProgress: function() {
      show(lnk.firstChild);
      hide(lnk.lastChild);
    }});
    return cancelEvent(ev);
  },
  recomSubscribe: function(oid, btn, sub) {
    var address, params,
        subBtn = sub ? btn : domPS(btn),
        unsubBtn = sub ? domNS(btn) : btn;
    if (sub) {
      address = '/al_feed.php';
      params = {act: 'subscr', oid: oid, from: nav.objLoc.section, hash: val('feed_recom_hash')};
    } else {
      address = '/al_fans.php';
      params = {act: 'unsub', oid: oid, hash: val('feed_recom_hash'), no_response: 1};
    }
    ajax.post(address, params, {
      onDone: function() {
        toggle(subBtn, !sub);
        toggle(unsubBtn, !!sub);
        if (nav.objLoc.section != 'recommended') {
          nav.go(nav.objLoc, false, {params: {norecom: 1}});
        }
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  toggleAdvancedSearch: function(visible) {
    toggleClass('feed_bar', 'feed_bar_extended_search', visible);
  }
};
window.feed = Feed;

FeedSearch =  {
  init: function (input, options) {
    return false;
    var self = this;
    this.input = input;
    this.cont = input.parentNode.parentNode;
    var resultContainer = ce('div', {className: 'results_container', innerHTML: '<div class="result_list"></div><div class="result_list_shadow"><div class="shadow1"></div><div class="shadow2"></div></div>'});
    this.cont.appendChild(resultContainer);
    this.resultList = geByClass('result_list', resultContainer)[0];
    this.resultListShadow = geByClass('result_list_shadow', resultContainer)[0];
    hide(this.resultList, this.resultListShadow);

    if (browser.chrome) this.resultList.style.opacity = 1;
    else if (!browser.safari) setStyle(this.resultListShadow, 'top', browser.mozilla ? 0 : (browser.msie && browser.version < 8) ? 0 : -1);
    this.resultList.style.width = this.resultListShadow.style.width = resultContainer.style.width = '273px';

    this.initSelect();

    addEvent(input, 'keyup click mouseup', function (e) {
      if (!self.select) return;
      if (self.select.isVisible() && self.select.active > -1) {
        if (inArray(e.keyCode, [KEY.UP, KEY.DOWN, KEY.PAGEUP, KEY.PAGEDOWN, KEY.RETURN])) return cancelEvent(e);
      }
      clearTimeout(cur.requestTimeout);
      var term = val(input);
      self.currentTerm = term;
      var section = cur.section;
      if (!term) {
        self.select.hide();
        return;
      }
      cur.requestTimeout = setTimeout(function() {
        ajax.post('/hints.php?act=a_feed_hints', {q: term, section: section}, {
          onDone: function (data) {
            if (self.currentTerm === term) self.showSelectList(term, data);
          }, cache: 1
        });
      }, 300);
    });
    addEvent(input, 'blur', function () {
      clearTimeout(cur.requestTimeout);
      delete self.currentTerm;
      if (!self.select) return;
      self.select.hide();
    });
    addEvent(input, 'keypress keydown', function (e) {
      if (!self.select) return;
      if (!self.select || self.select.active < 0) return true;

      if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
        if (self.select && self.select.isVisible()) {
          triggerEvent(document, e.type, e);
          return cancelEvent(e);
        }
      } else if (e.keyCode == KEY.SPACE) {
        var el = self.select.list.childNodes[self.select.active], id = el ? el.getAttribute('val') : '', item;
        each(self.lastItems, function () {
          if (this[0] == id) {
            item = this;
          }
        });
        if (!item) return;
        val(input, item[3] + ' ');
        focusAtEnd(input);
        return cancelEvent(e);
      }
      return true;
    });
  },
  initSelect: function () {
    return false;
    if (this.select || !window.Select || !window._ui) return;
    if (!this.resultList || !this.resultListShadow) {
      return;
    }
    this.guid = _ui.reg(this);
    this.select = new Select(this.resultList, this.resultListShadow, {
      selectFirst: false,
      onItemSelect: this.onItemSelect.bind(this),
      onShow: _ui.sel.pbind(this.guid),
      onHide: _ui.sel.pbind(false),
      cycle: true
    });
    this.select.hide();
  },
  showSelectList: function (term, items) {
    var self = this;
    if (!this.select) return;
    items = isArray(items) && items.length ? items : [];
    if (!items.length) {
      self.select.hide();
      return;
    }
    this.select.clear();
    this.lastItems = items;
    this.select.content(items);
    this.select.show();
  },
  onItemSelect: function(id) {
    if (!this.select) return;
    this.select.hide();
    var item;
    each(this.lastItems, function () {
      if (this[0] == id) {
        item = this;
      }
    });
    if (!item) return;
    val(this.input, '');
    feed.switchOwner(item[4], item[3]);
    this.input.blur();
  },
  onEvent: function(e) {
    if (e.type == (browser.opera || browser.mozilla ? 'keypress' : 'keydown')) {
      this.select.handleKeyEvent(e);
    }
  },
  destroy: function (prevCur) {
    cleanElems(this.resultList, this.resultListShadow, this.input);
    clearTimeout(prevCur ? prevCur.requestTimeout : cur.requestTimeout);
    if (this.select) {
      this.select.destroy();
      delete this.select;
    }
    if (this.resultList) {
      re(this.resultList.parentNode);
    }
    delete this.lastItems;
    this.inited = false;
  }
}

try{stManager.done('feed.js');}catch(e){}
