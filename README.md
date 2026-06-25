# Ampress Energy

Ampress Energy is a modern landing page and inquiry experience for an EV battery service business. The site showcases battery solutions, repair services, and a contact form that helps customers submit inquiries directly through WhatsApp.

## What this project includes

- A polished React + Vite frontend for the company brand and services
- A service inquiry form with image uploads and location validation
- A small Express backend that sends inquiry messages to WhatsApp using the WhatsApp Cloud API
- A clean, responsive UI built with React and custom styling

## Project structure

- src/ - frontend React application
- src/components/ - reusable UI sections and cards
- server/ - backend service for WhatsApp message handling
- public/ - static assets

## Tech stack

- React 19
- Vite
- Framer Motion
- Lucide React
- React Router
- Express
- Multer
- Node Fetch

## Getting started

### 1. Install dependencies

```bash
npm install
cd server
npm install
```

### 2. Configure environment variables

Create a .env file inside the server folder with your WhatsApp credentials:

```env
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run the app

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
cd server
node src/index.js
```

## Features

- Service information and company highlights
- Inquiry form for name, phone, address, and issue description
- Optional image upload support
- WhatsApp-based inquiry submission for local service availability

## Notes

The frontend currently restricts service requests to customers located in Jamshedpur, Jharkhand, and the inquiry flow is designed to open a WhatsApp chat with the business contact.
