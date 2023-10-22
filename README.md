# Kanban Task Manager RESTful API

The Kanban Task Manager API is a RESTful API built using **EXPRESS.JS**, **Node.js**, and **PostgreSQL**. It provides functionalities for managing boards, columns, tasks, and subtasks in a Kanban-style task management system.

## Features

- Authentication and Security

## API Endpoints

### Authentication

- **User Login**
  - Method: `POST`
  - Endpoint: `/login`
  - Access: Private
  - Description: Allows a user to log in.

- **User Registration**
  - Method: `POST`
  - Endpoint: `/register`
  - Access: Private
  - Description: Allows a user to register an account.




### Boards

- **Get All Boards**
  - Method: `GET`
  - Endpoint: `/boards`
  - Access: Private
  - Description: Retrieves all boards belonging to the user and user information.

- **Get One Board**
  - Method: `GET`
  - Endpoint: `/boards/:boardId`
  - Access: Private
  - Description: Retrieves details of a specific board by its `boardId`.

- **Create a Board**
  - Method: `POST`
  - Endpoint: `/boards`
  - Access: Private
  - Description: Creates a new board for the user.

- **Delete One Board**
  - Method: `DELETE`
  - Endpoint: `/boards/:boardId`
  - Access: Private
  - Description: Deletes a specific board.
  
  - **Update One Board**
  - Method: `UPDATE`
  - Endpoint: `/boards/:boardId`
  - Access: Private
  - Description: Update a specific board.

### Columns

  - **Create The Columns of Board**
  - Method: `POST`
  - Endpoint: `/boards/:boardId/columns`
  - Access: Private
  - Description: Add different Columns to a Boards.

- **Get One Column**
  - Method: `GET`
  - Endpoint: `/columns/:columnId`
  - Access: Private
  - Description: Retrieves details of a specific column by its `columnId`.
  
  - **Update One Column**
  - Method: `PUT`
  - Endpoint: `/columns/:columnId`
  - Access: Private
  - Description: Update details of a specific column by its `columnId`. 
  
   - **Delete One Column**
  - Method: `DELETE`
  - Endpoint: `/columns/:columnId`
  - Access: Private
  - Description: Delete a specific column by its `columnId`.
  






  ### Tasks

- **Create One Task**
  - Method: `POST`
  - Endpoint: `/columns/:columnId/tasks`
  - Access: Private
  - Description: Creates a new task within a column.
  
- **Update One Task**
  - Method: `PUT`
  - Endpoint: `/tasks/:taskId`
  - Access: Private
  - Description: Updates a specific task within a column.
  
  - **Get One Task**
  - Method: `GET`
  - Endpoint: `/tasks/:taskId`
  - Access: Private
  - Description: Get a specific task within a column.

- **Delete One Task**
  - Method: `DELETE`
  - Endpoint: `/tasks/:taskId`
  - Access: Private
  - Description: Deletes a specific task within a column.
 
  - **Move One Task to another column**
      - Method: `PUT`
      - Endpoint: `/tasks/:taskId/column/:NewcolumnId`
      - Access: Private
      - Description: Deletes a specific task within a column.


### Subtasks


- **Toggle One subtask**
  - Method: `PUT`
  - Endpoint: `/subtask/:subtaskId`
  - Access: Private
  - Description: Updates a specific subtask.

## Hosted Domain Link

[Link to Hosted Kanban Task Manager API]([https://kanbantaskapi.onrender.com](https://kanbanexpress.onrender.com))



## Contributing

You are welcome to contribute to the project by forking the repository and sending pull requests. If you have any questions or suggestions, feel free to reach out on [Twitter](https://twitter.com/YourTwitterHandle).

## Security Vulnerabilities

If you discover any security vulnerabilities within the project, please create an issue to report it. Your assistance in identifying and addressing security issues is greatly appreciated.
