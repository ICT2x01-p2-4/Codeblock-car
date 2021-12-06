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

    // Update modal with confirmation
    modal.find('.modal-body p').text("Are you sure you want to send commands?")
    
})

$('.confirmSendCommands').on('click', function (e){


    console.log("HIt")
    Blockly.Python.addReservedWords('code');
    var code = Blockly.Python.workspaceToCode(workspace);
    console.log(code)
    
    $.ajax({
        type: "POST",
        url: "",
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            "commands": code
        },
        error: function () {
            // Show error message when unexpected errors occur
            updateAlert("Error", "Error");
        },
        success: function () {
            // updateAlert("Success!", "The command has been sent");
            // setTimeout(function() {
            //     window.location.href='/challenge';
            // }, 1600);
        }
    });
});

// Static images
const car = '<i class="bi bi-cart-fill"></i>';
const arrow_up = '<i class="bi bi-arrow-up-circle-fill"></i>';
const arrow_down = '<i class="bi bi-arrow-down-circle-fill"></i>';
const arrow_left = '<i class="bi bi-arrow-left-circle-fill"></i>';
const arrow_right = '<i class="bi bi-arrow-right-circle-fill"></i>';
const crash = '<i class="bi bi-exclamation-square-fill"></i>'

// Replace starting block with image of car
document.getElementById('grid-1').innerHTML = car

var test_commands = '';
var start_cell = 'grid-1'

// Direction 1 = up, 2 = right, 3 = down, 4 = left
var direction = 2

$('#test-code').on('click', (e) => {
    if (getCode() == "data = ''\n") {
        updateAlert("Error", "Nothing inside the workspace!");
    }
    else {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/coding/testcode",
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            data: {
                // Get the data to be sent
                "code": getCode(),
                "log": false
            },
            error: function () {
                // Show error message when unexpected errors occur
                updateAlert("Error", "Error");
            },
            success: function (response) {
                updateAlert("Success!", "You can now control the test!");
                console.log('Data: ' + response)

                test_commands = response;
                
                // Reveal hidden button
                $("#run-command").removeClass("hidden");
                document.getElementById("run-command").addEventListener("click", execute_test);

                // setTimeout(function() {}, 1600);
            }
        });
    }
});

function calculate_cells(cell, cmd) {

    // Get the current cell
    current_cell = $('#'+cell).val()
    var updated_cell_val = current_cell

    console.log('Before update cell: ' + updated_cell_val)

    // Logic to update the grid
    if (cmd == 1) {
        // Move upward
        if (direction == 1) {
            // Ensure that not a wall cell
            if (current_cell => 1 && current_cell <= map_size) {
                updated_cell_val = 0
            }
            else {
                updated_cell_val = parseInt(current_cell) - parseInt(map_size)
                // Move upward
                document.getElementById(cell).innerHTML = arrow_up
            }
        }
        // Move Right
        else if (direction == 2) {
            // Ensure that not a wall cell
            if (current_cell % map_size == 0) {
                updated_cell_val = 0
            }
            else {
                updated_cell_val = parseInt(current_cell) + 1
                // Move down
                document.getElementById(cell).innerHTML = arrow_right
            }
        }
        // Move Down
        else if (direction == 3) {
            // Ensure that not a wall cell
            if (current_cell => (map_size * map_size - map_size + 1) && current_cell <= (map_size * map_size)) {
                updated_cell_val = 0
            }
            else {
                updated_cell_val = parseInt(current_cell) - parseInt(map_size)
                // Move right
                document.getElementById(cell).innerHTML = arrow_down
            }
        }
        // Move Left
        else if (direction == 4) {
            // Ensure that not a wall cell
            if ((current_cell + map_size - 1) % map_size == 0) {
                updated_cell_val = 0
            }
            else {
                updated_cell_val = parseInt(current_cell) - 1
                // Move left
                document.getElementById(cell).innerHTML = arrow_left
            }
        }
    }
    else if (cmd == 2) {
        // Turn left
        direction -= 1
    }
    else if (cmd == 3) {
        // Turn right
        direction += 1
    }

    console.log('Updated cell: ' + updated_cell_val)

    // Return the updated cell id
    return 'grid-' + updated_cell_val.toString()
}

function execute_test() {
    // Set the first cell to be starting point
    var prev_cell = start_cell

    // Ensure that there are commands to be run
    for (let i = 0; i < test_commands.length; i++) {
        // Get command based on position in string
        cmd = test_commands.charAt(i)

        console.log('Running command: ' + cmd.toString())

        var next_cell = calculate_cells(prev_cell, cmd)

        console.log('next cell: ' + next_cell)

        // Ensure that not gone out of range
        if (next_cell === 'grid-0') {
            // Send alert message
            updateAlert("Bang!", "Oops! Your car ran out of range. Please try again...");
            document.getElementById(prev_cell).innerHTML = crash
            // Hide the button again
            $("#run-command").addClass("hidden");
            return 1
        }
        // Ensure that a wall is not hit
        else if (next_cell.className === "clickable") {
            // Send alert message
            updateAlert("Bang!", "Oops! Your car bang the wall. Please try again...");
            document.getElementById(prev_cell).innerHTML = crash
            // Hide the button again
            $("#run-command").addClass("hidden");
            return 1
        }
        else {
            document.getElementById(next_cell).innerHTML = car
        }
        
        // Move the car position
        prev_cell = next_cell

        console.log('previous cell: ' + next_cell)
        
        // Sleep for 2s
        setTimeout(() => {}, 2000);
    }

    if (prev_cell != 'grid-' + (map_size*map_size).toString()) {
        // Send success message
        updateAlert("Uh oh", "No more commands...");
        // Hide the button again
        $("#run-command").addClass("hidden");
        return 0;
    }
    // Send success message
    updateAlert("Yay!", "You did it!");
    // Hide the button again
    $("#run-command").addClass("hidden");
    return 0;
}
