-- migrate:up

CREATE OR REPLACE FUNCTION update_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_notes_updated_at
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_notes_updated_at();

-- migrate:down

DROP TRIGGER IF EXISTS set_notes_updated_at ON notes;
DROP FUNCTION IF EXISTS update_notes_updated_at();

