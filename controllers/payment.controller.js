import Payment from "../models/payment.model.js";
import {validatePaymentData, validateUpdatedPaymentData} from "../validators/payment.validator.js"


// Define payment creation function
export async function paymentInsert(req, res, next) {
    try {
      // Get payment data from request body
      const paymentData = req.body;
  
      // Validate payment data
      const { error } = validatePaymentData(paymentData);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Create a new payment instance
      const payment = new Payment(paymentData);
  
      // Save payment to the database
      const savedpayment = await payment.save();
  
      // Check if payment saved successfully
      if (!savedpayment) {
        return res.status(404).json("payment not found");
      }
  
      // Respond with success message and saved payment data
      res.status(200).json({ message: "payment is successfully created", paymentshow: savedpayment });
    } catch (error) {
      // Handle errors
      console.error("Error occurring during payment creation:", error);
      res.status(500).json({ error: "Server error" });
    }
  };


// Define payment update function
export async function updatePayment(req, res, next) {
    try {
        // Get payment ID from request parameters
        const paymentId = req.params.id;

        // Get updated payment data from request body
        const updatedPaymentData = req.body;

        // Validate updated payment data
        const { error } = validateUpdatedPaymentData(updatedPaymentData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Find the payment by ID
        const payment = await Payment.findById(paymentId);

        // Check if payment exists
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        // Update payment data
        Object.assign(payment, updatedPaymentData);

        // Save updated payment to the database
        const updatedPayment = await payment.save();

        // Respond with success message and updated payment data
        res.status(200).json({ message: "Payment successfully updated", updatedPayment });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during payment update:", error);
        res.status(500).json({ error: "Server error" });
    }
}






 // Display single payment
export async function showPayment(req, res, next) {
    try {
        // Get payment ID from request parameters
        const paymentId = req.params.id;

        // Find payment by ID
        const payment = await Payment.findById(paymentId);

        // If payment not found, return 404 status with error message
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // If payment found, return it in response
        res.status(200).json({ payment });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error("Error occurred while fetching payment:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}



  export async function showAllPayment(req, res, next) {
    try {
        // Find all payments
        const payments = await Payment.find();

        // If no payments found or empty array returned
        if (!payments || payments.length === 0) {
            console.log("No payments found");
            return res.status(404).json({ message: "No Payments Found" });
        }

        // If payments found, send them in response
        res.status(200).json({ payments });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};


  // Define payment deletion function
export async function deletePayment(req, res, next) {
    try {
        // Get payment ID from request parameters
        const paymentId = req.params.id;

        // Find payment by ID and delete it
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        // Check if payment was found and deleted successfully
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Respond with success message and deleted payment data
        res.status(200).json({ message: "Payment successfully deleted", deletedPayment });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during payment deletion:", error);
        res.status(500).json({ error: "Server error" });
    }
}