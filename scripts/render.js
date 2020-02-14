function Render() {
  this.tileContainer = document.querySelector('.tile-container');
  this.statusContainer = document.querySelector('.status');
  this.scoreContainer = document.querySelector('.now .value');
}

Render.prototype.render = function(grid, { status = 'DOING', score }) {
  this.empty();
  const cells = grid.contentCells();
  for (let i = 0; i < cells.length; i++) {
    this.renderTile(cells[i]);
  }
  this.renderStatus(status);
  this.renderScore(score);
};

Render.prototype.empty = function() {
  this.tileContainer.innerHTML = '';
};

Render.prototype.renderStatus = function(status) {
  if (status === 'DOING') {
    return;
  }
  this.statusContainer.style.display = 'flex';
  this.statusContainer.querySelector('.content').innerHTML =
    status === 'WIN' ? 'You Win!' : 'Game Over!';
};

Render.prototype.renderScore = function(score) {
  this.scoreContainer.innerHTML = score;
};

Render.prototype.renderTile = function(tile) {
  const tileDom = document.createElement('div');
  let classList = [
    'tile',
    `tile-${tile.value}`,
    `tile-position-${tile.row + 1}-${tile.column + 1}`
  ];
  tileDom.innerHTML = tile.value;
  tileDom.setAttribute('class', classList.join(' '));
  this.tileContainer.appendChild(tileDom);
};
