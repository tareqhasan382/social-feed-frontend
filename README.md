# Social Feed Application

A high-performance, scalable, and secure Social Feed Application built with **NestJS** and **React.js**. This project features a robust authentication system, real-time feed interactions, and advanced media handling, all optimized for production-grade performance.

---

## 🚀 Features

### **Authentication & Security**

- **JWT-Based Auth**: Secure login and registration with access and refresh tokens.
- **Refresh Token Rotation**: Automatic session renewal with `async-mutex` handling on the frontend.
- **Auto-Logout**: Graceful session termination upon token expiration.
- **Rate Limiting**: Protection against brute-force and DDoS attacks using `@nestjs/throttler`.
- **Global Error Handling**: Standardized API responses and exception filters.

### **Feed & Interactions**

- **Dynamic Feed**: Real-time post listing with **Cursor-based Pagination** for high scalability.
- **Infinite Scroll**: Seamless user experience using `IntersectionObserver`.
- **Media Upload**: Optional image and video uploads powered by **Cloudinary**.
- **Social Interactions**: Like/unlike posts and comments with transactional integrity.
- **Nested Comments**: Support for multi-level replies and discussions.
- **Visibility Control**: Toggle between **Public** and **Private** post visibility.
- **Smart Search**: Content-based search filtering across the feed.

### **Performance Optimization**

- **Redis Caching**: High-speed feed caching to reduce database load.
- **Query Optimization**: Selective data fetching with Prisma to avoid N+1 problems.
- **RTK Query**: Efficient frontend state management and cache synchronization.

---

## 🛠 Tech Stack


| Layer              | Technologies                                                      |
| ------------------ | ----------------------------------------------------------------- |
| **Frontend**       | React.js, Redux Toolkit, RTK Query, Tailwind CSS, React Hot Toast |
| **Backend**        | NestJS, Prisma ORM, Swagger (OpenAPI)                             |
| **Database**       | PostgreSQL                                                        |
| **Caching**        | Redis                                                             |
| **Cloud Services** | Cloudinary (Media Hosting)                                        |
| **DevOps**         | Docker, Docker Compose                                            |


---

## 📦 Installation

### **1. Clone the Repository**

```bash
git clone https://github.com/tareqhasan382/social-feed-frontend.git
cd social-feed-app
```

### **2. Setup Environment Variables**

Create `.env` files in both `buddy-script-backend` and `buddy-script-frontend` directories based on the examples below.

### **3. Start Infrastructure (Docker)**

Run the database and Redis services using Docker Compose:

```bash
docker-compose up -d
```

### **4. Install Dependencies**

```bash
# Backend
cd buddy-script-backend
npm install
npx prisma generate
npx prisma migrate dev

# Frontend
cd ../buddy-script-frontend
npm install
```

---

## 🔑 Environment Variables

### **Backend (`.env`)**

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/social_db"
REDIS_URL="redis://localhost:6379"

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_EXPIRES_IN=3600

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### **Frontend (`.env`)**

```env
VITE_APP_BASE_URL="http://localhost:3000"
```

---

## 🏃 Running the Project

### **Start Backend**

```bash
cd buddy-script-backend
npm run start:dev
```

*API will be available at `http://localhost:3000`*

### **Start Frontend**

```bash
cd buddy-script-frontend
npm run dev
```

*App will be available at `http://localhost:5173` (default Vite port)*

### **Access API Documentation**

Once the backend is running, access the Swagger UI at:
`http://localhost:3000/docs`

---

## 📖 Usage Guide

1. **Onboarding**: Register a new account and log in to access the protected feed.
2. **Creating Content**: Use the "Post Creator" at the top of the feed. You can add text and optionally upload an image or video.
3. **Interacting**: Like posts or comments to see the dynamic "Liked Users" avatars. Reply to comments to start a nested discussion.
4. **Privacy**: Choose "Public" to share with everyone or "Private" to keep posts visible only to you.
5. **Searching**: Use the search bar in the header to filter posts by content keywords.

---

## 🛡 Security & Scalability Notes

- **Cursor-Based Pagination**: Unlike traditional offset pagination, our cursor-based approach remains consistent and fast even with millions of records.
- **Mutex Token Refresh**: Prevents "Request Storms" when a token expires by synchronizing refresh calls.
- **Cache Invalidation**: Redis caches are automatically invalidated when new content is created, ensuring users always see the latest data without sacrificing speed.

---

## 🤝 Contributing

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.