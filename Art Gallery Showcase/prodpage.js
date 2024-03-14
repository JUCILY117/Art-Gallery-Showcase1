
const sizeSelect = document.getElementById('size-select');

sizeSelect.addEventListener('change', (event) => {
  const selectedSize = event.target.value;

});

const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);





  // const nav = document.querySelector(".nav"),
  // searchIcon = document.querySelector("#searchIcon"),
  // navOpenBtn = document.querySelector(".navOpenBtn"),
  // navCloseBtn = document.querySelector(".navCloseBtn");

// searchIcon.addEventListener("click", () => {
//   nav.classList.toggle("openSearch");
//   nav.classList.remove("openNav");
//   if (nav.classList.contains("openSearch")) {
//     return searchIcon.classList.replace("fa-search", "fa-times");
//   }
//   searchIcon.classList.replace("fa-times", "fa-search");
// });

// navOpenBtn.addEventListener("click", () => {
//   nav.classList.add("openNav");
//   nav.classList.remove("openSearch");
//   searchIcon.classList.replace("fa-times", "fa-search");
// });

// navCloseBtn.addEventListener("click", () => {
//   nav.classList.remove("openNav");
// });

//cart botif
const addToCartBtn = document.querySelector('.btn1'); // Select the "Add to Cart" button

addToCartBtn.addEventListener('click', () => {
  const notification = document.createElement('div'); // Create a new div element
  notification.classList.add('notification'); // Add the notification class
  notification.textContent = 'Added to cart successfully'; // Set the notification text

  document.body.appendChild(notification); // Append the notification to the document body

  // Trigger reflow to enable the transition
  notification.offsetWidth;

  notification.classList.add('show'); // Add the show class to slide in the notification

  // Set a timeout to remove the notification after a few seconds
  setTimeout(() => {
    notification.classList.remove('show'); // Remove the show class to hide the notification
    setTimeout(() => {
      notification.remove(); // Remove the notification from the DOM
    }, 500); // Wait for the transition to complete before removing the element
  }, 1500); // Adjust the timeout duration as needed
});

