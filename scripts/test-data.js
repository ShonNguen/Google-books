const SEARCH_ENGINE = 'https://www.googleapis.com/books/v1/volumes?q=';
const BASE_API_URL = 'http://localhost:3000'; 

const bookList = document.getElementById('books-list');
const userInput = document.getElementById('search-input');
const searchSubmitBtn = document.getElementById('search-btn');

function searchSubmitFormHandler() {
    bookList.innerHTML = '';

    if (userInput.value === '') {
        console.log('empty form');
        return;
    }
    const searchWords = userInput.value.split(' ').join('+');
    fetchBooks(searchWords);
}

async function fetchBooks(urlLink) {
    const response = await fetch(`${SEARCH_ENGINE}${urlLink}`);
    const data = await response.json();
    const books = data.items;
    books.map((book) => {
        const information = book.volumeInfo;
        renderNewBookElement(information);
    });
}

function renderNewBookElement(information) {
    const newBook = document.createElement('li');
    newBook.className = "book-element"; 

    //title
    const h2 = document.createElement('h2');
    h2.textContent = information.title;
    newBook.appendChild(h2);

    //image
    const thumbnail = document.createElement('div');
    const image = document.createElement('img');
    image.src = information.imageLinks.thumbnail;
    image.alt = information.title
    thumbnail.appendChild(image);
    newBook.appendChild(thumbnail);

    //authors
    const authors = document.createElement('div');
    authors.className = "book-authors";
    authors.textContent = information.authors;
    newBook.appendChild(authors);

    //book information
    const bookInfo = document.createElement('div');
    bookInfo.className = "book-info";
    const ul = document.createElement('ul');
    ul.innerHTML = `
        <li>Publisher: ${information.publisher}</li>
        <li>Year: ${information.year}</li>
        <li>Category: ${information.categories}</li>
    `;
    bookInfo.appendChild(ul); 
    newBook.append(bookInfo); 

    //description
    const description = document.createElement('div'); 
    description.className = "book-info-description"; 
    const descriptionText = information.description; 
    let shortDescription;
    let restOfDescription;
    if(descriptionText != null) {
        shortDescription = descriptionText.substring(1,400);
        restOfDescription = descriptionText.substring(401)
    } else {
        shortDescription = 'No description.';
    }
    description.textContent = shortDescription; 

    // const readMoreBtn = document.createElement('button'); 
    // readMoreBtn.textContent = "Read more"; 
    // readMoreBtn.className = "read-more-btn"; 
    // readMoreBtn.addEventListener('click',() => readMoreToggle(description, shortDescription, restOfDescription)); 
    // description.appendChild(readMoreBtn); 

    const favoriteBtn = document.createElement('button'); 
    favoriteBtn.textContent = "Bookmark";
    favoriteBtn.className = "favorite-btn";
    favoriteBtn.addEventListener('click', () => addToFavoriteBtnHandler(newBook)); 
    description.appendChild(favoriteBtn); 
    newBook.appendChild(description);


    bookList.appendChild(newBook);
}

function addToFavoriteBtnHandler(newBook) {

    console.log("fav button pressed"); 
}

function readMoreToggle(description, shortDescription, restOfDescription) {
    console.log("readMore button pressed");
    description.textContent = shortDescription + restOfDescription;
}



searchSubmitBtn.addEventListener('click', searchSubmitFormHandler);