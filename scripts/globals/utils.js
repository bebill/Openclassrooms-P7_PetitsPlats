//Update dropdown options display
function updateDropdownOptions(dropdownFilter, options, property) {

    console.log('Dropdown Filter:', dropdownFilter);
    console.log('Options:', options);
    console.log('Property:', property);

    const dropdownId = `dropdown-${dropdownFilter}-list`;
    console.log('Dropdown ID:', dropdownId);
    const dropdown = document.getElementById(dropdownId);
    console.log('Dropdown Element:', dropdown);
    if (!dropdown) {
        console.log('Dropdown element not found');
        return;
    }

    dropdown.innerHTML = '';

    options.forEach(option => {
        console.log('Option:', option);
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
