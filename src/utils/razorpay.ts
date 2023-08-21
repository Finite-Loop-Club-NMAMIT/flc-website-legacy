import Router from "next/router";
import { env } from "../env/client.mjs";
import { api } from "./api";

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
  name: string
) => Promise<void> = async (email, name) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }
  // createOrderMutation
  const { client } = api.useContext();
  const data = await client.userRouter.createPaymentOrder.mutate();
  const options = {
    key: env.NEXT_PUBLIC_RAZORPAY_KEY,
    name: "Finite Loop Club",
    currency: "INR",
    amount: data.amount,
    order_id: data.id,
    description: "Membership is valid throughout your engineering course",
    image: "/assets/flc_logo_crop.png",
    handler: async function () {
      await Router.push("/profile");
    },
    prefill: {
      email: email,
      name: name,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const paymentObject = new (window as any).Razorpay(options);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  paymentObject.open();
};
