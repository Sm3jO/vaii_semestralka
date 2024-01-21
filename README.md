# vaii_semestralka
Semestralna praca na VAII

Install Dependencies

Navigate to the root directory of the project and run pnpm install to install all required dependencies for the frontend.
Move to the backend directory (cd backend) and run pnpm install to install the backend dependencies.
Database Setup

1. Download PostgreSQL: https://www.postgresql.org/
2. Run the downloaded installer.
3. Open the PostgreSQL Command Line.
4. Log in to PostgreSQL:
    When prompted, enter the following details:
     Server: localhost
    Database: postgres
    Port: 5432
    Username: postgres
    Password: Enter the password you set during installation
5. Run the following command to create a new database:
   ' CREATE DATABASE your_db_name; '
6. Navigate to the Folder Containing the SQL File.
7. Run the following command in PowerShell to import the SQL file into your database:
 psql -U postgres -d newdbname -f 'C:\path\to\folder\VAII2.sql'
Replace newdbname with the database name and C:\path\to\folder\VAII2.sql with the full path to your SQL file.
Enter the PostgreSQL password when prompted.


Then you can write pnpm run dev in frontend and backend and project should work properly.
