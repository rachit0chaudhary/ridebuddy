const EmergencyContact = require('../../models/Emergency');

exports.getContacts = async (req, res) => {
    const { profileId } = req.params;

    try {
        const contact = await EmergencyContact.findOne({ profileId });

        if (!contact) {
            return res.status(404).json({ message: 'No emergency contacts found for this profile' });
        }

        res.status(200).json(contact.contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve emergency contacts', error: err.message });
    }
};