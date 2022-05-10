module.exports = {
    "env": {
        //"amd": true,
        "node": true,
        "browser": true,
        "es6": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    },
};
