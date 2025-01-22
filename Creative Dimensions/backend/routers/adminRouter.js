const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get('/users', adminController.getUsers);
adminRouter.post('/upload-notes', adminController.postUploadNotes);
adminRouter.get('/notes', adminController.getNotes);
adminRouter.delete('/notes/:id', adminController.deleteNotes);
adminRouter.patch('/notes/:id', adminController.patchUpdateNotes);



module.exports = adminRouter;
