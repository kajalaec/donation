const User = require('../models/user');

const saveUser = async (insertUser) => {
    const user = new User(insertUser);
    const insertUser = await user.save();
    return insertUser
}

const fetchUser = async (username) => {
    const user = User.findOne({ username });
    return user;
}

module.exports = {
    saveUser,
    fetchUser
}