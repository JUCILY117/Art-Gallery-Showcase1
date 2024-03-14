const add_pin_modal = document.querySelector('.add_pin_modal');

document.querySelector('.add_pin').addEventListener('click', () => {
    add_pin_modal.style.opacity = 1;
    add_pin_modal.style.pointerEvents = 'all';
});

document.querySelector('.add_pin_modal').addEventListener('click', (event) => {
    if (event.target === add_pin_modal) {
        reset_modal();
    }
});

let pin_image_blob = null;

document.querySelector('#upload_img').addEventListener('change', (event) => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function () {
                const new_image = new Image();

                new_image.src = reader.result;
                pin_image_blob = reader.result;

                new_image.onload = function () {
                    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

                    new_image.classList.add('pin_max_width');

                    document.querySelector('.add_pin_modal .pin_image').appendChild(new_image);
                    document.querySelector('#upload_img_label').style.display = 'none';

                    modals_pin.style.display = 'block';

                    if (
                        new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                        new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                    ) {
                        new_image.classList.remove('pin_max_width');
                        new_image.classList.add('pin_max_height');
                    }

                    modals_pin.style.opacity = 1;
                };
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    document.querySelector('#upload_img').value = '';
});

document.querySelector('.save_pin').addEventListener('click', () => {
    const users_data = {
        author: 'Jack',
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#pin_description').value,
        destination: document.querySelector('#pin_destination').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector('#pin_size').value,
    };

    create_pin(users_data);
    savePinLocally(users_data); // Save the pin data locally
    reset_modal();
});


// Function to create a pin and append it to the DOM
function create_pin(pin_details) {
    const new_pin = document.createElement('DIV');
    const new_image = new Image();

    new_image.src = pin_details.img_blob;
    new_pin.style.opacity = 0;

    new_image.onload = function () {
        new_pin.classList.add('card');
        new_pin.classList.add(`card_${pin_details.pin_size}`);
        new_image.classList.add('pin_max_width');

        new_pin.innerHTML = `<div class="pin_title">${pin_details.title}</div>
        <div class="pin_modal">
            <div class="modal_head">
                <div class="save_card delete_pin">Delete</div>
            </div>
    
            <div class="modal_foot">
                <div class="destination">
                    <div class="pint_mock_icon_container">
                        <img src="https://img.icons8.com/fluency-systems-filled/48/title.png" alt="destination" class="pint_mock_icon">
                    </div>
                    <span>${pin_details.title}</span>
                </div>
    
                <div class="pint_mock_icon_container">
                    <img src="https://img.icons8.com/fluency-systems-filled/48/level-up.png" alt="send" class="pint_mock_icon">
                </div>
    
                <div class="pint_mock_icon_container">
                    <img src="https://img.icons8.com/android/24/more.png" alt="edit" class="pint_mock_icon">
                </div>
            </div>
        </div>
    
        <div class="pin_image">
        </div>`;


        // Add event listener to the delete button within the pin
        new_pin.querySelector('.delete_pin').addEventListener('click', () => {
            delete_pin(new_pin);
        });


        document.querySelector('.pin_container').appendChild(new_pin);
        new_pin.children[2].appendChild(new_image);

        if (
            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
        ) {
            new_image.classList.remove('pin_max_width');
            new_image.classList.add('pin_max_height');
        }

        new_pin.style.opacity = 1;
    };
    showDeleteAllPinsButton();
}
// Function to delete a pin
function delete_pin(pinElement) {
    const pinnedImages = JSON.parse(localStorage.getItem('pinnedImages')) || [];
    const pinIndex = Array.from(pinElement.parentElement.children).indexOf(pinElement);

    if (pinIndex !== -1) {
        pinnedImages.splice(pinIndex, 1);
        localStorage.setItem('pinnedImages', JSON.stringify(pinnedImages));
    }

    pinElement.remove();

    // Check if there are no pins left, hide the "Delete All Pins" button
    if (document.querySelector('.pin_container').childElementCount === 0) {
        hideDeleteAllPinsButton();
    }
}

// Function to save pin data locally using localStorage
function savePinLocally(pin_details) {
    let pinnedImages = JSON.parse(localStorage.getItem('pinnedImages')) || [];
    pinnedImages.push(pin_details);
    localStorage.setItem('pinnedImages', JSON.stringify(pinnedImages));
}

// Function to load pinned images from localStorage on page load
function loadPinnedImages() {
    let pinnedImages = JSON.parse(localStorage.getItem('pinnedImages')) || [];
    pinnedImages.forEach((pin) => {
        create_pin(pin);
    });
}

// Call loadPinnedImages on page load
loadPinnedImages();

function reset_modal() {
    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

    add_pin_modal.style.opacity = 0;
    add_pin_modal.style.pointerEvents = 'none';
    document.querySelector('#upload_img_label').style.display = 'block';
    modals_pin.style.display = 'none';
    modals_pin.style.opacity = 0;

    if (modals_pin.children[0].children[0]) modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
    document.querySelector('#pin_title').value = '';
    document.querySelector('#pin_description').value = '';
    document.querySelector('#pin_destination').value = '';
    document.querySelector('#pin_size').value = '';
    pin_image_blob = null;
}
// Function to show the "Delete All Pins" button
function showDeleteAllPinsButton() {
    const deleteAllPinsButton = document.querySelector('.delete_all_pins');
    deleteAllPinsButton.classList.add('show-delete-button');
    localStorage.setItem('deleteAllPinsButtonVisible', 'true');
}

// Function to hide the "Delete All Pins" button
function hideDeleteAllPinsButton() {
    const deleteAllPinsButton = document.querySelector('.delete_all_pins');
    deleteAllPinsButton.classList.remove('show-delete-button');
    localStorage.setItem('deleteAllPinsButtonVisible', 'false');
}

// Add this function to check and display the "Delete All Pins" button on page load
function checkAndDisplayDeleteAllPinsButton() {
    const pinContainer = document.querySelector('.pin_container');
    const deleteAllPinsButtonVisible = localStorage.getItem('deleteAllPinsButtonVisible');
    if (pinContainer.childElementCount > 0 || deleteAllPinsButtonVisible === 'true') {
        showDeleteAllPinsButton();
    } else {
        hideDeleteAllPinsButton();
    }
}

checkAndDisplayDeleteAllPinsButton();

// Add this event listener at the end of your JavaScript
document.querySelector('.delete_all_pins').addEventListener('click', () => {
    localStorage.removeItem('pinnedImages'); // Use 'pinnedImages' here, which is consistent with your other code
    document.querySelector('.pin_container').innerHTML = ''; // Remove all pinned images from the container
    hideDeleteAllPinsButton();
    loadPinnedImages(); // Reload pinned images after deleting them
});


