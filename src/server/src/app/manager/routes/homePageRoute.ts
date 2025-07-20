import express from 'express';
import { getInfoForHomePage } from '../controllers/homePageController';
const route=express();

route.get("/", getInfoForHomePage)

export default route