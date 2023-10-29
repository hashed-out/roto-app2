const User = require('../models/user');

async function updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updateFields = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    updateUser,
  };