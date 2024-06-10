

searchInput.addEventListener('input', function () {
    handleSearch();
});

//FOR loop main search
function handleSearch() {
    const userInput = searchInput.value.toLowerCase();
    if (userInput.length >= 3) {
        selectedFilters = [];
        results = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const titleMatch = recipe.name.toLowerCase().includes(userInput);
            const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(userInput));
            const descriptionMatch = recipe.description.toLowerCase().includes(userInput);

            if (titleMatch || ingredientsMatch || descriptionMatch) {
                results.push(recipe);
            }
        }

        updateSearchResults(results);
        populateCards(results);
    } else {
        resetRecipes();
    }
}

// FOR loop filters search
function searchByFilters(selectedFilters) {
    let results = [];
    for (const recipe of recipes) {
        let filterMatch = true;
        for (const filter of selectedFilters) {
            if (
                !(
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())) ||
                    recipe.appliance.toLowerCase().includes(filter.toLowerCase()) ||
                    recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filter.toLowerCase()))
                )
            ) {
                filterMatch = false;
                break;
            }
        }

        if (filterMatch) {
            results.push(recipe);
        }
    }
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