import { client } from "../supabase/client";

class _supabaseEdgeFunctionService {
  private endpoint?: string;
  private apiKey?: string;

  constructor() {
    if (!process.env.REACT_APP_SUPABASE_ENDPOINT)
      throw new Error("Missing SUPABASE_ENDPOINT env var");

    (async () => {
      const { data } = await client.auth.getSession();
      this.apiKey = data.session?.access_token;
    })();

    this.endpoint = process.env.REACT_APP_SUPABASE_ENDPOINT;
  }

  async sendEmail(toAddress: string, requestee: string) {
    const body = JSON.stringify({ toAddress, requestee });
    const response = await fetch(`${this.endpoint}/email`, {
      body,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return response;
  }
}

export const SupabaseEdgeFunctionService = new _supabaseEdgeFunctionService();
