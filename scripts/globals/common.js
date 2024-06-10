// global scope
let results = [];
let selectedFilters = [];
let selectedItemClone;
let selectedItem;


const selectedContainer = document.getElementById('selectedContainer');


const dropdownIngredients = document.getElementById('dropdown-ingredients');
const dropdownIngredientsVisiblePart = document.getElementById('dropdown-ingredients-visiblepart');
const dropdownIngredientsArrow = document.getElementById('dropdown-ingredients-arrow');
const dropdownIngredientsInput = document.getElementById('dropdown-ingredients-input');
const dropdownIngredientsSearchClear = document.getElementById('dropdown-ingredients-clear');
const dropdownIngredientsListContainer = document.getElementById('dropdown-ingredients-list');
const dropdownIngredientsOptions = dropdownIngredientsListContainer.getElementsByTagName('p');


const dropdownAppliance = document.getElementById('dropdown-appliance');
const dropdownApplianceVisiblePart = document.getElementById('dropdown-appliance-visiblepart');
const dropdownApplianceArrow = document.getElementById('dropdown-appliance-arrow');
const dropdownApplianceInput = document.getElementById('dropdown-appliance-input');
const dropdownApplianceSearchClear = document.getElementById('dropdown-appliance-clear');
const dropdownApplianceListContainer = document.getElementById('dropdown-appliance-list');
const dropdownApplianceOptions = dropdownApplianceListContainer.getElementsByTagName('p');


const dropdownUstensils = document.getElementById('dropdown-ustensils');
const dropdownUstensilsVisiblePart = document.getElementById('dropdown-ustensils-visiblepart');
const dropdownUstensilsArrow = document.getElementById('dropdown-ustensils-arrow');
const dropdownUstensilsInput = document.getElementById('dropdown-ustensils-input');
const dropdownUstensilsSearchClear = document.getElementById('dropdown-ustensils-clear');
const dropdownUstensilsListContainer = document.getElementById('dropdown-ustensils-list');
const dropdownUstensilsOptions = dropdownUstensilsListContainer.getElementsByTagName('p');
