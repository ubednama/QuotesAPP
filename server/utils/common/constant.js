// const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const passwordRegex = /.+/
const emailRegex = /.+@.+\..+/

module.exports = {
    passwordRegex,
    emailRegex
}