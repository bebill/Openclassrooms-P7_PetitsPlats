const allUstensils = recipes.reduce((ustensils, recipe) => {
    recipe.ustensils.forEach(ustensil => {
        const lowerCaseUstensil = ustensil.toLowerCase();
        if (!ustensils.includes(lowerCaseUstensil)) {
            ustensils.push(lowerCaseUstensil);
        }
    });
    return ustensils;
}, []).sort((a, b) => a.localeCompare(b));

function getUniqueUstensils(results) {
    const uniqueUstensils = results.reduce((ustensils, recipe) => {
        recipe.ustensils.forEach(ustensil => {
            const lowerCaseUstensil = ustensil.toLowerCase();
            if (!ustensils.includes(lowerCaseUstensil)) {
                ustensils.push(lowerCaseUstensil);
            }
        });
        return ustensils;
    }, []).sort((a, b) => a.localeCompare(b));
    return uniqueUstensils;
}

dropdownUstensilsListContainer.innerHTML = '';

if (selectedContainer.children.length === 0 && results.length === 0) {
    allUstensils.forEach(ustensil => {
        const pElement = document.createElement('p');
        pElement.textContent = ustensil;
        pElement.onclick = function () {
            selectItem(this);
        };
        dropdownUstensilsListContainer.appendChild(pElement);
    });
} else {
    const uniqueUstensils = getUniqueUstensils(results);
    uniqueUstensils.forEach(ustensil => {
        const pElement = document.createElement('p');
        pElement.textContent = ustensil;
        pElement.onclick = function () {
            selectItem(this);
        };
        dropdownUstensilsListContainer.appendChild(pElement);
    });
}
