

searchInput.addEventListener('input', function () {
    handleSearch();
});

function updateSearchResults(results) {
    const uniqueIngredients = getUniqueIngredients(results);
    const uniqueAppliances = getUniqueAppliances(results);
    const uniqueUstensils = getUniqueUstensils(results);

    updateDropdownOptions('ingredients', uniqueIngredients, 'ingredient');
    updateDropdownOptions('appliance', uniqueAppliances, 'appliance');
    updateDropdownOptions('ustensils', uniqueUstensils, 'ustensil');

    const containers = [dropdownIngredientsListContainer, dropdownApplianceListContainer, dropdownUstensilsListContainer];

    selectedFilters.forEach(filter => {
        const isInIngredients = uniqueIngredients.includes(filter);
        const isInAppliances = uniqueAppliances.includes(filter);
        const isInUstensils = uniqueUstensils.includes(filter);
        if (isInIngredients || isInAppliances || isInUstensils) {
            const dropdownElement = findDropdownElementByText(filter, containers);
            if (dropdownElement) {
                updateSelectedItemLayout(dropdownElement);
            }
        }
    });
}

function findDropdownElementByText(text, containers) {
    for (const container of containers) {
        const allDropdownElements = container.querySelectorAll('p');

        for (const element of allDropdownElements) {
            if (element.textContent.trim().toLowerCase() === text.trim().toLowerCase()) {
                return element;
            }
        }
    }
    return null;
}

function resetRecipes() {
    populateCards(recipes);
    updateRecipeCount();
    updateSearchResults(recipes);
}

// Effacer le contenu des inputs de recherche
window.addEventListener('load', function () {
    searchInput.value = '';
});