const addBookButton = document.querySelector(".add-book-button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

let library = JSON.parse(localStorage.getItem("library") || "[]");

// get index from latest book in library OR 0
let index =
  library[library.length - 1] !== undefined
    ? library[library.length - 1].index + 1
    : 0;

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
  localStorage.setItem("library", JSON.stringify(library));
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
  library = JSON.parse(localStorage.getItem("library"));
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
  localStorage.setItem("library", JSON.stringify(library));
}

if (library.length > 0) displayLibrary();

function clearLibrary() {
  localStorage.clear();
  content.innerHTML = "";
  library = JSON.parse(localStorage.getItem("library") || "[]");
  index =
    library[library.length - 1] !== undefined
      ? library[library.length - 1].index + 1
      : 0;
}

const clearLibraryBtn = document.querySelector(".clear-library-button");
clearLibraryBtn.addEventListener("click", clearLibrary);
