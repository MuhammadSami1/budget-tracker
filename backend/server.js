import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import transactionRoutes from "./routes/transactions.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: [

      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://budget-tracker-dqx5.vercel.app'
    ],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
);

app.use(bodyParser.json());

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;