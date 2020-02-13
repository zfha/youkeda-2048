function Manager(size = 4) {
  this.size = size;
  this.grid = new Grid(size);
  this.render = new Render();
  this.listener = new Listener(this.listenerFn);
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
  const { xPath, yPath } = this.paths;
  for (let i = 0; i < xPath.length; i++) {
    for (let j = 0; j < yPath.length; j++) {
      const position = { x: xPath[i], y: yPath[j] };
      const tile = this.grid.get(position);
      if (tile) {
      }
    }
  }
};

Manager.prototype.paths = function(direction) {
  const xPath = [];
  const yPath = [];
  for (let i = 0; i < this.size; i++) {
    xPath.push(i);
    yPath.push(i);
  }

  if (direction.x === 1) {
    yPath = yPath.reverse();
  }
  if (direction.y === 1) {
    xPath = xPath.reverse();
  }
  return {
    xPath,
    yPath
  };
};
