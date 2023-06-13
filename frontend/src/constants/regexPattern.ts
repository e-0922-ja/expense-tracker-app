export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export const emailRegex = /\S+@\S+\.\S+/;

export const errFirstName = "First name is required";

export const errLastName = "Last name is required";

export const errEmail = "Please enter valid email format";

export const errPassword = "6+ characters, with at least one upper and a digit";

export const errPasswordConf = "Please confirm your password";

export const errUserNotFound = "User not found";
