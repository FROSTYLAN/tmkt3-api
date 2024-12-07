// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { RoleController } = require('../controllers/role.controller');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para la gestión de roles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     tags: [Roles]
 *     summary: Crear un nuevo rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CLI"
 *               name:
 *                 type: string
 *                 example: "Cliente"
 *               description:
 *                 type: string
 *                 example: "Administrar para clientes"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error al crear el rol
 */
router.post('/', RoleController.create);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener todos las roles
 *     responses:
 *       200:
 *         description: Lista de roles
 *       400:
 *         description: Error al obtener todos los roles
 */
router.get('/', RoleController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener un rol por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al obtener el rol
 */
router.get('/:id', RoleController.getById);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Actualizar un rol
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de el rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               code:
 *                 type: string
 *                 example: "ADM"
 *               name:
 *                 type: string
 *                 example: "Rol 2"
 *               description:
 *                 type: string
 *                 example: "Rol actualizado"
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al actualizar el rol
 */
router.put('/:id', RoleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Eliminar una rol
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al eliminar el rol
 */
router.delete('/:id', RoleController.delete);

module.exports = { RoleRoutes: router };
