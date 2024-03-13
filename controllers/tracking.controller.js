import Tracking from "../models/tracking.model.js";
import {ValidateTracking, ValidateUpdateTracking} from "../validators/tracking.validators.js";


// Insert new Tracking
export async function insertTracking(req, res) {
    try {
      const trackingData = req.body;
      console.log(trackingData)
  
      // Validate Tracking data before insertion
      const { error } = ValidateTracking(trackingData);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Insert Tracking
      const newtracking = new Tracking (trackingData);
      const savedtracking = await newtracking.save();
  
      // Send response
      res.status(200).json({ message: "Tracking inserted", trackinshow: savedtracking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  // Define Tracking update function
export async function updateTracking(req, res, next) {
    try {
        // Get  Tracking  ID from request parameters
        const trackingId = req.params.id;
        console.log(trackingId)

        // Get updated  Tracking  data from request body
        const updatedTrackingData = req.body;

        // Validate  Tracking  data before update
        const { error } = ValidateUpdateTracking(updatedTrackingData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Find the  Tracking  by ID
        let tracking = await Tracking.findById(trackingId);

        // Check if  Tracking  exists
        if (!tracking) {
            return res.status(404).json({ error: "Tracking not found" });
        }

        // Update  Tracking  data using Object.assign
        Object.assign(tracking, updatedTrackingData);

        // Save updated  Tracking  to the database
        const updatedShipping = await tracking.save();

        // Respond with success message and updated  Tracking  data
        res.status(200).json({ message: " Tracking  successfully updated", updatedShipping });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during  Tracking  update:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// Display Single Tracking
export async function showTracking(req, res, next) {
    try {
        // Get Tracking ID from request parameters
        let trackingId = req.params.id; // Assuming the parameter is cardsId

        // Find the Tracking by ID
        let tracking = await Tracking.findOne({ _id: trackingId });

        // Check if Tracking exists
        if (!tracking) {
            console.log('Tracking not found');
            return res.status(404).json({ message: 'Tracking not found' });
        }

        // Respond with the Tracking data
        res.status(200).json({ tracking });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Error retrieving Tracking' });
    }
};


// Display All Tracking
export async function showAllTracking(req, res, next) {
    try {
        // Find all Tracking
        const tracking = await Tracking.find();
 console.log("show racking",tracking)
        // If no Tracking found or empty array returned
        if (!tracking || tracking.length === 0) {
            console.log("No  Tracking found");
            return res.status(404).json({ message: "No  Tracking Found" });
        }

        // If  Tracking found, send them in response
        res.status(200).json({ tracking });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};



// Delete a Tracking
export async function deleteTracking(req, res) {
    try {
        // Get the Tracking ID from request parameters
        const trackingId = req.params.id;
        console.log(trackingId)

        // Find the Tracking by ID and delete it
        const deletedtracking = await Tracking.findByIdAndDelete(trackingId);

        // Check if the Tracking was found and deleted successfully
        if (!deletedtracking) {
            return res.status(404).json({ success: false, message: "Tracking not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Tracking deleted successfully", datashow: deletedtracking });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during Tracking deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}