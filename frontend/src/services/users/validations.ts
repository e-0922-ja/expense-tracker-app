import {
  ERROR_BLANK_FIRSTNAME,
  ERROR_BLANK_LASTNAME,
  ERROR_EMPTY_FIRSTNAME,
  ERROR_EMPTY_LASTNAME,
} from "../../constants/message";

export const validateName = (firstName: string, lastName: string) => {
  validateFirstName(firstName);
  validateLastName(lastName);
};

export const validateFirstName = (name: string) => {
  if (!name) throw new Error(ERROR_EMPTY_FIRSTNAME);
  if (name.trim() === "") throw new Error(ERROR_BLANK_FIRSTNAME);
  return;
};

export const validateLastName = (name: string) => {
  if (!name) throw new Error(ERROR_EMPTY_LASTNAME);
  if (name.trim() === "") throw new Error(ERROR_BLANK_LASTNAME);
  return;
};
