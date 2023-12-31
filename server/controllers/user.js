const User=require('../models/user')

exports.getAllUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const rowPerPage = parseInt(req.query.rowPerPage) || 10; 
        const skip = (page - 1) * rowPerPage;
    
        const total_user = await User.countDocuments({ userId: userId });
    
        const users = await User.find()
            .skip(skip)
            .limit(rowPerPage)
            .exec();
    
        return res.status(200).json({ users, lastPage: Math.ceil(total_user / rowPerPage) });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });

    }
}

exports.getUserDetail = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ error: 'User not found' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });

    }
}

exports.addNewUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await User.create(userData);
        res.status(200).json({ success: true, message: 'Added new user successfully!' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });

    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });

    }
}
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });

    }
}