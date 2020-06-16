const express = require("express");
const Parse = require("./parse");

// nuxt.config.js de serverMiddleware bölümünde tanımlanıp çağrılıyor
// serverMiddleware alanı yüklenmeden önce çalıştırılıyor (sunucuda)

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// Add POST - /api/login
router.post("/login", async (req, res) => {
  const user = await Parse.User.logIn(req.body.username, req.body.password);
  if (user) {
    req.session.authUser = { username: user.get("username") };
    return res.json({
      username: user.get("username"),
      email: user.get("email")
    });
  }

  res.status(401).json({ message: "Bad credentials" });
});

// Add POST - /api/logout
router.post("/logout", (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

// Export the server middleware.
export default {
  path: "/api",
  handler: router
};
