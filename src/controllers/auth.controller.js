const { badRequest, success } = require("../utils/response-types");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../models/user.model");
const { Role } = require("../models/role.model");
const { Op } = require("sequelize");

const registerSchema = Joi.object({
  email: Joi.string().min(5).max(255).email().required().messages({
    "string.email": "El correo electrónico no tiene un formato válido.",
    "string.min": "El correo debe tener al menos {#limit} caracteres.",
    "any.required": "El correo electrónico es obligatorio.",
  }),
  businessName: Joi.string().required().messages({
    "any.required": "La razón social es obligatoria.",
  }),
  name: Joi.string().required().messages({
    "any.required": "El nombre es obligatorio.",
  }),
  jobTitle: Joi.string().required().messages({
    "any.required": "El puesto es obligatorio.",
  }),
  phone: Joi.string().required().messages({
    "any.required": "El número de teléfono es obligatorio.",
  }),
  username: Joi.string().required().messages({
    "any.required": "El usuario es obligatorio.",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

exports.register = async (req, res) => {
  // Validar los datos antes de crear un usuario
  const { error } = registerSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const { email, businessName, name, jobTitle, phone, username, password } =
    req.body;

  // Verificar si el usuario ya existe
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) return badRequest(res, "El email ya existe");

  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear un nuevo usuario
  const user = User.build({
    email,
    businessName,
    name,
    jobTitle,
    phone,
    username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    success(res, {
      ...savedUser.dataValues,
      password: null
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().min(3).max(255).required().messages({
    "string.min": "El correo debe tener al menos {#limit} caracteres.",
    "any.required": "El correo electrónico o usuario es obligatorio.",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const { email, password } = req.body;

  // Verificar si el email existe
  const user = await User.findOne({
  where: {
    [Op.or]: [
      { email },
      { username: email }
    ]
  }
});
  if (!user) return badRequest(res, "Aún no estas registrado");

  // Verificar la contraseña
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return badRequest(res, "Credenciales inválidas");

  // Convertir la instancia de Sequelize a un objeto plano
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  // Informacion de rol del usuario
  const role = await Role.findOne({ where: { roleId: user.roleId } })

  // Crear y asignar un token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  success(res.header("auth-token", token), {
    token,
    user: userWithoutPassword,
    role,
  });
};
