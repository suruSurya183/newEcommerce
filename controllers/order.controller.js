import OrderModel from '../models/order.model.js';
import { validateCreateOrder, validateUpdateOrder } from '../validators/order.validator.js';

// Insert New order
export async function insertOrder(req, res) {
  try {
    const orderData = req.body;

    // Validate order data before insertion
    const { error } = validateCreateOrder(orderData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Order with itemId
    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();

    // Send Response
    res.status(200).json({ message: "Order data inserted", data: savedOrder });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

// Display List
export async function ListOrders(req, res, next){
  try {
    let order = await OrderModel.find();
    if (!order || order.length === 0) {
      console.log('orderr not found');
      return res.status(404).json({ message: 'order not found' });
    }
    res.status(200).json({ message: "success", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single order
export async function showOrder(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is orderId
    let order = await OrderModel.findOne({_id: id});

    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving order' });
  }
};

// Update order
export async function updateOrder(req, res, next) {
  try {
    const id = req.params.id;
    const orderDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateOrder(orderDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing order by ID using Mongoose
    const existingOrder = await OrderModel.findOne({ _id: id });

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingOrder, orderDataToUpdate);

    // Save the updated order
    const updatedOrder = await existingOrder.save();

    // Send the updated order as JSON response
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete order
export async function deleteOrder(req, res, next){
  try {
    let id = req.params.id;

    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

