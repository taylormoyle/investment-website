const compactRegex = new RegExp('[^0-9a-zA-Z]', 'g');
const emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$', 'i');
const passwordRegex = new RegExp("^(?=.*?[a-zA-Z])(?=.*?[0-9#?!@$%^&*\\-_]).{9,}$");

function isValidEmail(v) {
    return (typeof v === 'string' && v.length > 0 && v.length < 255 && emailRegex.test(v));
}
function isValidPassword(v) {
    return (typeof v === 'string' && v.length > 0 && v.length < 64 && passwordRegex.test(v));
}

function compact(name) {
    return name.toLowerCase().replace(compactRegex, '');
}

export {
    compact, isValidEmail, isValidPassword,
};
