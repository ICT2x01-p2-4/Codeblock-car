// Static images
const car = '<i class="bi bi-cart-fill"></i>';
const arrow_up = '<i class="bi bi-arrow-up-circle-fill"></i>';
const arrow_down = '<i class="bi bi-arrow-down-circle-fill"></i>';
const arrow_left = '<i class="bi bi-arrow-left-circle-fill"></i>';
const arrow_right = '<i class="bi bi-arrow-right-circle-fill"></i>';
const crash = '<i class="bi bi-exclamation-square-fill"></i>';

// Replace starting block with image of car
document.getElementById('grid-1').innerHTML = car;

var start_cell = 'grid-1';

// Direction 1 = up, 2 = right, 3 = down, 4 = left
var direction = 2;

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
        else if (document.getElementById(next_cell).className === "clicked") {
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


execute_test()