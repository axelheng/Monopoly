const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/health', (req, res) => {
    return res.json({ status: "Backend is running smoothly!" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
