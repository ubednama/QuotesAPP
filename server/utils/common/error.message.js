const fullNameMinLengthError = 'Name should have atleast 3 characters'
const fullNameMaxLengthError = 'Name cannot have more than 50 character'

const emailFormatError = 'Please Enter a valid email address'

const passwordFormatError = 'Password must be at least 8 characters long and contain a combination of letters, numbers, and special characters.'
const passwordMatchError = "Passwords don't match"

const addressMaxLengthError = 'Address cannot have more than 50 characters'

module.exports = {
    passwordFormatError,
    emailFormatError,
    passwordMatchError,
    fullNameMinLengthError,
    fullNameMaxLengthError,
    addressMaxLengthError
}