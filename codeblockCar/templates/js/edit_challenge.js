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

/**
 * Function to trigger custom alert using Modals
 *
 * @param {*} title
 * @param {*} msg
 */
 function updateAlert(title, msg) {
    var modal = $('#alert-popup');
    console.log(modal)

    // Set the contents of the modal
    modal.find('.modal-title').text(title);
    modal.find('.modal-body p').text(msg);

    // Show the modal
    modal.modal('show');
}

var lastClicked;
createGrid();
let gridSize = document.querySelector('.gridSize');
gridSize.addEventListener('change', () => {
    if ($(".grid")) {
        $(".grid").remove();
    }
    createGrid();
});

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
                console.log(i, map[i])
                if (map[i] == "1"){
                    cell.className = "clicked"
                    console.log("HIT" + i)
                }
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

function createGrid(e) {
    var grid = clickableGrid($('#gridSize').val(), $('#gridSize').val(), function (el, row, col, i){
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
    document.getElementById('gridSpace').appendChild(grid);
}

$('#saveGrid').on('click', function(e) {
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
    console.log(gridArray);

    $.ajax({
        type: "POST",
        url: "",
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            "id": id,
            "map": gridArray
        },
        error: function () {
            // Show error message when unexpected errors occur
            updateAlert("Error", "Error");
        },
        success: function () {
            updateAlert("Success!", "The challenge is successfully updated.");
            setTimeout(function() {
                window.location.href='/challenge';
            }, 1600);
        }
    });
})