const myLibrary = [];

const colors = [
    "#C62828",
    "#2E7D32",
    "#F9A825",
    "#1565C0",
    "#EF6C00",
    "#6A1B9A"
];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.color = colors[Math.floor(Math.random() * colors.length)];
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeBook(id) {

    const index = myLibrary.findIndex(book => book.id === id);

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    displayBooks();
}

function displayBooks() {

    const library = document.getElementById("library");

    library.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;
        card.style.backgroundColor = book.color;

        card.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
            <button class="read-btn">
                Change Status
            </button>
            <button class="remove-btn">
                Remove
            </button>
        `;

        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        const readBtn = card.querySelector(".read-btn");
        readBtn.addEventListener("click", () => {

            book.toggleRead();

            displayBooks();

        });

        library.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);

displayBooks();

const dialog = document.getElementById("bookDialog");
const form = document.getElementById("bookForm");

document.getElementById("newBookBtn").addEventListener("click", () => {
    dialog.showModal();
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addBookToLibrary(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("pages").value,
        document.getElementById("read").checked
    );

    displayBooks();
    form.reset();
    dialog.close();
});