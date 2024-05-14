Project Title: Next.js with AWS Cognito Authentication
Introduction:   This project is a web application built with Next.js that uses AWS Cognito for authentication. It includes functionality for user login, and for new users, it prompts to set a new password upon first login. The application utilizes Material-UI (MUI) for UI components and styling.

Features:-
    * User login with AWS Cognito
    * New user password setup
    * Built with Next.js for server-side rendering and static site generation 

Prerequisites:- 
Before you begin, ensure you have met the following requirements:
  * Node.js (version 18.17.1)
  * npm (usually comes with Node.js) or yarn 
  * AWS account with Cognito setup

Installation:-
* git clone https://github.com/webbninja2/next-js-cognito-login  
* npm install 

Open the layout.js or a .env file to add your AWS Cognito details. Replace the dummy values with your actual AWS Cognito configuration:
// next.config.js
module.exports = {
  env: {
    AWS_COGNITO_REGION: "ap-south",
    AWS_COGNITO_USER_POOL_ID: "ap-south-2_CT28TQAIx",
    AWS_COGNITO_APP_CLIENT_ID: "4cb3javplb1tu0agphmuumahkh",
  },
};

