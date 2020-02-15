const BestScoreKey = '2048BestScore';
const CellStateKey = '2048CellState';
function Storage() {}

Storage.prototype.setBestScore = function(bestScore) {
  window.localStorage.setItem(BestScoreKey, bestScore);
};

Storage.prototype.getBestScore = function(bestScore) {
  return window.localStorage.getItem(BestScoreKey);
};

Storage.prototype.setCellState = function({ score, grid }) {
  window.localStorage.setItem(
    CellStateKey,
    JSON.stringify({
      score,
      grid: grid.serialize()
    })
  );
};

Storage.prototype.getCellState = function() {
  const cellState = window.localStorage.getItem(CellStateKey);
  return cellState ? JSON.parse(cellState) : null;
};
