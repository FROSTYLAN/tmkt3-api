const { RoleService } = require("../services/role.service");
const Joi = require("joi");
const { badRequest, success, error } = require("../utils/response-types");

const controllers = {}

const roleSchema = Joi.object({
  roleId: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'El roleId debe ser un número',
      'number.integer': 'El roleId debe ser un número entero',
      'number.positive': 'El roleId debe ser un número positivo',
    }),

  code: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.base': 'El código debe ser una cadena de texto',
      'string.empty': 'El código no puede estar vacío',
      'string.min': 'El código debe tener al menos {#limit} caracteres',
      'string.max': 'El código no puede tener más de 255 caracteres',
      'any.required': 'El código es obligatorio',
    }),

  name: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres',
      'string.max': 'El nombre no puede tener más de 255 caracteres',
      'any.required': 'El nombre es obligatorio',
    }),

  description: Joi.string()
    .max(255)
    .messages({
      'string.base': 'La descripción debe ser una cadena de texto',
      'string.max': 'La descripción no puede tener más de 255 caracteres',
    }),
});

controllers.create = async (req, res) => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    return badRequest(res, error.details[0].message)
  }

  try {
    const role = await RoleService.create(req.body);
    return success(res, role)
  } catch (err) {
    return error(res, err.message)
  }
};

controllers.getAll = async (req, res) => {
  try {
    const roles = await RoleService.getAll();
    return success(res, roles)
  } catch (err) {
    return error(res, err.message)
  }
};

controllers.getById = async (req, res) => {
  try {
    const role = await RoleService.getById(req.params.id);
    if (!role) {
      return badRequest(res, "Rol no encontrado")
    }
    return success(res, role)
  } catch (err) {
    return error(res, err.message)
  }
};

controllers.update = async (req, res) => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    return badRequest(res, error.details[0].message)
  }

  try {
    const updated = await RoleService.update(
      req.params.id,
      req.body
    );
    if (updated[0] === 0) {
      return badRequest(res, "Rol no encontrado")
    }
    return success(res, "Rol actualizado exitosamente")
  } catch (err) {
    return error(res, err.message)
  }
};

controllers.delete = async (req, res) => {
  try {
    const deleted = await RoleService.delete(req.params.id);
    if (deleted === 0) {
      return badRequest(res, "Rol no encontrado")
    }
    return success(res, "Rol eliminado exitosamente")
  } catch (err) {
    return error(res, err.message)
  }
};

module.exports = { RoleController: controllers}