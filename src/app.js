const express = require("express");
require("../src/db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.Port || 3000;

//To read json data
app.use(express.json());

//create  a new students data
app.post("/students", async (req, res) => {
  try {
    console.log(req.body);
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(201).send(e);
  }
});

//Read the student data by id

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const studentData = await Student.findById(_id);
    console.log(studentData);
    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (e) {
    res.send(e);
  }
});
//Update the students data by id

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;

     const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
         new : true,
     });
     res.send(updateStudents);
    } catch (e) {
        res.status(404).send(e);
    }
});

//Delete the students data by id
app.delete("/students/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params){
            return res.send(404).send();
        }
        res.send(deleteStudent);

    } catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port, () => {
  console.log(`Conmection is set up at ${port}`);
});
