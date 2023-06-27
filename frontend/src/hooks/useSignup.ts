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
    const { isError, message, createdUser } = await UserService.createAuthUser({
      email,
      password,
      firstName,
      lastName,
    });
    if (isError) {
      setSignupMessage({ isError, message });
    }
    return createdUser;
  };

  const createUser = async (createdUser: CreatedUser) => {
    const { isError, message } = await UserService.createUser(createdUser);
    if (isError) {
      return setSignupMessage({ isError, message });
    }
  };

  const updateFriendIdByEmail = async ({
    id,
    email,
  }: UpdateFriendIdRequest) => {
    const { isError, message } =
      await FriendshipService.updateFriendshipIdByFriendemail({
        friendEmail: email,
        friendId: id,
      });
    return setSignupMessage({ isError, message });
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserRequest) => {
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
      setSignupMessage({
        isError: true,
        message: addNewLinesAfterPunctuation(ERROR_USER_EXIST),
      });
      return;
    }
    if (createdUser) {
      await createUser(createdUser);
      await updateFriendIdByEmail({
        id: createdUser.id,
        email: createdUser.email,
      });
      setSignupMessage({
        isError: false,
        message: addNewLinesAfterPunctuation(SUCCESS_SIGNUP),
      });
    }
  };

  return { signupMessage, signup };
};
