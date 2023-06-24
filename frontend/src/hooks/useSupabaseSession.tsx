import { useState, useEffect } from "react";
import { client } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

export function useSupabaseSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const result = await client.auth.getSession();
      if (!result.data.session) {
        console.log("No active session");
      }
      setSession(result.data.session);
      setLoading(false);
    };

    getSession();
  }, []);

  return { session, loading };
}
