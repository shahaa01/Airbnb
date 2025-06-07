# 🏡 StayNest – Full Stack Project (MEN Stack + HTML/CSS/JS)

Welcome to my journey of full-stack development project where I build a **fully functional StayNest!  
StayNest is a fully functional web application built from the ground up using the MEN Stack (MongoDB, Express.js, Node.js) alongside HTML, CSS, and vanilla JavaScript for the frontend. This project showcases a complete end-to-end implementation of a vacation rental service, featuring core functionalities such as user authentication, listing creation, booking management, and more
This project leverages the **MEN Stack** (MongoDB, Express.js, Node.js) along with **HTML, CSS, and JavaScript** for the frontend (without React).

---

## 🚀 Tech Stacks

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local and Atlas cloud)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Templating Engine:** EJS
- **Hosting/Deployment:** Render, GitHub
- **Cloud Storage:** Cloudinary
- **Geolocation Services:** Mapbox

---

## 📚 Key Concepts and Features Implemented

### 🔧 Project Setup & Basic CRUD
- Initial project setup and boilerplate
- Listing models and database initialization
- Creating full CRUD routes (Create, Read, Update, Delete) for Listings
- Handling Database operations with Mongoose
- Client-side and server-side form validation

### 🎨 Frontend Styling
- Responsive design using custom CSS
- Dynamic Navbar and Footer across pages
- Styled pages: Home, Listings Index, New Listing, Edit Listing, Show Listing

### 🔥 Authentication & Authorization
- User signup, login, logout flows using Passport.js (Local Strategy)
- Password hashing and salting
- User sessions and persistent login with `express-session`
- Flash messages for feedback (success/failure)
- Route protection: Authorization for Listings and Reviews (only owners can edit/delete)

### 🛡️ Error Handling
- Custom error classes
- Default error pages and user-friendly error messages
- Handling async errors with `wrapAsync` utility

### 🛠️ Middlewares
- Built multiple custom middlewares
- API token handling through query strings
- Chaining and combining multiple middlewares
- Error-handling middleware (Express standards)

### 🗺️ Maps Integration (Location & Geocoding)
- Integrated Mapbox for location-based features
- Created interactive maps with markers and popups
- Geocoding service to translate addresses into coordinates
- Store and manage geographic data in MongoDB

### 📷 Image Uploads
- Allow users to upload listing images
- Used Cloudinary for image storage
- Image preview feature before submission
- Ability to update and delete images associated with listings

### 🔄 MVC Structure
- Refactored into MVC architecture:
  - Models (MongoDB schemas)
  - Views (EJS templates)
  - Controllers (Express route handlers)

### 🍪 Cookies and Session Management
- Managed session data with `express-session`
- Used `cookie-parser` for parsing and signing cookies
- Handled flash messaging through session-based flash storage

### 🧩 Database Relationships
- One-to-many relationships between Users ➡ Listings
- One-to-many relationships between Listings ➡ Reviews
- Populate nested documents using Mongoose’s `populate` method

### ☁️ Deployment
- MongoDB Atlas for cloud database
- Deployed the full stack application on Render
- Continuous deployment connected via GitHub

---

## 🎯 Major Functionalities

| Feature                | Status |
|-------------------------|--------|
| User Authentication     | ✅ |
| User Authorization (Listings/Reviews) | ✅ |
| CRUD operations for Listings and Reviews | ✅ |
| Image Upload and Management | ✅ |
| Map Integration and Geocoding | ✅ |
| Responsive Frontend Design | ✅ |
| Robust Error Handling | ✅ |
| Cloud Deployment | ✅ |

---

## 📌 Future Enhancements (Planned)
- Add payment gateway (Stripe/PayPal) integration
- Implement messaging/chat feature between users
- Add real-time notifications
- Improve SEO and page loading optimization
- PWA (Progressive Web App) version for mobile responsiveness

---

## 👨‍💻 Skills Practiced and Strengthened
- Full-stack project architecture and organization
- RESTful API design
- Secure user authentication and session management
- Working with third-party APIs (Cloudinary, Mapbox)
- Database modeling, indexing, and relationships
- Handling file uploads securely
- MVC coding principles
- Real-world deployment workflow (GitHub → Render)

---

## 📎 Useful Commands & Tools Used

```bash
# Initialize Node project
npm init

# Install dependencies
npm install express mongoose ejs passport passport-local express-session connect-flash method-override dotenv multer cloudinary mapbox-gl cookie-parser

# For development
nodemon app.js

# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

---

## 🚀 Live Demo

🌐 [Deployed Project on Render](#) (coming soon)

---

> Built with ❤️ while learning to master backend and full-stack web development!

