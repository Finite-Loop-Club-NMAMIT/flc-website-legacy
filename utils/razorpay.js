import Router from 'next/router'

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

export const makePayment = async (email, name) => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
        t.json()
    );
    console.log(data);
    var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Finite Loop Club",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Membership is valid throughout your engineering course",
        image: "/assets/flc_logo_crop.png",
        handler: function (response) {
            Router.push('/profile')
        },
        prefill: {
            email: email,
            name: name,

        }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};