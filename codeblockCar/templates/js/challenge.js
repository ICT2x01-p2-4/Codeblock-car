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

function updateAlert(title, msg) {
    var modal = $('#alert-popup');
    console.log(modal)

    // Set the contents of the modal
    modal.find('.modal-title').text(title);
    modal.find('.modal-body p').text(msg);

    // Show the modal
    modal.modal('show');
}

// $(document).ready(function () {
//     updateAlert("1","1");
//     $('#alert-popup').modal('hide');
//     updateAlert("2","2");
// });

var id = '';

$('.delete-button').on('click', function (event) {
    id = event.target.value;
})

// Prints the ID of the selected challenge to be deleted
$('#confirm-delete').on('show.bs.modal', function (event) {
    // Update modals content
    var modal = $(this);

    // Update modal with ID
    modal.find('.modal-body p').text('Confirm delete challenge #' + id + '?');
})

$('#delete-challenge').on('click', function(e) {
    $('#confirm-delete').modal('hide');
    e.preventDefault();
    
    if (id == "") {
        alert('Error selecting target to delete. Please try again.');
    }
    else {
        $.ajax({
            type: "POST",
            url: $('#delete-challenge').attr("data-url"),
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            data: {
                "challenge_id": id
            },
            error: function () {
                // Show error message when unexpected errors occur
                updateAlert("Error", "Error");
            },
            success: function () {
                // alert("Success!");
                updateAlert("Success!", "The challenge is successfully deleted.");
                setTimeout(function() {
                    window.location.href='/challenge';
                }, 3000);
                
            }
        });
    }
})
    
   
