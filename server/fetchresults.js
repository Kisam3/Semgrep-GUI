const express = require('express');
const { MongoClient, Logger } = require('mongodb');

const app = express();
const port = 5000; // Replace with your desired port

// Set up MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/semgrepresults';
const client = new MongoClient(mongoUri, { useNewUrlParser: true });

app.get('/results', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page
        console.log(req.query);
        const limit = parseInt(req.query.limit) || 10; // Results per page
        const skip = (page - 1) * limit;

        await client.connect();
        const collection = client.db().collection('your-collection-name');

        const baseQuery = {};

        // Add search query if the 'search' parameter is provided
        if (req.query.search && req.query.search.trim() !== '') {
            const fields = ['check_id', 'extra.message', 'path', 'extra.lines', 'extra.severity'];
            console.log(fields);

            // Construct the $or query for full-text search
            baseQuery['$or'] = fields.map((field) => ({
                [field]: { $regex: req.query.search.trim(), $options: 'i' }
            }));
            console.log(baseQuery['$or']);
        }

        // Filter by severity if 'severity' query parameter is provided
        if (req.query.severity && req.query.severity !== 'all') {
            baseQuery['extra.severity'] = req.query.severity;
        }
        else if ( req.query.severity === undefined) {
            baseQuery['extra.severity'] = { $exists: true };

        }

        // Sort results based on 'sort' query parameter
        const sort = {};
        const sortKey = req.query.sortBy || 'extra.severity'; // Replace with your sorting criteria
        sort[sortKey] = req.query.sort === 'asc' ? 1 : -1;
        const results = await collection.find({ ...baseQuery }).sort(sort).skip(skip).limit(limit).toArray();
        const totalResults = await collection.countDocuments({ ...baseQuery });
        res.json({ results, totalResults });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = app;

