import UserModel from "../models/user.model.js";
import { validateCreateUser, validateUpdateUser } from '../validators/user.validator.js';
import bcrypt from "bcrypt";

export async function userInsert(req, res) {
  try {
    const userData = req.body;

    // Validate user data before insertion
    const { error } = validateCreateUser(userData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if emailAddress already exists in UserModel
    const existingUser = await UserModel.findOne({
      emailAddress: userData.emailAddress,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with the given emailAddress already exists" });
    }

    // Replace the plain password with the hashed one
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Insert User with userId
    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Send Response
    res.status(200).json({
      message: "User data inserted",
      userData: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

// export async function userInsert(req, res) {
//   const userData = req.body;

//   const newUser = new UserModel(userData);

//   const savedUser = await newUser.save();

//   res.status(200).json({
//     message: "User data inserted",
//     userData: savedUser,
//   });
// }

// User List
export async function showAllUsers(req, res) {
  try {
    const user = await UserModel.find({ disabled: "false" });

    if (!user || user.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display Single User
export async function showUser(req, res) {
  try {
    const userId = req.params.id; // Corrected variable name
    const user = await UserModel.findOne({ _id: userId }); // Corrected field name
    // const id = req.params.id; // Corrected variable name
    // const user = await UserModel.find({ _id: id }); // Corrected field name
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Update User
export async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const userDataToUpdate = req.body;

    // Validate user data before update
    const { error } = validateUpdateUser(userDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing user by userId
    const existingUser = await UserModel.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    Object.assign(existingUser, userDataToUpdate);
    const updatedUser = await existingUser.save();

    // Send the updated user as JSON response
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

// Delete User
export async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { disabled: "true" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

//Search user
export async function searchUser(req, res) {
  try {
    const { id } = req.params; // Extracting id from params
    const { emailAddress, userName, type, contactNumber } = req.query; // Extracting search parameters from query string

    // Constructing the search query
    const searchQuery = {};
    if (id) {
      searchQuery._id = id;
    }
    if (emailAddress) {
      searchQuery.emailAddress = emailAddress;
    }
    if (userName) {
      searchQuery.userName = userName;
    }
    if (type) {
      searchQuery.type = type;
    }
    if (contactNumber) {
      searchQuery.contactNumber = contactNumber;
    }

    const user = await UserModel.find(searchQuery);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
