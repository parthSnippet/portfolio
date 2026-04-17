const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for memory storage (Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

// Schemas
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const PortfolioSchema = new mongoose.Schema({
  name: String,
  role: String,
  tagline: String,
  about: String,
  location: String,
  email: String,
  resume: String,
  social: {
    github: String,
    linkedin: String,
  },
  skills: [{
    category: String,
    icon: String,
    color: String,
    bg: String,
    text: String,
    items: [String],
  }],
  projects: [{
    title: String,
    description: String,
    stack: [String],
    link: String,
  }],
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes

// Register admin (run once to create admin)
app.post('/api/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get portfolio data (public)
app.get('/api/portfolio', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      // Create default portfolio if none exists
      portfolio = new Portfolio({
        name: 'Parth Rohit',
        role: 'Frontend Developer',
        tagline: 'I design and build modern, responsive web experiences.',
        about: 'Passionate frontend developer with a strong focus on React, clean UI architecture, and API-driven applications.',
        location: 'Gujarat, India',
        email: 'parthatwork24@gmail.com',
        resume: '/resume_parth.pdf',
        social: {
          github: 'https://github.com/parthSnippet',
          linkedin: 'https://www.linkedin.com/in/parth-rohit-b65910307',
        },
        skills: [],
        projects: [],
      });
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update portfolio (protected)
app.put('/api/portfolio', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      Object.assign(portfolio, req.body);
    }
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Upload resume (protected) - Cloudinary
app.post('/api/upload-resume', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'portfolio-resumes',
        public_id: `resume_${Date.now()}`,
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Upload failed' });
        }

        const resumePath = result.secure_url;

        // Update portfolio with new resume URL
        let portfolio = await Portfolio.findOne();
        if (portfolio) {
          portfolio.resume = resumePath;
          await portfolio.save();
        }

        res.json({ resumePath, message: 'Resume uploaded successfully' });
      }
    );

    // Pipe the buffer to Cloudinary
    const streamifier = require('streamifier');
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
