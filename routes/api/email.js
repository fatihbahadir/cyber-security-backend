// routes/api/email.js
const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const emailController = require('../../controllers/emailController');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), emailController.getAllEmails)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), emailController.createEmail);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), emailController.getEmail)
    .delete(verifyRoles(ROLES_LIST.Admin), emailController.deleteEmail);

module.exports = router;
