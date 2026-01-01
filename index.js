import express from 'express';
import serverless from 'serverless-http';
import { characters } from './characters';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());