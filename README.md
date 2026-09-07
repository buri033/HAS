# HAS - User and Product Management System

## Description
This project is a web-based application for managing users and products. It is built using **Spring Boot** for the backend and **JavaScript** for the frontend. The application provides functionalities such as user management, product management, and transaction handling.

## Features
- User management: Create, update, delete, and list users.
- Product management: Manage product inventory and details.
- Responsive design using Bootstrap and custom CSS.
- Integration with a database using JPA for data persistence.

## Technologies Used
- **Backend**: Java, Spring Boot, JPA, Maven
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Database**: MySQL (or any JPA-compatible database)
- **Libraries**: SweetAlert2, DataTables

## Prerequisites
- Java 17 or higher
- Maven
- MySQL database
- Node.js (optional, for managing frontend dependencies)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/buri033/HAS.git
   cd HAS
    ```
## Configure the database:  
- Update the application.properties file in src/main/resources with your database credentials.
## Build and run the application:  
mvn clean install
mvn spring-boot:run
## Access the application:  
Open your browser and navigate to http://localhost:8080.
## Folder Structure
- src/main/java: Contains the backend code (controllers, services, repositories, models).
- src/main/resources: Contains configuration files, static assets, and templates.
- src/main/resources/static: Contains frontend assets (HTML, CSS, JS).
### License
This project is licensed under the MIT License. See the LICENSE file for details