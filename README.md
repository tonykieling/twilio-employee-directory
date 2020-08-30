**twilio-employee-directory** is an application to practice SMS/Web comunication.


This application used code from
https://www.twilio.com/docs/sms/tutorials/employee-directory-node-express?code-sample=code-employee-directory-route-6&code-language=Node.js&code-sdk-version=default


## Functionality ##
When running, it is possible to send an SMS with a text (which is a person's name) and receive infoi about that person.  
If there is no person with that name, the system is gonna return a message saying so.  
If there are more than one person with the name, the system is gonna send a message with options. The user sen a new message with the number of the option desired and it is gonna to return the specific info.

## How does the system work? ##
1- User (SMS telephone) (send a message with a name);  
2- Twilio receives the SMS, parses it and transforms it in a http request to web server;  
3- The Web Server (the code in this github) receives the message and asks a database;  
4- The DataBase performs the query and returns to the Web Server;  
5- The Web Server answer to Twilio its question;  
6- Twilio receives the answer and transforms it to a SMS format and send to the user's telephone;  
7- The User receives their answer;  
* *It is possible to the answer (step 7) offers options to the user. In this case the Twilio received a cookie (step 6) and when the user sends the option (step 8), Twilio is gonna start a new set 2 with a cookie attached. It will allow the server queries the Database with a specific information.*
* *It is possible to a local server talk to Twilio through a system called [Ngrok](https://ngrok.com).*

## How to run ##
In order to run, you need:
- set a MongoDB database and write the authentication string in a .env file
- set a Twilio account
- clone this repo for your machine
- `'npm i'` will install all the packages' dependencies

## Dependencies ##
- Express
- Mongoose
- Twilio
- body-parser
- cookie-parser
- dotenv
- underscore
- morgan (for dev purposes, because it logs endpoits info)
- nodemon (same as above, restarting the server every time the code is changed)
- shelljs (it cleans up the OS port - used only in others/clean-port.js, * in my machine)