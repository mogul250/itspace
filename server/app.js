
import { router } from './router';
import { app } from './handler';
import { json, urlencoded } from 'body-parser';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(router)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); 
  next();
});
const _app = app;
export { _app as app };

		