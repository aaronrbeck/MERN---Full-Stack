const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://geovannirosales:<password>@cluster0-tobkf.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;
