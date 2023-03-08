/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Signup and Login user APIs
 */

const controller = require("../controllers/authController");
module.exports = (server) => {
  /**
   * @swagger
   * /api/signup:
   *   post:
   *     summary: Signup user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: User correct signup
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
   *     responses:
   *       200:
   *         description: User correct login
   *       500:
   *         description: Internal server error
   */
  server.route("/api/login").post(controller.login);
};
