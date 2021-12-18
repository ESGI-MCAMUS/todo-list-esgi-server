# TODO List - Unit testing project


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
