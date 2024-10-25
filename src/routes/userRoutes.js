// routes/userRoutes.js
//import express frame
const express = require("express");
//router instance
const router = express.Router();
// Import the user controller module
const user = require("../controllers/userController");
// Import the protect middleware for authentication
const { protect } = require("../middlewares/authMiddleware");

//userRoute to handle  the request and response
/** @desc stands for descritpion */
/**
 * @route POST /api/users
 * @desc register new user
 */
// Create User
router.post("/register", user.createUser);
/**
 * @route POST /api/login
 * @desc Login an existing user
 */
router.post("/login", user.loginUser);

/**
 * @route GET /api/users
 * @desc Get all users (protected by JWT middleware)
 */
router.get("/users", protect, user.getAllUsers);

/**
 * @route GET /api/user
 * @desc Get a user by ID (protected by JWT middleware)
 */
router.get("/user/:id", protect, user.getUserById);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID
 */
router.delete("/user/:id", user.deleteUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update a user by ID
 */
router.put("/user/:id", user.updateUserById);

router.get("/user/:id/transactions", protect, (req, res) => {
    console.log("Transaction route accessed");
    user.getUserTransactions(req, res);
 });
 

// Export the router for use in other parts of the application
module.exports = router;