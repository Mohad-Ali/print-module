# Print Module

A full-stack web application to upload PDF files, calculate printing price based on pages, print type, and copies, and manage orders. Built with **React**, **TailwindCSS**, **Vite**, **Express**, **MongoDB**, and **Node.js**.

---

## Features

- Upload PDF files and get page count automatically.
- Choose **Print Type**: Black & White or Color.
- Specify **number of copies** and calculate total price.
- View **Orders List** with all details.
- Smooth animations using **GSAP** and **Framer Motion**.
- Mouse follower and interactive UI elements.
- Loading page with animated bubbles and text.
- Fully responsive design for all devices.
- Backend and frontend served on a **single port**.

---

## Technologies Used

- **Frontend:** React, Vite, TailwindCSS, Framer Motion, GSAP
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **File Handling:** Multer, PDF-parse
- **Notifications:** React Hot Toast

---

## Project Structure

├─ backend/
│ ├─ server.js # Express server
│ ├─ routes/ # API routes (orders, upload)
│
├─ frontend/
│ ├─ src/ # React components, pages
│ ├─ public/
│ └─ package.json
└─ package.json # Root package.json for backend + build scripts
│ .env # Environment variables (MONGO_URI)


## Deployment

The app can be deployed on Render or any Node.js compatible hosting.
Configure environment variables in your host:
MONGO_URI → MongoDB Atlas connection string
PORT → (Optional) port number

Render Setup Example:
Build Command:
npm install && npm install --prefix frontend && npm run build --prefix frontend

Start Command:
npm start







