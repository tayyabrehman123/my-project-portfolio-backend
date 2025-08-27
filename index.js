const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


const allowedOrigins = [
  "http://localhost:5173", // dev
  process.env.FRONTEND_URL // prod
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.get('/', (req, res) => {
  res.json({ status: 'Server is running'});
});

const contactRoutes = require("./routes/contact");
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
