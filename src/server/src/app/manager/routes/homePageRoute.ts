import express from 'express';
import { getInfoForHomePage } from '../controllers/homePageController';import authMiddlewareManager from "../../../middleware/authMiddlewareManager";

const route=express();
route.use(authMiddlewareManager)

route.get("/", getInfoForHomePage)

export default route