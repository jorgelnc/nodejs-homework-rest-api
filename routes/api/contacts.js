const express = require('express')

const {
  validateNewContact,
  validateUpdateContact
} = require('../../midlewares/valRequest')

const router = express.Router()

const {
  getAllTasks,
  getTasksById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/tasks.controller')


router.get('/', getAllTasks);

router.get('/:contactId', getTasksById)

router.post('/', validateNewContact, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validateUpdateContact, updateContact)

router.patch('/:contactId', updateStatusContact)

module.exports = router
