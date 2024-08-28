import database from "../recipes.js";
import { validationResult } from "express-validator";
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
  const result = validationResult(req);
  if (result.isEmpty()) {
    const newRecipe = {
      id: Number(req.body.id),
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
    return res.status(201).json({ message: "Se ha creado una receta nueva" });
  }
  return res.json({ erros: result.array() });
}

function update(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
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

    recipes = newArray;
    return res
      .status(200)
      .json({ message: "Se ha editado la receta con exito" });
  }
  return res.json({ erros: result.array() });
}
function destroy(req, res) {
  const recipeId = Number(req.params.id);
  let result = recipes.filter((recipe) => {
    return recipe.id !== recipeId;
  });
  recipes = result;
  return res.json("Se ha eliminado la receta con exito");
}

export default {
  getAll: getAll,
  find: find,
  create: create,
  update: update,
  destroy: destroy,
};
