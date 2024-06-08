const allIngredients = recipes.reduce((ingredients, recipe) => {
    recipe.ingredients.forEach(ingredient => {
        if (!ingredients.some(i => i.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase())) {
            ingredients.push({
                ingredient: ingredient.ingredient.toLowerCase(),
            });
        }
    });
    return ingredients;
}, []).sort((a, b) => a.ingredient.localeCompare(b.ingredient));


function getUniqueIngredients(results) {
    const uniqueIngredients = results.reduce((ingredients, recipe) => {
        recipe.ingredients.forEach(ingredient => {
            const existingIngredient = ingredients.find(i => i.toLowerCase() === ingredient.ingredient.toLowerCase());
            if (!existingIngredient) {
                ingredients.push(ingredient.ingredient.toLowerCase());
            }
        });
        return ingredients;
    }, []).sort((a, b) => a.localeCompare(b));
    return uniqueIngredients;
}


const dropdownIngredientsListContainer = document.getElementById('dropdown-ingredients-list');
const selectedContainer = document.getElementById('selectedContainer');

dropdownIngredientsListContainer.innerHTML = '';

if (selectedContainer.children.length === 0 && results.length === 0) {
    allIngredients.forEach(ingredient => {
        const pElement = document.createElement('p');
        pElement.textContent = ingredient.ingredient;
        pElement.onclick = function () {
            selectItem(this);
        };
        dropdownIngredientsListContainer.appendChild(pElement);
    });
} else {
    const uniqueIngredients = getUniqueIngredients(results);
    uniqueIngredients.forEach(ingredient => {
        const pElement = document.createElement('p');
        pElement.textContent = ingredient.ingredient;
        pElement.onclick = function () {
            selectItem(this);
        };
        dropdownIngredientsListContainer.appendChild(pElement);
    });
}
