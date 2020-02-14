function Manager(size = 4) {
  this.size = size;
  this.grid = new Grid(size);
  this.render = new Render();
  let self = this;
  this.listener = new Listener(function(direction) {
    self.listenerFn(direction);
  });
  this.start();
}

Manager.prototype.start = function() {
  for (let i = 0; i < 3; i++) {
    const position = this.grid.randomAvailableCell();
    this.grid.add(new Tile(position, 2));
  }

  this.render.render(this.grid);
};

Manager.prototype.listenerFn = function(direction) {
  const { rowPath, columnPath } = this.getPaths(direction);
  for (let i = 0; i < rowPath.length; i++) {
    for (let j = 0; j < columnPath.length; j++) {
      const position = { row: rowPath[i], column: columnPath[j] };
      const tile = this.grid.get(position);
      if (tile) {
        const { aim, next } = this.getNearestAvaibleAim(position, direction);
        this.moveTile(tile, aim);
      }
    }
  }
  this.render.render(this.grid);
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
