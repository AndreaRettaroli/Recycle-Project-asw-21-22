
### Run 
````
    node index.js
````
or 
````
    nodemon index.js
````
### Swagger

For swagger i used the following packages:
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

Swagger is available at http://localhost:3000/

For more info follow [this guide](https://blog.logrocket.com/documenting-express-js-api-swagger/).
For authentication use jwt token returned after login or signin without specify Bearer before.

### JWT
To create a token key use the following code:
````
const crypto= require('crypto')
var tokenKey=crypto.randomBytes(64).toString('hex')
console.log(tokenKey)
````
for more info follow [this guide](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs) or read [this article](https://medium.com/@prashantramnyc/authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3)

The docs [jwt.io](https://jwt.io/)

### Tests

I used [Mocha](https://mochajs.org/) with [Chai](https://www.chaijs.com/) and [SuperTest](https://github.com/ladjs/supertest#readme).

To run test use:
````
    npm run test
````

### Docker

Create an image:
````
docker build -t recycle-server .
````
create a container:
````
docker run -p 3000:3000 recycle-server
````

mongo db image is built by docker-compose.yaml .