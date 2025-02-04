

// 'use client';

// import { useState } from 'react';

// export default function HomePage() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const customerNumber = '8763754956'; // Replace with the recipient's WhatsApp number

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const message = `Name: ${name}, Password: ${password}`;
//     const whatsappURL = `https://wa.me/${customerNumber}?text=${encodeURIComponent(message)}`;

//     window.open(whatsappURL, '_blank'); // Opens WhatsApp in a new tab
//   };

//   return (
//     <div className="p-6 max-w-sm mx-auto bg-gray-100 rounded shadow-md mt-10">
//       <h1 className="text-2xl font-bold mb-4">Send Info to WhatsApp</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
//           Send to WhatsApp
//         </button>
//       </form>
//     </div>
//   );
// }


// id-1813236346098590
// token-dd5ac031ce48cf9fffe16456869a6871
// Business name
// chinmaykumar260
// Phone number
// +91 63700 73215

'use client';

import { useState } from 'react';

export default function OrderConfirmationPage() {
  const [customerNumber, setCustomerNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customerNumber,
    };

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('✅ Message sent to WhatsApp!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to send message');
      }
    } catch (error) {
      setError('Error sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">📦 Send WhatsApp Message</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="tel"
          placeholder="Customer WhatsApp Number (e.g., 911234567890)"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Sending...' : '✅ Send Message'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
}

export async function sendMessage({ customerNumber }) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;  // Use environment variable
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;  // Use environment variable
  const whatsappApiUrl = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

  const message = `Hello! This is a predefined message sent via WhatsApp.`;

  try {
    const response = await fetch(whatsappApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: customerNumber,
        type: 'text',
        text: { body: message },
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      console.error('WhatsApp API Error:', errorData);
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  }
}

export async function POST(req) {
  const { customerNumber } = await req.json();

  try {
    const result = await sendMessage({ customerNumber });
    if (result.success) {
      return new Response(JSON.stringify({ status: 'Message sent successfully!' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
