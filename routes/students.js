const express = require('express');
const router = express.Router();
const sc = require('../controllers/studentcontroller');
const uc = require('../controllers/usercontroller');
const authorize = require('../verifytoken');

// localhost:3000/students/
router.get('/', sc.findAll);

// localhost:3000/students/findbyid/61f02e148cad565c93dad86c
// Kaksoispiste tarkoittaa dynaamista reittiparametriä, eli voidaan
// hakea useammalla eri _id:llä.
router.get('/findbyid/:id', sc.findById);

// localhost:3000/students/findbycode/N3649
router.get('/findbycode/:studentcode', sc.findByStudentcode);

// localhost:3000/students/
router.post('/', authorize, sc.add);

// localhost:3000/students/delete/N3649
router.delete('/delete/:id', authorize, sc.delete);

// localhost:3000/students/findbelow/100
router.get('/findbelow/:studypoints', sc.findStudentBelow);

// localhost:3000/students/addgrade/N3649
router.use('/addgrade/:studentcode', sc.newGrade);

// localhost:3000/students/updategrade/N3649/HTKA2020/
router.put('/updategrade/:studentcode/:coursecode/', authorize, sc.updateGrade);

// localhost:3000/students/samecourse/kurssikoodi
router.get('/samecourse/:coursecode', sc.findSameCourseStudents);

router.put('/update/:id', authorize, sc.updateStudent);

module.exports = router;
