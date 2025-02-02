import mongoose from 'mongoose';

// Define User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,         // Ensures 'name' is required
            trim: true              // Removes whitespace around the name
        },
        email: {
            type: String,
            required: true,
            unique: true,           // Ensures 'email' is unique
            trim: true,
            lowercase: true         // Stores email in lowercase
        },
        password: {
            type: String,
            required: true,
            minlength: 6            // Enforces a minimum password length
        }
    },
    {
        timestamps: true            // Automatically adds createdAt and updatedAt fields
    }
);

const User = mongoose.model('User', userSchema);
export default User;