const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const uploads = multer({ dest: 'uploads/' });

const app = express();
app.use(express.static('public')); // Serve HTML files from the 'public' directory

const SEVERITY_MAP = {
    "INFO": "Low severity",
    "WARNING": "Medium severity",
    "ERROR": "High severity"
    // Add more severity mappings as needed
};


app.post('/upload', uploads.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    const filePath = req.file.path;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the uploaded JSON file:', err);
            return res.status(500).send('Error reading the uploaded file.');
        }

        try {
            const jsonData = JSON.parse(data);
            const desiredArray = jsonData.results; // Replace 'arrayName' with the actual name of the array you want to parse

            // Now you can work with the 'desiredArray' as needed
            // console.log(desiredArray);
            const checkIds = desiredArray.map((result) => result.check_id);
            // Replace with your MongoDB connection URL
            const uri = 'mongodb://localhost:27017/semgrepresults';
            async function connectToMongoDB() {
                const client = new MongoClient(uri, { useNewUrlParser: true });

                try {
                    await client.connect();
                    return client;
                } catch (error) {
                    console.error('Error connecting to MongoDB:', error);
                    throw error;
                }
            }
            async function uploadDataToMongoDB(data) {
                const client = await connectToMongoDB();
                const db = client.db();
                const collection = db.collection('your-collection-name'); // Replace with your collection name

                try {
                    const result = await collection.insertMany(data);

                    if (result.insertedCount > 0) {
                        console.log(`Successfully inserted ${result.insertedCount} documents into MongoDB.`);
                    } else {
                        console.log('No documents were inserted.');
                    }
                } catch (error) {
                    console.error('Error inserting data into MongoDB:', error);
                    throw error;
                } finally {
                    await client.close();
                }
            }

            // Upload data from desiredArray to MongoDB
            uploadDataToMongoDB(desiredArray);


            res.send('File uploaded and data processed.');
        } catch (parseError) {
            console.error('Error parsing the JSON data:', parseError);
            return res.status(500).send('Error parsing the JSON data.');
        }finally {
            fs.unlinkSync(filePath); // Delete the uploaded file after processing
        }
    });
});



module.exports = app;