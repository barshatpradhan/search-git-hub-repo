import express from 'express';
import Favorite from '../Models/Favourite';
import {authenticateToken} from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const favorites = await Favorite.find({userId: req.userId});
        res.json(favorites);
    } catch(error: any) {
        res.status(500).json({error: error.message})
    }
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const favorite = new Favorite({...req.body, userId: req.userId});
        await favorite.save();
        res.json(favorite)
    } catch (error : any){
        res.status(400).json({error: error.message})
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await Favorite.findOneAndDelete({
            _id: req.params.id, userId: req.userId
        })
        res.json({message: 'Favourite removed'});
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
})

export default router

