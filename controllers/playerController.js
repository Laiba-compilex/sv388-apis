const User = require("../models/Player");

const playerController = {
  async createPlayer(req, res) {
    try {
      const player = await User.create(req.body);
      res.status(201).send(player);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error creating player", error });
    }
  },

  async getAllPlayers(req, res) {
    try {
      const players = await User.find();
      res.send(players);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching players", error });
    }
  },

  async getPlayerById(req, res) {
    try {
      const player = await User.findById(req.params.id);
      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }
      res.send(player);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching player", error });
    }
  },

  async updatePlayer(req, res) {
    try {
      const player = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }
      res.send(player);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating player", error });
    }
  },

  async deletePlayer(req, res) {
    try {
      const player = await User.findByIdAndDelete(req.params.id);
      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }
      res.send({ message: "Player deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error deleting player", error });
    }
  },
};


module.exports = playerController;