import express from "express";
const router = express.Router();
import * as cardsController from "../controllers/cards.controller.js"

// POST request to insert a new card
router.post('/', cardsController. insertCard);

// GET request to display all card
router.get('/',cardsController.showAllcard);

// GET request to display a card
router.get('/:id',cardsController.showCards);

// PUT request to update a card by ID
router.put('/:id',cardsController.updateCard);

// DELETE request to display all card
router.delete('/:id',cardsController. deleteCard);

export default router;