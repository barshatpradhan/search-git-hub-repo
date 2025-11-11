"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Favourite_1 = __importDefault(require("../Models/Favourite"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const favorites = await Favourite_1.default.find({ userId: req.userId });
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const favorite = new Favourite_1.default({ ...req.body, userId: req.userId });
        await favorite.save();
        res.json(favorite);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        await Favourite_1.default.findOneAndDelete({
            _id: req.params.id, userId: req.userId
        });
        res.json({ message: 'Favourite removed' });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
exports.default = router;
//# sourceMappingURL=favorites.js.map