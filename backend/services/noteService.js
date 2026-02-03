import db from "../db/postgres-config.js";

export const createNoteService = async (user_id, title, content) => {
  const result = await db.query(
    `INSERT INTO notes (id, user_id, title)
       VALUES (gen_random_uuid(), $1, $2, $3)`,
    [user_id, title, content],
  );

  return result.rows[0];
};

export const getAllNotesService = async () => {
  const result = await db.query(`SELECT * FROM notes`);
  return result.rows;
};

export const getNoteService = async (id) => {
  const result = await db.query(`SELECT * FROM notes WHERE id = $1`, [id]);
  return result.rows[0];
};

export const deleteNoteService = async (id) => {
  await db.query(`DELETE FROM notes WHERE id = $1`, [id]);
};

export const updateNoteService = async (id, title, content) => {
  const result = await db.query(
    `UPDATE notes
        SET title = COALESCE($1, title),
        content = COALESCE($2, content)
        WHERE id = $3
        RETURNING *`,
    [title, content, id],
  );

  return result.rows[0];
};

export const getUserNotesService = async (user_id) => {
    const result = await db.query(`SELECT * FROM notes WHERE user_id = $1`, [user_id]);
    return result.rows;
};