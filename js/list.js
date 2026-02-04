const listData = [
    {
        title: "Mickey 17",
        description: "Mickey 17, known as an &quot;expendable&quot; goes on a dangerous journey to colonize an ice planet.",
        thumbnail: "../img/slider01.jpg",
        time: "137",
        year: 2025,
        score: "7.0"
    },
    {
        title: "Adolescence",
        description: "When a 13-year-old is accused of the murder of a classmate, his family, therapist and the detective in charge are all left asking what really happened.",
        thumbnail: "../img/slider02.jpg",
        time: "65",
        year: 2025,
        score: "8.5"
    },
    {
        title: "Interstellar",
        description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        thumbnail: "../img/slider03.jpg",
        time: "169",
        year: 2014,
        score: "8.7"
    },
    {
        title: "Snow White",
        description: `A princess joins forces with seven dwarfs to liberate her kingdom from her cruel stepmother the Evil Queen. A live-action adaptation of the 1937 Disney animated film "Snow White and the Seven Dwarfs".`,
        thumbnail: "../img/slider04.jpg",
        time: "109",
        year: 2025,
        score: 2.6
    },
    {
        title: "The Electric State",
        description: "An orphaned teen hits the road with a mysterious robot to find her long-lost brother, teaming up with a smuggler and his wisecracking sidekick.",
        thumbnail: "../img/slider05.jpg",
        time: "128",
        year: 2025,
        score: "6.0"
    },
    {
        title: "Gisaengchung",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        thumbnail: "../img/slider06.jpg",
        time: "132",
        year: 2.19,
        score: "8.5"
    },
    {
        title: "The Dark Knight",
        description: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
        thumbnail: "../img/slider07.jpg",
        time: "152",
        year: 2008,
        score: "9.0"
    },
];

const itemsPerPage = 5;
let currentPage = 1;

function renderList(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = listData.slice(start, end);
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';//clear first

    itemsToShow.forEach(item => { //for look
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="thumbnail">
            <div class="content">
                <div class="title">${item.title}</div>
                <p class="description">${item.description}</p>
            </div>
        `;
        listContainer.appendChild(listItem);
        // Add a click event to the thumbnail you just added
        const thumbnail = listItem.querySelector('.thumbnail');
        thumbnail.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent events from bubbling
            handleThumbnailClick(item); // Call handler
        });
    });

    let childrens = pageNumbersContainer.children;
    for (let j = 0; j < childrens.length; j++) {
        if (j == currentPage - 1) {
            pageNumbersContainer.children[j].setAttribute('style', 'background-color: #0056b3;');
        } else {
            pageNumbersContainer.children[j].setAttribute('style', 'background-color: #283038;');

        }
    }
}
// Thumbnail click handler function
function handleThumbnailClick(item) {
    const movieModal = document.querySelector(".movie-modal-overlay")
    movieModal.style.display = "flex";
    const movieModalItem = document.createElement('div');
    const container = document.querySelector('.movie-modal-body');
    container.innerHTML = '';
    movieModalItem.className = 'class="movie-meta-row';
    movieModalItem.innerHTML = `<img src="${item.thumbnail}" 
                                class="movie-poster">
                            <div>
                                <h1 class="movie-title">${item.title}</h1>
                                <div class="movie-meta">
                                    <span>${item.year}</span>
                                    <span>${item.time}minute</span>
                                    <span class="movie-rating">★ ${item.score}</span>
                  
                                </div>
                                <p class="movie-overview">${item.description}</p>
                            </div>
                        </div>`;
    container.appendChild(movieModalItem);


}
//modal Close
function modalClose() {
    const movieModal = document.querySelector(".movie-modal-overlay")
    movieModal.style.display = "none";
}

// Create a button based on data
function renderPagination() {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = '';

    const pageCount = Math.ceil(listData.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = 'page-button';
        pageButton.innerText = i;
        pageButton.onclick = () => {
            currentPage = i;
            renderList(currentPage);
            updatePaginationVisibility();
        };
        pageNumbersContainer.appendChild(pageButton);
    }
    let childrens = pageNumbersContainer.children;
    for (let j = 0; j < childrens.length; j++) {
        if (j == currentPage - 1) {
            pageNumbersContainer.children[j].setAttribute('style', 'background-color: #0056b3;');
        } else {
            pageNumbersContainer.children[j].setAttribute('style', 'background-color: #283038;');

        }
    }

    updatePaginationVisibility();
}
//Change the style of the button
function updatePaginationVisibility() {
    document.getElementById('prevButton').style.display = currentPage === 1 ? 'none' : 'inline-block';
    document.getElementById('nextButton').style.display = currentPage * itemsPerPage >= listData.length ? 'none' : 'inline-block';
}
//Bind an event to the button
function setupPagination() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    //prev onclick function
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderList(currentPage);
            updatePaginationVisibility();
        }
    };
    //next onclick function
    nextButton.onclick = () => {
        if ((currentPage * itemsPerPage) < listData.length) {
            currentPage++;
            renderList(currentPage);
            updatePaginationVisibility();
        }
    };
}

renderList(currentPage);
renderPagination();
setupPagination();