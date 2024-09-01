const EmergencyContact = require('../../models/Emergency');

exports.deleteContact = async (req, res) => {
    const { profileId, contactId } = req.body;

    try {
        const contact = await EmergencyContact.findOne({ profileId });

        if (!contact) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        contact.contacts = contact.contacts.filter(c => c._id.toString() !== contactId);

        await contact.save();

        res.status(200).json({ message: 'Emergency contact deleted successfully', contact });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete emergency contact', error: err.message });
    }
};