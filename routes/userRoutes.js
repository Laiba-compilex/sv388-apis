const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController'); 

/**
 * @swagger
 * /api/users/createPlayer:
 *   post:
 *     summary: Create a new player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created successfully
 */
router.post('/createPlayer', playerController.createPlayer);

/**
 * @swagger
 * /api/users/updatePlayer:
 *   post:
 *     summary: Update player information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated successfully
 */
router.post('/updatePlayer', playerController.updatePlayer);

/**
 * @swagger
 * /api/users/getAllPlayers:
 *   get:
 *     summary: Get all players
 *     responses:
 *       200:
 *         description: List of all players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
router.get('/getAllPlayers', playerController.getAllPlayers);

/**
 * @swagger
 * /api/users/getPlayerById:
 *   get:
 *     summary: Get player by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 */
router.get('/getPlayerById', playerController.getPlayerById);

/**
 * @swagger
 * /api/users/deletePlayer:
 *   post:
 *     summary: Delete a player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Player deleted successfully
 */
router.post('/deletePlayer', playerController.deletePlayer);


module.exports = router;