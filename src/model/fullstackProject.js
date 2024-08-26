import mongoose from 'mongoose';

// Define the Project schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    imageLink: {
        type: String,
        required: true,
        trim: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
},{
    timestamps: true, 
});

const fullstackProject = mongoose.models.fullstackProject ||  mongoose.model('fullstackProject', projectSchema);

export default fullstackProject;