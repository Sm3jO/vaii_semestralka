# vaii_semestralka
Semestralna praca na VAII

Checkpoint 2

Install Dependencies

Navigate to the root directory of the project and run pnpm install to install all required dependencies for the frontend.
Move to the backend directory (cd backend) and run pnpm install to install the backend dependencies.
Database Setup

Download and install pgAdmin from https://www.pgadmin.org/download/.
Open pgAdmin and set up a new PostgreSQL server if you haven't already.
Create a new database matching the name expected by the project.
Right-click on the new database, select 'Restore', and navigate to the database.backup file located in the database directory of this project. Follow the instructions to import the database.

Then you can write pnpm run dev in frontend and backend and project should work properly.