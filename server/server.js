const express = require('express');
const fileUploadApp = require('./fileupload');
const fetchResultsApp = require('./fetchresults');
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

const app = express();
const cors = require('cors');

 // Enable CORS for cross-origin requests
app.use(cors());
app.use('/', fileUploadApp);
app.use('/', fetchResultsApp);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
