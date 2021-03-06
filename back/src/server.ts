import express from 'express';
import { routes } from './routes';
import cors from "cors";
import * as env from 'dotenv';

env.config({ path: '../.env' });

const app = express();

app.use(cors({
	credentials: true,
	origin: "http://localhost:3000"
}))

app.use(express.json());
app.use(routes);

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});


