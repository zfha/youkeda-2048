// {x, y} 表示一个向量
// { row: -1, column: 0 } 向上
// { row: 1, column: 0 }  向下
// { row: 0, column: -1 } 向左
// { row: 0, column: 1 }  向右
function Listener(callback) {
  window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
      case 38:
        callback({ row: -1, column: 0 });
        break;
      case 37:
        callback({ row: 0, column: -1 });
        break;
      case 39:
        callback({ row: 0, column: 1 });
        break;
      case 40:
        callback({ row: 1, column: 0 });
        break;
    }
  });
}
