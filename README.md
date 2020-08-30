**twilio-employee-directory** is an application to practice SMS/Web comunication.


This application used code from
https://www.twilio.com/docs/sms/tutorials/employee-directory-node-express?code-sample=code-employee-directory-route-6&code-language=Node.js&code-sdk-version=default


## How to run ##
In order to run, you need:
- set a MongoDB database and write the authentication string in a .env file
- set a Twilio account
- clone this repo for your machine
- `'npm i'` will install all the packages' dependencies

## Dependencies: ##
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