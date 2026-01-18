const myLibrary = [];
let display = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);

    myLibrary.push(book);
}

addBookToLibrary('Other Minds', 'Godfrey Smith', '255', 'have read');
addBookToLibrary('Project Hail Mary', 'Andy Weir', '473', 'have read');
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', '180', 'not read yet');
addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', '499', 'have read');
addBookToLibrary('Atomic Habits', 'James Clear', '320', 'not read yet');;

function displayLibrary(library) {
    library.forEach(book => {
        display.push(book);

        displayBook(book.title + ", by " + book.author + ", " + book.pages + " pages, " + book.read);
    });
}

const container = document.querySelector('.container');
const btn = document.querySelector('button');

btn.addEventListener('click', addBook);

function displayBook(book){
    const content = document.createElement('p');
    content.classList.add('book');
    content.textContent = book;
    container.appendChild(content);
}

function addBook() {
    
}

displayLibrary(myLibrary);