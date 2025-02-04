export async function POST(req) {
    const { productName, price, whatsappNumber } = await req.json();
  
    const token = 'YOUR_WHATSAPP_API_TOKEN';
    const phoneNumberId = 'YOUR_PHONE_NUMBER_ID';
    const apiUrl = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
  
    const message = `🛒 New Product Alert!\n\nProduct: ${productName}\nPrice: $${price}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: whatsappNumber,
          type: 'text',
          text: { body: message },
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ message: data.error.message }), {
          status: 400,
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error sending message.' }), {
        status: 500,
      });
    }
  }
  