// This project creates admins through a secured API endpoint
// (POST /api/auth/admin/register) protected by ADMIN_SETUP_KEY,
// instead of a seed script. See README.md → "Creating the first Admin".
//
// This file is kept only as a pointer so `npm run seed:admin` doesn't 404 —
// it does not create anything on its own.
console.log(
  "No seed script needed. Create your admin via POST /api/auth/admin/register with your ADMIN_SETUP_KEY in the request body. See README.md."
);
