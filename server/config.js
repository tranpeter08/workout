const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/workout'
const PORT = process.env.PORT || 8080;

module.exports = { PORT, DATABASE_URL };