const Profile = require('../../models/Profile');
const path = require('path');

// Update profile and handle image uploads
const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { bio, interests, faceID, wallet } = req.body;
    
    // Handle profile picture and images
    const profilePicture = req.files.profilePicture ? req.files.profilePicture[0].path : null;
    const images = req.files.images ? req.files.images.map(file => file.path) : [];

    try {
        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update profile fields if provided
        if (profilePicture) profile.profilePicture = profilePicture;
        if (bio) {
            const isBioValid = wordLimit(bio);
            if (!isBioValid) {
                return res.status(400).json({ message: 'Bio exceeds the 300-word limit' });
            }
            profile.bio = bio;
        }
        if (interests) profile.interests = interests;
        if (faceID) profile.faceID = faceID;
        if (images.length > 0) {
            if (profile.images.length + images.length > 5) {
                return res.status(400).json({ message: 'Cannot upload more than 5 images' });
            }
            profile.images = [...profile.images, ...images];
        }
        if (wallet) profile.wallet = wallet;

        await profile.save();

        return res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// Helper function to check the word limit of the bio
function wordLimit(val) {
    return val.split(' ').filter(word => word.length > 0).length <= 300;
}

module.exports = {
    updateProfile
};