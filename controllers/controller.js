import database from "../recipes.js";
let recipes = [...database];

function getAll(req, res) {
  return res.json(recipes);
}

function find(req, res) {
  const recipeId = req.params.id;
  const result = recipes.find((recipes) => {
    return recipes.id == recipeId;
  });
  return res.json(result);
}

function create(req, res) {
  const newRecipe = {
    title: req.body.title,
    description: req.body.description,
    preparation: {
      ingredients: req.body.preparation.ingredients,
      cooking: req.body.preparation.cooking,
      total: req.body.preparation.total,
    },
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    nutritionalValues: {
      calories: req.body.nutritionalValues.calories,
      carbohydrates: req.body.nutritionalValues.carbohydrates,
      protein: req.body.nutritionalValues.protein,
      fat: req.body.nutritionalValues.fat,
    },
  };
  recipes.push(newRecipe);
  return res.json("Se ha creado una receta nueva");
}

function update(req, res) {
  const recipeId = Number(req.params.id);
  let newArray = recipes.map((recipe) => {
    if (recipe.id === recipeId) {
      recipe.title = req.body.title || recipe.title;
      recipe.description = req.body.description || recipe.description;
      recipe.preparation = {
        ingredients:
          req.body.preparation?.ingredients || recipe.preparation.ingredients,
        cooking: req.body.preparation?.cooking || recipe.preparation.cooking,
        total: req.body.preparation?.total || recipe.preparation.total,
      };

      recipe.instructions = req.body.instructions || recipe.instructions;
      recipe.ingredients = req.body.ingredients || recipe.ingredients;
      recipe.nutritionalValues = {
        calories: 
          req.body.nutritionalValues?.calories ||
          recipe.nutritionalValues.calories,
        carbohydrates:
          req.body.nutritionalValues?.carbohydrates ||
          recipe.nutritionalValues.carbohydrates,
        protein:
          req.body.nutritionalValues?.protein ||
          recipe.nutritionalValues.protein,
        fat: req.body.nutritionalValues?.fat || recipe.nutritionalValues.fat,
      };
    }
    return recipe;
  });

  //  const newArray = recipes.map(function (recipe) {
  //      if (recipe.id === recipeId) {
  //        return {
  //         ...recipe,
  //         title: title || recipe.title,
  //         description: description || recipe.description,
  //         preparation: {
  //           ingredients: preparationIng || recipe.ingredients,
  //           cooking: preparationCoo || recipe.cooking,
  //           total: preparationTot || recipe.total,
  //         },
  //         instructions: instructions || recipe.instructions,
  //         ingredients: ingredients || recipe.ingredients,
  //         nutritionalValues: {
  //           calories: nutritionalValuesCal || recipe.calories,
  //           carbohydrates: nutritionalValuesCar || recipe.carbohydrates,
  //           protein: nutritionalValuesPro || recipe.protein,
  //           fat: nutritionalValuesFat || recipe.fat,
  //         },
  //       };
  //     }
  //     return product;
  //   });

  console.log(newArray);
  recipes = newArray;
  return res.json(newArray);
}

function destroy(req, res) {
  const recipeId = Number(req.params.id);
  let result = recipes.filter((recipe) => {
    return recipe.id !== recipeId;
  });
  console.log(result);
  recipes = result;
  return res.json(recipes);
}

export default {
  getAll: getAll,
  find: find,
  create: create,
  update: update,
  destroy: destroy,
};
