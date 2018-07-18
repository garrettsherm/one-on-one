## Express + create-react-app Starter Template

Template to get developing quickly with react (client-side) and express (server-side).

This project was started using the express generator with ejs as the template engine (See https://expressjs.com/en/starter/generator.html), and create-react-app (https://github.com/facebook/create-react-app).


## Installation for development

Make sure you have the latest stable version of node.js, npm, & yarn installed on your machine. 

Clone this repo into your working directory. 

Open a terminal and cd into newly created directory.

Rename file 'variables.env.sample' to 'variables.env'.

Run 'npm install' to install the dependencies for the express application.

Run 'npm run dev' to start the express server using nodemon (if get an error try running as sudo user). See nodemon.json in application directory for restart rules.

Express application should now be running at localhost:3001 (serving the initial production build of react app in /client/build folder).

Open a new terminal window (while keeping the other one open as well), and cd into '/client' directory. This is where the create-react-app lives. 

Run 'npm install' to install the dependencies for create-react-app.

Run 'npm start' to start create react app. React application should be running on localhost:3000. 

Now when changes are made to the express application nodemon should restart server, and hotloading should be enabled by create-react-app in the /client/ folder. 

NOTE: if you take a look at the package.json in /client/ you'll see that the react app is connected to the express app by proxy in the development build. If you change the port in variables.env, then you will have to change the proxy in package.json as well. 

## Production Build

The express application by default serves the /client/build/folder from the react application. 

Change NODE_ENV in variables.env from development to production.

To build react for production cd into /client/ and run 'npm run build'. This will build a new optimized version in /client/build. 

In root application directory run 'npm start' to start the express application serving the new production build. 

NOTE: This is just a starter template, further changes are needed to make this template production ready. 

## Inspired by

Some of the setup for express was inspired by Wes Bos' Learn Node course (https://learnnode.com/).

The use of create-react-app and express generator inspired by the blog post by Dave Ceddia (https://daveceddia.com/create-react-app-express-backend/).

