// controllers/paymentController.ts

import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const merchantId = process.env.MERCHANT_ID!;
// const apiUrl = process.env.API_URL!;
const apiUrl =
  "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/generate-qr";
const secretKey = process.env.PUBLIC_KEY!;

function generateTranId() {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

// Helper: Generate HMAC SHA512 hash
function generateHash(data: string): string {
  try {
    // Try different approaches for the secret key
    let secretKey = process.env.PUBLIC_KEY;

    if (!secretKey) {
      // Try using merchant_id as secret key (common in some APIs)
      secretKey = process.env.MERCHANT_ID;
      console.log("Using MERCHANT_ID as secret key:", secretKey);
    }

    if (!secretKey) {
      // Try the provided public key
      secretKey = "0d11d0199ca0e9b02674242e9bd3a1689a19e843";
      console.log("Using provided public key as secret key");
    }

    if (!secretKey) {
      // Try a common default (for testing)
      secretKey = "test_secret_key";
      console.log("Using default test secret key");
    }

    console.log("Using secret key for HMAC SHA512");
    const hmac = crypto.createHmac("sha512", secretKey);
    hmac.update(data);
    return hmac.digest("base64");
  } catch (error) {
    console.error("Failed to generate hash:", error);
    throw new Error("Failed to generate hash");
  }
}

export async function createKhqrPayment(req: Request, res: Response) {
  const { amount, callbackUrl } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const reqTime = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const tranId = generateTranId();

  const items = Buffer.from(
    JSON.stringify([{ name: "Cinema Ticket", quantity: 1, price: amount }])
  ).toString("base64");

  const payload = {
    req_time: reqTime,
    merchant_id: merchantId,
    tran_id: tranId,
    first_name: "Guest",
    last_name: "User",
    email: "guest@example.com",
    phone: "012345678",
    amount: parseFloat(amount).toFixed(2).toString(),
    purchase_type: "purchase",
    payment_option: "abapay_khqr",
    items,
    currency: "USD",
    callback_url: callbackUrl
      ? Buffer.from(callbackUrl).toString("base64")
      : "",
    return_deeplink: "",
    custom_fields: "",
    return_params: "",
    payout: "",
    lifetime: Number(30).toString(),
    qr_image_template: "template3_color",
  };

  // Generate hash according to documentation
  const hashString = [
    payload.req_time,
    payload.merchant_id,
    payload.tran_id,
    payload.amount,
    payload.items,
    payload.first_name,
    payload.last_name,
    payload.email,
    payload.phone,
    payload.purchase_type,
    payload.payment_option,
    payload.callback_url,
    "", // return_deeplink
    payload.currency,
    "", // custom_fields
    "", // return_params
    "", // payout
    payload.lifetime,
    payload.qr_image_template,
  ].join("");
  console.log("Hash string destructured: ", {
    req_time: payload.req_time,
    merchant_id: payload.merchant_id,
    tran_id: payload.tran_id,
    amount: payload.amount,
    items: payload.items,
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    purchase_type: payload.purchase_type,
    payment_option: payload.payment_option,
    callback_url: payload.callback_url,
    deeplink: "",
    currency: payload.currency,
    custom_fields: "",
    return_params: "",
    payout: "",
    lifetime: payload.lifetime,
    qr_image_template: payload.qr_image_template,
  });
  console.log("Hash string:", hashString);
  const hash = generateHash(hashString);
  console.log("Generated hash:", hash);

  const finalPayload = {
    ...payload,
    hash,
  };

  console.log("=== PAYWAY DEBUG START ===");
  console.log("1. API URL:", apiUrl);
  console.log("2. Merchant ID:", merchantId);
  console.log("3. Request Time:", reqTime);
  console.log("4. Transaction ID:", tranId);
  console.log("5. Amount:", amount);
  console.log("6. Items (base64):", items);
  console.log("7. Full Payload:", JSON.stringify(finalPayload, null, 2));
  console.log("8. Request Headers:", { "Content-Type": "application/json" });

  try {
    console.log("9. Sending request to PayWay...");
    const response = await axios.post(apiUrl, finalPayload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    console.log("10. Response Status:", response.status);
    console.log("11. Response Headers:", response.headers);
    console.log("12. Response Data Type:", typeof response.data);
    console.log("13. Response Data:", response.data);

    const { qrImage, qrString, abapay_deeplink } = response.data;
    console.log("14. Extracted QR Image:", qrImage ? "Present" : "Missing");
    console.log("15. Extracted QR String:", qrString ? "Present" : "Missing");
    console.log(
      "16. Extracted Deeplink:",
      abapay_deeplink ? "Present" : "Missing"
    );

    return res.status(200).json({
      success: true,
      qrImage,
      qrString,
      abapay_deeplink,
    });
  } catch (err: any) {
    console.log("=== PAYWAY ERROR DEBUG ===");
    console.log("Error Type:", err.constructor.name);
    console.log("Error Message:", err.message);
    console.log("Error Code:", err.code);
    console.log("Error Status:", err.response?.status);
    console.log("Error Status Text:", err.response?.statusText);
    console.log("Error Headers:", err.response?.headers);
    console.log("Error Data:", err.response?.data);
    console.log("Error Config:", {
      url: err.config?.url,
      method: err.config?.method,
      headers: err.config?.headers,
      data: err.config?.data,
    });

    return res.status(500).json({
      error: "Failed to generate QR code",
      message: err.response?.data || err.message,
      debug: {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      },
    });
  }
}
