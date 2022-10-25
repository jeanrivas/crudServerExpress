const { request, response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const user = require('../models/user');

const usersGet = async (req = request, res = response) => {
	const users = await User.find();

	res.json({
		ok: true,
		message: 'API GET',
		users,
	});
};

const usersGetbyId = (req = request, res = response) => {
	const body = req.body;
	const { id } = req.params;
	const findById = body.find((body) => body.id == id);

	res.json({
		ok: true,
		message: 'API GET by id',
		findById,
	});
};

const usersPost = async (req = request, res = response) => {
	const { name, email, password, role } = req.body;
	// const id = req.params.id;
	const user = User({ name, email, password, role });

	//encrypt
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(password, salt);

	await user.save();
	res.json({
		ok: true,
		message: 'POST API',
		user,
	});
};

const usersPut = async (req = request, res = response) => {
	const { id } = req.params;
	const { password, email, ...rest } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		rest.password = bcrypt.hashSync(password, salt);
	}
	const user = await User.findByIdAndUpdate(id, rest);
	res.json({
		ok: true,
		user,
	});
};

const usersDelete = async (req = request, res = response) => {
	const { id } = req.params;
	//Delete user
	// const userDelete = await User.findByIdAndDelete(id);

	//change status user
	const userDelete = await User.findByIdAndUpdate(id, { status: false });
	res.json({
		ok: true,
		userDelete,
	});
};

const usersPath = (req, res) => {
	res.json({
		ok: true,
		message: 'PATCH API',
	});
};

module.exports = {
	usersGet,
	usersPost,
	usersPut,
	usersDelete,
	usersPath,
	usersGetbyId,
};
