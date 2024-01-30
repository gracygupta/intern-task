const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Auth API", function () {
  this.timeout(10000);
  describe("User Registration API", () => {
    // Test case for successful registration
    it("should register a new user successfully", (done) => {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "testuser@gmail.com",
          username: "testuser",
          password: "Test@123",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have
            .property("message")
            .eql("user created successfully");
          res.body.should.have.property("data");
          done();
        });
    });

    // Test case for user already existing
    it("should return user already exist error", (done) => {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "testuser@gmail.com",
          username: "testuser",
          password: "Test@123",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("user already exist");
          done();
        });
    });

    // Test case for invalid password
    it("should return password validation errors", (done) => {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "testuser#2@example.com",
          username: "testuser#2",
          password: "12345",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("errors");
          done();
        });
    });

    // Test case for missing email
    it("should return email required error", (done) => {
      chai
        .request(app)
        .post("/api/register")
        .send({
          email: "testuser",
          username: "testuser#2",
          password: "12345",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("errors");
          done();
        });
    });
  });

  describe("User Login API", () => {
    // Test case for successful login
    it("should login user successfully", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          username: "testuser",
          password: "Test@123",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("login successfull");
          res.body.should.have.property("data");
          res.body.should.have.property("token");
          done();
        });
    });

    // Test case for invalid credentials
    it("should return invalid credentials error", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          username: "testuser",
          password: "InvalidPassword",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("invalid credentials");
          done();
        });
    });

    // Test case for user not found
    it("should return user not found error", (done) => {
      chai
        .request(app)
        .post("/api/login")
        .send({
          username: "nonexistentuser",
          password: "Test@123",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("Invalid Credentials");
          done();
        });
    });
  });
});
