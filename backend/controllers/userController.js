const { getUsersService, 
    getUserByIdService,
deleteUserService,
updateRoleService } = require('../services/userService.js');

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


const updateUserRole = async (req, res, next) => {
    const id = req.params.id;
    const { role } = req.body;

    const allowedRoles = ['admin', 'user'];

    if (!allowedRoles.includes(role)) {
        return handleResponse(res, 400, 'Invalid Role');
    }

    try {
        const user = await updateRoleService(role, id);
        if (user === undefined) {
            return handleResponse(res, 404, 'User does not exist');
        }
        handleResponse(res, 200, 'Update successful', user);
    } catch (err) {
        next(err);
    }
}






module.exports = { getUsers,
    getUserById,
    deleteUser,
    updateUserRole
 };