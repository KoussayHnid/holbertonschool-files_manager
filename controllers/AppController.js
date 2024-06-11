import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

export default class AppController {
  static getStatus = async (req, res) => {
    return res
      .status(200)
      .json({ redis: redisClient.isAlive(), db: dbClient.isAlive() }); 
  };

  static getStats = async (req, res) => {
    res
      .status(200)
      .json({
        users: await dbClient.nbUsers(),
        files: await dbClient.nbFiles(),
      });
  };
}
