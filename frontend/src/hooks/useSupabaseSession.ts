import { useState, useEffect } from "react";
import { client } from "../services/supabase";
import { Session } from "@supabase/supabase-js";
import { isSessionExpired } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/users/service";
import { logout } from "../reducer/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

export function useSupabaseSession() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const result = await client.auth.getSession();
      const expiredDate = result.data.session?.expires_at;
      if (!expiredDate) {
        console.error("No active session");
      } else {
        const sessionExpired = isSessionExpired(expiredDate);

        if (sessionExpired) {
          const { isError, message } = await UserService.signOut();

          if (isError) {
            console.error("Failed to logout: ", message);
          } else {
            dispatch(logout());
            navigate("/login");
          }
        }
      }

      setSession(result.data.session);
      setLoading(false);
    };

    getSession();
  }, [dispatch, navigate]);

  return { session, loading };
}
