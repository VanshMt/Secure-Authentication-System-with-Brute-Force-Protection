<!-- # 🔐 Secure Authentication System

A secure authentication system built using Node.js, Express, and MongoDB with advanced cybersecurity features.

---

## 🚀 Features

- User Registration & Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Brute Force Protection (Rate Limiting)
- Login Attempt Logging

---

## 🛡️ Security Features

- Prevents brute-force attacks
- Secure password storage using bcrypt
- Token-based authentication using JWT
- Environment variable protection (.env)

---

## 🧪 API Endpoints

### 🧾 Register
POST /auth/register

### 🔐 Login
POST /auth/login

### 🔒 Protected Route
GET /auth/dashboard

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- express-rate-limit

---

## 📌 How to Run

```bash
npm install
node index.js

## 📌 How to Run

```bash
npm install
node index.js
```

---

## 📷 Demo Screenshots

### 🧾 User Registration

![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)

![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection

![Rate Limit](./screenshots/Rate-Limiter.png) -->

<!-- # 🔐 Secure Authentication System with Brute Force Protection

A production-ready authentication system built using Node.js, Express, and MongoDB with advanced security features like JWT authentication, account lockout, rate limiting, and email alerts for suspicious activity.

---

## 🚀 Key Highlights

* 🔐 JWT-based authentication system
* 🛡️ Brute-force attack protection (account lockout)
* ⏱️ Rate limiting to prevent abuse
* 🔒 Secure password hashing using bcrypt
* 📧 Email alerts on suspicious login attempts
* 🧠 Login attempt tracking & logging

---

## 💡 Why This Project?

This project demonstrates real-world cybersecurity practices used in modern backend systems to protect user accounts from unauthorized access and attacks.

---

## ⚙️ How It Works

1. User registers → password is hashed using bcrypt
2. User logs in → credentials verified
3. JWT token is generated for authentication
4. Failed login attempts are tracked
5. After 5 failed attempts → account is locked
6. Email alert is sent to user
7. Protected routes require valid JWT token

---

## 🛡️ Security Features

* 🔒 Password hashing (bcrypt)
* 🚫 Brute-force protection (account lock system)
* ⏳ Rate limiting (prevents spam attacks)
* 🔑 JWT authentication
* 📧 Email alerts for suspicious activity
* 🔐 Environment variable protection (.env)

---

## 🧪 API Endpoints

### 📄 Register

POST /auth/register

### 🔐 Login

POST /auth/login

### 🔒 Protected Route

GET /auth/dashboard

---

## 📷 Demo Screenshots

### 🧾 User Registration

![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)

![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection

![Rate Limit](./screenshots/Rate-Limiter.png)

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT
* bcrypt
* express-rate-limit
* Nodemailer

---

## 📁 Project Structure

secure-auth-system/
│── models/
│── routes/
│── middleware/
│── utils/
│── screenshots/
│── .env
│── index.js

---

## 📌 How to Run

```bash
npm install
node index.js
```

---

## 💼 Resume Highlight

Built a secure authentication system using Node.js, Express, and MongoDB implementing JWT-based authentication, password hashing, brute-force protection with account lockout, rate limiting, and real-time email alerts for suspicious login attempts.

--- -->

<!-- # 🔐 Secure Authentication System with Risk-Based Security & Geo Tracking

A production-ready authentication system built using Node.js, Express, and MongoDB with advanced security features like JWT authentication, brute-force protection, geo-location tracking, and intelligent risk-based login detection.

---

## 🚀 Key Highlights

* 🔐 JWT-based authentication (Access + Refresh Tokens)
* 🛡️ Brute-force protection (account lockout)
* ⏱️ Rate limiting to prevent abuse
* 🔒 Secure password hashing using bcrypt
* 📧 Email alerts for suspicious login attempts
* 🌍 Geo-location tracking (IP → Country & Region)
* 📱 Multi-device session management
* 🧠 Risk-based login detection
* ✈️ Impossible travel detection (🔥 advanced feature)

---

## 💡 Why This Project?

This project demonstrates **real-world cybersecurity practices** used in modern backend systems, including behavior-based authentication similar to systems used by Google and other large platforms.

---

## 🧠 How It Works

1. User registers → password is securely hashed
2. User logs in → credentials verified
3. System captures:
   - IP address
   - Device (user-agent)
   - Geo-location
4. Risk score is calculated based on:
   - New device
   - New IP
   - Country change
   - Impossible travel
5. If risk is high:
   - Email alert is triggered
6. Session is stored with location & device details
7. JWT token is issued for authentication

---

## 🛡️ Security Features

* 🔒 Password hashing (bcrypt)
* 🚫 Brute-force protection (account lock system)
* ⏳ Rate limiting (prevents spam attacks)
* 🔑 JWT authentication (Access + Refresh tokens)
* 📧 Email alerts for suspicious activity
* 🌍 Geo-location tracking per session
* 📱 Device & IP tracking
* 🚨 Risk-based anomaly detection
* ✈️ Impossible travel detection
* 🔐 Environment variable protection (.env)

---

## 🧪 API Endpoints

### 📄 Register

POST /auth/register

### 🔐 Login

POST /auth/login


### 🔄 Refresh Token
POST /auth/refresh


### 🚪 Logout
POST /auth/logout


### 📱 Get Sessions
GET /auth/sessions


### ❌ Logout Specific Device
POST /auth/logout-device


---

## 📷 Demo Screenshots

### 🧾 User Registration
![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)
![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection
![Rate Limit](./screenshots/Rate-Limiter.png)

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcrypt
* express-rate-limit
* Nodemailer
* IPinfo API

---

## 📁 Project Structure
secure-auth-system/
│
├── models/
├── routes/
├── middleware/
├── utils/
├── screenshots/
├── .env
├── index.js
├── package.json

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-url>
cd secure-auth-system
npm install

Create .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IPINFO_TOKEN=your_token
EMAIL_USER=your_email
EMAIL_PASS=your_password

▶️ Run the Project
node index.js


---

# 🛠️ WHAT CHANGED 

### 🔥 Added:
- Geo-location tracking 🌍  
- Risk scoring 🧠  
- Impossible travel ✈️  
- Session management 📱  

### 🔥 Improved:
- Structure  
- Readability  
- Professional tone  
- Recruiter appeal  

---

# 🚀 NEXT STEP 

In terminal:

```bash
git add README.md
git commit -m "Upgraded README with advanced security features"
git push -->
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Security](https://img.shields.io/badge/Security-Advanced-red)

# 🔐 Secure Authentication System  
### 🚀 Risk-Based Security • Geo Tracking • Session Management

A production-grade backend authentication system with **advanced cybersecurity features** like geo-location tracking, risk-based login detection, and impossible travel analysis.

---
---

## 🚀 Features

### 🔐 Authentication
- JWT-based login system
- Access + Refresh Tokens
- Protected routes

### 🛡️ Security
- Brute-force protection
- Account lockout
- Rate limiting

### 🌍 Geo Intelligence
- IP → Location tracking
- Country-based detection

### 📱 Sessions
- Multi-device tracking
- Max 3 sessions
- Device + IP storage

### 🚨 Advanced Detection
- Risk scoring system
- Suspicious login alerts
- Impossible travel detection ✈️

---

#### 🧠 Risk-Based Authentication
- Risk score calculated on login based on:
  - New device
  - New IP
  - Country change

#### ✈️ Impossible Travel Detection
- Detects logins from different countries in unrealistic time
- Example:
  - India → USA in 5 minutes = 🚨 flagged

#### 📧 Smart Alerts
- New device alert
- Suspicious login alert
- High-risk login alert

---

## 🧠 System Flow

```text
User Login
   ↓
Capture:
- IP
- Device
- Location
   ↓
Compare with previous sessions
   ↓
Calculate Risk Score
   ↓
If high risk:
   → Send alert / trigger verification
   ↓
Create session
   ↓
Return JWT tokens
```
---

```md
## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint       |   Description        |
|--------|----------------|----------------------|
| POST   | /auth/register | Register user        |
| POST   | /auth/login    | Login user           |
| POST   | /auth/refresh  | Refresh token        |
| POST   | /auth/logout   | Logout user          |

---

#### 🛡️ Security

| Method | Endpoint            | Description                 |
|--------|--------------------|-----------------------------|
| GET    | /auth/sessions     | Get active sessions         |
| POST   | /auth/logout-device| Logout from specific device |

---

#### 🧪 Test Cases

| Scenario            | Expected Result     |
|---------------------|--------------------|
| Same device + IP    | Low risk           |
| New device          | Medium risk        |
| New country         | High risk          |
| Impossible travel   | 🚨 Alert triggered |

---

### 🔹Test Cases
Scenario	Expected Result
Same device + IP	Low risk
New device	Medium risk
New country	High risk
Impossible travel	🚨 Alert triggered

---

## 🚨 Advanced Security Highlights

- 🧠 Risk-Based Authentication (like Google)
- 🌍 Geo-location tracking per login
- ✈️ Impossible travel detection
- 📧 Smart alert system
- 📱 Device & session tracking

---

## 📷 Demo Screenshots

### 🧾 User Registration
![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)
![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection
![Rate Limit](./screenshots/Rate-Limiter.png)

---

## ⚙️ Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
JWT (jsonwebtoken)
bcrypt
express-rate-limit
Nodemailer
IPinfo API
crypto (for hashing tokens)

---

#### 📁 Project Structure
secure-auth-system/
│
├── models/
│   ├── User.js
│   └── BlacklistToken.js
│
├── routes/
│   └── auth.js
│
├── middleware/
│   └── authMiddleware.js
│
├── utils/
│   ├── geoService.js
│   ├── sendEmail.js
│   └── tokenUtils.js
│
├── screenshots/
├── index.js
├── package.json
├── .gitignore

----

### ⚙️ Setup Instructions
## 1️⃣ Clone Repository
git clone https://github.com/Vansh1320/Secure-Authentication-System-with-Brute-Force-Protection
cd secure-auth-system

## 2️⃣ Install Dependencies
npm install

## 3️⃣ Create .env File
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IPINFO_TOKEN=your_token
EMAIL_USER=your_email
EMAIL_PASS=your_password

## 4️⃣ Run Server
node index.js

----
 
#### 🔐 Security Notes
Passwords are hashed using bcrypt
Tokens are securely generated and stored
Sensitive data is protected using environment variables
System defends against brute-force and replay attacks

---

#### ⚠️ Limitations
Geo-location accuracy depends on IP
Localhost testing may show "Unknown" location
Requires email setup for alerts

---

#### 🚀 Future Improvements
OTP verification for high-risk login
Frontend dashboard (React)
Global logout (all devices)
AI-based anomaly detection
Device fingerprinting

----

#### 🏆 Resume Highlight

Built a production-grade authentication system with Node.js, Express, and MongoDB implementing JWT authentication, brute-force protection, geo-location tracking, multi-device session management, and advanced risk-based login detection including impossible travel analysis.

---

## 👨‍💻 Author
 
Built by **Vansh** 🚀
---

# 🏆 THIS README DOES:

- ✅ Explains system clearly  
- ✅ Shows advanced features  
- ✅ Looks professional  
- ✅ Impresses recruiters  
- ✅ Easy to understand  

---

# 🚀 NOW DO THIS

```bash
git add README.md
git commit -m "Added full professional README"
git push
