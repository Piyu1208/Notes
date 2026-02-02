const { getUsersService } = require('../services/userService.js');

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




module.exports = { getUsers };