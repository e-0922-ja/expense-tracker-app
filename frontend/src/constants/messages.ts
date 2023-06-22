//Common
export const ERROR_SOMETHING =
  "Apologies, but we encountered an issue. Please try again.".replace(
    /([.,])/g,
    "$1<br />"
  );

//Signup Page
export const SUCCESS_SIGNUP =
  "Email Sent! Please check your inbox for further instructions on starting this app.".replace(
    /([.,])/g,
    "$1<br />"
  );

export const ERROR_FIRSTNAME = "First name is required";

export const ERROR_LASTNAME = "Last name is required";

export const ERROR_EMAIL = "Please enter valid email format";

export const ERROR_PASSWORD =
  "6+ characters, with at least one upper and a digit";

export const ERROR_PASSWORDCONF = "Please confirm your password";

export const ERROR_USER_NOTFOUND = "User not found";

export const ERROR_USER_EXIST = "User already exists";

//Account Page
export const deleteMsg = (
  callback: (string: string) => void,
  string: string
): void => {
  setTimeout(() => {
    callback(string);
  }, 10000);
};

export const SUCCESS_CHANGE_ACCOUNT_INFO =
  "Your account information has been successfully changed. If you updated your email address, please check both your current and previous email addresses for confirmation.".replace(
    /([.,])/g,
    "$1<br />"
  );

export const ERROR_CHANGE_ACCOUNT_INFO =
  "An error occurred while updating your name and email. Please try again.".replace(
    /([.,])/g,
    "$1<br />"
  );

export const SUCCESS_RESET_PASSWORD =
  "Email Sent! Please check your inbox for further instructions on resetting your password.".replace(
    /([.,])/g,
    "$1<br />"
  );

export const ERROR_RESET_PASSWORD_EMAIL_NOTHING = "Email not defined.".replace(
  /([.,])/g,
  "$1<br />"
);

export const ERROR_RESET_PASSWORD_SEND_MAIL =
  "Apologies, but we encountered an issue while attempting to send the password reset email. Please try again.".replace(
    /([.,])/g,
    "$1<br />"
  );

//Friend Request Page
export const ERROR_SEND_OWN_ADDRESS =
  "You cannot send a friend request to your email address.";

export const ERROR_SEND_EXISTED_ADDRESS =
  "You've already sent a friend request to this email.";

export const ERROR_SEND_FAILED = "Failed to send an email.";

export const ERROR_SELECT_FRIENDS = "select friends from your friends list.";
