import { client } from "./client";
import { CreateAuthUserRequest, CreateUserRequest } from "./type";

class _supabaseService {
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
      user: {
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
    console.log(data);
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
      console.log(error);
      return { isError: true, message: error.message };
    }
    return { isError: false, message: "Success!" };
  };
}

export const SupabaseService = new _supabaseService();
