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
}, {
    timestamps: true, 
});

const Project = mongoose.models.Project ||  mongoose.model('Project', projectSchema);

export default Project;