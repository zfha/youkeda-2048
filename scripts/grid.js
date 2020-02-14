function Grid(size = 4) {
  this.size = size;
  this.cells = this.init(size);
}

Grid.prototype.init = function(size) {
  let cells = [];
  for (let row = 0; row < size; row++) {
    cells.push([]);
    for (let column = 0; column < size; column++) {
      cells[row][column] = null;
    }
  }
  return cells;
};

Grid.prototype.add = function(tile) {
  this.cells[tile.row][tile.column] = tile;
};

Grid.prototype.get = function(position) {
  if (this.outOfRange(position)) {
    return null;
  }
  return this.cells[position.row][position.column];
};

Grid.prototype.outOfRange = function(position) {
  return (
    position.row < 0 ||
    position.row >= this.size ||
    position.column < 0 ||
    position.column >= this.size
  );
};

Grid.prototype.randomAvailableCell = function() {
  const cells = this.availableCells();
  if (cells.length > 0) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

Grid.prototype.contentCells = function() {
  const cells = [];
  for (let row = 0; row < this.size; row++) {
    for (let column = 0; column < this.size; column++) {
      if (this.cells[row][column]) {
        cells.push(this.cells[row][column]);
      }
    }
  }
  return cells;
};

Grid.prototype.availableCells = function() {
  const availableCells = [];
  for (let row = 0; row < this.cells.length; row++) {
    for (let column = 0; column < this.cells[row].length; column++) {
      if (!this.cells[row][column]) {
        availableCells.push({ row, column });
      }
    }
  }
  return availableCells;
};
