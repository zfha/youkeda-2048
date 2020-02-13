let grid = new Grid();
let render = new Render();

for (let i = 0; i < 3; i++) {
  const position = grid.randomAvailableCell();
  grid.add(new Tile(position, 2));
}

console.log('----', grid.cells);

render.render(grid);
