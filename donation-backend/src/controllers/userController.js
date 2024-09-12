const registerService = require('../services/userService')

exports.registerUser = async (req, res) => {
    try {
        const data = await registerService.register(req.body)
        res.status(201).json({ "data": [data.username, data.role] })
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error occurred while registering a user.')
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const token = await registerService.login(req.body)

        res.status(201).json({ token })
    } catch {
        res.status(500).send('Error while login user.')
    }
};