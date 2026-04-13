// k
const express = require('express');
const redis = require('redis');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Redis Connection Setup
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => console.log('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('✅ Connected to Redis!'));

redisClient.connect();

// 1. Vote Cast 
app.post('/vote', async (req, res) => {
    const { candidate } = req.body;

    if (!candidate || (candidate !== 'AWS' && candidate !== 'Azure')) {
        return res.status(400).json({ error: 'Invalid candidate. Choose AWS or Azure.' });
    }

    try {
       
        await redisClient.incr(candidate);
        console.log(`Vote registered for ${candidate}`);
        res.status(200).json({ message: `Vote counted for ${candidate}!` });
    } catch (error) {
        res.status(500).json({ error: 'Redis me save nahi ho paya' });
    }
});

// 2. Results 
app.get('/results', async (req, res) => {
    try {
        
        const awsVotes = await redisClient.get('AWS') || 0;
        const azureVotes = await redisClient.get('Azure') || 0;

        res.status(200).json({
            AWS: parseInt(awsVotes),
            Azure: parseInt(azureVotes)
        });
    } catch (error) {
        res.status(500).json({ error: 'Scores fetch karne mein error' });
    }
});


// 1. Health Check 
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// 2. Stress Test 
app.get('/stress', (req, res) => {
    console.log("⚠️ Stress test initiated! CPU spike aane wala hai...");
    let i = 0;
   
    while (i < 5000000000) {
        i++;
    }
    res.status(200).send('Stress test completed (Phew!)');
});

// 3. Crash Test 
app.get('/crash', (req, res) => {
    console.log("💥 Crash endpoint hit! Node process exit ho raha hai...");
    process.exit(1); 
});

// Server Start 
app.listen(port, () => {
    console.log(`🚀 Backend API running on http://localhost:${port}`);
});