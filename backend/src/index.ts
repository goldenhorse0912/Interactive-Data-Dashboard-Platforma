import express from 'express';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
