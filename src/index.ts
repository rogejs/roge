import { roge } from "./core/server";

const app = roge();

app.config({ port: 4000 });
app.start();
