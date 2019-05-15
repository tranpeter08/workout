exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/workout'
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.EDAMAM_NUTRITION_ID = process.env.EDAMAM_NUTRITION_ID;
exports.EDAMAM_NUTRITION_KEY = process.env.EDAMAM_NUTRITION_KEY;
exports.EDAMAM_RECIPES_ID= process.env.EDAMAM_RECIPES_ID;
exports.EDAMAM_RECIPES_KEY= process.env.EDAMAM_RECIPES_KEY;