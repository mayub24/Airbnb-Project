const User = require('../models/userModel'); // adjust path
const bcrypt = require('bcryptjs');

async function admin() {
    const existingAdmin = await User.findOne({ type: "Admin" });

    if (existingAdmin) {
        console.log("Admin already exists.");
        return;
    }

    await User.create({
        firstName: "System",
        lastName: "Administrator",
        usr: "admin",
        pass: "Admin123?",
        adrs: "N/A",
        eml: "admin@example.com",
        verified: true,
        type: "Admin"
    });

    console.log("Admin user created!");
}

module.exports = admin;
