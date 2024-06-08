// reset & close the input 
const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("search-close");

searchInput.addEventListener("input", function () {
    if (searchInput.value) {
        searchClose.style.display = "block";
    } else {
        searchClose.style.display = "none";
    }
});

searchClose.addEventListener("click", function () {
    searchInput.value = "";
    searchClose.style.display = "none";
    resetRecipes();
});


// absolute position of header background 
function setContainerHeight() {
    const backgroundImage = document.getElementById('background-img');
    const containerHeader = document.getElementById('container-header');

    if (backgroundImage && containerHeader) {
        const imageHeight = backgroundImage.clientHeight;
        containerHeader.style.height = `${imageHeight}px`;
    }
}

document.addEventListener('DOMContentLoaded', setContainerHeight);
window.addEventListener('resize', setContainerHeight);
