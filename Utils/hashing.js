const { hash, compare } = require("bcrypt")

exports.doHash = (value, saltRound) => {
    const result = hash(value, saltRound);
    return result;
}

exports.doHashValidation = (value, hashedPassword) => {
    const result = compare(value, hashedPassword);

    return result;
}