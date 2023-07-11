import { useState } from "react";
import { FriendshipService } from "../services/friendships";
import { UserService } from "../services/users";
import { ERROR_USER_EXIST, SUCCESS_SIGNUP } from "../constants/message";
import { addNewLinesAfterPunctuation } from "../utils/textUtils";

interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface CreatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UpdateFriendIdRequest {
  id: string;
  email: string;
}

interface Message {
  isError: boolean;
  message: string;
}

export const useSignup = () => {
  const [signupMessage, setSignupMessage] = useState<Message>({
    isError: false,
    message: "",
  });

  const createAuthUser = async ({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserRequest) => {
    try {
      const { createdUser } = await UserService.createAuthUser({
        email,
        password,
        firstName,
        lastName,
      });
      return createdUser;
    } catch (error: any) {
      throw error;
    }
  };

  const createUser = async (createdUser: CreatedUser) => {
    try {
      await UserService.createUser(createdUser);
    } catch (error: any) {
      throw error;
    }
  };

  const updateFriendIdByEmail = async ({
    id,
    email,
  }: UpdateFriendIdRequest) => {
    try {
      await FriendshipService.updateFriendshipIdByFriendemail({
        friendEmail: email,
        friendId: id,
      });
    } catch (error: any) {
      throw error;
    }
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserRequest) => {
    try {
      const createdUser = await createAuthUser({
        email,
        password,
        firstName,
        lastName,
      });
      const isUser = createdUser
        ? await UserService.findUserByEmail(createdUser?.email)
        : false;

      if (isUser) {
        return setSignupMessage({
          isError: true,
          message: addNewLinesAfterPunctuation(ERROR_USER_EXIST),
        });
      }

      if (createdUser) {
        await createUser(createdUser);
        await updateFriendIdByEmail({
          id: createdUser.id,
          email: createdUser.email,
        });

        return setSignupMessage({
          isError: false,
          message: addNewLinesAfterPunctuation(SUCCESS_SIGNUP),
        });
      }
    } catch (error: any) {
      return setSignupMessage({
        isError: true,
        message: error.message,
      });
    }
  };
  return { signupMessage, signup };
};
