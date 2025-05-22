const mongoose = require('mongoose')

db = `mongodb+srv://sanyammunot03:Shree98794@cluster0.5ky8tma.mongodb.net/HotstarClone?retryWrites=true&w=majority&appName=Cluster0`

module.exports = () => mongoose.connect(db)