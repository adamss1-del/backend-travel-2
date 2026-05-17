require('dotenv').config({ path: './config.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { User, Destination } = require('./models/Schemas');
const { logger, protect } = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

// SERVE FRONTEND
app.use(express.static('public'));

// DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// REGISTER
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.json({ token, user: { username, email } });

    } catch {
        res.status(400).json({ error: "Registration failed" });
    }
});

// GET ALL DESTINATIONS
app.get('/api/destinations', async (req, res) => {
    const list = await Destination.find();
    res.json(list);
});

// 🔥 MAIN FEATURE (DISCOVERY)
app.get('/api/discover', async (req, res) => {
    const { country, month } = req.query;

    try {
        const destination = await Destination.findOne({ id: country });

        if (!destination) {
            return res.status(404).json({ msg: "Destination not found" });
        }

        const monthData = destination.months.find(m => m.month === month);

        if (!monthData) {
            return res.status(404).json({ msg: "No data for this month" });
        }

        res.json({
            title: destination.title,
            desc: destination.desc,
            img: destination.img,
            dining: destination.dining,
            ...monthData
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD DESTINATION
app.post('/api/destinations', protect, async (req, res) => {
    const entry = new Destination(req.body);
    await entry.save();
    res.status(201).json(entry);
});

// DELETE DESTINATION
app.delete('/api/destinations/:id', protect, async (req, res) => {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));});

// 2. GET: Retrieve Destinations (Read Operation)
app.get('/api/destinations', async (req, res) => {
    app.get('/api/discover', async (req, res) => {
    const { country, month } = req.query;

    const destination = await Destination.findOne({ id: country });

    if (!destination) {
        return res.status(404).json({ msg: "Destination not found" });
    }

    const monthData = destination.months.find(m => m.month === month);

    if (!monthData) {
        return res.status(404).json({ msg: "No data for this month" });
    }

    res.json({
        title: destination.title,
        desc: destination.desc,
        img: destination.img,
        dining: destination.dining,
        ...monthData
    });
});
    const list = await Destination.find();
    res.json(list);
});

// 3. POST: Add New Destination (Create Operation - Protected)
app.post('/api/destinations', protect, async (req, res) => {
    const entry = new Destination(req.body);
    await entry.save();
    res.status(201).json(entry);
});

// 4. DELETE: Remove Destination (Delete Operation - Protected)
app.delete('/api/destinations/:id', protect, async (req, res) => {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from database" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
