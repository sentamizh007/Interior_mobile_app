# backend_interior_app

Backend API for the **Interior AI Mobile App** — built with Node.js, Express, MongoDB (Mongoose), and Cloudinary.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB via Mongoose
- **Auth**: JWT + bcryptjs
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, express-rate-limit, express-validator
- **CORS**: Enabled

## 📁 Project Structure

```
backend/
├── server.js              # Entry point
├── src/
│   ├── app.js             # Express app setup
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   └── cloudinary.js  # Cloudinary config
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── design.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── User.model.js
│   │   └── Design.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── design.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── design.service.js
│   └── utils/
│       ├── response.js
│       └── validators.js
└── .env.example           # Environment variable template
```

## 🔧 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/sentamizh007/backend_interior_app.git
cd backend_interior_app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Fill in your values in `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/interior_ai_db
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Design
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/design` | Get all designs |
| POST | `/api/design` | Create a design |
| GET | `/api/design/:id` | Get design by ID |
| PUT | `/api/design/:id` | Update design |
| DELETE | `/api/design/:id` | Delete design |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |

## 🔒 Security

- JWT-based authentication
- Rate limiting (100 req / 15 min per IP)
- HTTP security headers via Helmet
- Input validation via express-validator
- Passwords hashed with bcryptjs

## 📄 License

MIT
