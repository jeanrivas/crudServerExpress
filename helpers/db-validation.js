const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(`El rol ${role} no existe en base de datos`);
	}
};

const existEmail = async (email = '') => {
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error(`El ${email} ya existe en base de datos`);
	}
};

const isValidById = async (id = '') => {
	const existId = await User.findById(id);

	if (!existId) {
		throw new Error(`El ${id} no existe`);
	}
};
module.exports = { isValidRole, existEmail, isValidById };
