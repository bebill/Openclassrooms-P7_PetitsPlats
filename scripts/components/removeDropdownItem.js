import { recipes } from "../data/recipes.js";
import { store } from "../utils/store.js";
import { FILTER_DICT } from "../logic/dropdown.js";
import { recipesFilter } from "../logic/recipesFilter.js";


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

        FILTER_DICT.includes(filterType) && store.deleteFilter(filterType, item);
        store.addRecipesStore(recipes);
        recipesFilter();

        dropdownItem.classList.remove('active');
        const button = dropdownItem.getElementsByTagName('button')[0];
        button.textContent = item;
    } else {
        return;
    }
}




