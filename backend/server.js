const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   CONNECT TO MONGODB
========================= */

// 🔥 REPLACE this with your real connection string
const MONGO_URI = "mongodb+srv://portfolioUser:2004@cluster0.faty2bi.mongodb.net/portfolioDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("❌ MongoDB Connection Error:", error);
    });

/* =========================
   CREATE SCHEMA
========================= */

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* =========================
   CREATE MODEL
========================= */

const Contact = mongoose.model("Contact", contactSchema);

/* =========================
   ROUTES
========================= */

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Backend + MongoDB working correctly!");
});

// Save Contact Form
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(200).json({
            success: true,
            message: "Message saved to MongoDB successfully!"
        });

    } catch (error) {
        console.error("Error saving data:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save message"
        });
    }
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});