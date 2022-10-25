const { Router } = require('express');

const { check } = require('express-validator');
const {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
	usersPath,
	usersGetbyId,
} = require('../controllers/user.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, existEmail, isValidById } = require('../helpers/db-validation');

const router = Router();
router.get('/', usersGet);
router.get('/:id', usersGetbyId);
router.post(
	'/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
		check('email', 'El correo no es valido').isEmail(),
		//check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		check('email').custom(existEmail),
		check('role').custom(isValidRole),
		validateFields,
	],
	usersPost,
);
router.put(
	'/:id',
	[
		check('id', 'El id no es mongoDB').isMongoId(),
		check('id').custom(isValidById),
		check('role').custom(isValidRole),
		validateFields,
	],
	usersPut,
);

router.delete(
	'/:id',
	[
		check('id', 'El id no es mongoDB').isMongoId(),
		check('id').custom(isValidById),
		validateFields,
	],
	usersDelete,
);
router.patch('/', usersPath);

module.exports = router;
