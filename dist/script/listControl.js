//list列表控制
;(function (root, document) {
  function listControl(data, wrap) {
    var list = document.createElement('div'),
      dl = document.createElement('dl'),
      dt = document.createElement('dt'),
      close = document.createElement('div');
    list.className = 'Pop-up-List';
    close.className = 'close';
    dt.innerHTML = '播放列表';
    close.innerHTML = '关闭';

    dl.appendChild(dt);

    var domList = [];     //为主模块暴露所有dom，以便于主模块监听每个dom点击事件

    data.forEach(function (item, index) {
        var dd = document.createElement('dd');
        dd.innerHTML = item.name;
        domList.push(dd);
        dd.addEventListener('touchend', function () {
          try {
            document.querySelector('.nowing').className = '';
          } catch {
            console.log('no')
          }
          this.className = 'nowing';
          hide();   //点击后使list部分隐藏
        })
        dl.appendChild(dd);
      }),

      list.appendChild(dl);
    list.appendChild(close);
    wrap.appendChild(list);

    var disY = list.offsetHeight;
    list.style.transform = 'translateY(' + disY + 'px)';

    //使list隐藏
    function show() {     
      list.style.transform = 'translateY(0px)';
    }
    //使list显示
    function hide() {
      list.style.transform = 'translateY(' + disY + 'px)';
    }

    return {
      music: domList,
      show: show,
      hide: hide,
    }
  }
  root.listControl = listControl;

})(window.player || (window.player = {}), document)