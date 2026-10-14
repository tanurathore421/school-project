const express = require("express");
const router = express.Router();
const { registerUser,loginUser,createAdmin,createStaff, logoutUser} = require("../controllers/authController");  
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

//router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin', createAdmin);
router.post('/staff', createStaff);
router.post("/logout", logoutUser);


router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome, admin!' });
});

router.get('/staff', authMiddleware, roleMiddleware('staff'), (req, res) => {
  res.status(200).json({ message: 'Welcome, staff!' });
});

router.get("/student", authMiddleware, roleMiddleware("student"), (req, res) => {
  res.status(200).json({
    message: "Welcome, student!",
    user: req.user,
  });
});

module.exports = router;