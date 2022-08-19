// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

const API_KEY = Deno.env.get("STARTUPJOB_API_KEY");

serve(async (req) => {
  const result = await fetch(
    `https://api.startup.jobs/v1/posts?key=${API_KEY}&tag=react&limit=1`
  ).then((res) => res.json());

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
});
