const EmergencyContact = require('../../models/Emergency');

exports.createContacts = async (req, res) => {
    try {
        const { userId, contacts } = req.body;
        let emergencyContact = await EmergencyContact.findOne({ userId });
        if (contacts.length > 7) {
            return res.status(400).json({ message: 'You can add up to 7 emergency contacts only.' });
        }
        if (emergencyContact) {
            emergencyContact.contacts = contacts;
            await emergencyContact.save();
        } else {
            emergencyContact = new EmergencyContact({ userId, contacts });
            await emergencyContact.save();
        }

        res.status(200).json({ message: 'Emergency contacts saved successfully', data: emergencyContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};