const { Category } = require('../models/category.model');

const services = {}

services.create = async (categoryData) => {
  return await Category.create(categoryData);
};

services.getAll = async () => {
  return await Category.findAll();
};

services.getById = async (categoryId) => {
  return await Category.findByPk(categoryId);
};

services.update = async (categoryId, categoryData) => {
  return await Category.update(categoryData, { where: { categoryId: categoryId } });
};

services.delete = async (categoryId) => {
  return await Category.destroy({ where: { categoryId: categoryId } });
};

module.exports = { CategoryService: services }