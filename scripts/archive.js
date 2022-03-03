const SEARCH_ENGINE = 'https://www.googleapis.com/books/v1/volumes?q=';

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
    console.log(searchWords);
    console.log('submitted');
    fetchData(searchWords);
}

function fetchData(urlLink) {
    let results = [];
    fetch(`${SEARCH_ENGINE}${urlLink}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            results = data.items;
            results.map((book) => {
                const information = book.volumeInfo;
                const description = JSON.stringify(information.description);
                renderNewBookElement(
                    book.id,
                    information.imageLinks.thumbnail,
                    information.title,
                    information.authors,
                    information.publisher,
                    information.publishedDate,
                    information.categories,
                    description
                );
            });
        })
        .catch((error) => {
            console.log('Error 404', error);
    });
}


function renderNewBookElement(
    id, img, title, authors, publisher, year, categories, description
) { 
    const newBookElement = document.createElement('li');
    newBookElement.className = 'book-element';
    let shortDescription;
    let restOfDescription;
    if(description != null) {
        shortDescription = description.substring(1,400);
        restOfDescription = description.substring(401);
    } else {
        shortDescription = 'No description.'
    }
    newBookElement.innerHTML = `
        <h2>${title}</h2>
        <div>
            <img src="${img}" alt="${JSON.stringify(title)}">
        </div>
        <div class="book-authors">By: ${authors}</div>
        <div class="book-info">
            <ul>
                <li>Publisher: ${publisher}</li>
                <li>Year: ${year}</li>
                <li>Category: ${categories}</li>
            </ul>
        </div>
        <div class="book-info-description">
            ${shortDescription}<span id="dots">...</span><span id="rest-text">${restOfDescription}</span>
        </div>
    `;

    const bookList = document.getElementById('books-list');
    bookList.append(newBookElement);
};

// function moreLessTextToggle() {
//     const dots = document.getElementById(`dots${id}`);
//     const restOfText = document.getElementById(`rest-text${id}`);

//     if(dots.style.display === 'inline') {
//         dots.style.display = 'none'; 
//         restOfText.style.display = 'inline'; 
//     } else {
//         dots.style.display = 'inline'; 
//         restOfText.style.display = 'none'; 
//     }
//     console.log("Button Pressed");
// };

searchSubmitBtn.addEventListener('click', searchSubmitFormHandler);