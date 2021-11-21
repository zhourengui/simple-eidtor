const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("@koa/multer");
const serve = require("koa-static");
const cors = require("@koa/cors");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = new Koa();
const router = new Router();
const upload = multer();

router.post("/upload-single-file", upload.single("file"), async (ctx) => {
  const filename = uuidv4();
  const buffer = ctx.file.buffer;
  await fs.writeFileSync(
    path.resolve(__dirname, "./static/images", filename),
    buffer
  );
  ctx.body = `http://${ctx.request.header.host}/images/${filename}`;
});

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.resolve(__dirname, "./static")));

app.listen(5555, () => {
  console.log("Server Is Runing At Port 5555");
});
