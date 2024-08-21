const Message = require('./Message');

exports.sendMessage = async (req, res) => {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    try {
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};