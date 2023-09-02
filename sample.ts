// import AWS from 'aws-sdk';
// import fs from 'fs';

// // Initialize the AWS SDK
// AWS.config.update({
//     region: 'eu-west-2',
//     accessKeyId: 'AKIA3SQWPZW4WIK5OJNX',
//     secretAccessKey: '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'
// });

// // Use Rekognition
// const rekognition = new AWS.Rekognition();

// // Load local image
// const filePath = 'main.jpg';  // Adjust this to your image's path
// const imageBytes = fs.readFileSync(filePath);

// const params = {
//     Image: {
//         Bytes: imageBytes
//     },
//     Attributes: ['ALL']
// };

// rekognition.detectFaces(params, function (err: any, data: any) {
//     if (err) {
//         console.error("Error:", err, err.stack);
//     } else {
//         console.log("Rekognition Result:", data);
//     }
// });