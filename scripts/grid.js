function Grid(size = 4) {
  this.size = size;
  this.cells = this.init(size);
}

Grid.prototype.init = function(size) {
  let cells = [];
  for (let x = 0; x < size; x++) {
    cells.push([]);
    for (let y = 0; y < size; y++) {
      cells[x][y] = null;
    }
  }
  return cells;
};

Grid.prototype.add = function(tile) {
  this.cells[tile.x][tile.y] = tile;
};

Grid.prototype.randomAvailableCell = function() {
  const cells = this.availableCells();
  if (cells.length > 0) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

Grid.prototype.contentCells = function() {
  const cells = [];
  for (let x = 0; x < grid.size; x++) {
    for (let y = 0; y < grid.size; y++) {
      if (this.cells[x][y]) {
        cells.push(this.cells[x][y]);
      }
    }
  }
  return cells;
};

Grid.prototype.availableCells = function() {
  const availableCells = [];
  for (let x = 0; x < this.cells.length; x++) {
    for (let y = 0; y < this.cells[x].length; y++) {
      if (!this.cells[x][y]) {
        availableCells.push({ x, y });
      }
    }
  }
  return availableCells;
};
