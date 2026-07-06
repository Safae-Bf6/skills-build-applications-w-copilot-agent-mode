import { Router } from 'express';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const router = Router();

router.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

router.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({}).populate('members').populate('captain').lean();
  res.json(teams);
});

router.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({}).populate('user').lean();
  res.json(activities);
});

router.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
  res.json(leaderboard);
});

router.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

export default router;
