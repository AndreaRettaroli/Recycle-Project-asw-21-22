/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Signup and Login user APIs
 * @swagger
 * components:
 *   schemas:
 *     Credentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: rettaroli.andrea2597@gmail.com
 *         password: -Prova123
 *
 */

const controller = require("../controllers/authController");
module.exports = (server) => {
  /**
   * @swagger
   * /api/signup:
   *   post:
   *     summary: Signup user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: User correct
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *       409:
   *         description: Email already used
   *       500:
   *         description: Internal server error
   */
  server.route("/api/signup").post(controller.signup);

  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Login user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Credentials'
   *     responses:
   *       200:
   *         description: User correct login
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *       400:
   *         description: "Invalid Credentials"
   *       500:
   *         description: Internal server error
   */
  server.route("/api/login").post(controller.login);
};
