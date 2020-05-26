
;(function ($, player) {
  function MusicPlayer(dom) {
    this.wrap = dom;      //为list元素提供父级
    this.dataList = [];   //请求过来的数据
    this.index = 0;       //当前索引
    this.indexControl = null;     //歌曲索引对象
    this.deg = 0;                 //控制图片旋转的角度
    this.timer = null;            //为图片旋转开的定时器
    this.domData = [];            //list中所有歌曲的dom
    this.progess = player.progess;
    // this.getAudio = player.audio.getAudio;
  }
  MusicPlayer.prototype = {
    init: function () {   
      this.getDom();             //获取dom
      this.getData('../mock/data.json');              //请求数据
    },
    getDom: function () {
      this.record = document.querySelector('.img img');
      this.controlBtns = document.querySelectorAll('.bottom-control li');
    },
    getData: function (url) {
      var _this = this;
      $.ajax({
        url: url,
        method: 'get',
        success: function (data) {
          _this.dataList = data;        //保存请求过来的数据
          
          _this.listCon();        //list模块
          _this.indexControl = new player.indexControl(_this.dataList.length); //索引控制，参数为请求过来所有歌曲的数量
          _this.loadMusic(_this.indexControl.index);      //加载音乐
          _this.musicControl();

        }
      })
    },
    loadMusic: function (index) {
      player.render(this.dataList[index]);
      player.audio.load(this.dataList[index].audioSrc);
      
      new this.progess(player.audio.getAudio());
      
      if (player.audio.status === 'play') {       //必须是播放状态了，才播放
        player.audio.play();
        this.controlBtns[2].className = 'Listening';    //控制播放图标
        this.imgRotate(0);      //图片角度清零

        try{
          document.querySelector('.nowing').className = '';
        }catch{
          console.log('no')
        }
        this.domData[index].className = 'nowing';
      }
      this.index = index;
    },
    musicControl: function () {
      var _this = this;
      //上一首
      this.controlBtns[1].addEventListener('touchend', function () {
        player.audio.status = 'play';
        // _this.index--;
        // _this.index<0?_this.index = _this.dataList.length - 1 : _this.index;
        _this.loadMusic(_this.indexControl.prev());
      })
      //下一首
      this.controlBtns[3].addEventListener('touchend', function () {
        player.audio.status = 'play';
        // _this.index++;
        // _this.index> _this.dataList.length-1?_this.index = 0: _this.index;
        _this.loadMusic(_this.indexControl.next());
      })

      this.controlBtns[2].addEventListener('touchend', function () {
        //暂停歌曲
        if (player.audio.status === 'play') {
          player.audio.pause();
          this.className = '';
          clearInterval(_this.timer);
        } else {    //  播放歌曲
          player.audio.play();
          this.className = 'Listening';
          _this.imgRotate(_this.deg)
        }
      })
    },
    //图片旋转
    imgRotate: function (deg) {
      var _this = this;
      clearInterval(this.timer);
      this.timer = setInterval(function () {
        deg = +deg + 0.6;
        _this.deg = deg;
        _this.record.style.transform = "rotate(" + deg + "deg)";
      }, 61)
    },
    listCon:function () {
      this.list = player.listControl(this.dataList,this.wrap);
      var _this = this;
      this.controlBtns[4].addEventListener('touchend',function () {
        _this.list.show()
      })
      document.querySelector('.close').addEventListener('touchend',function () {
        _this.list.hide()
      })
      this.domData = this.list.music;
      this.domData[4].className = 'nowing'
      this.list.music.forEach(function (item,index) {
        item.addEventListener('touchend',function () {
          if(_this.index == index) {
            return;
          }
          player.audio.status = 'play';
          _this.indexControl.index = index;
          _this.loadMusic(index);
        })
      })
    }
  }
  var music = new MusicPlayer(document.querySelector('.wrap'));
  music.init();
})(window.Zepto, window.player)