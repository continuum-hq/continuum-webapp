import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const VERCERA_CALLBACK_URL = process.env.VERCERA_CALLBACK_URL;
const VERCERA_CALLBACK_SECRET = process.env.VERCERA_CALLBACK_SECRET;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function callVerceraWithRetry(payload: unknown): Promise<{ ok: boolean; status: number; text: string }> {
  if (!VERCERA_CALLBACK_URL || !VERCERA_CALLBACK_SECRET) {
    return { ok: false, status: 503, text: "Callback not configured" };
  }
  let lastStatus = 0;
  let lastText = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(VERCERA_CALLBACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Callback-Secret": VERCERA_CALLBACK_SECRET,
      },
      body: JSON.stringify(payload),
    });
    const text = await res.text().catch(() => "");
    lastStatus = res.status;
    lastText = text;
    if (res.ok) return { ok: true, status: res.status, text };
    if (attempt < 3) await sleep(300 * attempt);
  }
  return { ok: false, status: lastStatus, text: lastText };
}

export async function POST(req: NextRequest) {
  if (!RAZORPAY_WEBHOOK_SECRET || !RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  try {
    const rawBody = await req.text();
    const receivedSig = req.headers.get("x-razorpay-signature") || "";
    const expectedSig = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest("hex");
    if (!receivedSig || receivedSig !== expectedSig) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody) as {
      event?: string;
      payload?: { payment?: { entity?: { id?: string; order_id?: string; status?: string; amount?: number } } };
    };
    if (event.event !== "payment.captured" && event.event !== "payment.authorized") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const payment = event.payload?.payment?.entity;
    const paymentId = payment?.id || "";
    const orderId = payment?.order_id || "";
    if (!paymentId || !orderId) {
      return NextResponse.json({ error: "Missing payment/order id in webhook" }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
    const [order, pay] = await Promise.all([razorpay.orders.fetch(orderId), razorpay.payments.fetch(paymentId)]);
    const notes = (order.notes || {}) as Record<string, string>;
    const amountInr = Number(pay.amount) / 100;
    const checkoutId = (notes.checkout_id || "").trim();
    const eventId = (notes.event_id || "").trim();
    const bundleId = (notes.bundle_id || "").trim();
    const eventName = (notes.event_name || "").trim();
    const userId = (notes.user_id || "").trim();

    if (!userId || (!bundleId && (!eventId || !eventName))) {
      return NextResponse.json({ error: "Order notes missing required metadata" }, { status: 400 });
    }

    const payload = {
      orderId,
      paymentId,
      ...(checkoutId ? { checkoutId } : {}),
      ...(eventId ? { eventId } : {}),
      ...(bundleId ? { bundleId } : {}),
      eventName: eventName || (bundleId ? "Pack" : "Event"),
      amount: amountInr,
      userId,
      team: null,
      teamName: null,
      memberEmails: null,
      additionalInfo: null,
    };

    const callback = await callVerceraWithRetry(payload);
    if (!callback.ok) {
      console.error("Webhook callback to Vercera failed:", callback.status, callback.text);
      return NextResponse.json({ error: "Callback failed", status: callback.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Razorpay webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

