import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for live reservations, reviews, contact messages, and room availability
interface ServerReservation {
  id: string;
  confirmationCode: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  estimatedArrival?: string;
  addPet: boolean;
  addLateCheckout: boolean;
  addSnackPack: boolean;
  promoCode?: string;
  discountAmount: number;
  nightlyRate: number;
  subtotal: number;
  taxesAndFees: number;
  totalAmount: number;
  paymentMethod: 'credit_card' | 'pay_at_desk';
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  createdAt: string;
}

// Initial seed reservations for realistic admin dashboard
let reservations: ServerReservation[] = [
  {
    id: "res-101",
    confirmationCode: "PINECREST-78921",
    roomId: "deluxe-king",
    roomName: "Deluxe King Room",
    roomImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    nights: 2,
    adults: 2,
    children: 0,
    guestName: "James Henderson",
    guestEmail: "j.henderson@example.com",
    guestPhone: "(503) 555-0192",
    specialRequests: "Arriving around 5 PM, quiet room please",
    estimatedArrival: "5:00 PM",
    addPet: false,
    addLateCheckout: true,
    addSnackPack: true,
    promoCode: "DIRECT10",
    discountAmount: 21.8,
    nightlyRate: 109,
    subtotal: 196.2,
    taxesAndFees: 23.54,
    totalAmount: 234.74,
    paymentMethod: "credit_card",
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "res-102",
    confirmationCode: "PINECREST-89104",
    roomId: "double-queen",
    roomName: "Double Queen Suite",
    roomImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    nights: 3,
    adults: 2,
    children: 2,
    guestName: "Amanda & Thomas Rivera",
    guestEmail: "amanda.rivera@example.com",
    guestPhone: "(206) 555-4821",
    specialRequests: "Need pack-n-play crib if available",
    estimatedArrival: "3:30 PM",
    addPet: false,
    addLateCheckout: false,
    addSnackPack: false,
    promoCode: "ROADTRIP",
    discountAmount: 58.05,
    nightlyRate: 129,
    subtotal: 328.95,
    taxesAndFees: 39.47,
    totalAmount: 368.42,
    paymentMethod: "credit_card",
    status: "checked_in",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "res-103",
    confirmationCode: "PINECREST-92384",
    roomId: "pet-friendly-queen",
    roomName: "Pet-Friendly Queen Room",
    roomImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    checkIn: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    checkOut: new Date().toISOString().split('T')[0],
    nights: 1,
    adults: 2,
    children: 0,
    guestName: "Kyle Sullivan",
    guestEmail: "kylesullivan@example.com",
    guestPhone: "(415) 555-9302",
    specialRequests: "Traveling with 1 Labrador Retriever",
    estimatedArrival: "6:00 PM",
    addPet: true,
    addLateCheckout: false,
    addSnackPack: false,
    discountAmount: 0,
    nightlyRate: 115,
    subtotal: 135,
    taxesAndFees: 16.20,
    totalAmount: 151.20,
    paymentMethod: "pay_at_desk",
    status: "checked_out",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

let contactMessages: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  checkInDate?: string;
  checkOutDate?: string;
  subject?: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'responded' | 'archived';
}> = [
  {
    id: "msg-1",
    name: "Catherine Brooks",
    email: "c.brooks@example.com",
    phone: "(916) 555-8321",
    checkInDate: "2026-09-10",
    checkOutDate: "2026-09-14",
    subject: "Trailer Parking Question",
    message: "Hi! We are towing a 22-foot boat trailer. Do you have enough space in the parking lot to accommodate this without unhitching?",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "unread"
  },
  {
    id: "msg-2",
    name: "Danielle Murphy",
    email: "danielle.m@example.com",
    phone: "(208) 555-9941",
    subject: "Group Booking (4 Rooms)",
    message: "Planning a family reunion road trip for next month. Can we book 4 rooms near each other in the courtyard wing?",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: "unread"
  }
];

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", motel: "The Pinecrest Motel & Suites", time: new Date().toISOString() });
});

// GET all reservations (Admin view)
app.get("/api/reservations", (_req, res) => {
  res.json({ success: true, count: reservations.length, reservations });
});

