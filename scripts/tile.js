function Tile(position, value) {
  this.row = position.row;
  this.column = position.column;
  this.value = value;
}

Tile.prototype.updatePosition = function(position) {
  this.row = position.row;
  this.column = position.column;
};
