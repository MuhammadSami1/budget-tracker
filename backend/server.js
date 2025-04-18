import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import transactionRoutes from "./routes/transactions.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: [
    'https://budget-tracker-dqx5.vercel.app' || 'http://localhost:3000',

  ],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;