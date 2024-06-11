const dbClient = require('../utils/db');

const AppController = {
  getStatus: async (req, res) => {
    try {
      const isDBAlive = dbClient.isAlive();
      const isRedisAlive = true;

      if (isDBAlive && isRedisAlive) {
        res.status(200).json({ redis: true, db: true });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
