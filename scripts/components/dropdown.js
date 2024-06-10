/* _____________________________ DROPDOWN INGREDIENTS _____________________________ */

dropdownIngredientsVisiblePart.addEventListener('click', function () {
    dropdownIngredientsArrow.classList.toggle('rotate180');
    dropdownIngredients.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {

    // Filtrer et afficher les options du dropdown 
    const filterDropdownIngredientsOptions = () => {
        const inputValue = dropdownIngredientsInput.value.toLowerCase();
        const dropdownIngredientsOptions = dropdownIngredientsListContainer.getElementsByTagName('p');
        Array.from(dropdownIngredientsOptions).forEach(option => {
            const isMatch = option.textContent.toLowerCase().includes(inputValue);
            option.style.display = isMatch ? 'flex' : 'none';
        });
        dropdownIngredientsSearchClear.style.display = inputValue ? 'block' : 'none';
    };

    // Initialiser les événements pour l'input du dropdown et le bouton de réinitialisation
    const initDropdownEvents = () => {
        dropdownIngredientsInput.addEventListener('input', filterDropdownIngredientsOptions);
        dropdownIngredientsSearchClear.addEventListener('click', () => {
            dropdownIngredientsInput.value = '';
            filterDropdownIngredientsOptions();
        });
    };

    // Initialiser les options et les événements au chargement
    const initDropdown = () => {
        const uniqueIngredients = getUniqueIngredients(recipes);
        updateDropdownOptions('ingredients', uniqueIngredients, 'ingredient');
        initDropdownEvents();
    };

    initDropdown();

});



/* _____________________________ DROPDOWN APPLIANCE _____________________________ */

dropdownApplianceVisiblePart.addEventListener('click', function () {
    dropdownApplianceArrow.classList.toggle('rotate180');
    dropdownAppliance.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {

    // Filtrer et afficher les options du dropdown
    const filterDropdownApplianceOptions = () => {
        const inputValue = dropdownApplianceInput.value.toLowerCase();
        const dropdownApplianceOptions = dropdownApplianceListContainer.getElementsByTagName('p');
        Array.from(dropdownApplianceOptions).forEach(option => {
            const isMatch = option.textContent.toLowerCase().includes(inputValue);
            option.style.display = isMatch ? 'flex' : 'none';
        });
        dropdownApplianceSearchClear.style.display = inputValue ? 'block' : 'none';
    };

    // Initialiser les événements pour l'input du dropdown et le bouton de réinitialisation
    const initApplianceDropdownEvents = () => {
        dropdownApplianceInput.addEventListener('input', filterDropdownApplianceOptions);
        dropdownApplianceSearchClear.addEventListener('click', () => {
            dropdownApplianceInput.value = '';
            filterDropdownApplianceOptions();
        });
    };

    // Initialiser les options et les événements au chargement pour le dropdown 
    const initApplianceDropdown = () => {
        const uniqueAppliances = getUniqueAppliances(recipes);
        updateDropdownOptions('appliance', uniqueAppliances, 'appliance');
        initApplianceDropdownEvents();
    };

    initApplianceDropdown();

});



/* _____________________________ DROPDOWN USTENSILS _____________________________ */

dropdownUstensilsVisiblePart.addEventListener('click', function () {
    dropdownUstensilsArrow.classList.toggle('rotate180');
    dropdownUstensils.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {

    // Filtrer et afficher les options du dropdown ustensils
    const filterDropdownUstensilsOptions = () => {
        const inputValue = dropdownUstensilsInput.value.toLowerCase();
        const dropdownUstensilsOptions = dropdownUstensilsListContainer.getElementsByTagName('p');
        Array.from(dropdownUstensilsOptions).forEach(option => {
            const isMatch = option.textContent.toLowerCase().includes(inputValue);
            option.style.display = isMatch ? 'flex' : 'none';
        });
        dropdownUstensilsSearchClear.style.display = inputValue ? 'block' : 'none';
    };

    // Initialiser les événements pour l'input du dropdown et le bouton de réinitialisation
    const initUstensilsDropdownEvents = () => {
        dropdownUstensilsInput.addEventListener('input', filterDropdownUstensilsOptions);
        dropdownUstensilsSearchClear.addEventListener('click', () => {
            dropdownUstensilsInput.value = '';
            filterDropdownUstensilsOptions();
        });
    };

    // Initialiser les options et les événements au chargement
    const initUstensilsDropdown = () => {
        const uniqueUstensils = getUniqueUstensils(recipes);
        updateDropdownOptions('ustensils', uniqueUstensils, 'ustensils');
        initUstensilsDropdownEvents();
    };

    initUstensilsDropdown();

});



/* _____________________________ DROPDOWN MISC _____________________________ */

// Ferme les dropdown lorsqu'on clique à l'exterieur (la recherche reste active pour prévenir les clics accidentels)
document.addEventListener('click', function (event) {
    if (!event.target.closest('#dropdown-ingredients')) {
        dropdownIngredients.classList.remove('open');
        dropdownIngredientsArrow.classList.remove('rotate180');
        dropdownIngredientsSearchClear.style.display = 'none';
    }

    if (!event.target.closest('#dropdown-appliance')) {
        dropdownAppliance.classList.remove('open');
        dropdownApplianceArrow.classList.remove('rotate180');
        dropdownApplianceSearchClear.style.display = 'none';

    }

    if (!event.target.closest('#dropdown-ustensils')) {
        dropdownUstensils.classList.remove('open');
        dropdownUstensilsArrow.classList.remove('rotate180');
        dropdownUstensilsSearchClear.style.display = 'none';
    }
});


// Effacer le contenu des inputs de recherche lors du rechargement de la page
window.addEventListener('load', function () {
    dropdownIngredientsInput.value = '';
    dropdownApplianceInput.value = '';
    dropdownUstensilsInput.value = '';
});