import { client } from "../supabase/client";
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
