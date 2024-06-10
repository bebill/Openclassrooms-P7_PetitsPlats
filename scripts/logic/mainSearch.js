

searchInput.addEventListener('input', function () {
    handleSearch();
});

// array method main search 
function handleSearch() {
    const userInput = searchInput.value.toLowerCase();
    if (userInput.length >= 3) {
        selectedFilters = [];
        results = recipes.filter(recipe => {
            const titleMatch = recipe.name.toLowerCase().includes(userInput);
            const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(userInput));
            const descriptionMatch = recipe.description.toLowerCase().includes(userInput);
            return titleMatch || ingredientsMatch || descriptionMatch;
        });
        updateSearchResults(results);
        populateCards(results);
    } else {
        resetRecipes();
    }
}

/*  array method filters search */
function searchByFilters(selectedFilters) {
    results = recipes.filter(recipe => {
        return selectedFilters.every(filter => {
            if (recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase()))) {
                return true;
            } else if (recipe.appliance.toLowerCase().includes(filter.toLowerCase())) {
                return true;
            } else if (recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter.toLowerCase()))) {
                return true;
            } else {
                return false;
            }
        });
    });
    updateSearchResults(results);
    populateCards(results);
}

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