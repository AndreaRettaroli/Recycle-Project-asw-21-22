/**
 * @swagger
 * tags:
 *   name: Price
 *   description: Price of waste type APIs
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       required:
 *         - wasteType
 *         - value
 *         - createdAt
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the waste price
 *         wasteType:
 *           type: string
 *           description: Is the waste type example(PLASTIC, GLASS, ecc...)
 *         value:
 *           type: Number
 *           description: Price in Euro
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the price was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date when the price was update
 *       example:
 *         _id: 25023aac471e5c26eccd23bz
 *         wasteType: PLASTIC
 *         value: 0.2
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2023-03-10T04:05:06.157Z
 */

const controller = require("../controllers/priceController");

module.exports = (server) => {
  /**
   * @swagger
   * /api/price:
   *   post:
   *     summary: Create a waste type Price
   *     tags: [Price]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Price'
   *     responses:
   *       200:
   *         description: Price correctly created
   *       500:
   *         description: Internal server error
   */
  server.route("/api/price").post(controller.createPrice);
  /**
   * @swagger
   * /api/price:
   *   get:
   *     summary: Get Price info from id
   *     tags: [Price]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The price id
   *     responses:
   *       200:
   *         description: The user informations
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Price'
   *       404:
   *          description: The price was not found
   *       500:
   *         description: Internal server error
   */
  server.route("/api/price").get(controller.getPrice);

  /**
   * @swagger
   * /api/price:
   *   put:
   *     summary: Update price by id
   *     tags: [Price]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The price id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Price'
   *     responses:
   *        200:
   *          description: The price was updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Price'
   *        404:
   *          description: The price was not found
   *        500:
   *          description: Internal server error

   */
  server.route("/api/price").put(controller.updatePrice);
  /**
   * @swagger
   * /api/price:
   *   delete:
   *     summary: Remove price by id
   *     tags: [Price]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The price id
   *     responses:
   *       200:
   *         description: The price was deleted
   *       404:
   *         description: The price was not found
   *       500:
   *         description: Internal server error
   */
  server.route("/api/basket").delete(controller.deletePrice);
  /**
   * @swagger
   * /api/prices:
   *   get:
   *     summary: Get a list of prices
   *     tags: [Price]
   *     responses:
   *       200:
   *         description: All prices for waste type
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Price'
   *       500:
   *         description: Internal server error
   */
  server.route("/api/baskets").get(controller.pricesList);
};
