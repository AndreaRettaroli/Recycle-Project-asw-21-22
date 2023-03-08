/**
 * @swagger
 * tags:
 *   name: Acquisition
 *   description: Acquisition APIs
 *
 * @swagger
 * components:
 *   schemas:
 *     Acquisition:
 *       type: object
 *       required:
 *         - userId
 *         - basketId
 *         - wasteName
 *         - wasteType
 *         - wasteWeight
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
 *         wasteName:
 *           type: string
 *           description: The of the waste
 *         wasteType:
 *           type: string
 *           description: The type of waste example(plastic,glass,ecc..)
 *         wasteWeight:
 *           type: Number
 *           description: The waste weight in kilograms
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the acquisition was added
 *       example:
 *         _id: 64076f7eb400f0e822a9711d
 *         userId: 64023aac471e5c26eccd26bd
 *         basketId: 6407403eb6505fe776812ffb
 *         wasteName: Bottle
 *         wasteType: PLASTIC
 *         wasteWeight: 0.2
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const auth = require("../middleware/auth");
const controller = require("../controllers/acquisitionController");

module.exports = (server) => {
  /**
   * @swagger
   * /api/acquisitions:
   *   get:
   *     summary: Get a list of acquisitions
   *     tags: [Acquisition]
   *     responses:
   *       200:
   *         description: The list of the acquisitions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Acquisition'
   *       500:
   *         description: Internal server error
   */
  server.route("/api/acquisitions").get(auth, controller.acquisitionList);
};
