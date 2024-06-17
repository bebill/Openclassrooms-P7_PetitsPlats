import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { FILTER_DICT } from "../logic/dropdown.js";
import { recipesFilter } from "../logic/recipesFilter.js";

/**
 * Deactivates an item in the dropdown menu and removes it from the selected items list.
 * Updates the filter and triggers recipe filtering after deactivation.
 * 
 * @param {object} options - The options object containing item, menu, container, and filterType.
 * @param {string} options.item - The item to deactivate.
 * @param {HTMLElement} options.menu - The dropdown menu element.
 * @param {HTMLElement} options.container - The container element holding selected items.
 * @param {string} options.filterType - The type of filter associated with the item.
 */
export function deactivateItem({ item, menu, container, filterType }) {
    const dropdownItems = Array.from(menu.getElementsByClassName('dropdown_item'));
    const dropdownItem = dropdownItems.find((dropdown) => dropdown.textContent.trim() === item);
    const selectedItem = Array.from(container.getElementsByClassName('selected_item')).find(
        (el) => Array.from(el.getElementsByClassName('selected_item_name')).find(
            (nameElement) => nameElement.textContent.trim() === item
        )
    );

    if (dropdownItem) {
        if (selectedItem) {
            selectedItem.classList.add("hide");
            container.removeChild(selectedItem);
        }
        // Delete the item from the store filter and update recipes
        FILTER_DICT.includes(filterType) && store.deleteFilter(filterType, item);
        store.addRecipesStore(recipes);
        recipesFilter();

        // Reset dropdown item state
        dropdownItem.classList.remove('active');
        const button = dropdownItem.getElementsByTagName('button')[0];
        button.textContent = item;
    } else {
        return;
    }
}