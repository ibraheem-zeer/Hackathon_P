//import { dataSource } from 'index.js';
import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs'
import './db/index.js'
//import { createConnection } from 'typeorm';
import 'reflect-metadata';
const app = express();
const port = process.env.PORT || 3000;

// Configure AWS with your credentials
AWS.config.update({
    region: 'eu-west-2', // Replace with your AWS region
    accessKeyId: 'AKIA3SQWPZW4WIK5OJNX', // Replace with your AWS access key ID
    secretAccessKey: 'uQFFKTDs9qe/VROS/zMZjEbM3jkqGk1hDV9+hd+H', // Replace with your AWS secret access key
});

const rekognition = new AWS.Rekognition();

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define a route for uploading and analyzing an image
app.post('/analyze', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }

    // Load the image file from disk
    const fileBuffer = fs.readFileSync(req.file.path);

    // Configure parameters for Rekognition
    const params = {
        Image: {
            Bytes: fileBuffer,
        },
    };

    // Use Rekognition to detect labels in the image
    rekognition.detectLabels(params, (err, data) => {
        if (err) {
            console.error('Error analyzing image:', err);
            res.status(500).json({ error: 'Failed to analyze image' });
        } else {
            const labels = data.Labels?.map((label) => label.Name);
            res.json({ labels });
        }
    });
});


app.post('/spot-celebrities', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }

    // Load the image file from disk
    const fileBuffer = fs.readFileSync(req.file.path);

    // Configure parameters for Rekognition to recognize celebrities
    const params = {
        Image: {
            Bytes: fileBuffer,
        },
    };

    // Use Rekognition to recognize celebrities in the image
    rekognition.recognizeCelebrities(params, (err, data) => {
        if (err) {
            console.error('Error spotting celebrities:', err);
            res.status(500).json({ error: 'Failed to spot celebrities' });
        } else {
            const celebrities = data.CelebrityFaces?.map((celeb) => celeb.Name);
            res.json({ celebrities });
        }
    });
});


app.post('/extract-text', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }

    // Load the image file from disk
    const fileBuffer = fs.readFileSync(req.file.path);

    // Configure parameters for Rekognition to detect text
    const params = {
        Image: {
            Bytes: fileBuffer,
        },
    };

    // Use Rekognition to detect text in the image
    rekognition.detectText(params, (err, data) => {
        if (err) {
            console.error('Error extracting text:', err);
            res.status(500).json({ error: 'Failed to extract text' });
        } else {
            const extractedText = data.TextDetections?.map((text) => text.DetectedText);
            res.json({ extractedText });
        }
    });
});


// error handler
app.use((err: any, req: any, res: any, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// createConnection()
//     .then(async () => {
//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//         });
//     })
//     .catch((error) => {
//         console.error('TypeORM connection error:', error);
//     });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
