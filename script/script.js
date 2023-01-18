const picsEl = document.querySelector(".pics"); // get elements of document
const savedEL = document.querySelector(".saved-items");
const totalItemsInList = document.querySelector(".total-items-in-list");

// render pics on page
function renderPics() {
  pics.forEach((pics) => {
    // for each image in array render this html
    picsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                <div class="heart-like-button"></div>
                    <div class="item-img">
                        <img src="${pics.imgSrc}" alt="${pics.name}">
                    </div>
                    <div class="add-to-list" onclick="addToList(${pics.id})">
                        <img src="./icons/bag-plus.png" alt="add to list">
                    </div>
                </div>
            </div>
        `;
  });
}
renderPics();

let list = JSON.parse(localStorage.getItem("PICS")) || []; // add pics to local storage
updateList();

// add to List
function addToList(id) {
  // check if pics already exist in list
  if (list.some((item) => item.id === id)) {
  } else {
    const item = pics.find((pics) => pics.id === id);
    list.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateList();
}

// update list
function updateList() {
  renderListItems();
  renderTotalItems();
  // save list to local storage
  localStorage.setItem("PICS", JSON.stringify(list));
}

// render list items
function renderListItems() {
  savedEL.innerHTML = ""; // clear list element
  list.forEach((item) => {
    // add nd remove items from saved list and put html on page
    savedEL.innerHTML += `
        <div class="saved-item"> 
            <div class="item-info" onclick="removeItemFromList(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <p class="saved-name">${item.name}</p>
            </div>
        </div>
      `;
  });
}

// calculate and render subtotal
function renderTotalItems() {
  let totalItems = 0;
  list.forEach((item) => {
    totalItems += item.numberOfUnits;
  });

  totalItemsInList.innerHTML = totalItems;
  return renderListItems;
}

// remove item from list
function removeItemFromList(id) {
  list = list.filter((item) => item.id !== id);
  updateList();
}

updateList();
// comment section - some iteas from - https://javascript.plainenglish.io/how-to-create-a-comment-section-using-html-and-vanilla-js-aa6b6a53b9cf

const commentBox = document.querySelector("#newComment");
const commentButton = document.querySelector("#addComments");
const commentRender = document.querySelector("#allComments");
let commentList = [];

// event listener button comments
commentButton.addEventListener("click", commentsIn);

function commentsIn() {
  commentList.push(commentBox.value);
  sessionStorage.setItem("comments", JSON.stringify(commentList));
  updateComments();
}

// update comments on page
function updateComments() {
  commentRender.innerHTML = "";
  commentList.forEach(function (comment, index) {
    commentRender.innerHTML += `
            <div class="commentBox">${comment} <button onclick="removeComment(${index})">x</button></div>
        `;
  });
}
// remove comment
function removeComment(index) {
  commentList.splice(index, 1);
  sessionStorage.setItem("comments", JSON.stringify(commentList));
  updateComments();
}
// retrieve comments from storage
const storedComments = JSON.parse(sessionStorage.getItem("comments")) || [];
commentList = storedComments;
updateComments();

// like button demo reference - https://plantpot.works/2847

const buttons = document.querySelectorAll(".heart-like-button");
//commentButton.addEventListener("click", commentsIn);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // event listener for click
    if (button.classList.contains("liked")) {
      button.classList.remove("liked");
    } else {
      button.classList.add("liked");
    }
  });
});
