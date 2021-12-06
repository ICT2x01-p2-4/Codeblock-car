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

// Simple function to compile the code generated by workspace into code
function getCode() {
    Blockly.Python.addReservedWords('code');
    var code = "data = ''\n";
    code += Blockly.Python.workspaceToCode(workspace);
    // code += 'return data';

    return code;
}

for (let i = 1; i < 5; i++) {
    let b = new block(i);
    Blockly.Blocks[b.name] = {
        init: function () {
            this.jsonInit(b.blockly_json)
        }
    }
    // Format the output
    Blockly.Python[b.name] = () => {
        var code = '# ' + b.name + '\n';
        code += 'data += "' + i + '"\n';
        return code;
    }
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
    // Update modals content
    var modal = $(this)

    // Update modal with code generated
    modal.find('.modal-body textarea').text(getCode())
});

// Prints the code generated from Blockly when button is pressed
$('#send-command').on('show.bs.modal', function (event) {
    // Update modals content
    var modal = $(this)

    // Update modal with code generated
    modal.find('.modal-body p').text("Are you sure you want to send commands?")
});

$('#confirm-send').on('click', (e) => {

    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "",
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            // Get the data to be sent
            "code": getCode()
        },
        error: function () {
            // Show error message when unexpected errors occur
            updateAlert("Error", "Error");
        },
        success: function (response) {
            updateAlert("Success!", "Sending Code...");
            console.log(response)
            // setTimeout(function() {}, 1600);
        }
    });
});
  