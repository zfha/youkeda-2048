function Render() {
  this.tileContainer = document.querySelector('.tile-container');
}

Render.prototype.render = function(grid) {
  const cells = grid.contentCells();
  for (let i = 0; i < cells.length; i++) {
    this.renderTile(cells[i]);
  }
};
Render.prototype.renderTile = function(tile) {
  const tileDom = document.createElement('div');
  let classList = [
    'tile',
    `tile-${tile.value}`,
    `tile-position-${tile.x + 1}-${tile.y + 1}`
  ];
  tileDom.innerHTML = tile.value;
  tileDom.setAttribute('class', classList.join(' '));
  this.tileContainer.appendChild(tileDom);
};
