import { client } from "../client";

class _userService {
  getUserInfoFromSession = async () => {
    const { data } = await client.auth.getSession();
    if (data.session) {
      return data.session.user;
    } else {
      return false;
    }
  };
}

export const UserService = new _userService();
