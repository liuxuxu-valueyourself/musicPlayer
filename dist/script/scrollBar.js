(function (root) {
  function Bar(dom) {
    this.audio = dom;
    this.timer = null;
    this.init();
  }
  Bar.prototype = {
    init: function () {
      this.getDom();
      this.render();
      this.eventBar();
    },
    getDom: function () {
      this.currentTime = document.querySelector('.currentTime');
      this.allTime = document.querySelector('.allTime');
      this.circle = document.querySelector('.circle');
      this.front = document.querySelector('.front');
      this.barArea = document.querySelector('.barArea');
    },
    getGoodTime: function (time) {
      time = Math.round(time);
      var f = Math.floor(time / 60);
      var m = Math.ceil(time % 60);
      f = f < 10 ? '0' + f : f;
      m = m < 10 ? '0' + m : m;
      return f + ':' + m;
    },
    render: function () {
      var _this = this;
      this.audio.ontimeupdate = function () {
        var nowTime = _this.getGoodTime(_this.audio.currentTime);
        var allTime = _this.getGoodTime(_this.audio.duration);
        if(nowTime === allTime) {
          _this.audio.currentTime = 0;
        }
        if (allTime === 'NaN:NaN') {
          allTime = '00:00';
        }
        _this.currentTime.innerHTML = nowTime;
        _this.allTime.innerHTML = allTime;
        _this.setProgess();
      }
    },
    setProgess: function () {
      var res = (this.audio.currentTime / this.audio.duration ) * 200;
      this.circle.style.left = res + 'px';
      this.front.style.width = res + 'px';
    },
    eventBar:function () {
      var _this = this;
      this.barArea.addEventListener('touchend', function (e) {
        var clientWidth = e.changedTouches[0].target.clientWidth;
        var pageX = e.changedTouches[0].pageX-80;
        var res = (pageX / clientWidth) * _this.audio.duration;
        _this.audio.currentTime = res;
      }),
      this.barArea.addEventListener('touchmove', function (e) {
        var clientWidth = e.changedTouches[0].target.clientWidth;
        var pageX = e.changedTouches[0].pageX-80;
        var res = parseInt((pageX / clientWidth) * _this.audio.duration);
        _this.audio.currentTime = res;
      })
    }
  }


  root.progess = Bar;

})(window.player || (window.play = {}))