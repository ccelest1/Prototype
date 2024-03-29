const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
// establishing user model
/*
    is_active: allows us to show user status at given point or time
    profile_photo: going to be hosted on aws via s3 urls
    need to add a last_logged_in timestamp
    followers: people following you (uni-directional)
    following: people you are following (uni-directional)
    ^ placeholder of [Number] - Number referring to id's of said objects

    1. create a relation to professional_levels
    2. create a relation to engineering_types
    3. create a relation to user_interests

    [ to be implemented maybe?]
    last_logged_in: when has user last been on platform
    usage_history: track the number/dates a user has been on platform
    views: number of account hits/unique user views

    contemporaries: friends list (bi-directional)
    past_collaborators: people you have worked with
    past_collaborators: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },

*/
/*
const user_Interests = new Schema({

})
const user_ProfessionalLevel = new Schema({

})
const user_EngineeringType = new Schema({

})
*/
// testing references
const InterestsSchema = new Schema({
    name: {
        type: String,
        enum: ['software', 'hardware'],
        default: 'software'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const userActivitiesSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const UserSchema = new Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A Password is required for a user profile']
    },
    profile_photo: {
        type: String,
        required: false
    },
    background_image: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    roles: [{
        type: String,
        enum: ['regular-user', 'admin'],
        default: 'regular-user'
    }],
    active: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 0
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 0
    }],
    // projects: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Project'
    // }],
    is_corporate: {
        type: Boolean,
        default: false
    },
    // user_interests: {
    //     type: [Interests]
    // },
    last_login: {
        type: Date,
        default: Date.now
    },
    // user_activities: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserActivities'
    // }],

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}, { timestamps: true });

UserSchema.virtual('projects', {
    ref: "Project",
    localField: '_id',
    foreignField: 'owner'
}
    // const owner = await User.findOne().populate('projects');
    // owner.projects;
)

UserSchema.virtual('interests', {
    ref: 'Interests',
    localField: '_id',
    foreignField: 'user'
}
    // const user = await User.findOne().populate('interests');
    // user.interests;
)

UserSchema.virtual('user_activities', {
    ref: 'User_Activities',
    localField: '_id',
    foreignField: 'user'
}
    // const owner = await User.findOne().populate('user_activities');
    // user.user_activities
)



const User = model("User", UserSchema, "User");
const UserActivities = model("UserActivities", userActivitiesSchema);
const Interests = model("Interests", InterestsSchema, "Interests");

module.exports = { User, UserActivities, Interests }
