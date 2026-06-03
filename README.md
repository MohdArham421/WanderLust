# 🌍 WanderLust
WanderLust is a full-stack accommodation listing platform that enables users to discover, create, edit, and manage travel accommodations. The application provides a seamless experience for travelers and hosts through secure authentication, cloud-based image storage, and responsive design.


✨ Features

🏡 Accommodation Listings

* Create new accommodation listings
* View detailed property information
* Edit and update listings
* Delete listings
* Browse available accommodations

👤 User Authentication

* User Registration
* Secure Login & Logout
* Session-based Authentication
* Authorization for protected actions

📸 Image Management

* Upload property images
* Cloudinary integration for cloud storage
* Optimized image delivery

⭐ Reviews & Ratings

* Add reviews to listings
* Share travel experiences
* Improve user engagement

🔒 Security Features

* Authentication & Authorization
* Data Validation
* Secure Route Protection
* Error Handling

---

🛠️ Tech Stack

 Frontend

* HTML
* CSS
* Bootstrap
* EJS Templates

 Backend

* Node.js
* Express.js

 Database

* MongoDB
* Mongoose

 Additional Technologies

* Passport.js
* Express Session
* Cloudinary
* Multer
* Connect Flash

---

 📂 Project Structure

```bash
WanderLust/
│
├── models/
├── routes/
├── controllers/
├── middleware/
├── views/
│   ├── listings/
│   ├── users/
│   └── layouts/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── utils/
├── app.js
├── cloudConfig.js
└── package.json
```

---

⚙️ Installation

 Clone Repository

```bash
git clone https://github.com/MohdArham421/WanderLust.git
cd WanderLust
```


Install Dependencies

```bash
npm install
```


Configure Environment Variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

SECRET=session_secret
```


Run Application

```bash
npm start
```

or

```bash
node app.js
```

---

## 🎯 Key Functionalities

* Full CRUD Operations
* MVC Architecture
* User Authentication & Authorization
* Cloud Image Uploads
* Responsive User Interface
* Database Integration
* Session Management

---


📚 Learning Outcomes
This project helped in understanding:

* Full Stack Web Development
* MVC Architecture
* RESTful Routing
* Authentication & Authorization
* MongoDB Database Management
* Cloudinary Media Storage
* Express Middleware
* Server-Side Rendering with EJS

---

👨‍💻 Author

Mohd Arham

---

📜 License

This project is developed for educational and learning purposes.
