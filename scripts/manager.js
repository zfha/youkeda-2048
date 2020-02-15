function Manager(size = 4, aim = 2048) {
  this.size = size;
  this.aim = aim;
  this.render = new Render();
  this.storage = new Storage();
  let self = this;
  this.listener = new Listener({
    move: function(direction) {
      self.listenerFn(direction);
    },
    start: function() {
      self.start(true);
    }
  });
  this.start();
}

Manager.prototype.renderWrapper = function() {
  this.storage.setBestScore(this.bestScore);
  this.storage.setCellState({
    score: this.score,
    grid: this.grid
  });
  this.render.render(this.grid, {
    status: this.status,
    score: this.score,
    bestScore: this.bestScore
  });
};

Manager.prototype.start = function(force) {
  this.bestScore = this.storage.getBestScore() || 0;
  const state = this.storage.getCellState();
  if (!state || force) {
    this.score = 0;
    this.status = 'DOING';
    this.grid = new Grid(this.size);

    for (let i = 0; i < 2; i++) {
      this.addRandomTile();
    }
  } else {
    this.score = state.score;
    this.status = 'DOING';
    this.grid = new Grid(this.size, state.grid);
  }

  this.renderWrapper();
};

Manager.prototype.addRandomTile = function() {
  const position = this.grid.randomAvailableCell();
  if (position) {
    let value = Math.random() < 0.9 ? 2 : 4;
    let tile = new Tile(position, value);
    this.grid.add(tile);
  }
};

Manager.prototype.listenerFn = function(direction) {
  if (this.status !== 'DOING') {
    return;
  }

  let moved = false;
  this.clearMergedTile();

  const { rowPath, columnPath } = this.getPaths(direction);
  for (let i = 0; i < rowPath.length; i++) {
    for (let j = 0; j < columnPath.length; j++) {
      const position = { row: rowPath[i], column: columnPath[j] };
      const tile = this.grid.get(position);
      if (tile) {
        const { aim, next } = this.getNearestAvaibleAim(position, direction);
        if (next && next.value === tile.value) {
          const merged = new Tile(
            {
              row: next.row,
              column: next.column
            },
            tile.value * 2
          );
          merged.mergedTiles = [tile, next];
          this.score += merged.value;
          if (this.score > this.bestScore) {
            this.bestScore = this.score;
          }
          this.grid.add(merged);
          this.grid.remove(tile);

          tile.updatePosition({ row: next.row, column: next.column });
          if (merged.value === this.aim) {
            this.status = 'WIN';
          }
          moved = true;
        } else {
          this.moveTile(tile, aim);
          moved = true;
        }
      }
    }
  }

  if (moved) {
    this.addRandomTile();

    if (this.checkFailure()) {
      this.status = 'FAILURE';
    }

    this.renderWrapper();
  }
};

Manager.prototype.clearMergedTile = function() {
  for (let row = 0; row < this.grid.size; row++) {
    for (let column = 0; column < this.grid.size; column++) {
      const tile = this.grid.get({ row, column });
      if (tile) {
        tile.mergedTiles = null;
      }
    }
  }
};

Manager.prototype.checkFailure = function() {
  const emptyCells = this.grid.availableCells();
  if (emptyCells.length > 0) {
    return false;
  }

  for (let row = 0; row < this.grid.size; row++) {
    for (let column = 0; column < this.grid.size; column++) {
      let now = this.grid.get({ row, column });
      let directions = [
        { row: 0, column: 1 },
        { row: 0, column: -1 },
        { row: 1, column: 0 },
        { row: -1, column: 0 }
      ];
      for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const next = this.grid.get({
          row: row + direction.row,
          column: column + direction.column
        });
        if (next && next.value === now.value) {
          return false;
        }
      }
    }
  }
  return true;
};

Manager.prototype.moveTile = function(tile, aim) {
  this.grid.cells[tile.row][tile.column] = null;
  this.grid.cells[aim.row][aim.column] = tile;
  tile.updatePosition(aim);
};

Manager.prototype.getPaths = function(direction) {
  let rowPath = [];
  let columnPath = [];
  for (let i = 0; i < this.size; i++) {
    rowPath.push(i);
    columnPath.push(i);
  }

  if (direction.column === 1) {
    columnPath = columnPath.reverse();
  }
  if (direction.row === 1) {
    rowPath = rowPath.reverse();
  }
  return {
    rowPath,
    columnPath
  };
};

/**
 * 1. 获取最近的移动位置
 * 2. 获取最近的节点
 *
 */
Manager.prototype.getNearestAvaibleAim = function(aim, direction) {
  function addVector(position, direction) {
    return {
      row: position.row + direction.row,
      column: position.column + direction.column
    };
  }
  aim = addVector(aim, direction);
  let next = this.grid.get(aim);
  while (!this.grid.outOfRange(aim) && !next) {
    aim = addVector(aim, direction);
    next = this.grid.get(aim);
  }

  aim = {
    row: aim.row - direction.row,
    column: aim.column - direction.column
  };
  return {
    aim,
    next
  };
};
