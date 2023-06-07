import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  // https://supabase.com/docs/guides/functions/secrets
  const { toAddress, requestee } = await req.json();

  // This validation is not working in case of alias
  // const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
  // if (!emailPattern.test(toAddress)) {
  //   return false
  // }

  const apiKey = Deno.env.get('SENDGRID_API_KEY')
  const sendgridUri = "https://api.sendgrid.com/v3/mail/send"

  const fromEmail = "yuta519@akane.waseda.jp"
  const subject = "Friend Request"
  const text = `You have a friend request from ${requestee || ''}. To accept, please visit <a href='http://localhost:3000/login'>here</a>!`

  const body = `{"personalizations": [{"to": [{"email": "${toAddress}"}]}],"from": {"email": "${fromEmail}"},"subject": "${subject}","content": [{"type": "text/html", "value": "${text}"}]}`

  const response = await fetch(sendgridUri, {
    body,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  console.log(response)
  return response
});
