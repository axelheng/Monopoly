# Stock Trading Web Application

## Link to deployed site
https://monopoly-theta-seven.vercel.app/

## Overview

This project is a full-stack stock trading web application that allows users to create accounts, securely log in, and record stock buy/sell transactions. The application provides a simple and user-friendly interface for managing investment activities while storing user and transaction data in a cloud-hosted PostgreSQL database.

## Features

### Home Page

* Landing page introducing the application.
* Provides navigation to Login and Sign Up pages.
* Clean and responsive user interface.

### User Authentication

#### Sign Up

* New users can create an account.
* User credentials are securely stored in the database.
* Validation prevents duplicate account registration.

#### Login

* Existing users can authenticate using their registered credentials.
* Session management ensures secure access to user-specific data.

### Transaction Management

* Users can record stock purchase transactions.
* Users can record stock selling transactions.
* Transaction details are stored in the database for future reference.
* Supports tracking of transaction type, stock symbol, quantity, and price.

### Database Integration

* Cloud-hosted PostgreSQL database using Neon.
* Stores user authentication information.
* Stores stock transaction records.
* Provides reliable and scalable data persistence.

### Deployment

* Frontend and backend deployed using Vercel.
* Database hosted on Neon PostgreSQL.
* Supports continuous deployment through Git integration.

## Technology Stack

### Frontend

* Next.js
* React.js
* HTML
* CSS
* JavaScript

### Backend

* Next.js API Routes
* Node.js

### Database

* PostgreSQL (Neon)

### Deployment

* Vercel
* Neon

## Database Schema

### Users Table

| Column   | Type         | Description     |
| -------- | ------------ | --------------- |
| id       | SERIAL       | Primary Key     |
| username | VARCHAR(255) | Unique username |
| email    | VARCHAR(255) | User email      |
| password | VARCHAR(255) | User password   |

### Transactions Table

| Column     | Type          | Description            |
| ---------- | ------------- | ---------------------- |
| id         | SERIAL        | Primary Key            |
| user_id    | INTEGER       | References Users Table |
| symbol     | VARCHAR(20)   | Stock ticker symbol    |
| type       | VARCHAR(10)   | Buy or Sell            |
| quantity   | INTEGER       | Number of shares       |
| price      | DECIMAL(10,2) | Transaction price      |
| created_at | TIMESTAMP     | Transaction timestamp  |

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/stock-trading-app.git
cd stock-trading-app
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=your_neon_connection_string
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Deployment

### Deploy to Vercel

1. Push project to GitHub.
2. Import repository into Vercel.
3. Add environment variables.
4. Deploy project.

### Connect Neon Database

1. Create a Neon project.
2. Copy the PostgreSQL connection string.
3. Add it to Vercel Environment Variables.
4. Run SQL schema setup.

## Future Enhancements

* Portfolio dashboard
* Real-time stock prices
* Profit and loss analytics
* Transaction history filtering
* Watchlist functionality

### Features Implemented

* Home Page
* Login Page
* Sign Up Page
* User Authentication
* PostgreSQL Database Integration with Neon
* Vercel Deployment
