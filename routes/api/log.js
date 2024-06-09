const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const logController = require("../../controllers/logController");
const verifyDeviceType = require('../../middleware/verifyDeviceType');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), logController.getAllLogs)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), logController.createLog)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), logController.updateLog)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), logController.getLog)
    .delete(verifyRoles(ROLES_LIST.Admin), logController.deleteLog)

router.route('/device/:deviceType/count')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyDeviceType, logController.getLogCountByDeviceType)

module.exports = router;

