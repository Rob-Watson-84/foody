//global variables
var spoonAPI = '51070bf02459445cb28205ccc4e24c4c'
var totalData = [];
let recipeDiv = document.getElementById("recipe-div");

// .on("click") function associated with the Search Button
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  var protein = $("#protein").val().trim(); //main protein, cuisine, diet
  //following items are not required but do change the search parameters
  var carbs = $("#carbs").val().trim();
  var veggies = $("#veggies").val().trim();
  // var other = $("#other").val().trim();

  var urlTag = protein + "+" + carbs + "+" + veggies; 
  var spoonUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + spoonAPI + "&query=" + urlTag
  console.log(spoonUrl);
    fetch(spoonUrl)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      recipeSection(data)
    })
    .catch(error => {
      console.log("Error");
    });
});


//create list of recipe names and pictures
function recipeSection(data) {
  recipeDiv.innerHTML = "";
  if (data.results.length > 0) {
    totalData = data.results;
  for(let i = 0; i < totalData.length; i++){
    console.log(totalData);
    let img = document.createElement("img");
    let div = document.createElement('div');
    div.setAttribute("class", "col-sm-3"); //needs bulma properties added
    div.innerHTML += '<h3><a href="javascript:void(0);" onclick="goToSourceURL('+totalData[i].id +')">' + totalData[i].title + '</a></h3>'
    div.innerHTML += '<img class="img-fluid" src="'+totalData[i].image+'">'  
   recipeDiv.appendChild(div);
  } 
  }else {recipeDiv.innerHTML = "Unable to locate results. Please try your search again"}
  }

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
