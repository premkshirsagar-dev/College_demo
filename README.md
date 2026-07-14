# College Admissions Portal

A full-stack admissions application for Dr. Harisingh Gour Vishwavidyalaya, Sagar.

- **Frontend**: React + Vite + Tailwind CSS v4, React Router, Axios, React Hook Form, Framer Motion
- **Backend**: Node.js + Express, MongoDB Atlas + Mongoose, JWT auth, bcrypt, Multer, express-validator
- **Architecture**: MVC on the backend (routes → controllers → models), with middleware, utils, and validators separated

```
my-fullstack-app/
├── backend/     ← Express API (MVC)
└── frontend/    ← React + Vite app
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — paste your MongoDB Atlas connection string (see the Atlas setup you already did)
- `JWT_SECRET` — any long random string
- `ADMIN_SETUP_KEY` — any long random string; you'll need this once to create your admin account

Run it:

```bash
npm run dev       # starts on http://localhost:5000
```

### Creating the first Admin account

Admins are created through a secured endpoint rather than a public signup page, so
random visitors can't register themselves as admin. Send **one** request (Postman,
Thunder Client, or curl) with your `ADMIN_SETUP_KEY`:

```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Name",
    "email": "admin@college.edu",
    "password": "yourStrongPassword",
    "setupKey": "the_value_you_put_in_ADMIN_SETUP_KEY"
  }'
```

After that, log in normally at `/admin/login` in the app. You can rotate or remove
`ADMIN_SETUP_KEY` afterward if you want to lock the endpoint down further.

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` requests to `http://localhost:5000`,
so the frontend and backend talk to each other with no extra CORS config needed in dev.

## 3. What's implemented

**Public pages**: Landing (hero + admission info + programs), About, Contact, 404.

**Student flow**: 5-step registration (personal → contact → course → documents →
account) → instant unique Admission ID → login → dashboard to view/edit profile and
upload/replace the Transfer Certificate.

**Admin flow**: separate login → dashboard with search, course/status filters, approve/
reject, inline edit, delete, CSV export, and a document viewer link per student.

**Security**: JWT auth with role-based middleware (`protect` + `authorize`), bcrypt
password hashing, server-side validation via express-validator, file-type/size limits
on uploads, and role-gated frontend routes via `ProtectedRoute`.

## 4. Next steps you may want

- Swap local disk storage for S3/Cloudinary for uploaded documents in production
- Add email notifications on status change
- Add refresh tokens / token expiry handling in the UI
- Deploy: frontend to Vercel/Netlify, backend to Render/Railway, and update
  `CLIENT_URL` (backend) and the Vite proxy / API base URL (frontend) accordingly
