const { CategoryService } = require("../services/category.service");
const Joi = require("joi");

const controllers = {}

const categorySchema = Joi.object({
  categoryId: Joi.number().integer().positive(),
  code: Joi.string().max(255).required(),
  name: Joi.string().max(255).required(),
  description: Joi.string().max(255),
  state: Joi.number().integer().positive()
});

controllers.create = async (req, res) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await CategoryService.create(req.body);
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getAll = async (req, res) => {
  try {
    const categories = await CategoryService.getAll();
    res.send(categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.getById = async (req, res) => {
  try {
    const category = await CategoryService.getById(req.params.id);
    if (!category) return res.status(404).send("Categoría no encontrada");
    res.send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.update = async (req, res) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updated = await CategoryService.update(
      req.params.id,
      req.body
    );
    if (updated[0] === 0)
      return res.status(404).send("Categoría no encontrada");
    res.send("Categoría actualizada exitosamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await CategoryService.delete(req.params.id);
    if (deleted === 0) return res.status(404).send("Categoría no encontrada");
    res.send("Categoría eliminada exitosamente");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { CategoryController: controllers}