// GET single reservation by confirmation code or ID
app.get("/api/reservations/:code", (req, res) => {
  const { code } = req.params;
  const search = code.trim().toUpperCase();
  const found = reservations.find(r => 
    r.confirmationCode.toUpperCase() === search || 
    r.id.toUpperCase() === search
  );
  if (found) {
    res.json({ success: true, reservation: found });
  } else {
    res.status(404).json({ success: false, message: "Reservation not found with this confirmation number." });
  }
});

// POST lookup reservation by confirmation code and last name / email
app.post("/api/reservations/lookup", (req, res) => {
  const { confirmationCode, lastNameOrEmail } = req.body;
  if (!confirmationCode) {
    res.status(400).json({ found: false, message: "Confirmation number is required." });
    return;
  }
  const cleanCode = confirmationCode.trim().toUpperCase();
  const cleanSearch = (lastNameOrEmail || "").trim().toLowerCase();

  const found = reservations.find(r => {
    const codeMatch = r.confirmationCode.toUpperCase() === cleanCode || r.id.toUpperCase() === cleanCode;
    if (!codeMatch) return false;
    if (!cleanSearch) return true;
    const nameMatch = r.guestName.toLowerCase().includes(cleanSearch);
    const emailMatch = r.guestEmail.toLowerCase().includes(cleanSearch);
    return nameMatch || emailMatch;
  });

  if (found) {
    res.json({ found: true, reservation: found });
  } else {
    res.json({ found: false, message: "No reservation found matching the provided details." });
  }
});

// POST cancel reservation by ID or confirmation code
app.post("/api/reservations/:id/cancel", (req, res) => {
  const { id } = req.params;
  const target = reservations.find(r => r.id === id || r.confirmationCode === id);
  if (target) {
    target.status = 'cancelled';
    res.json({ success: true, message: "Reservation successfully cancelled.", reservation: target });
  } else {
    res.status(404).json({ success: false, message: "Reservation not found." });
  }
});

// POST create new direct reservation
app.post("/api/reservations", (req, res) => {
  try {
    const data = req.body;
    if (!data.roomId || !data.guestName || !data.guestEmail || !data.checkIn || !data.checkOut) {
      res.status(400).json({ success: false, message: "Missing required booking details." });
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const confirmationCode = `PINECREST-${randomNum}`;

    const newReservation: ServerReservation = {
      id: `res-${Date.now()}`,
      confirmationCode,
      roomId: data.roomId,
      roomName: data.roomName || "Standard Room",
      roomImage: data.roomImage || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      nights: Number(data.nights) || 1,
      adults: Number(data.adults) || 1,
      children: Number(data.children) || 0,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone || "",
      specialRequests: data.specialRequests || "",
      estimatedArrival: data.estimatedArrival || "3:00 PM - 6:00 PM",
      addPet: Boolean(data.addPet),
      addLateCheckout: Boolean(data.addLateCheckout),
      addSnackPack: Boolean(data.addSnackPack),
      promoCode: data.promoCode || "",
      discountAmount: Number(data.discountAmount) || 0,
      nightlyRate: Number(data.nightlyRate) || 109,
      subtotal: Number(data.subtotal) || 109,
      taxesAndFees: Number(data.taxesAndFees) || 13.08,
      totalAmount: Number(data.totalAmount) || 122.08,
      paymentMethod: data.paymentMethod === 'pay_at_desk' ? 'pay_at_desk' : 'credit_card',
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    reservations.unshift(newReservation);

    res.status(201).json({
      success: true,
      message: "Reservation confirmed successfully!",
      confirmationCode,
      reservation: newReservation
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || "Failed to create reservation." });
  }
});

// PATCH update reservation status (Admin or Guest cancellation)
app.patch("/api/reservations/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const target = reservations.find(r => r.id === id || r.confirmationCode === id);
  if (!target) {
    res.status(404).json({ success: false, message: "Reservation not found." });
    return;
  }
  if (['confirmed', 'checked_in', 'checked_out', 'cancelled'].includes(status)) {
    target.status = status;
    res.json({ success: true, message: `Reservation status updated to ${status}`, reservation: target });
  } else {
    res.status(400).json({ success: false, message: "Invalid status value." });
  }
});

// POST validate promo code
app.post("/api/offers/validate", (req, res) => {
  const { code, nights } = req.body;
  if (!code) {
    res.status(400).json({ valid: false, message: "Please provide a promo code." });
    return;
  }
  const clean = code.trim().toUpperCase();
  const numNights = Number(nights) || 1;

  if (clean === "DIRECT10") {
    res.json({
      valid: true,
      code: "DIRECT10",
      discountPercent: 10,
      title: "Direct Booking 10% Discount",
      description: "10% off your nightly room rate + complimentary late checkout!"
    });
  } else if (clean === "ROADTRIP") {
    if (numNights < 2) {
      res.json({
        valid: false,
        message: "ROADTRIP code requires a minimum 2-night stay."
      });
    } else {
      res.json({
        valid: true,
        code: "ROADTRIP",
        discountPercent: 15,
        title: "Pacific Northwest Roadtripper 15% Off",
        description: "15% off multi-night stay + free welcome snack pack!"
      });
    }
  } else if (clean === "WEEKLY25") {
    if (numNights < 7) {
      res.json({
        valid: false,
        message: "WEEKLY25 code requires a minimum 7-night stay."
      });
    } else {
      res.json({
        valid: true,
        code: "WEEKLY25",
        discountPercent: 25,
        title: "Extended Stay 25% Off",
        description: "25% off 7+ consecutive nights stay!"
      });
    }
  } else if (clean === "HERO15") {
    res.json({
      valid: true,
      code: "HERO15",
      discountPercent: 15,
      title: "Hero 15% Discount",
      description: "15% off for Military, First Responders & Healthcare workers."
    });
  } else if (clean === "SENIORAAA") {
    res.json({
      valid: true,
      code: "SENIORAAA",
      discountPercent: 12,
      title: "AAA & Senior 12% Discount",
      description: "12% off for AAA and AARP members."
    });
  } else {
    res.json({
      valid: false,
      message: "Invalid or expired promo code."
    });
  }
});

// POST submit contact message
app.post("/api/contact", (req, res) => {
  const { name, email, phone, checkInDate, checkOutDate, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: "Please fill in all required fields (Name, Email, Message)." });
    return;
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    checkInDate: checkInDate || "",
    checkOutDate: checkOutDate || "",
    subject: subject || "General Inquiry",
    message,
    timestamp: new Date().toISOString(),
    status: "unread" as const
  };

  contactMessages.unshift(newMessage);

  res.status(201).json({
    success: true,
    message: "Thank you for contacting The Pinecrest! Our front desk team will reply shortly.",
    inquiryId: newMessage.id
  });
});

