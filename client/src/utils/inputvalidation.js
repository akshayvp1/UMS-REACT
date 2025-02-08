// inputValidation.js

export const validateName = (name) => {
    const nameRegex = /^[A-Za-z]{5,}$/; 
    if (!name) return "";
    if (!nameRegex.test(name)) return "Name should be at least 5 characters and contain only letters.";
    return "";
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email) return "";
    if (!emailRegex.test(email)) return "Email should be a valid Gmail address (e.g., example@gmail.com).";
    return "";
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password) return "";
    if (!passwordRegex.test(password)) return "Password must be at least 6 characters long and contain a mix of uppercase, lowercase, numbers, and symbols.";
    return "";
};
