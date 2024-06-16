import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
  const { id, name, price, quantity } = await request.json();

  let parameter = {
    item_details: {
      name,
      price,
      quantity,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
  };

  const token = await snap.createTransactionToken(parameter);

  return NextResponse.json({ token });
}