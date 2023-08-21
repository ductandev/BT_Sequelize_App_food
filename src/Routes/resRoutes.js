import express from "express";
import {
  getListUserLikeResByResId,
  getListUserRateResByResId,
} from "../Controllers/resController.js";

const resRoutes = express.Router();

// R
// lấy danh sách like nhà hàng theo res_id
resRoutes.get("/get-list-like-res-by-res-id/:id", getListUserLikeResByResId);
// Lấy danh sách đánh giá nhà hàng theo res_id
resRoutes.get("/get-list-rate-res-by-res-id/:id", getListUserRateResByResId);

export default resRoutes;
