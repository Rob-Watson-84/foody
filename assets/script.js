//global variables
var spoonAPI = '51070bf02459445cb28205ccc4e24c4c'



// .on("click") function associated with the Search Button
$("#submit-btn").on("click", function (event) {
  event.preventDefault();
  alert("Testing button!");
  var protein = $("#protein").val().trim();
  var carbs = $("#carbs").val().trim();
  var veggies = $("#vegetables").val().trim();
  var urlTag = protein + "," + carbs + "," + veggies;
  var spoonUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + spoonAPI + "&ingredients=" + urlTag
  fetch(spoonUrl)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      recipePage(data);
    })
    .catch(error => {
      console.log("Error");
    });
});


//create list of recipe names
function recipePage(recipeData) {
  console.log(recipeData);
  for (let i = 0; i < recipeCount; i++) {
    // Get recipe info for current index
    var recipe = recipeData.recipes[i];
    var recipeCount = i + 1;
    // If the recipe has a title, log and append to recipeList
    var title = recipe.title;
    var recipeList = "<ul class='recipe-group'>" + " <li class='recipe-group-item recipeTitle'>";

    if (title) {
      console.log(title);
      recipeList += "<span class='label label-primary'>" + recipeCount + ".  </span>" + title;
    }
    // //recipe url section. URL not in fetch with ingredients
    // var sourceURL = recipe.sourceUrl;
    // if (sourceURL) {
    //   recipeList += "<a href='" + sourceURL + "'>" + sourceURL + "</a>";
    // }
    $("#recipe-section").append(recipeList);
  }
}