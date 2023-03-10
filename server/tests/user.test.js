const app = require("../index");
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

chai.use(chaiHttp);
var id = "";
var email = (Math.random() + 1).toString(36).substring(7);
var token = "";

describe("POST /api/signup", () => {
  const user = {
    name: "Andrea",
    surname: "Rettaroli",
    email: email,
    password: "-Prova123",
    address: "via rossi 14",
    province: "AN",
    language: "it-IT",
  };
  it("Should return a user if a valid params is provided", async () => {
    const response = await request(app).post("/api/signup").send(user);
    expect(response.status).to.deep.equal(200);
    expect(response.body).to.have.property("_id");
    expect(response.body).to.have.property("name", "Andrea");
    expect(response.body).to.have.property("email", email);
    expect(response.body).to.have.property("role", "user");
    expect(response.body).to.have.property("createdAt");
    expect(response.body).to.have.property("token");
    token = response.body.token;
    id = response.body._id;
  });
  it("should return an error when the email is already in use", async () => {
    const response = await request(app).post("/api/signup").send(user);
    expect(response.status).to.deep.equal(409);
  });
  it("should return an error when the request body is missing a required field", async () => {
    const user = {
      name: "John Doe",
      password: "password",
    };
    const response = await request(app).post("/api/signup").send(user);
    expect(response.status).to.deep.equal(500);
    expect(response.body).to.have.property("error", "Internal server error");
  });
});

describe("POST /api/login", () => {
  const user = {
    name: "Andrea",
    surname: "Rettaroli",
    email: email,
    password: "-Prova123",
    address: "via rossi 14",
    province: "AN",
    language: "it-IT",
  };
  it("Should return a user if valid email and password are provided", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("role");
        expect(res.body).to.have.property("createdAt");
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it('Should return "Invalid Credentials" if invalid email or password are provided', (done) => {
    chai
      .request(app)
      .post("/api/login")
      .send({ email: "user@example.com", password: "invalid_password" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid Credentials");
        done();
      });
  });

  it("Should return a 400 status code if email or password are missing", (done) => {
    chai
      .request(app)
      .post("/api/login")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });
});

describe("GET /api/user", () => {
  it("should return a 401 error when Authorization is not provided ", async () => {
    const res = await chai.request(app).get("/api/user").query({ id: id });

    expect(res).to.have.status(401);
  });
  it("should return a user when a valid ID is provided", async () => {
    const res = await chai
      .request(app)
      .get("/api/user")
      .query({ id: id })
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.email).to.equal(email);
  });

  it("should return a 404 error when an invalid ID is provided", async () => {
    const res = await chai
      .request(app)
      .get("/api/user")
      .query({ id: new mongoose.Types.ObjectId() })
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(404);
    expect(res.body).to.be.an("object");
    expect(res.body.error).to.equal("User not found");
  });
});

describe("PUT /api/user", () => {
  it("should return a 401 error when Authorization is not provided ", async () => {
    const res = await chai.request(app).get("/api/user").query({ id: id });

    expect(res).to.have.status(401);
  });
  it("should return an updated user if a valid user ID and updated fields are provided", async () => {
    const updatedUser = {
      name: "Jane ",
      surname: "Doe",
      email: "janedoe@test.com",
    };
    const res = await request(app)
      .put(`/api/user?id=${id}`)
      .send(updatedUser)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name", updatedUser.name);
    expect(res.body).to.have.property("email", updatedUser.email);
  });

  it("should return a 404 error if an invalid user ID is provided", async () => {
    const updatedUser = {
      name: "Jane Doe",
      email: "janedoe@test.com",
    };
    const invalidUserId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/user?id=${invalidUserId}`)
      .send(updatedUser)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("error", "User not found");
  });
});

describe("GET /api/users", () => {
  it("should return a list of users", async () => {
    // Create some dummy users to populate the database
    const users = await userModel.find({});
    const numberOfUsers = users.length;

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).is.equal(200);
    expect(Array.isArray(response.body)).is.equal(true);
    expect(response.body.length).is.equal(numberOfUsers);
  });
});

describe("DELETE /api/user", () => {
  it("should return a 404 error if the user is not found", async () => {
    // Create a random user id that does not exist
    const invalidUserId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/user?id=${invalidUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error", "User not found");
  });

  it("should return a 400 error if an admin user is trying to be deleted", async () => {
    const res = await request(app)
      .delete(`/api/user?id=${"6408b8f57c1434784ced7a62"}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "Admin can't be deleted");
  });

  it("should delete a user successfully", async () => {
    const res = await request(app)
      .delete(`/api/user?id=${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("description", "User deleted");

    // Try to find the user in the database again, it should not exist
    const deletedUser = await userModel.findById(id);
    expect(deletedUser).to.equal(null);
  });
});
