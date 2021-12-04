/**
 * Function to get a value in the Cookie
 * 
 * @param {string} name
 * @return {string} The value of the Cookie variable
 */
 function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// Get the csrf token for POST request
const csrftoken = getCookie('csrftoken');

var lastClicked;
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
        console.log("You clicked on element:", el);
        console.log("You clicked on row:", row);
        console.log("You clicked on col:", col);
        console.log("You clicked on item #:", i);

        if ((row != 0 || col != 0) && (row != ($('#gridSize').val() - 1) || col != ($('#gridSize').val() - 1))) {
            if (el.className == 'clicked'){
                el.className = '';
            }
            else {
                el.className = 'clicked';
            }
        }

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
                cell.id = i;
            }
            else if (i == (rows * cols) - 1) {
                cell.innerHTML = "End"
                cell.bgColor = 'red'
                i++;
                cell.id = i;
            }
            else {
                cell.innerHTML = ++i;
                cell.id = i;
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

$('#saveGrid').on('click', function(e) {
    if ($('#challenge-name').val() == '') {
        alert('Please fill in Challenge Name.');
    }
    else {
        e.preventDefault();
        var gridArray = '';
        for (var rows = 0; rows < $('#gridSize').val(); ++rows ){
            for (var cols = 0; cols < $('#gridSize').val(); ++cols){
                var element = cols + 1 + ($('#gridSize').val()*rows)
                // console.log(element)
                console.log(document.getElementById(element.toString()))
                if (document.getElementById(element.toString()).className == "clicked"){
                    gridArray += '1,';
                }
                else{
                    gridArray += '0,';
                }
            }
        }
        // Remove extra comma at the end
        gridArray = gridArray.substring(0, gridArray.length - 1);
        // Log this data to the console
        console.log($('#challenge-name').val());
        console.log(gridArray);
        console.log($('#difficulty').val());

        $.ajax({
            type: "POST",
            url: "",
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            data: {
                "name": $('#challenge-name').val(),
                "map": gridArray,
                "difficulty": $('#difficulty').val()
            },
            error: function () {
                alert("Error");
            },
            success: function () {
                alert("Success");
                window.location.href='/challenge';
            }
        });
    }
})
    
   
