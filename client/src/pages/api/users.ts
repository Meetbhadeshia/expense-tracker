// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('expenses');  // Replace with your actual database name

    if (req.method === 'POST') {
        // Create a new user
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const result = await db.collection('users').insertOne({ email, password });
        console.log("created user", result)
        // res.status(201).json({ message: 'User created', user: result.ops[0] });
    } else if (req.method === 'GET') {
        // Fetch all users
        const users = await db.collection('users').find({}).toArray();
        res.status(200).json({ users });
    } else if (req.method === 'PUT') {
        // Update a user
        const { id, email, password } = req.body;

        if (!id || (!email && !password)) {
            return res.status(400).json({ message: 'User ID and at least one field (email or password) are required.' });
        }

        const updateData: any = {};
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        const result = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnOriginal: false }
        );

        if (!result.value) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated', user: result.value });
    } else if (req.method === 'DELETE') {
        // Delete a user
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(204).end(); // No content to return
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
