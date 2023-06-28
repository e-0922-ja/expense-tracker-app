import { client } from "../supabase/client";
import { CreateAuthUserRequest, CreateUserRequest } from "./type";
import { UpdateAuthUserRequest, UpdateUserRequest } from "./type";

class _userService {
  getUserInfoFromSession = async () => {
    const { data } = await client.auth.getSession();
    if (data.session) {
      return data.session.user;
    } else {
      return false;
    }
  };

  createAuthUser = async ({
    firstName,
    lastName,
    email,
    password,
  }: CreateAuthUserRequest) => {
    const { error, data } = await client.auth.signUp({
      email,
      password,
      options: { data: { firstName, lastName } },
    });
    if (error) {
      return { isError: true, message: error.message, user: null };
    }
    return {
      isError: false,
      message: "Sucess!",
      createdUser: {
        id: data.user?.id || "",
        firstName: `${data.user?.user_metadata.firstName || ""}`,
        lastName: `${data.user?.user_metadata.lastName || ""}`,
        email: data.user?.email || "",
      },
    };
  };

  fetchUsers = async () => {
    const { data, error } = await client.from("Users").select("*");
    console.log(error);
    console.log(data);
  };

  findUserByEmail = async (email: string) => {
    const { data, error } = await client
      .from("Users")
      .select("*")
      .eq("email", email);
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    if (!data.length) {
      return null;
    }

    const user = data?.[0];
    return {
      id: user.id,
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      email: user.email,
    };
  };

  createUser = async ({
    id,
    email,
    firstName,
    lastName,
  }: CreateUserRequest) => {
    const { error } = await client.from("Users").insert([
      {
        id,
        firstName,
        lastName,
        email,
        registeredAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    if (error) {
      return { isError: true, message: error.message };
    }
    return { isError: false, message: "Success!" };
  };

  updateAuthUser = async ({ firstName, lastName }: UpdateAuthUserRequest) => {
    const { data, error } = await client.auth.updateUser({
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    if (error) {
      return {
        isError: true,
        message: "Error updating a user account",
      };
    }
    return {
      isError: false,
      message: "Sucess!",
      createdUser: {
        id: data.user.id || "",
        firstName: `${data.user.user_metadata.firstName || ""}`,
        lastName: `${data.user.user_metadata.lastName || ""}`,
      },
    };
  };

  updateUser = async ({ id, firstName, lastName }: UpdateUserRequest) => {
    const { error } = await client
      .from("Users")
      .update({
        firstName: firstName,
        lastName: lastName,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) {
      return { isError: true, message: error.message };
    }
    return { isError: false, message: "Success!" };
  };

  signOut = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      return { isError: true, message: error.message };
    }
    return { isError: false, message: "Success!" };
  };
}

export const UserService = new _userService();
