function earthImg(imgName) {
    var retina = (window.devicePixelRatio >= 2 && !browser.iphone) ? '_2x' : '';
    return '/images/pics/earthday/' + imgName + retina + '.png';
}

var lightOn = true;
var lighterOn = false;
var earthdayBG, earthdayCloseGrey;

function earthDayInit() {
    var versions = browser.version.split('.');
    var majorVersion = intval(versions[0]);
    if (browser.opera && intval(browser.version) < 15) {
        return false;
    }
    if (browser.safari && majorVersion < 7) {
        return false;
    }
    if (browser.mozilla && majorVersion < 31) {
        return false;
    }
    if (browser.msie && majorVersion < 12) {
        return false;
    }
    var d = new Date();
    if (d.getHours() > 21 || (d.getHours() == 21 && d.getMinutes() > 30)) {
        return false;
    }
    if (d.getDate() != 28) {
        return false;
    }
    var imgPath = '/images/pics/earthday/';
    var earthTrigger = ce('div', {
        innerHTML: '<img id="earthday_lamp" src="' + earthImg('light_on') + '" width="136" height="46"/><img id="earthday_chain" src="' + earthImg('chain') + '" width="8" height="136"/>',
        className: 'earthday_lamp_cont'
    })
    var pl = ge('page_layout');
    pl.appendChild(earthTrigger);
    debugLog(earthTrigger);

    animate(earthTrigger, {
        opacity: 1
    }, {
        duration: 1200,
        transition: Fx.Transitions.easeOutCubic
    });
    animate(ge('earthday_lamp'), {
        marginTop: 0
    }, {
        duration: 300,
        transition: Fx.Transitions.easeOutCubic
    });
    animate(ge('earthday_chain'), {
        marginTop: -60
    }, {
        duration: 800,
        transition: Fx.Transitions.easeOutCubic
    });

    addEvent(earthTrigger, 'mouseover', function() {
        animate(ge('earthday_chain'), {
            marginTop: -55
        }, {
            duration: 300,
            transition: Fx.Transitions.easeOutCubic
        });
    });

    addEvent(earthTrigger, 'mouseout', function() {
        animate(ge('earthday_chain'), {
            marginTop: -60
        }, {
            duration: 300,
            transition: Fx.Transitions.easeOutCubic
        });
    });

    addEvent(earthTrigger, 'mousedown', function(ev) {
        animate(ge('earthday_chain'), {
            marginTop: -25
        }, {
            duration: 300,
            transition: Fx.Transitions.easeOutCubic,
            onComplete: function() {
                animate(ge('earthday_chain'), {
                    marginTop: -60
                }, {
                    duration: 200,
                    transition: Fx.Transitions.easeOutCubic
                });
                lightTrigger();
            }
        });
        return cancelEvent(ev);
    });
}

function earthLang(num) {
    var en = ['Earth Hour', 'An international movement for the planet organized by the <a href="/wwf" onclick="eathdayClose(); return nav.go(\'/wwf\');">World Wide Fund for Nature</a> (WWF), encouraging you to switch off the lights and household appliances for one hour as a symbol for your commitment to the planet future. At the same time the lights of the most famous buildings and monuments are turned off.', 'How to take part in the movement?', '<b>On the 28th of March</b>, switch off the lights for one hour from 8.30 p.m. till 9.30 p.m. (local time).', 'Turn on the flashlight', 'Close'];
    var ru = ['��� �����', '������������� �����, � ���� ������� <a href="/wwf" onclick="eathdayClose(); return nav.go(\'/wwf\');">��������� ���� ����� �������</a> (WWF) ��������� ��������� ���� � ������� �������������� �� ���� ��� � ���� ������������ � �������� �������. � ��� �� ����� ������ ��������� ����� ��������� ������ � ���������� ����.', '��� ������� ������� � �����?', '<b>28 ����� � 20:30 �� 21:30</b> �� �������� ������� ��������� ���� �� ���� ���.', '�������� �������', '�������'];
    var ua = ['������ �����', '̳�������� �����, � ���� ���� <a href="/wwf" onclick="eathdayClose(); return nav.go(\'/wwf\');">���������� ���� ����� �������</a> (WWF) �������� �������� ������ � �������� �������������� �� ���� ������ � �� ���� ������������ �� ����������� �������. � ��� ��� ������� ���������� ������������ �������� � ���\'���� �����.', '�� ����� ������ � �����?', '<b>28 ������� � 20:30 �� 21:30</b> �� �������� ����� �������� ������ �� ���� ������.', '��������� ��������', '�������'];


    if (vk.lang == 1) {
        var curLang = ua;
    } else if (vk.lang < 3 || vk.lang == 777 || vk.lang == 100 || vk.lang === 888) {
        var curLang = ru;
    } else {
        var curLang = en;
    }
    var str = curLang[num];
    return str;
}

