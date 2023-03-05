/**
 * @swagger
 * tags:
 *   name: Basket
 *   description: Trash basket APIs
 * @swagger
 * components:
 *   schemas:
 *     Basket:
 *       type: object
 *       required:
 *         - userId
 *         - type
 *         - dimension
 *         - filling
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the trash basket
 *         userId:
 *           type: string
 *           description: Is owner user id
 *         type:
 *           type: string
 *           description: Describe what type of trash can be collect
 *         dimension:
 *           type: number
 *           description: Kilograms that chan be putted in the trash basket
 *         filling:
 *           type: number
 *           description: Kilograms putted in the trash basket
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was update
 *       example:
 *         id: 25023aac471e5c26eccd23bz
 *         userId: 64023aac471e5c26eccd26bd
 *         type: Glass
 *         dimension: 5.00
 *         filling: 0.00
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2023-03-10T04:05:06.157Z
 */

const controller = require("../controllers/basketController.js");

module.exports = (server) => {
  /**
   * @swagger
   * /basket:
   *   post:
   *     summary: Create a trash basket
   *     tags: [Basket]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Basket'
   *     responses:
   *       200:
   *         description: Trash basket correctly created
   *       409:
   *         description: Too much trash baskets
   *       500:
   *         description: Internal server error
   */
  server.route("/basket").post(controller.createBasket);
  /**
   * @swagger
   * /basket:
   *   get:
   *     summary: Get basket info from id
   *     tags: [Basket]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The basket id
   *     responses:
   *       200:
   *         description: The user informations
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Basket'
   *       404:
   *          description: The basket was not found
   *       500:
   *         description: Internal server error
   */
  server.route("/basket").get(controller.getBasket);

  /**
   * @swagger
   * /basket:
   *   put:
   *     summary: Update basket by id
   *     tags: [Basket]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The basket id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Basket'
   *     responses:
   *        200:
   *          description: The trash basket was updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Basket'
   *        404:
   *          description: The basket was not found
   *        500:
   *          description: Internal server error

   */
  server.route("/basket").put(controller.updateBasket);
  /**
   * @swagger
   * /basket:
   *   delete:
   *     summary: Remove basket by id
   *     tags: [Basket]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The basket id
   *     responses:
   *       200:
   *         description: The basket was deleted
   *       404:
   *         description: The basket was not found
   *       500:
   *         description: Internal server error
   */
  server.route("/basket").delete(controller.deleteBasket);
  /**
   * @swagger
   * /baskets:
   *   get:
   *     summary: Get a list of basket
   *     tags: [Basket]
   *     parameters:
   *       - in: query
   *         name: userId
   *         schema:
   *           type: string
   *         required: false
   *         description: The user id
   *     responses:
   *       200:
   *         description: All basket or the basket of one user
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Basket'
   *       500:
   *         description: Internal server error
   */
  server.route("/baskets").get(controller.basketsList);
};