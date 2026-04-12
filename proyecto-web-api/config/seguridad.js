const bcrypt = require('bcryptjs');
const hashPassword = async (password) => {
    if (process.env.USE_HASH === 'true') {
        return await bcrypt.hash(password, 4);
    }
    return password;
};

const comparePassword = async (providedPassword, storedPassword) => {
    if (process.env.USE_HASH === 'true') {
        return await bcrypt.compare(providedPassword, storedPassword);
    }
    return providedPassword === storedPassword;
};

module.exports = { hashPassword, comparePassword };