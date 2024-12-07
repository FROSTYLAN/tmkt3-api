const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               businessName:
 *                 type: string
 *                 example: "ESCUADRON SECURITY S.A.C."
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               jobTitle:
 *                 type: string
 *                 example: "Gerente General"
 *               phone:
 *                 type: string
 *                 example: "962028767"
 *               username:
 *                 type: string
 *                 example: "DUCZ69"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en la solicitud
 */
router.post("/login", login);

module.exports = { AuthRoutes: router };
