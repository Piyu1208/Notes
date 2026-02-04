import {
  createNoteService,
  getAllNotesService,
  getNoteByIdService,
  deleteNoteService,
  updateNoteService,
  getUserNotesService,
  archiveNoteService
} from "../services/noteService.js";


const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};


export const createNote = async (req, res, next) => {
  const { user_id, title, content } = req.body;
  try {
    const note = await createNoteService(user_id, title, content);
    handleResponse(res, 201, "Note created succesfully", note);
  } catch (err) {
    next(err);
  }
};

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await getAllNotesService();
        handleResponse(res, 200, 'Success', notes);
    } catch (err) {
        next(err);
    }
};

export const getNoteById = async (req, res, next) => {
    try {
        const note = await getNoteByIdService(req.params.id);
        if(!note) {
            return handleResponse(res, 404, 'Not found');
        }
        handleResponse(res, 200, 'Success', note);
    } catch (err) {
        next(err);
    }
};

export const deleteNote = async (req, res, next) => {
    try {
        await deleteNoteService(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export const updateNote = async (req, res, next) => {
    const { title, content } = req.body;
    try {
        const note = await updateNoteService(req.params.id, title, content);
        if(!note) {
            return handleResponse(res, 404, 'Not found');
        }
        handleResponse(res, 200, 'Success', note);
    } catch (err) {
        next(err);
    }
};

export const getUserNotes = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const notes = await getUserNotesService(user_id);
        handleResponse(res, 200, 'Success', notes);
    } catch (err) {
        next(err);
    }
};

export const archiveNote = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const note = await archiveNoteService(req.params.id, user_id);
        handleResponse(res, 200, 'Success', note);
    } catch (err) {
        next(err);
    }

}