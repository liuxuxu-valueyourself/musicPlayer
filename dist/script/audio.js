(function (root) {
  function AudioInfo () {
    this.audio = new Audio();
    this.status = 'pause';      //歌曲的状态
  }
  AudioInfo.prototype = {
    load:function (src) {
      this.audio.src = src;
      this.audio.load();
    },
    play:function () {
      this.audio.play();
      this.status = 'play';
    },
    pause:function () {
      this.audio.pause();
      this.status = 'pause';
    },
    end:function (fn) {
      this.audio.ended = fn;
    },
    playTo:function (time) {
      this.audio.playTo = time;       //单位是秒
    },
    getAudio:function () {
      return this.audio;
    }
  }
  root.audio = new AudioInfo();


})(window.player || (window.player = {}))