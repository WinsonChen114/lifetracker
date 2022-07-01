--Asks user if they want to delete and recreate db
\echo "Delete and recreate lifetracker db?"
\prompt "Enter for yes, Control+C to cancel > " answer

--If user does not cancel script, drop, recreate, and connect
DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

--Execute schema script
\i lifetracker-schema.sql

-- --Asks user if they want to delete and recreate db
-- \echo "Delete and recreate lifetracker-test db?"
-- \prompt "Enter for yes, Control+C to cancel > " answer

-- --If user does not cancel script, drop, recreate, and connect
-- DROP DATABASE lifetracker-test;
-- CREATE DATABASE lifetracker-test;
-- \connect lifetracker-test;

-- --Execute schema script
-- \i lifetracker-schema.sql
