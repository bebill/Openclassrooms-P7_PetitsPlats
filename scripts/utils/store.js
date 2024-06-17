import { recipes } from "../data/recipes.js";

/**
 * Object representing the application state and functionalities related to recipes and filters.
 * Includes properties for search bar value, selected ingredients, appliances, ustensils, and recipes store.
 * Provides methods to update search bar value, recipes store, and manage filters.
 */
export const store = {
    /**
     * Holds the current value of the main search bar.
     * @type {string}
     */
    searchbarValue: "",

    /**
     * Arrays to store selected ingredients, appliances, ustensils for filtering recipes.
     * @type {Array<string>}
     */
    selectedIngredients: [],
    selectedAppliances: [],
    selectedUstensils: [],

    /**
     * Array that contains all recipes fetched from data.
     * @type {Array<Object>}
     */
    recipesStore: recipes,

    /**
     * Sets the search bar value.
     * @param {string} item - The value to set in the search bar.
     */
    addSearchValue(item) {
        this.searchbarValue = item;
    },

    /**
     * Updates the recipes store with new data.
     * @param {Array<Object>} item - The updated recipes data.
     */
    addRecipesStore(item) {
        this.recipesStore = item;
    },

    /**
     * Adds a selected filter item to the specified category (ingredients, appliances, ustensils).
     * @param {string} category - The category of the filter (selectedIngredients, selectedAppliances, selectedUstensils).
     * @param {string} item - The item to add to the filter category.
     */
    addFilter(category, item) {
        this[category].push(item);
    },

    /**
     * Deletes a selected filter item from the specified category (ingredients, appliances, ustensils).
     * @param {string} category - The category of the filter (selectedIngredients, selectedAppliances, selectedUstensils).
     * @param {string} item - The item to remove from the filter category.
     */
    deleteFilter(category, item) {
        this[category] = this[category].filter((elt) => elt !== item);
    },
};