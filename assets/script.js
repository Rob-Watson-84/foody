//global variables
var spoonAPI = '51070bf02459445cb28205ccc4e24c4c'


// .on("click") function associated with the Search Button
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  var protein = $("#protein").val().trim();
  var carbs = $("#carbs").val().trim();
  var veggies = $("#veggies").val().trim();
  var other = $("#other").val().trim();

  var urlTag = protein + "," + carbs + "," + veggies; + "," + other
  var spoonUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + spoonAPI + "&ingredients=" + urlTag
  fetch(spoonUrl)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      recipe(data.id); //find recipe by id function

    })
    .catch(error => {
      console.log("Error");
    });
});

function recipe(recipeID){
  var idUrl = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false?apiKey=` + spoonAPI
  console.log(idUrl)
  fetch(idUrl)
    .then((response) => response.json())
    .then(data => {
      recipeSection(data);
    })
    .catch(error => {
      console.log("Error");
    });
}

//create list of recipe names
function recipeSection(data) {
  console.log(data);
  for (let i = 0; i < recipeCount; i++) {
    // Get recipe info for current index
    var recipe = data.recipes[i];
    var recipeCount = i + 1;
    // If the recipe has a title, log and append to recipeList
    var title = recipe.title;
    var recipeList = "<ul class='recipe-group'>" + " <li class='recipe-group-item recipeTitle'>";

    if (title) {
      console.log(title);
      recipeList += "<span class='label label-primary'>" + recipeCount + ".  </span>" + title;
    }
  }
}