let myLibrary = [];
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

        displayBook(book);
    });
}

const container = document.querySelector('.container');
const newBook = document.querySelector('#newBook');
const dialog = document.querySelector('#dialog');
const addBook = document.querySelector('#addBook');
const close = document.querySelector('#close');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let title = data.get('title');
    let author = data.get('author');
    let pages = data.get('pages');
    let read = data.get('read');
    
    addBookToLibrary(title, author, pages, read);

    const lastBook = myLibrary[myLibrary.length - 1];
    displayBook(lastBook);

    form.reset();
    dialog.close();
});

newBook.addEventListener('click', () => {
    dialog.showModal();
});

close.addEventListener('click', () => {
    dialog.close();
});

function displayBook(book){
    const content = document.createElement('p');
    
    content.classList.add('book');
    content.textContent = `${book.title} by ${book.author} ${book.pages} ${book.read}`;
    container.appendChild(content);

    const btnRemove = document.createElement('button');
    btnRemove.dataset.index = book.id;

    btnRemove.textContent = 'Remove';
    content.appendChild(btnRemove);

    btnRemove.addEventListener('click', () => {
        content.remove();
        removeBook(book.id);
    });

    
}

function removeBook(itemToRemove) {
    myLibrary = myLibrary.filter(book => book.id !== itemToRemove);
    console.log("Book removed. New library count:", myLibrary.length);
}

displayLibrary(myLibrary);