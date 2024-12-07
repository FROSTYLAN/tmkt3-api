// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { CategoryController } = require('../controllers/category.controller');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para la gestión de categorías
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Crear una nueva categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CAT001"
 *               name:
 *                 type: string
 *                 example: "Categoría A"
 *               description:
 *                 type: string
 *                 example: "Descripción de la categoría A"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error al crear la categoría
 */
router.post('/', CategoryController.create);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Obtener todas las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       400:
 *         description: Error al obtener todas las categorías
 */
router.get('/', CategoryController.getAll);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Obtener una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Error al obtener la categoría
 */
router.get('/:id', CategoryController.getById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Actualizar una categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               code:
 *                 type: string
 *                 example: "CAT001A"
 *               name:
 *                 type: string
 *                 example: "Categoría A Actualizado"
 *               description:
 *                 type: string
 *                 example: "Descripción actualizada de la categoría A"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Error al actualizar la categoría
 */
router.put('/:id', CategoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Eliminar una categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       400:
 *         description: Error al eliminar la categoría
 */
router.delete('/:id', CategoryController.delete);

module.exports = { CategoryRoutes: router };
