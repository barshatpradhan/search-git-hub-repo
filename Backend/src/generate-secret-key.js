// import crypto from 'node:crypto'

// // Generate a 64-byte secret key (base64 encoded)
// const secretKey = crypto.randomBytes(64).toString("hex");

// console.log("Generated Secret Key:", secretKey);


// generate-secret-key.js
import crypto from "node:crypto";   // If using ES modules (type: "module" in package.json)
// OR: const crypto = require("crypto"); // if using CommonJS

// Generate a 64-byte secret key (hex encoded)
const secretKey = crypto.randomBytes(64).toString("hex");

console.log("Generated Secret Key:", secretKey);
