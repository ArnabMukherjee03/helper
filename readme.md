
# Helper - Atm Cash Avalability Tracker

The primary objective of the ATM Cash Availability Tracker is to provide a user-friendly, real-time platform for individuals to locate nearby ATMs with available cash, reducing the frustration of futile trips to cashless machines, particularly in unfamiliar places or during nighttime hours. The project empowers users to actively engage in maintaining accurate ATM data, creating a reliable and community-driven resource that enhances overall banking convenience.

## Images

![App Screenshot](/Demo/home%20page.png)
![App Screenshot](/Demo/list.png)
![App Screenshot](/Demo/Atm.png)
![App Screenshot](/Demo/login.png)


## 🎯 Features

- User authentication and registration
- Atm browsing and searching
- Users can also view comments and feedback left by others about specific ATMs. 
- Users can view the history of cash status reports submitted after logging into their accounts.
- In this section, users can report the cash availability status of ATMs, contributing to the real-time database 
- Users can leave comments and feedback about their experiences with specific ATMs. 
- Users can also view comments left by others to help them make informed decisions about which ATM to visit.

## 🎯 Installation

- Clone the repository:

   ```bash
   git clone https://github.com/ArnabMukherjee03/helper

   ```
-  Install server dependencies:
   ```bash
   cd helper
   ```
   ```bash
   cd server
   npm install
   ```
- Create a .env file in the project directory with the following environment variables:
   ```bash
   PORT = 5000
   MONGO_URI = your-mongodb-connection-uri
   TOKEN_SECRET = your-jwt-secret
   SESSION_KEY = your-session-key
   NODEMAILER_PASS = your mail Password
   NODEMAILER_MAIL = your mail
   ```
- Navigate to the client directory:
   ```bash
   cd ..
   cd client
   ```
-   Install client dependencies:
   ```bash
   npm install
   ```

## 🚀 Usage

- Visit http://localhost:3000 in your browser to access the client application.
- Visit http://localhost:5000 in your browser to access the server API.


## 💻 Tech Stack

**Client:** 
- **React**: React.js is a JavaScript library used for building responsive and interactive user interfaces.

- **Redux**: Integrates Redux state management seamlessly with React, enhancing global state predictability

- **Tailwind Css**: A utility-first CSS framework for rapidly building modern, responsive web designs.


**Server:** 
- **Node.js**: Server-side JavaScript runtime for scalable and high-performance network applications.
- **Express.js**: A minimal and flexible Node.js web application framework for building robust server-side applications.
- **MongoDB**: Database for storing product and user data.


## 🍿 Demo

- helper-six-kappa.vercel.app

