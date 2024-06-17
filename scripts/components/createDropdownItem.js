import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { FILTER_DICT } from "../logic/dropdown.js";
import { recipesFilterWithLoops } from "../logic/recipesFilter.js";
import { deactivateItem } from "./removeDropdownItem.js";


/**
 * Create remove icon to display when item is selected in the list
 */
const removeActiveItemIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
removeActiveItemIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
removeActiveItemIcon.setAttribute('width', '17');
removeActiveItemIcon.setAttribute('height', '17');
removeActiveItemIcon.setAttribute('viewBox', '0 0 17 17');
var circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circleElement.setAttribute("cx", "8.5");
circleElement.setAttribute("cy", "8.5");
circleElement.setAttribute("r", "8.5");
circleElement.setAttribute("fill", "black");
var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
pathElement.setAttribute("d", "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11");
pathElement.setAttribute("stroke", "#FFD15B");
pathElement.setAttribute("stroke-linecap", "round");
pathElement.setAttribute("stroke-linejoin", "round");
removeActiveItemIcon.appendChild(circleElement);
removeActiveItemIcon.appendChild(pathElement);
removeActiveItemIcon.setAttribute("id", "remove_active_item_icon");

/**
 * Creates a dropdown menu item based on the provided item information.
 * Handles activation, deactivation, and selection of items in the dropdown.
 * 
 * @param {object} options - The options object containing item, menu, container, and filterType.
 * @param {string} options.item - The item to create in the dropdown menu.
 * @param {HTMLElement} options.menu - The dropdown menu element.
 * @param {HTMLElement} options.container - The container element holding selected items.
 * @param {string} options.filterType - The type of filter associated with the item.
 */
export function createDropdownItem({ item, menu, container, filterType }) {
    const li = document.createElement("li");
    li.classList.add("dropdown_item");

    const button = document.createElement("button");
    button.classList.add("dropdown_item_button");
    button.type = "button";
    button.textContent = item;

    function activateItem() {
        li.classList.add('active');
        const removeIcon = removeActiveItemIcon.cloneNode(true);
        button.appendChild(removeIcon);
        removeIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            deactivateItem({ item, menu, container, filterType });
            moveSelectedItemToTop(menu);
        });
    }

    // Check if the item is already selected
    const isAlreadySelected = Array.from(container.children).some((child) => {
        return child.textContent.trim() === item;
    });

    if (isAlreadySelected) {
        activateItem();
    }

    li.addEventListener("click", function () {

        // Prevent selecting the active item again
        if (li.classList.contains("active")) {
            return;
        }

        // Reset dropdown search fields
        const searchFields = document.getElementsByClassName("dropdown_search");
        Array.from(searchFields).forEach((searchField) => {
            searchField.value = "";
        });
        const dropdownSearchClears = document.getElementsByClassName("dropdown_search_clear");
        Array.from(dropdownSearchClears).forEach((clearButton) => {
            clearButton.style.display = "none";
        });


        const selectedItem = document.createElement("div");
        selectedItem.classList.add("selected_item", "show");
        selectedItem.setAttribute("role", "alert");
        selectedItem.setAttribute("aria-live", "assertive");
        selectedItem.setAttribute("aria-atomic", "true");

        const selectedItemName = document.createElement("div");
        selectedItemName.classList.add("selected_item_name");
        selectedItemName.textContent = item
        // selectedItemName.textContent = item.charAt(0).toUpperCase() + item.slice(1);


        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.classList.add("remove_selected_item_icon");
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                                    <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"></path>
                                 </svg>`;
        closeButton.setAttribute("aria-label", "Close");

        closeButton.addEventListener("click", () => {

            if (selectedItem) {
                selectedItem.classList.add("hide");
                setTimeout(() => {
                    container.removeChild(selectedItem);
                }, 0);
            }

            FILTER_DICT.includes(filterType) && store.deleteFilter(filterType, item);
            store.addRecipesStore(recipes);
            recipesFilterWithLoops();

            const dropdownItems = Array.from(menu.getElementsByClassName('dropdown_item'));
            dropdownItems.forEach((dropdownItem) => {
                if (dropdownItem.textContent.trim() === item) {
                    dropdownItem.classList.remove('active');
                    const button = dropdownItem.getElementsByTagName('button')[0];
                    if (button) {
                        button.textContent = item;
                    }
                }
            });
            moveSelectedItemToTop(menu);

        });

        selectedItem.appendChild(selectedItemName);
        selectedItem.appendChild(closeButton);
        container.appendChild(selectedItem);

        FILTER_DICT.includes(filterType) && store.addFilter(filterType, item);
        recipesFilterWithLoops();
        activateItem();
        moveSelectedItemToTop(menu);
    });

    li.appendChild(button);
    menu.appendChild(li);
}

/**
 * Moves the active items to the top of the dropdown menu.
 * 
 * @param {HTMLElement} menu - The dropdown menu element.
 */
export function moveSelectedItemToTop(menu) {
    const items = Array.from(menu.children);
    const activeItems = items.filter(item => item.classList.contains('active'));
    const inactiveItems = items.filter(item => !item.classList.contains('active'));

    menu.innerHTML = '';

    activeItems.forEach(item => menu.appendChild(item));
    inactiveItems.forEach(item => menu.appendChild(item));
}

/**
 * Dropdown open/close animation  
 */
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggles = document.getElementsByClassName('dropdown_toggle');

    Array.from(dropdownToggles).forEach(toggle => {
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown.getElementsByClassName('dropdown_menu')[0];
        const arrow = dropdown.getElementsByClassName('dropdown_toggle_icon')[0];

        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            arrow.classList.toggle('rotate180');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                menu.classList.remove('open');
                arrow.classList.remove('rotate180');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

