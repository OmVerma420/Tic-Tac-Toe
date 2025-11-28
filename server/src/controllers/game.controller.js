import Game from "../models/Game.model.js";

export const saveGameResult = async (req, res) => {
  try {
    const { levelResults } = req.body;

    const game = await Game.create({
      userId: req.user._id,
      levelResults
    });

    return res.status(201).json({ message: "Game saved", game });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getUserGameHistory = async (req, res) => {
  try {
    const games = await Game.find({ userId: req.user._id });
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
