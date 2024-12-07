const { badRequest, success } = require("../utils/response-types");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .email()
    .required()
    .messages({
      'string.email': 'El correo electrónico no tiene un formato válido.',
      'string.min': 'El correo debe tener al menos {#limit} caracteres.',
      'any.required': 'El correo electrónico es obligatorio.',
    }),
  businessName: Joi.string()
    .required()
    .messages({
      'any.required': 'La razón social es obligatoria.',
    }),
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'El nombre es obligatorio.',
    }),
  jobTitle: Joi.string()
    .required()
    .messages({
      'any.required': 'El puesto es obligatorio.',
    }),
  phone: Joi.string()
    .required()
    .messages({
      'any.required': 'El número de teléfono es obligatorio.',
    }),
  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
      'any.required': 'La contraseña es obligatoria.',
    }),
});


exports.register = async (req, res) => {
  // Validar los datos antes de crear un usuario
  const { error } = registerSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const { email, businessName, name, jobTitle, phone, password } = req.body;

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
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    success(res, {
      id: savedUser.id,
      name,
      email,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .email()
    .required()
    .messages({
      'string.email': 'El correo electrónico no tiene un formato válido.',
      'string.min': 'El correo debe tener al menos {#limit} caracteres.',
      'any.required': 'El correo electrónico es obligatorio.',
    }),
  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
      'any.required': 'La contraseña es obligatoria.',
    }),
});

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const { email, password } = req.body;

  // Verificar si el email existe
  const user = await User.findOne({ where: { email } });
  if (!user) return badRequest(res, "Aún no estas registrado");

  // Verificar la contraseña
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return badRequest(res, "Credenciales inválidas");

  // Convertir la instancia de Sequelize a un objeto plano
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  // Crear y asignar un token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  success(res.header("auth-token", token), {
    token,
    user: userWithoutPassword,
  });
};
