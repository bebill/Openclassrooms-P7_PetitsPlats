import { recipes } from "../data/recipes.js";

export const store = {
    searchbarValue: "",

    selectedIngredients: [],

    selectedAppliances: [],

    selectedUstensils: [],

    recipesStore: recipes,

    addSearchValue(item) {
        this.searchbarValue = item;
    },

    addRecipesStore(item) {
        this.recipesStore = item;
    },

    addFilter(category, item) {
        this[category].push(item);
    },

    deleteFilter(category, item) {
        this[category] = this[category].filter((elt) => elt !== item);
    },
};
