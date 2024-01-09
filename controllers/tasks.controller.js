const contactModel = require('../models/contacts.schema');
const fs = require("node:fs");
const path = require("node:path");
const shortid = require('shortid');
const { stringify } = require("node:querystring");

const contactsPath = path.join(__dirname, "..", "models", "contacts.json");

const getAllTasks = async (req, res, next) => {
    try {
        const contacts = await contactModel.find();
            res.status(200).json({
                title: 'Success',
                msg: 'Task obtained successfuly',
                code: 200,
                result: contacts,
            });
    } catch (error) {
        next(error);
    }
};


const getTasksById = async (req, res, next) => {
    try {

        const contactById = await contactModel.findById(req.params.contactId);
        res.status(200).json({
            title: 'Success',
            msg: 'Task obtained successfuly',
            code: 200,
            result: contactById,
        });
    } catch (error) {
        next();
    }
};


const addContact = async (req, res, next) => {
    try {
        const newContact = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        };
        
        const contact = contactModel(newContact);
        const contactCreated = await contact.save();
        res.status(201).json({
            title: 'Success',
            msg: 'Task created successfuly',
            code: 201,
            result: contactCreated,
        });
        
    } catch (error) {
        next(error);
    }
};


const removeContact = async (req, res, next) => {
    try {
        const contactRemoved = await contactModel.findOneAndDelete({ _id: req.params.contactId});
        res.status(200).json({
        title: 'Success',
        msg: 'Task removed successfuly',
        code: 200,
        result: contactRemoved,
        });
    } catch (error) {
        next();
    }
};


const updateContact = async (req, res, next) => {
    try {
        const toUpdate = { 
            name: req.body.name, 
            email: req.body.email, 
            phone: req.body.phone
        };

        const contactUpdated = await contactModel.findByIdAndUpdate(
            req.params.contactId,
            toUpdate,
            {
                new: true,
            }
        );

        res.status(200).json({
            title: 'Success',
            msg: 'Task updated successfuly',
            code: 200,
            result: contactUpdated,
        });      
    } catch (error) {
        next();
    }
};


const updateStatusContact = async (req, res, next) => {
    try {
        const toUpdate = { 
            favorite : req.body.favorite,
        };

        if(toUpdate.favorite == undefined){
            res.status(400).json({
                title: 'Error',
                msg: 'missing field favorite',
                code: 400,
            });
            return;
        }

        const contactUpdated = await contactModel.findByIdAndUpdate(
            req.params.contactId,
            toUpdate,
            {
                new: true,
            }
        );
        res.status(200).json({
            title: 'Success',
            msg: 'Task updated successfuly',
            code: 200,
            result: contactUpdated,
        });      
    } catch (error) {
        next();
    }
};

module.exports = {getAllTasks, getTasksById, addContact, removeContact, updateContact, updateStatusContact}