export default {
  async fetch(request, env) {
    // 1. CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Or lock to "https://vyshakbellur.github.io"
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
      const { query } = await request.json();

      // Ensure the secret is bound in Cloudflare Worker environment variables:
      // wrangler secret put GROQ_API_KEY
      const groqKey = env.GROQ_API_KEY;

      const systemPrompt = `You are the personal portfolio chatbot for Vyshak Athreya Bellur Keshavamurthy (preferred name: Vyshak Bellur).
You speak gracefully, in short, concise, natural responses (1-2 sentences maximum).
Never use markdown or long lists.
Facts:
- ML Engineer at JPMorgan Chase (Jun 2023 - Present)
- Previous roles: Walmart Global Tech, Ford Motor Company, Synchrony Financial.
- Education background in machine learning and computational linguistics.
- Co-authored 'Computational Script Similarity' published in Oxford University Press.
- Passionate about Royal Challengers Bangalore (RCB). Ee sala cup namde.
- Hobbies include Running (Full marathon, 5+ half marathons, training for NYC), Music (v_naada channel exploring Indian classical/contemporary), Travel/Adventure (Skydiving in Florida, Ziplining in Dubai).
`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192", // Extremely fast & free Groq model
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          max_tokens: 100
        })
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;

      // 2. Return response with CORS headers
      return new Response(JSON.stringify({ reply }), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }
};
