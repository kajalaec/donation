const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection successful.", process.env.MONGO_URI)
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });