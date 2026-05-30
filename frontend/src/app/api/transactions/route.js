import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
  try {
    const {
      user_id,
      ticker,
      type,
      quantity,
      price,
      transaction_date,
    } = await request.json();

    const result = await pool.query(
      `INSERT INTO transactions
      (user_id, ticker, type, quantity, price, transaction_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        user_id,
        ticker.toUpperCase(),
        type.toUpperCase(),
        quantity,
        price,
        transaction_date,
      ]
    );

    return NextResponse.json({
      message: "Transaction logged successfully!",
      transaction: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error while saving transaction." },
      { status: 500 }
    );
  }
}