// @ts-ignore
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

const POSTS_API = Deno.env.get("STARTUPJOB_POSTS_API");
const API_KEY = Deno.env.get("STARTUPJOB_API_KEY");

serve(async (req) => {
  // For browser call
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { tags }: { tags: string[] | null | undefined } = await req.json();

  if (tags == null || !Array.isArray(tags) || tags.length === 0)
    return new Response(JSON.stringify({ error: "No tags param" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });

  const result = await fetch(
    `${POSTS_API}?key=${API_KEY}&tag=${tags.join(",")}&limit=50`
  ).then((res) => res.json());

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
