let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    if (this.read === "read"){
        this.read = "not read yet";
    }else {
        this.read = "read";
    }
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary('Other Minds', 'Godfrey Smith', '255', 'read');
addBookToLibrary('Project Hail Mary', 'Andy Weir', '473', 'read');
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', '180', 'not read yet');
addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', '499', 'read');
addBookToLibrary('Atomic Habits', 'James Clear', '320', 'not read yet');

function displayLibrary(library) {
    library.forEach(book => {
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

    let isRead = data.get('read');

    if (isRead) {
        isRead = "read";
    }else{
        isRead = "not read yet";
    }
    
    addBookToLibrary(title, author, pages, isRead);

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
    const content = document.createElement('div');
    content.classList.add('book-card');

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = `"${book.title}"`;

    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = `by ${book.author}`;

    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.textContent = `${book.pages} pages`;

    const status = document.createElement('p');
    status.classList.add('status-text');
    status.textContent = `Status: ${book.read}`;

    content.appendChild(title);
    content.appendChild(author);
    content.appendChild(pages);
    content.appendChild(status);

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-remove');
    btnRemove.dataset.index = book.id;

    btnRemove.textContent = 'Remove';
    
    btnRemove.addEventListener('click', () => {
        content.remove();
        removeBook(book.id);
    });

    const btnToggle = document.createElement('button');
    btnToggle.classList.add('btn-toggle');
    btnToggle.textContent = "Change Status";

    btnToggle.addEventListener('click', () => {
        book.toggleRead();
        status.textContent = `Status: ${book.read}`;
    });
    
    content.appendChild(btnRemove);
    content.appendChild(btnToggle);
    container.appendChild(content);
}

function removeBook(itemToRemove) {
    myLibrary = myLibrary.filter(book => book.id !== itemToRemove);
    console.log("Book removed. New library count:", myLibrary.length);
}

displayLibrary(myLibrary);