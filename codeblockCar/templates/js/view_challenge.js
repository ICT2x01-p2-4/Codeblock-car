var lastClicked;

console.log(a)
createGrid();
let gridSize = document.querySelector('.gridSize');
gridSize.addEventListener('change', (event) => {
    if ($(".grid")) {
        $(".grid").remove();
    }
    createGrid();
})

function createGrid(e) {
    var grid = clickableGrid($('#gridSize').val(), $('#gridSize').val(), function (el, row, col, i) {

    });
    document.getElementById('gridSpace').appendChild(grid)
}

function clickableGrid(rows, cols, callback) {
    var i = 0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r = 0; r < rows; ++r) {
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c = 0; c < cols; ++c) {
            var cell = tr.appendChild(document.createElement('td'));
            if (i == 0) {
                cell.innerHTML = "Start"
                cell.bgColor = 'green'
                i++;
            }
            else if (i == (rows * cols) - 1) {
                cell.innerHTML = "End"
                cell.bgColor = 'red'
                i++;
            }
            else {
                if (a[i] == "1"){
                    cell.className = "clicked"
                    console.log("HIT" + i)
                }
                cell.innerHTML = ++i;
            }
            cell.addEventListener('click', (function (el, r, c, i) {
                return function () {
                    callback(el, r, c, i);
                }
            })(cell, r, c, i), false);
        }
    }
    return grid;
}