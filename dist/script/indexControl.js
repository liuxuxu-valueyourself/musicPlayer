//索引及边界控制
;(function (root) {
  function Index(len) {
    this.index = 4;     //默认歌曲
    this.len = len;     //歌曲的总数
  }
  Index.prototype = {
    prev:function () {
      return this.get(-1);
    },
    next:function () {
      return this.get(1);
    },
    get:function (val) {
      this.index = (this.index + val + this.len)%this.len;
      return this.index;
    },
  }
  root.indexControl = Index;

})(window.player || (window.player = {}))