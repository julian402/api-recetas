import { body } from "express-validator";

const recipeValidation = {
  create: [
    body("id")
      .notEmpty()
      .withMessage("El campo Id es obligatorio")
      .isNumeric()
      .withMessage("El valor debe ser numerico"),
    body("title")
      .notEmpty()
      .withMessage("El campo titulo es obligatorio")
      .isString()
      .withMessage("El campo debe ser un String"),
    body("description")
      .notEmpty()
      .withMessage("El campo Descripcion es obligatorio")
      .isString()
      .withMessage("El campo debe ser un String"),
      body('preparation').isObject().withMessage('El Campo debe ser un objeto'),
      body('preparation.ingredients').notEmpty().withMessage('El Campo Preparation ingradients es obligatorio').isString().withMessage('El Campo Preparation Ingredients debe ser un String'),
      body('instructions').isArray().withMessage('Este Campo debe ser un Array')

  ],
  update: [
    body("title").isString().withMessage("El campo titulo debe ser un String"),
    body("description")
      .isString()
      .withMessage("El campo de descripcion debe ser texto"),
  ],
};

export default recipeValidation;
