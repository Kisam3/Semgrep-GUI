const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000; // Replace with your desired port

// Set up MongoDB connection
const mongoUri = 'mongodb://localhost:27017/semgrepresults';
const client = new MongoClient(mongoUri, { useNewUrlParser: true });

app.get('/results', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = 10; // Results per page
        const skip = (page - 1) * limit;

        await client.connect();
        const collection = client.db().collection('your-collection-name');

        // Fetch data with pagination
        const results = await collection.find({}).skip(skip).limit(limit).toArray();
        const totalResults = await collection.countDocuments({});
        console.log(totalResults)

        res.json({ results, totalResults });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = app;