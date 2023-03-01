/**
 * @swagger
 * tags:
 *   name: Access
 *   description: Signup and Login user API,
 *   name: User
 *   description: Signup and Login user API
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *       properties:
 *         id:
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
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         id: d5fEq34aszfaibwaxqn
 *         name: Andrea
 *         surname: Rettaroli
 *         email: rettaroli.andrea2597@gmail.com
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const controller = require("../controllers/userController.js");

module.exports = (server) => {
  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Signup user
   *     tags: [Access]
   *     responses:
   *       200:
   *         description: User correct signup
   */
  server.route("/signup").post(controller.signup);

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Login user
   *     tags: [Access]
   *     responses:
   *       200:
   *         description: User correct login
   */
  server.route("/login").post(controller.login);

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Get user by id
   *     tags: [User]
   *     parameters:
   *       - in: path
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
   */
  server.route("/user/:_id").get(controller.getUser);
  /**
   * @swagger
   * /user/{id}:
   *   put:
   *     summary: Update user by id
   *     tags: [User]
   *     parameters:
   *       - in: path
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
   *          description: Some error happened

   */
  server.route("/user/:_id").put(controller.updateUser);
  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     summary: Remove user by id
   *     tags: [User]
   *     parameters:
   *       - in: path
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
   */
  server.route("/user/:_id").delete(controller.deleteUser);
  /**
   * @swagger
   * /users:
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
   */
  server.route("/users").get(controller.usersList);
};
