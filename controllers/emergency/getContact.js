const EmergencyContact = require('../../models/Emergency');

exports.getContacts = async (req, res) => {
    try {
        const { userId } = req.params;
        const emergencyContact = await EmergencyContact.findOne({ userId });
        if (!emergencyContact) return res.status(404).json({ message: 'No emergency contacts found for this user' });
        res.status(200).json({ data: emergencyContact.contacts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};