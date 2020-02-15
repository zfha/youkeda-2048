function Render() {
  this.tileContainer = document.querySelector('.tile-container');
  this.statusContainer = document.querySelector('.status');
  this.scoreContainer = document.querySelector('.now .value');
  this.bestScoreContainer = document.querySelector('.best .value');
  this.navContainer = document.querySelector('nav');
  this.score = 0;
}

Render.prototype.render = function(
  grid,
  { status = 'DOING', score, bestScore }
) {
  this.empty();
  const cells = grid.contentCells();
  for (let i = 0; i < cells.length; i++) {
    this.renderTile(cells[i]);
  }
  this.renderStatus(status);
  this.renderScore(score, bestScore);
};

Render.prototype.empty = function() {
  this.tileContainer.innerHTML = '';
};

Render.prototype.renderStatus = function(status) {
  if (status === 'DOING') {
    this.statusContainer.style.display = 'none';
    return;
  }
  this.statusContainer.style.display = 'flex';
  this.statusContainer.querySelector('.content').innerHTML =
    status === 'WIN' ? 'You Win!' : 'Game Over!';
};

Render.prototype.renderScore = function(score, bestScore) {
  const diff = score - this.score;
  this.score = score;

  this.scoreContainer.innerHTML = score;
  this.bestScoreContainer.innerHTML = bestScore;

  if (diff > 0) {
    const addition = document.createElement('div');
    addition.classList.add('score-addition');
    addition.innerHTML = '+' + diff;
    this.scoreContainer.appendChild(addition);
  }
};

Render.prototype.renderTile = function(tile) {
  const tileDom = document.createElement('div');
  const tileInnerDom = document.createElement('div');
  let classList = [
    'tile',
    `tile-${tile.value}`,
    `tile-position-${tile.row + 1}-${tile.column + 1}`
  ];

  if (tile.prePosition) {
    classList[2] = `tile-position-${tile.prePosition.row + 1}-${tile.prePosition
      .column + 1}`;
    setTimeout(function() {
      classList[2] = `tile-position-${tile.row + 1}-${tile.column + 1}`;
      tileDom.setAttribute('class', classList.join(' '));
    }, 16);
  } else if (tile.mergedTiles) {
    classList.push('tile-merged');
    tileDom.setAttribute('class', classList.join(' '));

    for (let i = 0; i < tile.mergedTiles.length; i++) {
      this.renderTile(tile.mergedTiles[i]);
    }
  } else {
    classList.push('tile-new');
  }
  tileInnerDom.innerHTML = tile.value;
  tileInnerDom.classList = ['tile-inner'];
  tileDom.appendChild(tileInnerDom);
  tileDom.setAttribute('class', classList.join(' '));
  this.tileContainer.appendChild(tileDom);
};
