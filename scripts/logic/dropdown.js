
import { store } from "../utils/store.js";
import { createDropdownItem, moveSelectedItemToTop } from "../components/createDropdownItem.js";

export const FILTER_DICT = [
  "selectedIngredients",
  "selectedAppliances",
  "selectedUstensils",
];

const dropdownMenuIngredients = document.getElementById("dropdown_menu_ingredients_list");
const dropdownMenuAppliances = document.getElementById("dropdown_menu_appliances_list");
const dropdownMenuUstensils = document.getElementById("dropdown_menu_ustensils_list");
const tagsContainer = document.getElementById("tags_container");

/**
 * Updates the dropdown menus for ingredients, appliances, and ustensils based on filtered recipes.
 * Manages the search functionality within each dropdown menu.
 */
export function dropdown() {

  const ingredients = store.recipesStore.reduce((acc, recipe) => {
    recipe.ingredients.forEach(({ ingredient }) => {
      if (!acc.includes(ingredient)) {
        acc.push(ingredient);
      }
    });
    return acc;
  }, []);

  const appliances = store.recipesStore.reduce((acc, recipe) => {
    if (!acc.includes(recipe.appliance)) {
      acc.push(recipe.appliance);
    }
    return acc;
  }, []);

  const ustensils = store.recipesStore.reduce((acc, recipe) => {
    recipe.ustensils.forEach(ustensil => {
      if (!acc.includes(ustensil)) {
        acc.push(ustensil);
      }
    });
    return acc;
  }, []);



  // Sort the lists alphabetically
  ingredients.sort((a, b) => a.localeCompare(b));
  appliances.sort((a, b) => a.localeCompare(b));
  ustensils.sort((a, b) => a.localeCompare(b));

  // Clear previous dropdown menu content and populate them

  dropdownMenuIngredients.innerHTML = "";

  ingredients.forEach((ingredient) => {
    createDropdownItem({
      item: ingredient,
      menu: dropdownMenuIngredients,
      container: tagsContainer,
      filterType: "selectedIngredients",
    });
  });

  dropdownMenuAppliances.innerHTML = "";

  appliances.forEach((appliance) => {
    createDropdownItem({
      item: appliance,
      menu: dropdownMenuAppliances,
      container: tagsContainer,
      filterType: "selectedAppliances",
    });
  });

  dropdownMenuUstensils.innerHTML = "";

  ustensils.forEach((ustensil) => {
    createDropdownItem({
      item: ustensil,
      menu: dropdownMenuUstensils,
      container: tagsContainer,
      filterType: "selectedUstensils",
    });
  });

  /**
   * Functionalities for the dropdown search bar:
   * - search clear icon display
   * - normalize input to match with recipes
   * - display error message
   * - update dropdown menu with matching results
   * - clear input and reset dropdown list
   * - initialize search functionality for each dropdown menu
   */
  function dropdownSearchbar(searchField, list, domElement, filterType) {
    const dropdownSearchClear = searchField.parentElement.getElementsByClassName("dropdown_search_clear")[0];
    const listContainer = domElement;
    const noResultMsg = 'Aucun résultat';
    const errorMsg = document.createElement('span');
    errorMsg.textContent = noResultMsg;
    errorMsg.classList.add('dropdown_no_results');

    searchField.addEventListener("input", (e) => {
      e.preventDefault();
      domElement.innerHTML = "";

      if (searchField.value.length > 0) {
        dropdownSearchClear.style.display = "block";
      } else {
        dropdownSearchClear.style.display = "none";
      }

      listContainer.innerHTML = "";
      let newList = list.filter((item) =>
        item.normalize('NFD').trim().toLocaleLowerCase().includes(searchField.value.normalize('NFD').trim().toLocaleLowerCase())
      );
      if (newList.length === 0) {
        listContainer.appendChild(errorMsg);
      } else {
        newList.forEach((elm) => {
          createDropdownItem({
            item: elm,
            menu: domElement,
            container: tagsContainer,
            filterType: filterType,
          });
        });
      }
    });

    dropdownSearchClear.addEventListener("click", () => {
      searchField.value = "";
      dropdownSearchClear.style.display = "none";
      domElement.innerHTML = "";
      list.forEach((elm) => {
        createDropdownItem({
          item: elm,
          menu: domElement,
          container: tagsContainer,
          filterType: filterType,
        });
      });
    });
  }


  const searchIngredient = document.getElementById("search_ingredient");
  const searchAppliance = document.getElementById("search_appliance");
  const searchUstensil = document.getElementById("search_ustensil");

  dropdownSearchbar(
    searchIngredient,
    ingredients,
    dropdownMenuIngredients,
    "selectedIngredients"
  );
  dropdownSearchbar(
    searchAppliance,
    appliances,
    dropdownMenuAppliances,
    "selectedAppliances"
  );
  dropdownSearchbar(
    searchUstensil,
    ustensils,
    dropdownMenuUstensils,
    "selectedUstensils"
  );
}