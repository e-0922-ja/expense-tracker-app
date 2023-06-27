import { client } from "../supabase/client";

class _supabaseEdgeFunctionService {
  private endpoint?: string;

  constructor() {
    if (!process.env.REACT_APP_SUPABASE_ENDPOINT)
      throw new Error("Missing SUPABASE_ENDPOINT env var");

    this.endpoint = process.env.REACT_APP_SUPABASE_ENDPOINT;
  }

  async sendEmail(toAddress: string, requestee: string) {
    const {
      data: { session },
    } = await client.auth.getSession();
    const body = JSON.stringify({ toAddress, requestee });
    const response = await fetch(`${this.endpoint}/email`, {
      body,
      headers: {
        // Will implements JWT auth later
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return response;
  }
}

export const SupabaseEdgeFunctionService = new _supabaseEdgeFunctionService();
