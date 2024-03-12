import Shipping from "../models/shipping.model.js";
import {ValidateShipping,ValidateUpdateShipping} from "../validators/shipping.validator.js"

// Insert new shipping
export async function insertShipping(req, res) {
    try {
      const shippingData = req.body;
      console.log(shippingData)
  
      // Validate shipping data before insertion
      const { error } = ValidateShipping(shippingData);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Insert shipping
      const newShipping = new Shipping(shippingData);
      const savedShipping = await newShipping.save();
  
      // Send response
      res.status(200).json({ message: "Shipping inserted", shipping: savedShipping });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Define Shipping update function
export async function updateShipping(req, res, next) {
    try {
        // Get Shipping ID from request parameters
        const shippingId = req.params.id;

        // Get updated Shipping data from request body
        const updatedShippingData = req.body;

        // Validate Shipping data before update
        const { error } = ValidateUpdateShipping(updatedShippingData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Find the Shipping by ID
        let shipping = await Shipping.findById(shippingId);

        // Check if Shipping exists
        if (!shipping) {
            return res.status(404).json({ error: "Shipping not found" });
        }

        // Update Shipping data using Object.assign
        Object.assign(shipping, updatedShippingData);

        // Save updated Shipping to the database
        const updatedShipping = await shipping.save();

        // Respond with success message and updated Shipping data
        res.status(200).json({ message: "Shipping successfully updated", updatedShipping });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during Shipping update:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Display Single Shipping
export async function showShipping(req, res, next) {
    try {
        // Get cards ID from request parameters
        let shippingId = req.params.id; // Assuming the parameter is cardsId

        // Find the card by ID
        let shipping = await Shipping.findOne({ _id: shippingId });

        // Check if card exists
        if (!shipping) {
            console.log('shipping not found');
            return res.status(404).json({ message: 'Shipping not found' });
        }

        // Respond with the card data
        res.status(200).json({ shipping });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Error retrieving Shipping' });
    }
};



// Display Single Shipping
export async function showAllShipping(req, res, next) {
    try {
        // Find all payments
        const shipping = await Shipping.find();

        // If no payments found or empty array returned
        if (!shipping || shipping.length === 0) {
            console.log("No shipping found");
            return res.status(404).json({ message: "No shipping Found" });
        }

        // If payments found, send them in response
        res.status(200).json({ shipping });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};




// Delete a shipping
export async function deleteShipping(req, res) {
    try {
        // Get the card ID from request parameters
        const shippingId = req.params.id;

        // Find the card by ID and delete it
        const deletedshipping = await Shipping.findByIdAndDelete(shippingId);

        // Check if the card was found and deleted successfully
        if (!deletedshipping) {
            return res.status(404).json({ success: false, message: "shipping not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "shipping deleted successfully", datashow: deletedshipping });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during shipping deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}