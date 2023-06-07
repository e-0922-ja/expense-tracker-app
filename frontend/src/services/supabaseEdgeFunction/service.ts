class _supabaseEdgeFunctionService {
  private endpoint?: string;

  constructor() {
    if (!process.env.REACT_APP_SUPABASE_ENDPOINT)
      throw new Error('Missing SUPABASE_ENDPOINT env var');

    this.endpoint = process.env.REACT_APP_SUPABASE_ENDPOINT;
  }

  async sendEmail(toAddress: string, requestee: string) {
    try {
      const body = JSON.stringify({ toAddress, requestee });
      await fetch(`${this.endpoint}/email`, {
        body,
        headers: {
          // Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    } catch (error) {
      console.error(`Counldn't send email because ${error}`);
    }
  }
}

export const SupabaseEdgeFunctionService = new _supabaseEdgeFunctionService();
