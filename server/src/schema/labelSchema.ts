import mongoose from 'mongoose';

// Example label Schema
const labelSchema = new mongoose.Schema({
    label: String,
}, {
    timestamps: true
});

const Label = mongoose.model('Label', labelSchema);

export default Label

