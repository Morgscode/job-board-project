const express = require('express');
const roles = require('../middleware/userRoles');
const auth = require('../middleware/authentication');
const controller = require('../controllers/userController');
const catchAsync = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');
const router = express.Router();

router.use(catchAsync(auth.protect));
router.use(catchAsync(auth.emailVerified));
router.use(catchAsync(roles.jobBoardRecruiter));

router.route('/').get(controller._index);

router.route('/:id').get(controller._find);

router.route('/').post(controller._create);

router.route('/:id').put(controller._update).delete(controller._delete);

module.exports = router;
