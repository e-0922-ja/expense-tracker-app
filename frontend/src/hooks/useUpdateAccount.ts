import { useState } from "react";
import { UserService } from "../services/users";
import { addNewLinesAfterPunctuation } from "../utils/textUtils";
import { SUCCESS_CHANGE_ACCOUNT_INFO } from "../constants/message";

interface UpdateUserRequest {
  firstName: string;
  lastName: string;
}

interface UpdatedUser extends UpdateUserRequest {
  id: string;
}

interface Message {
  isError: boolean;
  message: string;
}

export const useUpdateAccount = () => {
  const [updateAccountMessage, setUpdateAccountMessage] = useState<Message>({
    isError: false,
    message: "",
  });

  const updateAuthUser = async ({ firstName, lastName }: UpdateUserRequest) => {
    try {
      const { updatedUser } = await UserService.updateAuthUser({
        firstName,
        lastName,
      });
      return updatedUser;
    } catch (error: any) {
      throw error;
    }
  };

  const updateUser = async (updatedUser: UpdatedUser) => {
    try {
      await UserService.updateUser(updatedUser);
    } catch (error: any) {
      throw error;
    }
  };

  const updateAccount = async ({ firstName, lastName }: UpdateUserRequest) => {
    try {
      const updatedUser = await updateAuthUser({ firstName, lastName });
      await updateUser(updatedUser);
      return setUpdateAccountMessage({
        isError: false,
        message: addNewLinesAfterPunctuation(SUCCESS_CHANGE_ACCOUNT_INFO),
      });
    } catch (error: any) {
      return setUpdateAccountMessage({
        isError: true,
        message: error.message,
      });
    }
  };

  return { updateAccountMessage, updateAccount };
};
