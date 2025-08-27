const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     process.env.FRONTEND_URL || 'https://my-project-portfolio-frontend.vercel.app'
//   ],
//   methods: ['GET', 'POST', 'OPTIONS'],
//   credentials: true,
//   optionsSuccessStatus: 200
// }));

const contactRoutes = require("./routes/contact");
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
