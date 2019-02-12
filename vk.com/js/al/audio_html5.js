var audio_html5 = {
    music: null,
    defaultVolume: 0.8,
    preloadMusic: null,
    preloadUrl: null,
    autoStart: true,
    setIntID: null,
    loadIntID: null,

    loadAudio: function(url) {
        var _a = audio_html5;
        _a.pauseAudio();
        _a.autoStart = true;
        if (_a.preloadUrl == url) {
            _a.music = _a.preloadMusic;
            _a.music.addEventListener('canplay', _a.onCanPlay);
            _a.music.addEventListener('error', _a.onErr);
            _a.preloadMusic = _a.preloadUrl = null;
        } else {
            _a.music = ge('html5_audio');
            _a.music.addEventListener('canplay', _a.onCanPlay);
            _a.music.addEventListener('error', _a.onErr);
            _a.music.src = url;
            _a.music.load();
        }
        if (!_a.loadIntID) _a.loadIntID = setInterval(_a.onLoadProgress, 200);
        _a.music.volume = _a.defaultVolume;
        try {
            _a.playAudio();
        } catch (e) {};
    },
    unloadAudio: function() {
        var _a = audio_html5;
        _a.pauseAudio();
        _a.music = null;
    },
    preloadAudio: function(url) {
        var _a = audio_html5;
        _a.preloadMusic = new Audio(url);
        _a.preloadUrl = url;
        _a.preloadMusic.load();
    },
    playAudio: function(time) {
        var _a = audio_html5;
        if (!_a.music) return;
        if (time !== undefined) try {
            _a.music.currentTime = time;
        } catch (e) {};
        _a.autoStart = true;
        _a.music.play();
        if (!_a.setIntID) _a.setIntID = setInterval(_a.onPlayProgress, 1000);
    },
    pauseAudio: function() {
        var _a = audio_html5;
        if (!_a.music) return;
        _a.music.pause();
        _a.stopPlayProgress();
    },
    stopAudio: function() {
        var _a = audio_html5;
        if (!_a.music) return;
        try {
            _a.music.currentTime = 0;
        } catch (e) {};
        _a.autoStart = false;
        _a.music.pause();
        _a.stopPlayProgress();
    },
    setVolume: function(value) {
        var _a = audio_html5;
        _a.defaultVolume = value;
        if (!_a.music) return;
        _a.music.volume = value;
    },
    getVolume: function() {
        var _a = audio_html5;
        if (!_a.music) return 0;
        return _a.music.volume;
    },
    paused: function() {
        var _a = audio_html5;
        if (!_a.music) return true;
        return _a.music.paused;
    },
    stopPlayProgress: function() {
        var _a = audio_html5;
        clearInterval(_a.setIntID);
        _a.setIntID = null;
    },
    stopLoadProgress: function() {
        var _a = audio_html5;
        clearInterval(_a.loadIntID);
        _a.loadIntID = null;
    },
    callPlayProgress: function() {
        audio_html5.onPlayProgress();
    },

    onPlayProgress: function() {
        var _a = audio_html5;
        var curTime = Math.floor(_a.music.currentTime * 1000) / 1000;
        var totalTime = Math.floor(_a.music.duration * 1000) / 1000;
        audioPlayer.onPlayProgress(curTime, totalTime);
        if (Math.abs(totalTime - curTime) < 0.1) {
            _a.pauseAudio();
            audioPlayer.onPlayFinish();
        }
    },
    onLoadProgress: function() {
        var _a = audio_html5;
        var totalTime = Math.floor(_a.music.duration * 1000) / 1000,
            bufferedTime;
        try {
            bufferedTime = (Math.floor(_a.music.buffered.end(0) * 1000) / 1000) || 0;
        } catch (e) {}
        if (totalTime && Math.abs(totalTime - bufferedTime) < 0.1) {
            audioPlayer.onLoadProgress(totalTime, totalTime);
            _a.stopLoadProgress();
        } else {
            audioPlayer.onLoadProgress(bufferedTime, totalTime);
        }
    },
    onCanPlay: function() {
        var _a = audio_html5;
        if (_a.paused()) return;
        if (audio_html5.autoStart) {
            try {
                _a.music.play();
            } catch (e) {};
            if (!_a.setIntID) _a.setIntID = setInterval(_a.onPlayProgress, 1000);
        }
    },
    onErr: function(e) {
        audioPlayer.onError(e.target.error.code);
    }
}
try {
    stManager.done('audio_html5.js');
} catch (e) {}