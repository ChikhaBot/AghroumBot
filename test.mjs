import fetch from "node-fetch";
import { parse } from "node-html-parser"

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://mawdoo3.com/%D8%AA%D8%B5%D9%86%D9%8A%D9%81:%D8%A3%D9%83%D9%84%D8%A7%D8%AA_%D8%B3%D8%B1%D9%8A%D8%B9%D8%A9";

// start of the program
const getRecipe = async () => {
   const RecipeRawData = await getRawData(URL);
   const loadedData = parse(RecipeRawData);
   const recipes = loadedData.querySelector("#grid").childNodes;
   const exampleRecipe = recipes[0].rawText;
   
   console.log(exampleRecipe);
};

// invoking the main function
getRecipe();