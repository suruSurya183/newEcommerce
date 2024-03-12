import OwnerModel from "../models/owner.model.js";
import { validateCreateOwner, validateUpdateOwner } from '../validators/owner.validator.js';
import bcrypt from "bcrypt";

export async function ownerInsert(req, res) {
  try {
    const ownerData = req.body;

    // Validate owner data before insertion
    const { error } = validateCreateOwner(ownerData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if emailAddress already exists in OwnerModel
    const existingOwner = await OwnerModel.findOne({
      emailAddress: ownerData.emailAddress,
    });
    if (existingOwner) {
      return res
        .status(400)
        .json({ error: "Owner with the given emailAddress already exists" });
    }

    // Replace the plain password with the hashed one
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(ownerData.password, saltRounds);

    // Insert Owner with ownerId
    const newOwner = new OwnerModel({
      ...ownerData,
      password: hashedPassword,
    });
    const savedOwner = await newOwner.save();

    // Send Response
    res.status(200).json({
      message: "Owner data inserted",
      ownerData: savedOwner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

// Owner List
export async function showAllOwners(req, res) {
  try {
    const owner = await OwnerModel.find({ disabled: "false" });

    if (!owner || owner.length === 0) {
      console.log("Owner not found");
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ owner });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display Single Owner
export async function showOwner(req, res) {
  try {
    const ownerId = req.params.id; // Corrected variable name
    const owner = await OwnerModel.findOne({ _id: ownerId }); // Corrected field name
    // const id = req.params.id; // Corrected variable name
    // const owner = await OwnerModel.find({ _id: id }); // Corrected field name
    console.log(owner);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ owner });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Update Owner
export async function updateOwner(req, res) {
  try {
    const ownerId = req.params.id;
    const ownerDataToUpdate = req.body;

    // Validate owner data before update
    const { error } = validateUpdateOwner(ownerDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing owner by ownerId
    const existingOwner = await OwnerModel.findOne({ _id: ownerId });
    if (!existingOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Update owner fields
    Object.assign(existingOwner, ownerDataToUpdate);
    const updatedOwner = await existingOwner.save();

    // Send the updated owner as JSON response
    res.status(200).json({ message: "Owner updated successfully", owner: updatedOwner });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

// Delete Owner
export async function deleteOwner(req, res, next) {
  try {
    const ownerId = req.params.id;
    const updatedOwner = await OwnerModel.findOneAndUpdate(
      { _id: ownerId },
      { disabled: "true" },
      { new: true }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found." });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

//Search owner
export async function searchOwner(req, res) {
  try {
    const { id } = req.params; // Extracting id from params
    const { emailAddress, ownerName, contactNumber } = req.query; // Extracting search parameters from query string

    // Constructing the search query
    const searchQuery = {};
    if (id) {
      searchQuery._id = id;
    }
    if (emailAddress) {
      searchQuery.emailAddress = emailAddress;
    }
    if (ownerName) {
      searchQuery.ownerName = ownerName;
    }
    if (contactNumber) {
      searchQuery.contactNumber = contactNumber;
    }

    const owner = await OwnerModel.find(searchQuery);

    if (!owner || owner.length === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ owner });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
