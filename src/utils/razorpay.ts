import Router from "next/router";
import { env } from "../env/client.mjs";
import { api } from "./api";
import type { inferRouterOutputs } from "@trpc/server";
import type { UserRouter } from "../server/api/routers/user";
type PaymentOrderData = inferRouterOutputs<UserRouter>["createPaymentOrder"];

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const makePayment: (
  email: string,
  name: string,
  username: string,
  data: PaymentOrderData,
  setLoading: (loading: boolean) => void
) => Promise<void> = async (email, name, username, data, setLoading) => {
  const res = await initializeRazorpay();
  console.log(data);
  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }
  const options = {
    key: env.NEXT_PUBLIC_RAZORPAY_KEY,
    name: "Finite Loop Club",
    currency: "INR",
    amount: data.amount,
    order_id: data.orderId,
    description: "Membership is valid throughout your engineering course",
    image: "/assets/flc_logo_crop.png",
    handler: async function () {
      await Router.push(`/u/${username}`);
    },
    prefill: {
      email: email,
      name: name,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const paymentObject = new (window as any).Razorpay(options);
  setLoading(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  paymentObject.open();
};
