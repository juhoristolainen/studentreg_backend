/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const StudentController = {
  /* findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll: (req, res) => {
    Student.find((error, students) => {
      if (error) {
        throw error;
      }
      res.json(students);
    });
  },
  findById: (req, res) => {
    Student.findOne({ _id: req.params.id }, (error, student) => {
      if (error) {
        throw error;
      }
      res.json(student);
    });
  },
  findByStudentcode: (req, res) => {
    Student.findOne(
      { studentcode: req.params.studentcode },
      (error, student) => {
        if (error) {
          throw error;
        }
        res.json(student);
      }
    );
  },
  add: (req, res) => {
    const newStudent = Student(req.body);
    Student.create(newStudent)
      .then((student) => {
        console.log('Document inserted: ' + student);
        res.json(student);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  delete: (req, res) => {
    Student.findOneAndRemove({ _id: req.params.id }, (error, student) => {
      if (error) {
        throw error;
      }
      res.json(student);
    });
  },
  updateStudent: (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body, (error, student) => {
      if (error) {
        throw error;
      }
      res.json(student);
    });
  },
  findStudentBelow: (req, res) => {
    Student.find(
      { studypoints: { $lte: req.params.studypoints } },
      (error, students) => {
        if (error) {
          throw error;
        }
        res.json(students);
      }
    );
  },
  newGrade: (req, res) => {
    const newGrade = req.body;
    // console.log(newGrade);
    Student.findOneAndUpdate(
      { studentcode: req.params.studentcode },
      { $push: { grades: newGrade }, $inc: { studypoints: +5 } },
      (error, student) => {
        if (error) {
          throw error;
        }
        res.json(student);
      }
    );
  },
  updateGrade: (req, res) => {
    Student.findOneAndUpdate(
      {
        studentcode: req.params.studentcode,
        'grades.coursecode': req.params.coursecode,
      },
      { $set: { 'grades.$.grade': req.body.grade } },
      (error, student) => {
        if (error) {
          throw error;
        }
        res.json(student);
      }
    );
  },
  findSameCourseStudents: (req, res) => {
    Student.find(
      { 'grades.coursecode': req.params.coursecode },
      (error, students) => {
        if (error) {
          throw error;
        }
        res.json(students);
      }
    );
  },
};

module.exports = StudentController;
