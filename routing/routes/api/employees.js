const express = require('express');
const router = express.Router();
const emplyeeController = require('../../controllers/employeeController')

router.route('/')
    .get(emplyeeController.getAllEmployee)
    .post(emplyeeController.createNewEmployee)
    .put(emplyeeController.updateEmployee)
    .delete(emplyeeController.deleteEmployee)
router.route('/:id')
    .get(emplyeeController.getEmployee);

module.exports = router;