import { client } from "../supabase/client";
import { UpdateFriendShipRequest } from "./type";

class _friendService {
  updateFriendshipIdByFriendemail = async ({
    friendId,
    friendEmail,
  }: UpdateFriendShipRequest) => {
    const { error } = await client
      .from("Friendships")
      .update({ friendId })
      .eq("friendEmail", friendEmail)
      .is("friendId", null);

    if (error) {
      return { isError: true, message: error.message };
    }
    return { isError: false, message: "Success!" };
  };
}

export const FriendshipService = new _friendService();
