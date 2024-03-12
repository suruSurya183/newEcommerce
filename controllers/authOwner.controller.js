import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'; // Import the crypto module
import OwnerModel from "../models/owner.model.js";
import nodemailer from "nodemailer"; // Import nodemailer for sending emails

// Function to generate a random token
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

export async function ownerLogin(req, res) {
    try {
        const { emailAddress, password } = req.body;

        // Find owner by email address
        const owner = await OwnerModel.findOne({ emailAddress });
        console.log("owner", owner);
        if (!owner) {
            return res.status(404).json({ error: "Owner not found" });
        }

        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, owner.password);
        
        console.log("passwordMatch", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: owner.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("token", token);

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true }); // You can set other options like expiration, domain, secure, etc. as needed

        // Send the owner data and token in the response
        res.status(200).json({ owner, token });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

export async function ownerLogout(req, res) {
    try {
        // Instead of clearing localStorage here, send a response to the client to clear the token
        res.clearCookie('token'); // Clearing a cookie if token is stored in cookies

        // Alternatively, you can send a response instructing the client to clear the token from local storage
        res.status(200).json({ message: "Logged out successfully", clearToken: true });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

const transporter = nodemailer.createTransport({
    service: 'suryaumpteen@gmail.com', // e.g., 'gmail'
    auth: {
        user: 'suryaumpteen@gmail.com',
        pass: 'egye onio jxeo rhmt'
    },
    authMethod: 'PLAIN' // Specify the authentication method explicitly
});

async function sendPasswordResetEmail(owner, resetToken) {
    try {
        await transporter.sendMail({
            from: 'suryaumpteen@gmail.com',
            to: owner.emailAddress,
            subject: 'Password Reset',
            text: `Hello ${owner.ownerName},\n\nPlease use the following link to reset your password: ${resetToken}`
        });
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
}

export async function forgotPassword(req, res) {
    try {
        let { emailAddress } = req.body;
        emailAddress = emailAddress.trim().toLowerCase(); // Trim whitespace and convert to lowercase
        console.log("emailAddress--->", emailAddress);

        // Find owner by email address
        const owner = await OwnerModel.findOne({ emailAddress });
        console.log("owner--->", owner);
        if (!owner) {
            return res.status(404).json({ error: "Owner not found" });
        }

        // Generate a reset token
        const resetToken = generateToken();

        // Update owner with reset token and expiry time
        owner.resetPasswordToken = resetToken;
        owner.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await owner.save();

        // Send password reset email
        await sendPasswordResetEmail(owner, resetToken);

        // Respond to the client
        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// Reset password handler
export async function resetPassword(req, res) {
    try {
        const { resetToken, newPassword } = req.body;

        // Find owner by reset token
        const owner = await OwnerModel.findOne({ resetPasswordToken: resetToken });

        if (!owner) {
            return res.status(404).json({ error: "Invalid or expired reset token" });
        }

        // Check if the reset token has expired
        if (owner.resetPasswordExpires < Date.now()) {
            return res.status(401).json({ error: "Reset token has expired" });
        }

        // Generate a new hashed password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update owner's password and clear reset token
        owner.password = hashedPassword;
        owner.resetPasswordToken = undefined;
        owner.resetPasswordExpires = undefined;

        // Save the updated owner
        await owner.save();

        // Respond to the client
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// Method to change owner password
export async function changePassword(req, res) {
    try {
      const { id } = req.params;
      console.log("id", id);
      const { oldPassword, newPassword } = req.body;
  
      // Find the owner by ownerId
      const owner = await OwnerModel.findById(id); // <- Corrected this line
  
      console.log("owner", owner);
  
      // If owner not found
      if (!owner) {
        return res.status(404).json({ message: "Owner not found" });
      }
  
      // Compare old password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(oldPassword, owner.password);
  
      // If old password doesn't match
      if (!passwordMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
  
      // Hash the new password
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update owner's password
      owner.password = hashedNewPassword;
      await owner.save();
  
      // Send success response
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  }
  
