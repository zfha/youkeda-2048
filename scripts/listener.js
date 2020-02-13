// [x, y] 表示一个向量
// [0, -1] 向上
// [0, 1]  向下
// [-1, 0] 向左
// [1, 0]  向右
function Listener(callback) {
  window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
      case 38:
        callback([0, -1]);
        break;
      case 37:
        callback([-1, 0]);
        break;
      case 39:
        callback([1, 0]);
        break;
      case 40:
        callback([0, 1]);
        break;
    }
  });
}
