// api/book-delivery.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  // Extract the booking payload from the request body
  const payload = req.body;
  
  // Retrieve your API key and endpoint from environment variables
  const apiKey = process.env.DORA_API_KEY; // Set this in your Vercel/Netlify environment variables
  const apiEndpoint = process.env.DORA_API_ENDPOINT || "https://dev.api.fleet.usedora.com/api/v1/deliveries";
  
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
