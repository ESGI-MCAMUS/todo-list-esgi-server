# TODO List - Unit testing project
This project has been created and maintained by [@MisterGoodDeal](https://github.com/MisterGoodDeal), [@ThomasGeoffron](https://github.com/ThomasGeoffron) and [@Haborym](https://github.com/Haborym) for the course `Test unitaire @ ESGI`.

*This project is the backend of the [React App `todo-list-esgi-react`](https://github.com/MisterGoodDeal/todo-list-esgi-react), please also refer to this project.*

## Getting started

Install all dependencies using `npm`.
```bash
npm install # Or `npm i`
```

## Database 

You must start a database locally before starting the project. You can import the database from the `todo_list.sql` file in the root directory.

Then you have to set the `.env` file with the following variables:
```bash
MYSQL_HOST=your_host
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_PORT=3306 # 3306 is the default port, change it if necessary
MYSQL_DB=todo_list
```

## Available commands

Start the project locally using nodemon (*nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected*).
```bash
npm run start:dev
```

Build the project for production (It'll create a folder called `/build` in the root directory).
```bash
npm run build
```

Build and start the project
```bash
npm start
```

## Testing the app

In order to perform unit testing, we're using the [Jest](https://jestjs.io/) testing framework.

Every test can be found in the `src/tests` directory.

We are testing 4 main components:
- The user model
- The todo model
- The email service (It's not a real service, it's just a mock)
- The helpers functions

**⚠️ You don't need to start the database in order to run tests. If you don't start it, you might have error logs, but it's fine, don't worry about it. 🙃**

Here's the command to run the tests:
```bash
npm run test # Run the tests with all logs and warning

npm run slient-test # Run the tests without logs and warning
```

## Routes

**✅ This project is partially protected with an authentication token (JWT) for critical routes. Those routes are marked with a 🔐** 

### User
- Login the user:

  `POST: /user/login`
  ```JSON
  {
      "email": string,
      "password": string
  }
  ```
- Register the user:

    `POST: /user/register`
    ```JSON
    {
        "firstname": string,
        "lastname": string,
        "email": string,
        "password": string,
        "birthdate": Date
    }
    ```

### List
- Get all todos from a user:

  ```bash
  🔐 GET /list/:id # (id is the user id)
  ```
- Create a todo:

  ```bash
  🔐 POST /list/:id # (id is the user id)
  ```
  ```JSON
  {
      "nom": string,
      "content": string,
  }
  ```
  - Delete a todo:

  ```bash
  🔐 DELETE /list/:id # (id is the user id)
  ```
  ```JSON
  {
      "id": number, # Id of the todo to delete
  }
