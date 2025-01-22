const express = require('express');
const User = require('../models/User');
const Notes = require('../models/Notes');

exports.getUsers = async (req, res, next) => {
    const users = await User.find();
    if(User.role !== 'admin'){
        return res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
    
    if(!users){
        return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json({ users });
};
exports.postUploadNotes = async (req, res, next) => {
   const{title, subject, originalPrice, discountPrice} = req.body;
   const ownerId = req.userId;
   if(!req.file){
    return res.status(400).json({ message: 'No file provided' });
   }
   const pdfUrl = req.file.path;
   try{
    const note = new Notes({title, subject, pdfUrl, price, ownerId});
    await note.save();
    res.status(200).json({ message: 'Notes uploaded successfully' });
   }catch(error){
    res.status(500).json({ message: error.message });
   }
};
exports.getNotes = async (req, res, next) => {
    const ownerId = req.userId;
    const notes = await Notes.find({ownerId});
    if(!notes){
        return res.status(404).json({ message: 'No notes found' });
    }
    res.status(200).json({ notes });
};
exports.deleteNotes = async (req, res, next) => {
    const noteId = req.params.id;
    await Notes.findByIdAndDelete(noteId);
    res.status(200).json({ message: 'Notes deleted successfully' });
};
exports.patchUpdateNotes = async (req, res, next) => {
    const noteId = req.params.id;
    const {title, subject, originalPrice, discountPrice} = req.body;
    await Notes.findByIdAndUpdate(noteId, {title, subject, price});
    res.status(200).json({ message: 'Notes updated successfully' });
};

