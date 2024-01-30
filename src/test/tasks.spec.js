const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Task Management API", function () {
  this.timeout(600000);
  var validToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDkwNzMwOTQsImRhdGEiOnsiaWQiOiI2NWI5NzhjNWIzNDE4YzZmYzFkMTdjNmEiLCJlbWFpbCI6InRlc3R1c2VyIzJAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciMyIn0sImlhdCI6MTcwNjY1Mzg5NH0.Nvt8DC63rl984bXxpgrAXVF0kK61js8TYRsVTCZbH8A";
  var validTaskId = "65b9736d00305e999794f7f1";
  const invalidTaskId = "65b96ba5b5a0c9fc6bd2e8b9";

  // POST /api/task/add
  describe("Add Task API", () => {
    // Test Case 1: Successful Task Addition
    it("Should add a new task", (done) => {
      chai
        .request(app)
        .post("/api/task/add")
        .set("token", validToken)
        .send({
          title: "TaskTitle",
          description: "TaskDescription",
          dueDate: "2024-02-08T21:48:08.019+00:00",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task created");
          res.body.should.have.property("data").which.is.an("object");
          res.body.data.should.have.property("title").eql("TaskTitle");
          res.body.data.should.have
            .property("description")
            .eql("TaskDescription");
          res.body.data.should.have.property("dueDate").eql("02/09/2024");
          res.body.data.should.have.property("completed").eql(false);
          res.body.data.should.have.property("user").which.is.a("string");
          validTaskId = res.body.data._id;
          done();
        });
    });
    it("Should add a new task", (done) => {
      chai
        .request(app)
        .post("/api/task/add")
        .set("token", validToken)
        .send({
          title: "TaskTitle",
          description: "TaskDescription",
          dueDate: "2024-02-08T21:48:08.019+00:00",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task created");
          res.body.should.have.property("data").which.is.an("object");
          res.body.data.should.have.property("title").eql("TaskTitle");
          res.body.data.should.have
            .property("description")
            .eql("TaskDescription");
          res.body.data.should.have.property("dueDate").eql("02/09/2024");
          res.body.data.should.have.property("completed").eql(false);
          res.body.data.should.have.property("user").which.is.a("string");
          done();
        });
    });

    // Test Case 2: Title Empty
    it("Should return an error for empty title", (done) => {
      chai
        .request(app)
        .post("/api/task/add")
        .set("token", validToken)
        .send({
          title: "",
          description: "TaskDescription",
          dueDate: "02/09/2024",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have
            .property("message")
            .eql("title must not be empty");
          done();
        });
    });

    // Test Case 3: Invalid Due Date Format
    it("Should return an error for invalid due date format", (done) => {
      chai
        .request(app)
        .post("/api/task/add")
        .set("token", validToken)
        .send({
          title: "TaskTitle",
          description: "TaskDescription",
          dueDate: "",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("invalid due date");
          done();
        });
    });
  });

  // PATCH /api/task
  describe("Edit Task API", () => {
    // Test Case 1: Edit Title
    it("Should edit task title", (done) => {
      chai
        .request(app)
        .patch("/api/task")
        .set("token", validToken)
        .send({
          id: validTaskId,
          title: "NewTitle",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task edited");
          res.body.should.have.property("data").which.is.an("object");
          res.body.data.should.have.property("_id").eql(validTaskId);
          res.body.data.should.have.property("title").eql("NewTitle");
          done();
        });
    });

    // Test Case 2: Edit Description
    it("Should edit task description", (done) => {
      chai
        .request(app)
        .patch("/api/task")
        .set("token", validToken)
        .send({
          id: validTaskId,
          description: "NewDescription",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task edited");
          res.body.should.have.property("data").which.is.an("object");
          res.body.data.should.have.property("_id").eql(validTaskId);
          res.body.data.should.have
            .property("description")
            .eql("NewDescription");
          done();
        });
    });

    // Test Case 3: Edit Due Date
    it("Should edit task due date", (done) => {
      chai
        .request(app)
        .patch("/api/task")
        .set("token", validToken)
        .send({
          id: validTaskId,
          dueDate: "2024-02-10T21:48:08.019+00:00",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task edited");
          res.body.should.have.property("data").which.is.an("object");
          res.body.data.should.have.property("_id").eql(validTaskId);
          res.body.data.should.have.property("dueDate").eql("02/11/2024");
          done();
        });
    });

    // Test Case 4: Edit All Fields
    it("Should edit all task fields", (done) => {
      chai
        .request(app)
        .patch("/api/task")
        .set("token", validToken)
        .send({
          id: validTaskId,
          title: "TaskTitle",
          description: "TaskDescription",
          dueDate: "2024-02-10T21:48:08.019+00:00",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task edited");
          res.body.should.have.property("data").which.is.an("object");
          res.body.data.should.have.property("_id").eql(validTaskId);
          res.body.data.should.have.property("title").eql("TaskTitle");
          res.body.data.should.have
            .property("description")
            .eql("TaskDescription");
          res.body.data.should.have.property("dueDate").eql("02/11/2024");
          done();
        });
    });

    // Test Case 5: Wrong Task ID
    it("Should return an error for wrong task ID", (done) => {
      chai
        .request(app)
        .patch("/api/task")
        .set("token", validToken)
        .send({
          id: invalidTaskId,
          title: "NewTitle",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("task not found");
          done();
        });
    });
  });

  //GET /api/task/get/all
  describe("Get All Tasks API", () => {
    // Test Case 1: Get All Tasks
    it("Should get all tasks", (done) => {
      chai
        .request(app)
        .get("/api/task/get/all")
        .set("token", validToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("tasks found");
          res.body.should.have.property("data").which.is.an("array");
          done();
        });
    });

    // Test Case 2: No task Exist
    it.skip("Should return no task found", (done) => {
      chai
        .request(app)
        .get("/api/task/get/all")
        .set("token", validToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("No task found");
          res.body.should.have.property("data").which.is.an("array").that.is
            .empty;
          done();
        });
    });
  });

  //POST /api/task/mark
  describe("Mark Tasks API", () => {
    // Test Case 1: Mark Task Successfully
    it("Should mark task as completed", (done) => {
      chai
        .request(app)
        .post("/api/task/mark")
        .set("token", validToken)
        .send({ id: validTaskId })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task completed");
          res.body.should.have.property("data").which.is.an("object");
          done();
        });
    });

    // Test Case 2: Task Not Found
    it("Should return error for task not found", (done) => {
      chai
        .request(app)
        .post("/api/task/mark")
        .set("token", validToken)
        .send({ id: invalidTaskId })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("task not found");
          done();
        });
    });

    // Test Case 3: Task Already Marked
    it("Should return error for task already completed", (done) => {
      chai
        .request(app)
        .post("/api/task/mark")
        .set("token", validToken)
        .send({ id: validTaskId })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have
            .property("message")
            .eql("task already completed");
          done();
        });
    });
  });

  //GET /api/task/get/completed
  describe("Get Completed Tasks API", () => {
    // Test Case 1: Get Completed Tasks
    it("Should get completed tasks", (done) => {
      chai
        .request(app)
        .get("/api/task/get/completed")
        .set("token", validToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("tasks found");
          res.body.should.have.property("data").which.is.an("array");
          done();
        });
    });

    // Test Case 2: No Task Completed
    it.skip("Should return no completed task", (done) => {
      chai
        .request(app)
        .get("/api/task/get/completed")
        .set("token", validToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("no task completed");
          res.body.should.have.property("data").which.is.an("array").that.is
            .empty;
          done();
        });
    });
  });

  // GET /api/task/get/due
  describe("Get Due Tasks API", () => {
    // Test Case 1: Get Due Tasks
    it("Should get due tasks", (done) => {
      chai
        .request(app)
        .get("/api/task/get/due")
        .set("token", validToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("tasks found");
          res.body.should.have.property("data").which.is.an("array");
          res.body.data.should.have.lengthOf.above(0);
          done();
        });
    });

    // Test Case 2: No Due Tasks
    it.skip("Should return message for no due tasks", (done) => {
      chai
        .request(app)
        .get("/api/task/get/due")
        .set("token", validToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("no due task");
          res.body.should.have.property("data").which.is.an("array").that.is
            .empty;
          done();
        });
    });
  });

  // DELETE /api/task
  describe("Get Due Tasks API", () => {
    // Test Case 1: Successful Deletion
    it("Should delete a task", (done) => {
      chai
        .request(app)
        .delete("/api/task")
        .set("token", validToken)
        .send({ id: validTaskId })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("task deleted");
          done();
        });
    });

    // Test Case 2: Task Not Found
    it("Should return an error for task not found", (done) => {
      chai
        .request(app)
        .delete("/api/task")
        .set("token", validToken)
        .send({ id: invalidTaskId })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("task not found");
          done();
        });
    });
  });
});
