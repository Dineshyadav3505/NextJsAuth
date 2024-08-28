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
    githubLink: {
        type: String,
        trim: true,
    },
    liveLink: {
        type: String,
        trim: true,
    },
},{
    timestamps: true, 
});

const backendProject = mongoose.models.backendProject ||  mongoose.model('backendProject', projectSchema);

export default backendProject;