const allAppliances = recipes.reduce((appliances, recipe) => {
  if (!appliances.includes(recipe.appliance.toLowerCase())) {
    appliances.push(recipe.appliance.toLowerCase());
  }
  return appliances;
}, []).sort((a, b) => a.localeCompare(b));


function getUniqueAppliances(results) {
  const uniqueAppliances = results.reduce((appliances, recipe) => {
    if (!appliances.includes(recipe.appliance.toLowerCase())) {
      appliances.push(recipe.appliance.toLowerCase());
    }
    return appliances;
  }, []).sort((a, b) => a.localeCompare(b));
  return uniqueAppliances;
}


dropdownApplianceListContainer.innerHTML = '';


if (selectedContainer.children.length === 0 && results.length === 0) {
  allAppliances.forEach(appliance => {
    const pElement = document.createElement('p');
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dropdownApplianceListContainer.appendChild(pElement);
  });
} else {
  const uniqueAppliances = getUniqueAppliances(results);
  uniqueAppliances.forEach(appliance => {
    const pElement = document.createElement('p');
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dropdownApplianceListContainer.appendChild(pElement);
  });
}
