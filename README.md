# Election Application for Professional Societies

This project is a fully realized multi-tenant, multi-user, database application that provides election services to professional societies. It was designed to simulate a real-life application, and it successfully allows for officer elections and ballot initiatives.

## Project Overview

We've developed a comprehensive solution for professional societies like ACM and IEEE to host their elections. The application supports the employees of a fictitious software company, American Dream, who create ballots and run reports, as well as the professional society members who log in to cast their votes.

## Key Features

### User Roles

Our application supports four different user roles:

1. Professional society members
2. Professional society officers
3. American Dream employees
4. American Dream administrators

Each role has specific permissions and capabilities within the application.

### Ballot Management

American Dream employees can create customizable ballots for each election, catering to the unique needs of each professional society.

### Member and Officer Access

Members and officers of professional societies have tailored access to active and completed elections, with officers having additional visibility into election results.

### Administrative Control

American Dream administrators have comprehensive control over all societies, including ballot editing access, user account management, and advanced reporting capabilities.

## Technical Implementation

The application is built with a properly architected database and a server application with a minimum of 3 layers. It's hosted in RLES and runs with distribution code, ensuring optimal performance and security.
