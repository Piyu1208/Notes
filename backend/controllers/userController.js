const { getUsersService, 
    getUserByIdService,
deleteUserService } = require('../services/userService.js');

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
}


const getUsers = async (req, res, next) => {
    try{
        const users = await getUsersService();
        handleResponse(res, 200, 'success', users);
    }catch(err){
        next(err);
    }
}


const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, 'User not found');
        handleResponse(res, 200, 'success', user);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await deleteUserService(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}






module.exports = { getUsers,
    getUserById,
    deleteUser
 };