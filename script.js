// URL of your Apps Script Web App
const apiUrl = 'https://script.google.com/macros/s/AKfycbwu2Ht6kM_OsVoa59K6lhQwfW-wd_yFOOSp1T8qKa_q3N9PutMnICp7XlYY1mUiFuqv/exec';

fetch(apiUrl)
  .then(response => response.json()) // Parse the JSON
  .then(data => {
    console.log('Fetched Data:', data); // Check if data is fetched correctly
    const recipesContainer = document.getElementById('recipes-list'); // Select the container
    const records = data.records; // Access the records array

    records.forEach(record => {
      const fields = record.fields; // Extract fields from each record
      const recipeElement = document.createElement('div'); // Create a div for the recipe
      recipeElement.classList.add('recipe-card'); // Add styling class

      // Populate the recipe div with HTML content
      recipeElement.innerHTML = `
        <div class="recipe-header">
          <h3>${fields.Name || 'No Name'}</h3>
        </div>
        <div class="recipe-body">
          <p><strong>Ingredients:</strong></p>
          <ul class="ingredients-list">
            ${fields.Ingredients.replace(/\n/g, '<li>') || '<li>No Ingredients</li>'}
          </ul>
          <p><strong>Prep Time:</strong> ${fields['Prep Time'] || 'No Prep Time'}</p>
          <p><strong>Cook Time:</strong> ${fields['Cook Time'] || 'No Cook Time'}</p>
          <p><strong>Diet:</strong> ${fields.Diet || 'No Diet Information'}</p>
        </div>
      `;
      recipesContainer.appendChild(recipeElement); // Append the recipe div to the container
    });
  })
  .catch(error => {
    console.error('Error fetching recipes:', error);
    alert('Failed to fetch recipes. Please check the console for details.');
  });
