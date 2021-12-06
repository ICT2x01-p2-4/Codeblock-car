/**
 * Function to select colour of Blockly Blocks.
 *
 * @param {int} id
 * @return {int} Returns the appropriate colour code for Blockly.
 */
 function selectColour(id) {
    if (id == 1) {
        return 120;
    }
    else if (id == 2) {
        return 225;
    }
    else if (id == 3) {
        return 300;
    }
    else if (id == 4) {
        return 0;
    }
    else {
        return 160;
    }
}

/**
 * Generates a block object used for initializing Blockly Blocks.
 */
class block {
    /**
     * Creates an instance of block, initializes JSON variable required for configuring Blockly Blocks.
     * 
     * @param {int} id
     * @memberof block
     */
    constructor(id) {
        // Should have some checkers here to throw exception
        this.name = document.getElementById(id).getAttribute('type')
        this.blockly_json = {
            "type": this.name,
            "message0": this.name,
            "colour": selectColour(id),
            "previousStatement": null,
            "nextStatement": null,
        }
    }
}


for (let i = 1; i < 5; i++) {
    let b = new block(i);
    Blockly.Blocks[b.name] = {
        init: function () {
            this.jsonInit(b.blockly_json)
        }
    }
    // Format the output
    Blockly.Python[b.name] = function () {
        return i.toString();
    };
}

// Script for the tool box for blockly
var workspace = Blockly.inject('blocklyDiv',
    {
        toolbox: document.getElementById('toolbox'),
        zoom:
        {
            controls: true,
            wheel: false,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: true
        },
        grid: {
            spacing: 20,
            length: 4,
            colour: '#888',
            snap: false
        },

        trashcan: true,
        toolbox: toolbox,
        collapse: false,
        comments: false,
        disable: false,
        maxBlocks: Infinity,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: 'https://blockly-demo.appspot.com/static/media/',
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
    }
);

// Prints the code generated from Blockly when button is pressed
$('#code-checker').on('show.bs.modal', function (event) {
    Blockly.Python.addReservedWords('code');
    var code = Blockly.Python.workspaceToCode(workspace);
    
    // Update modals content
    var modal = $(this)

    // Update modal with code generated
    modal.find('.modal-body p').text(code)
})

// Prints the code generated from Blockly when button is pressed
$('#send-command').on('show.bs.modal', function (event) {
    // Update modals content
    var modal = $(this)

    // Update modal with code generated
    modal.find('.modal-body p').text("Are you sure you want to send commands?")
})

$('#testCommands').on('click',function (e) {
    var code = Blockly.Python.workspaceToCode(workspace);
    var modal = $(this)
    console.log(modal.find('.modal-body p').text(code))
})

var lastClicked;
createGrid();
// let gridSize = document.querySelector('.gridSize');
// gridSize.addEventListener('change', () => {
//     if ($(".grid")) {
//         $(".grid").remove();
//     }
//     createGrid();
// });

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
            // cell.addEventListener('click', (function (el, r, c, i) {
            //     return function () {
            //         callback(el, r, c, i);
            //     }
            // })(cell, r, c, i), false);
        }
    }
    return grid;
}

function createGrid(e) {
    var grid = clickableGrid(3, 3, function (el, row, col, i){
        console.log("You clicked on element:", el);
        console.log("You clicked on row:", row);
        console.log("You clicked on col:", col);
        console.log("You clicked on item #:", i);

        if ((row != 0 || col != 0) && (row != (3 - 1) || col != (3 - 1))) {
            if (el.className == 'clicked'){
                el.className = '';
            }
            else {
                el.className = 'clicked';
            }
        }
    });
    document.getElementById('tutGridSpace').appendChild(grid);
}