function eathdayClose() {
    animate(earthdayBG, {
        opacity: 0
    }, 300, function() {
        hide(earthdayBG);
    });

    if (!lightOn) {
        lightTrigger();
    }
}

function showBacklight() {
    var buttons = '<div class="earthday_buttons_cont"><a class="earthday_btn_light fl_l" onclick="earthdayLighter(event);">' + earthLang(4) + '</a><a class="earthday_btn_close fl_l" onclick="eathdayClose();">' + earthLang(5) + '</a>';
    var textBlock = '<div class="earthday_block"><div style="font-size: 24px;color: #FFFFFF;padding-bottom: 15px;">' + earthLang(0) + '</div><div class="earthday_text">' + earthLang(1) + '</div><div style="padding: 20px 0px 8px; font-size: 16px;">' + earthLang(2) + '</div><div>' + earthLang(3) + '</div>' + buttons + '</div>';
    var html = '<div class="earthday_close" onclick="eathdayClose();"><img src="' + earthImg('close') + '" width="17" height="17"/></div><div id="eathday_info"><img style="position: absolute;" src="' + earthImg('pic') + '" width="250" height="250">' + textBlock + '</div></div>';


    if (!earthdayBG) {
        earthdayBG = ce('div', {
            className: 'earthday_bg',
            innerHTML: html
        }, {
            opacity: 0
        });
    } else {
        show(earthdayBG);
    }
    bodyNode.appendChild(earthdayBG);
    debugLog(earthdayBG);

    animate(earthdayBG, {
        opacity: 1
    }, 800);
    setStyle(ge('eathday_info'), {
        opacity: 1
    })
}

function earthdayLighter(ev) {
    earthdayCloseGrey = se('<div class="earthday_close earthday_close_grey" onclick="lightTrigger()"><img src="' + earthImg('close_grey') + '" width="17" height="17"/></div>');
    utilsNode.appendChild(earthdayCloseGrey)
    lighterOn = true;
    animate(ge('eathday_info'), {
        opacity: 0
    }, 400, function() {
        addClass(earthdayBG, 'earthday_bg_lighter');
        setStyle(earthdayBG, {
            width: window.lastWindowWidth + 500,
            height: window.lastWindowHeight + 500
        });
        addEvent(bodyNode, 'mousemove', function(ev) {
            var x = ev.pageX;
            var y = ev.pageY - scrollGetY();
            setStyle(earthdayBG, {
                backgroundPosition: (x - 200) + 'px ' + (y - 200) + 'px'
            });
        });
    });
    var x = ev.pageX;
    var y = ev.pageY - scrollGetY();
    setStyle(earthdayBG, {
        backgroundPosition: (x - 200) + 'px ' + (y - 200) + 'px'
    });
}

function lightTrigger() {
    if (lighterOn) {
        lighterOn = false;
        removeClass(earthdayBG, 'earthday_bg_lighter');
        setStyle(earthdayBG, {
            backgroundPosition: '0px 0px',
            width: '100%',
            height: '100%'
        });
        re(earthdayCloseGrey);
        return eathdayClose();
    }
    if (lightOn) {
        ge('earthday_lamp').src = earthImg('light_off');
        lightOn = false;
        showBacklight();
    } else {
        ge('earthday_lamp').src = earthImg('light_on');
        lightOn = true;
    }
}
try {
    stManager.done('earthday.js');
} catch (e) {}