// GET all contact messages for admin
app.get("/api/contact", (_req, res) => {
  res.json({ success: true, count: contactMessages.length, messages: contactMessages });
});

// GET Admin overview metrics
app.get("/api/admin/stats", (_req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayArrivals = reservations.filter(r => r.checkIn === todayStr && r.status !== 'cancelled').length;
  const todayDepartures = reservations.filter(r => r.checkOut === todayStr && r.status !== 'cancelled').length;
  const activeStays = reservations.filter(r => r.status === 'checked_in').length;
  const totalRevenue = reservations
    .filter(r => r.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  res.json({
    success: true,
    stats: {
      todayArrivals,
      todayDepartures,
      activeStays,
      totalReservations: reservations.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      occupancyRate: 82,
      unreadInquiries: contactMessages.filter(m => m.status === 'unread').length,
      averageReviewScore: 4.8
    }
  });
});

// POST Gemini AI Motel Concierge
app.post("/api/concierge", async (req, res) => {
  const { message, conversationHistory } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  const systemContext = `
You are the warm, knowledgeable, and hospitable AI Concierge for "The Pinecrest Motel & Suites" located at 1420 Scenic Highway 97 in Bend, Oregon.
Motel Key Facts:
- Clean, modern, independently owned roadside motel in Central Oregon, renovated in 2024.
- Rooms: Deluxe King ($109+), Double Queen Suite ($129+), King Studio with Kitchenette ($149+), Pet-Friendly Queen ($115+), Two-Room Family Suite ($179+), ADA Accessible King ($109+).
- Amenities: Free Doorstep Parking right in front of rooms, Free 300+ Mbps Fiber Wi-Fi 6, Heated Seasonal Outdoor Pool, Free Morning Roaster Bar & Waffles (6:30-9:30 AM), Microwaves & Mini-Fridges in EVERY room, Keurig coffee makers, 24/7 Front Desk, Free Level-2 EV Chargers for direct guests, Guest Laundry, 100% Smoke-Free rooms.
- Policies: Check-in 3:00 PM, Check-out 11:00 AM (Free 1-hr early/late for direct website bookers upon request). Free cancellation up to 24h before check-in. Pet fee is $20/night in designated pet rooms.
- Location highlights: 5 mins (2 miles) from Downtown Bend & Old Mill District, 25 mins from Mt. Bachelor, 28 mins from Smith Rock State Park, 4 mins from Deschutes Brewery, 6 mins from High Desert Museum, 7 mins from St. Charles Medical Center, 19 mins from Redmond Airport (RDM).
- Phone: (541) 555-7463. Toll-Free: 1-800-555-PINE.
- Direct booking promo codes: DIRECT10 (10% off), ROADTRIP (15% off 2+ nights), WEEKLY25 (25% off 7+ nights), HERO15 (15% off military/first responders), SENIORAAA (12% off AAA/AARP).

Tone: Friendly, concise, helpful, welcoming, and authentic American roadside hospitality. Answer questions accurately and encourage booking directly on our website for the lowest rate and free perks. Keep answers within 2-4 sentences unless the user asked for a detailed itinerary or list.
`;

  if (!apiKey) {
    // Graceful fallback if API key is not configured in local environment
    const lower = message.toLowerCase();
    let reply = "Welcome to The Pinecrest Motel & Suites! Our front desk is open 24/7. We offer spotless rooms, doorstep parking, heated pool, free breakfast & fiber Wi-Fi right on Highway 97 in Bend, OR. Feel free to call us at (541) 555-7463 or book directly online for our lowest rate guarantee!";

    if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) {
      reply = "We are very pet-friendly! We have designated ground-floor Pet-Friendly Queen Rooms with direct lawn access for $20/night, complete with welcome treats and dog bowls. Please select the Pet-Friendly Queen room when booking.";
    } else if (lower.includes("check in") || lower.includes("check-in") || lower.includes("late") || lower.includes("time")) {
      reply = "Check-in begins at 3:00 PM and check-out is at 11:00 AM. Our front desk is staffed 24/7, so you can arrive as late as you need! Plus, when you book directly on our website, you can request a free 1-hour early check-in or late check-out.";
    } else if (lower.includes("parking") || lower.includes("car") || lower.includes("trailer") || lower.includes("truck")) {
      reply = "Parking is completely free and right outside your room door! We also have designated spacious stalls for boat trailers, RVs, and oversized work trucks, plus free Level-2 EV chargers for direct guests.";
    } else if (lower.includes("breakfast") || lower.includes("coffee") || lower.includes("food") || lower.includes("eat")) {
      reply = "Yes! Every stay includes our complimentary Morning Roaster Bar (6:30 AM – 9:30 AM) with fresh local Oregon coffee, warm Belgian waffles, artisan pastries, fruit, and yogurt. Every room also has its own mini-fridge, microwave, and Keurig coffee maker.";
    } else if (lower.includes("discount") || lower.includes("promo") || lower.includes("code") || lower.includes("deal") || lower.includes("cheap")) {
      reply = "You can use promo code 'DIRECT10' at checkout to get an immediate 10% discount on any room! Staying 2+ nights? Use 'ROADTRIP' for 15% off. We also offer 15% off for Military/First Responders with code 'HERO15'.";
    } else if (lower.includes("bachelor") || lower.includes("ski") || lower.includes("smith rock") || lower.includes("hike") || lower.includes("distance") || lower.includes("far")) {
      reply = "The Pinecrest is centrally located! We are just 5 minutes from Downtown Bend & Old Mill District, 25 minutes from Mt. Bachelor ski resort, and 28 minutes from Smith Rock State Park.";
    }

    res.json({ reply });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `${systemContext}\n\nGuest Question: "${message}"\nPlease provide a helpful, warm, and accurate response as The Pinecrest Motel virtual concierge.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reply = response.text || "Thank you for asking! Please feel free to give our 24/7 front desk a call at (541) 555-7463 or book your stay directly on our website for guaranteed best rates.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API error in Concierge:", err);
    res.json({
      reply: "Welcome to The Pinecrest Motel & Suites! We're here 24/7 to assist you. All rooms feature doorstep parking, fast Wi-Fi, and fresh morning waffles. You can book directly with code DIRECT10 for 10% off, or call us anytime at (541) 555-7463."
    });
  }
});

// Setup Vite development middleware or static production serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Pinecrest Motel Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
