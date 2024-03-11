import Card from "../models/cards.model.js";
import { validateCard, validateCardUpdate } from "../validators/cards.validators.js"


// Insert New card
export async function insertCard(req, res) {
    try {
        const cardData = req.body;

        // Validate card data before insertion
        const { error } = validateCard(cardData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Insert card with itemId
        const newcard = new Card(cardData);
        const savecard = await newcard.save();

        // Send Response
        res.status(200).json({ message: "card data inserted", data: savecard });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message || "Something went wrong",
            });
    }
};

// Define card update function
export async function updateCard(req, res, next) {
    try {
        // Get card ID from request parameters
        const cardId = req.params.id;

        // Get updated card data from request body
        const updatedCardData = req.body;

        // Validate updated card data
        const { error } = validateCardUpdate(updatedCardData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Find the card by ID
        let card = await Card.findById(cardId);

        // Check if card exists
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        // Update card data
        card = Object.assign(card, updatedCardData);

        // Save updated card to the database
        const updatedCard = await card.save();

        // Respond with success message and updated card data
        res.status(200).json({ message: "Card successfully updated", updatedCard });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during card update:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Display Single cards
export async function showCards(req, res, next) {
    try {
        // Get cards ID from request parameters
        let cardsId = req.params.id; // Assuming the parameter is cardsId

        // Find the card by ID
        let cards = await Card.findOne({ _id: cardsId });

        // Check if card exists
        if (!cards) {
            console.log('Cart not found');
            return res.status(404).json({ message: 'card not found' });
        }

        // Respond with the card data
        res.status(200).json({ cards });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Error retrieving cart' });
    }
};

export async function showAllcard(req, res, next) {
    try {
        // Find all payments
        const card = await Card.find();

        // If no payments found or empty array returned
        if (!card || card.length === 0) {
            console.log("No payments found");
            return res.status(404).json({ message: "No Payments Found" });
        }

        // If payments found, send them in response
        res.status(200).json({ card });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};


// Delete a card
export async function deleteCard(req, res) {
    try {
        // Get the card ID from request parameters
        const cardId = req.params.id;

        // Find the card by ID and delete it
        const deletedCard = await Card.findByIdAndDelete(cardId);

        // Check if the card was found and deleted successfully
        if (!deletedCard) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Card deleted successfully", data: deletedCard });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during card deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}
