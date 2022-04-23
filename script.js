const addBookButton = document.querySelector(".add-book-button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
let library = [];
let index = 0;

class Book {
  constructor(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
  }
}

function addBook(title, author, pages, read, index) {
  const book = new Book(title, author, pages, read, index);
  library.push(book);
}

addBookButton.addEventListener("click", (e) => {
  document.getElementById("overlay").style.display = "block";
});

cancelButton.addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBook(title.value, author.value, pages.value, read.checked, index);
  document.getElementById("overlay").style.display = "none";
  console.table(library);
  displayLibrary();
  index++;
});

const card = document.querySelector(".prototype-card");
const content = document.querySelector(".content");

function displayLibrary() {
  content.innerHTML = "";
  library.forEach((book) => {
    const clone = card.cloneNode(true);
    clone.style.display = "flex";
    clone.setAttribute("data-index", book.index);

    const title = clone.querySelector("#title");
    title.innerText = book.title;
    const author = clone.querySelector("#author");
    author.innerText = book.author;
    const pages = clone.querySelector("#pages");
    pages.innerText = book.pages;
    const read = clone.querySelector("#read");
    read.checked = book.read;
    read.addEventListener("click", () => {
      book.read = read.checked;
    });
    //Dovrshi remove buttonov utre
    const button = clone.querySelector("button");
    button.addEventListener("click", removeBook);

    content.appendChild(clone);
  });
}

function removeBook(e) {
  library = library.filter(
    (book) =>
      book.index !== parseInt(e.target.parentElement.getAttribute("data-index"))
  );
  e.target.parentElement.remove();
}
