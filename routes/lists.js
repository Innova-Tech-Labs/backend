const express = require('express');
const router = express.Router();
const List = require('../models/Lists'); 

router.get('/', async (req, res) => {
    try {
        const lists = await List.find({});
        res.json(lists);
    } catch (error) {
        console.error('Failed to fetch lists:', error);
        res.status(500).send('Failed to fetch lists: ' + error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if (!list) {
            return res.status(404).send('List not found');
        }
        res.json(list);
    } catch (error) {
        console.error('Error fetching list:', error);
        res.status(500).send('Error fetching list: ' + error.message);
    }
});

router.post('/', async (req, res) => {
    const { title, description, items } = req.body;
    try {
        const newList = new List({
            title,
            description,
            items
        });
        await newList.save();
        res.status(201).json(newList);
    } catch (error) {
        console.error('Error creating new list:', error);
        res.status(400).send('Error creating new list: ' + error.message);
    }
});

router.put('/:id', async (req, res) => {
    const { title, description, items } = req.body;
    try {
        const updatedList = await List.findByIdAndUpdate(req.params.id, {
            title,
            description,
            items
        }, { new: true });
        if (!updatedList) {
            return res.status(404).send('List not found');
        }
        res.json(updatedList);
    } catch (error) {
        console.error('Error updating list:', error);
        res.status(500).send('Error updating list: ' + error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedList = await List.findByIdAndDelete(req.params.id);
        if (!deletedList) {
            return res.status(404).send('List not found');
        }
        res.send('List deleted');
    } catch (error) {
        console.error('Error deleting list:', error);
        res.status(500).send('Error deleting list: ' + error.message);
    }
});

module.exports = router;
