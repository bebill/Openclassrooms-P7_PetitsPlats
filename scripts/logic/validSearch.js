import { store } from "../utils/store.js";
import { recipesFilterWithLoops } from "./recipesFilter.js";

/**
 * Checks if a given string matches the criteria for a valid search tag.
 * @param {string} tag - The string to be validated.
 * @returns {boolean} - True if the tag is valid, false otherwise.
 */
export function validSearch(tag) {
  let validRegExp = /^[^<>]*$/;

  return validRegExp.test(tag);
}

/**
 * Adds an event listener to a search field to validate its input and update the search value in the store.
 * @param {HTMLInputElement} searchField - The input field where the user enters search queries.
 * @param {Array} searchList - The list of items to be searched against.
 */
export function validSearchField(searchField, searchList) {
  searchField.addEventListener("input", (event) => {
    const currentSearch = event.target.value;

    // Validate the current search input
    currentSearch.length <= 2 || !validSearch(currentSearch)
      ? searchField.classList.add("is-invalid")
      : searchField.classList.remove("is-invalid");

    // Update the search value in the store
    store.addSearchValue(currentSearch);

    // Trigger recipes filtering based on the updated search value
    recipesFilterWithLoops();
  });
}