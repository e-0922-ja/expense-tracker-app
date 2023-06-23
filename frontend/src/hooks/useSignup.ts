import { useState } from "react";
import { FriendshipService } from "../services/friendships";
import { UserService } from "../services/users";

interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SignupError {
  isError: boolean;
  message?: string;
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

export const useSignup = () => {
  const [signupError, setSignupError] = useState<SignupError>({
    isError: false,
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
      setSignupError({ isError, message });
    }
    return createdUser;
  };

  const createUser = async (createdUser: CreatedUser) => {
    const { isError, message } = await UserService.createUser(createdUser);
    if (isError) {
      return setSignupError({ isError, message });
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
    return setSignupError({ isError, message });
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
      setSignupError({ isError: true, message: "User already exists" });
      return;
    }
    if (createdUser) {
      await createUser(createdUser);
      await updateFriendIdByEmail({
        id: createdUser.id,
        email: createdUser.email,
      });
    }
  };

  return { signupError, signup };
};
