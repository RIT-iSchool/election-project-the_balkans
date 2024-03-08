DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('member', 'officer', 'employee');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
