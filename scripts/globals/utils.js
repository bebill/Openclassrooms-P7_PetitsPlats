//Update dropdown options display
function updateDropdownOptions(dropdownFilter, options, property) {

    const dropdownId = `dropdown-${dropdownFilter}-list`;
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) {
        return;
    }

    dropdown.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('p');

        if (typeof option === 'string') {
            optionElement.textContent = option.toLowerCase();
        } else if (typeof option === 'object' && property in option) {
            optionElement.textContent = option[property].toLowerCase();
        } else {
            console.error(`Invalid option format: ${option}`);
            return;
        }
        optionElement.onclick = function () {
            selectItem(this);
            resetDropdownInput();
        };
        dropdown.appendChild(optionElement);
    });
}

const resetDropdownInput = () => {
    dropdownIngredientsInput.value = '';
    dropdownApplianceInput.value = '';
    dropdownUstensilsInput.value = '';
};
