//渲染模块：图片，歌曲信息，是否喜欢
;(function (root) {
  var divImg = document.querySelector('.img img');
  var divSongInfo = document.querySelector('.songInformation');
  var divBtnControl = document.querySelector('#divLi');
  //图片
  function renderImg(src) {
    root.blurImg(src);
    divImg.src = src;
  }
  //歌曲信息
  function renderInfo(data) {
    var str = `<h2 class="songName">${data.name}</h2>
    <div class="SingerName">${data.album}</div>
    <div class="album">${data.singer}</div>`
    divSongInfo.innerHTML = str;
  }
  //是否喜欢
  function renderLike(isLike) {
    if(isLike) {
      divBtnControl.className = 'liking'
    }
  }

  root.render = function (data) {
    renderImg(data.image);
    renderInfo(data);
    renderLike(data.isLike);
  };

})(window.player || (window.player = {}))