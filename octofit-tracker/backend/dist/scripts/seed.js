import { connectToDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await connectToDatabase();
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava.patel@octofit.dev',
                age: 29,
                fitnessLevel: 'advanced',
                goals: ['marathon', 'strength'],
            },
            {
                name: 'Noah Kim',
                email: 'noah.kim@octofit.dev',
                age: 31,
                fitnessLevel: 'intermediate',
                goals: ['mobility', 'endurance'],
            },
            {
                name: 'Mina Chen',
                email: 'mina.chen@octofit.dev',
                age: 27,
                fitnessLevel: 'beginner',
                goals: ['consistency'],
            },
        ]);
        const team = await Team.create({
            name: 'Velocity Squad',
            sport: 'CrossFit',
            members: [users[0]._id, users[1]._id],
            captain: users[0]._id,
        });
        await Activity.insertMany([
            {
                type: 'run',
                duration: 35,
                calories: 320,
                user: users[0]._id,
                date: new Date('2026-07-05T06:30:00Z'),
            },
            {
                type: 'strength',
                duration: 45,
                calories: 410,
                user: users[1]._id,
                date: new Date('2026-07-05T18:00:00Z'),
            },
            {
                type: 'yoga',
                duration: 25,
                calories: 180,
                user: users[2]._id,
                date: new Date('2026-07-06T07:00:00Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            { user: users[0]._id, points: 940, rank: 1, streak: 7 },
            { user: users[1]._id, points: 882, rank: 2, streak: 5 },
            { user: users[2]._id, points: 812, rank: 3, streak: 3 },
        ]);
        await Workout.insertMany([
            {
                title: 'Morning Mobility Flow',
                difficulty: 'easy',
                duration: 20,
                focus: 'mobility',
                description: 'A gentle warm-up to improve flexibility and posture.',
            },
            {
                title: 'HIIT Burn Circuit',
                difficulty: 'hard',
                duration: 40,
                focus: 'cardio',
                description: 'Short intervals designed to raise your heart rate quickly.',
            },
            {
                title: 'Core Strength Builder',
                difficulty: 'moderate',
                duration: 30,
                focus: 'strength',
                description: 'A balanced circuit to build core endurance.',
            },
        ]);
        console.log('Database seeding complete');
        await import('mongoose').then(({ default: mongoose }) => mongoose.disconnect());
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
