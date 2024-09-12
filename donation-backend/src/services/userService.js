const bcrypt = require('bcryptjs');
const userRepo = require('../repository/userRepository');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config')


const register = async (req, res) => {
    const { username, password, email, role } = req;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUser = { username, password: hashedPassword, email, role }
    const saveUser = await userRepo.saveUser(insertUser)
    console.log("saved", saveUser)
    return saveUser
}

const login = async (req, res) => {
    const { username, password } = req;
    const user = await userRepo.fetchUser(username)
    if (!user) {
        res.status(404).send('User not Found')
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' })
    return token
}
module.exports = {
    register,
    login
}