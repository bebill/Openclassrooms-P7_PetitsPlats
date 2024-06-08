
const dropdownIngredients = document.querySelector('.dropdown-ingredients');
const dropdownAppliance = document.querySelector('.dropdown-appliance');
const dropdownUstensils = document.querySelector('.dropdown-ustensils');
const dropdownIngredientsVisiblePart = document.querySelector('.dropdown-ingredients-visiblepart');
const dropdownApplianceVisiblePart = document.querySelector('.dropdown-appliance-visiblepart');
const dropdownUstensilsVisiblePart = document.querySelector('.dropdown-ustensils-visiblepart');
const dropdownIngredientsArrow = document.getElementById('dropdown-ingredients-arrow');
const dropdownApplianceArrow = document.getElementById('dropdown-appliance-arrow');
const dropdownUstensilsArrow = document.getElementById('dropdown-ustensils-arrow');


document.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdown-ingredients')) {
        dropdownIngredients.classList.remove('open');
        dropdownIngredientsArrow.classList.remove('rotate180');

    }

    if (!event.target.closest('.dropdown-appliance')) {
        dropdownAppliance.classList.remove('open');
        dropdownApplianceArrow.classList.remove('rotate180');

    }

    if (!event.target.closest('.dropdown-ustensils')) {
        dropdownUstensils.classList.remove('open');
        dropdownUstensilsArrow.classList.remove('rotate180');
    }
});

dropdownIngredientsVisiblePart.addEventListener('click', function () {
    dropdownIngredientsArrow.classList.toggle('rotate180');
    dropdownIngredients.classList.toggle('open');
});

dropdownApplianceVisiblePart.addEventListener('click', function () {
    dropdownApplianceArrow.classList.toggle('rotate180');
    dropdownAppliance.classList.toggle('open');
});

dropdownUstensilsVisiblePart.addEventListener('click', function () {
    dropdownUstensilsArrow.classList.toggle('rotate180');
    dropdownUstensils.classList.toggle('open');
});


// Dropdown Ingredients
const dropdownIngredientsInput = document.getElementById('dropdown-ingredients-input');

dropdownIngredientsInput.addEventListener('input', function () {
    const inputValue = dropdownIngredientsInput.value.toLowerCase();
    const dropdownIngredientsListContainer = document.getElementById('dropdown-ingredients-list');
    const dropdownIngredientsOptions = dropdownIngredientsListContainer.querySelectorAll('p');
    dropdownIngredientsOptions.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        const isMatch = optionText.includes(inputValue);
        option.style.display = isMatch ? 'flex' : 'none';
    });
});

// Dropdown Appliance
const dropdownApplianceInput = document.getElementById('dropdown-appliance-input');

dropdownApplianceInput.addEventListener('input', function () {
    const inputValue = dropdownApplianceInput.value.toLowerCase();
    const dropdownApplianceListContainer = document.getElementById('dropdown-appliance-list');
    const dropdownApplianceOptions = dropdownApplianceListContainer.querySelectorAll('p');

    dropdownApplianceOptions.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        const isMatch = optionText.includes(inputValue);
        option.style.display = isMatch ? 'flex' : 'none';
    });
});

// Dropdown Ustensils
const dropdownUstensilsInput = document.getElementById('dropdown-ustensils-input');

dropdownUstensilsInput.addEventListener('input', function () {
    const inputValue = dropdownUstensilsInput.value.toLowerCase();
    const dropdownUstensilsListContainer = document.getElementById('dropdown-ustensils-list');
    const dropdownUstensilsOptions = dropdownUstensilsListContainer.querySelectorAll('p');

    dropdownUstensilsOptions.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        const isMatch = optionText.includes(inputValue);
        option.style.display = isMatch ? 'flex' : 'none';
    });
});
