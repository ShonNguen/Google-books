const BASE_API_URL = 'http://localhost:3000/posts';

const bookList = document.getElementById('books-list');
const userInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

fetchFavoriteBooks(BASE_API_URL);

function searchSubmitHandler() {
    if (userInput.value === '') {
        console.log('empty form');
        return;
    }
    const searchWords = userInput.value.toLowerCase().split(' '); 
    printSearchResults(searchWords); 
}

async function printSearchResults(searchWords) {
    const response = await fetch(BASE_API_URL); 
    const data = await response.json(); 
    let searchFilter = []; 
    data.map((book) => {
        for (const word of searchWords) {
            if(
                book.title.toLowerCase().includes(word) ||
                book.authors.join(' ').toLowerCase().includes(word)
            ) {
                searchFilter.push(book); 
            }
        }
    });
    console.log(searchFilter); 
}

async function fetchFavoriteBooks(urlLink) {
    const response = await fetch(urlLink);
    const data = await response.json();
    data.map((book) => {
        renderBookElement(book);
    });
}

function renderBookElement(book) {
    const newBook = document.createElement('li');
    newBook.className = "book-element";

    //title
    const h2 = document.createElement('h2');
    h2.textContent = book.title;
    newBook.appendChild(h2);

    //image
    const thumbnail = document.createElement('div');
    const image = document.createElement('img');
    image.src = book.thumbnail;
    image.alt = book.title
    thumbnail.appendChild(image);
    newBook.appendChild(thumbnail);

    //authors
    const authors = document.createElement('div');
    authors.className = "book-authors";
    authors.textContent = book.authors;
    newBook.appendChild(authors);

    //book info
    const bookInfo = document.createElement('div');
    bookInfo.className = "book-info";
    const ul = document.createElement('ul');
    ul.innerHTML = `
        <li>Publisher: ${book.publisher}</li>
        <li>Year: ${book.year}</li>
        <li>Category: ${book.categories}</li>
    `;
    bookInfo.appendChild(ul);
    newBook.append(bookInfo);

    //description
    const description = document.createElement('div');
    description.className = "book-info-description";
    const descriptionText = book.description;
    let shortDescription;
    let restOfDescription;
    if (descriptionText != null) {
        shortDescription = descriptionText.substring(1, 400);
        restOfDescription = descriptionText.substring(401)
    } else {
        shortDescription = 'No description.';
    }
    description.textContent = shortDescription + "...";

    const deleteBookBtn = document.createElement('button'); 
    deleteBookBtn.textContent = 'Delete'; 
    deleteBookBtn.addEventListener('click', () => deleteBtnHandler(book)); 
    description.appendChild(deleteBookBtn);

    newBook.appendChild(description);


    bookList.appendChild(newBook);
}

async function deleteBtnHandler(book) {
    const id = book.id;
    const response = await fetch(`${BASE_API_URL}/${id}`, {
        method: 'DELETE'
    });
    const deleted = await response.json(); 
    fetchFavoriteBooks(BASE_API_URL);
}

searchBtn.addEventListener('click', searchSubmitHandler);