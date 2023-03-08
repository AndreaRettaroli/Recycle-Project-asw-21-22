/**
 * @swagger
 * tags:
 *   name: Withdrawal
 *   description: Withdrawals from trash baskets APIs
 * @swagger
 * components:
 *   schemas:
 *     Withdrawal:
 *       type: object
 *       required:
 *         - userId
 *         - basketId
 *         - wasteValue
 *         - basketType
 *         - wasteWeight
 *         - createdAt
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Acquisition
 *         userId:
 *           type: string
 *           description: The auto-generated id of the user
 *         basketId:
 *           type: string
 *           description: The auto-generated id of the basket
 *         basketType:
 *           type: string
 *           description: The type of waste example(plastic,glass,ecc..)
 *         wasteWeight:
 *           type: Number
 *           description: The waste weight in kg
 *         wasteValue:
 *           type: Number
 *           description: The waste value in euro
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the withdrawal was added
 *       example:
 *         _id: 64076f7eb400f0e822a9711d
 *         userId: 64023aac471e5c26eccd26bd
 *         basketId: 6407403eb6505fe776812ffb
 *         wasteValue: 2
 *         wasteType: PLASTIC
 *         wasteWeight: 4
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const auth = require("../middleware/auth");
const controller = require("../controllers/withdrawalController");

module.exports = (server) => {
  /**
   * @swagger
   * /api/withdrawals:
   *   get:
   *     summary: Get a list of withdrawals
   *     tags: [Withdrawal]
   *     responses:
   *       200:
   *         description: The list of the withdrawals
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Withdrawal'
   *       500:
   *         description: Internal server error
   */
  server.route("/api/withdrawals").get(auth, controller.withdrawalList);
};
