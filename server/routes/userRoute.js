/**
 * @swagger
 *# 1) Define the security scheme type (HTTP bearer)
 *components:
 *  securitySchemes:
 *    bearerAuth:            # arbitrary name for the security scheme
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *# 2) Apply the security globally to all operations
 *security:
 *  - bearerAuth: []         # use the same name as above
 *
 *
 * @swagger
 * tags:
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
 *         token:
 *           type: string
 *           description: The user access token
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
 *
 *
 */
const auth = require("../middleware/auth");
const controller = require("../controllers/userController");
module.exports = (server) => {
  /**
   * @swagger
   * /api/user:
   *   get:
   *     security:
   *        - bearerAuth: []
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
   *       401:
   *         description: Access token is missing or invalid
   *       500:
   *         description: Internal server error
   */
  server.route("/api/user").get(auth, controller.getUser);
  /**
   * @swagger
   * /api/user:
   *   put:
   *     security:
   *        - bearerAuth: []
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
   *       200:
   *          description: The user was updated
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *       401:
   *         description: Access token is missing or invalid
   *       404:
   *         description: The user was not found
   *       500:
   *         description: Internal server error
   *
   */
  server.route("/api/user").put(auth, controller.updateUser);
  /**
   * @swagger
   * /api/user:
   *   delete:
   *     security:
   *        - bearerAuth: []
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
   *       401:
   *         description: Access token is missing or invalid
   *       404:
   *         description: The user was not found
   *       500:
   *         description: Internal server error
   */
  server.route("/api/user").delete(auth, controller.deleteUser);
  /**
   * @swagger
   * /api/users:
   *   get:
   *     security:
   *        - bearerAuth: []
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
   *       401:
   *         description: Access token is missing or invalid
   *       500:
   *         description: Internal server error
   */
  server.route("/api/users").get(auth, controller.usersList);
};
