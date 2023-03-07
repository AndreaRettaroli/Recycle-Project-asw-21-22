/**
 * @swagger
 * tags:
 *   name: Access
 *   description: Signup and Login user APIs
 *   name: User
 *   description: User APIs
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - address
 *         - province
 *         - language
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         surname:
 *           type: string
 *           description: The surname of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         address:
 *           type: string
 *           description: The address of the user residence
 *         province:
 *           type: string
 *           description: The province of the user residence
 *         language:
 *           type: string
 *           description: The user language
 *         role:
 *           type: string
 *           description: The user role
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date when the user was update
 *       example:
 *         _id: 64023aac471e5c26eccd26bd
 *         name: Andrea
 *         surname: Rettaroli
 *         email: rettaroli.andrea2597@gmail.com
 *         password: -Prova123
 *         address: via rossi 14
 *         province: AN
 *         language: it-IT
 *         role: user
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2023-03-10T04:05:06.157Z
 */

const controller = require("../controllers/userController");

module.exports = (server) => {
  /**
   * @swagger
   * /api/signup:
   *   post:
   *     summary: Signup user
   *     tags: [Access]
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
   *     tags: [Access]
   *     responses:
   *       200:
   *         description: User correct login
   *       500:
   *         description: Internal server error
   */
  server.route("/api/login").post(controller.login);

  /**
   * @swagger
   * /api/user:
   *   get:
   *     summary: Get user by id
   *     tags: [User]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The user informations
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *       500:
   *         description: Internal server error
   */
  server.route("/api/user").get(controller.getUser);
  /**
   * @swagger
   * /api/user:
   *   put:
   *     summary: Update user by id
   *     tags: [User]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *        200:
   *          description: The user was updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        404:
   *          description: The user was not found
   *        500:
   *         description: Internal server error
   *
   */
  server.route("/api/user").put(controller.updateUser);
  /**
   * @swagger
   * /api/user:
   *   delete:
   *     summary: Remove user by id
   *     tags: [User]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     responses:
   *       200:
   *         description: The user was deleted
   *       404:
   *         description: The user was not found
   *       500:
   *         description: Internal server error
   */
  server.route("/api/user").delete(controller.deleteUser);
  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get a list of users
   *     tags: [User]
   *     responses:
   *       200:
   *         description: The list of the users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       500:
   *         description: Internal server error
   */
  server.route("/api/users").get(controller.usersList);
};
