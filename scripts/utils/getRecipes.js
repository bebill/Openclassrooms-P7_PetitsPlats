/**
 * Fetches recipes data asynchronously from a specified endpoint.
 * @returns {Promise<Object>} - Promise object representing the fetched recipes data.
 * @throws {Error} - Throws an error if there's an issue fetching the data.
 */
export async function getRecipes() {
  const response = await fetch("./data/recipes.js");

  if (!response.ok) {
    throw new Error(`Erreur de chargement des recettes : ${response.status}`);
  }

  const recipes = await response.text();

  return { recipes };
}