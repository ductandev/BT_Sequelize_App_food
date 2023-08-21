import express from 'express';
import {
    getUser, getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByName,
    userLikeRes,
    userUnLikeRes,
    getListUserLikeResById,
    userRateRes,
    userDeleteRateRes,
    getListUserRateResById,
    orderById,
    deleteOrderById,
} from '../Controllers/userController.js';
const userRoutes = express.Router();

// R
userRoutes.get("/get-user", getUser);
userRoutes.get("/get-user-by-id/:id", getUserById);

// CUD
userRoutes.post("/create-user", createUser);
userRoutes.put("/update-user/:id", updateUser);
userRoutes.delete("/delete-user", deleteUser);

// tìm kiếm tên user
userRoutes.get("/get-user-by-name/:fullName",getUserByName);

// like nhà hàng
userRoutes.post("/like-res/:id", userLikeRes);
// unlike nhà hàng
userRoutes.delete("/unlike-res/:id", userUnLikeRes);
// lấy danh sách like nhà hàng theo user_id
userRoutes.get("/get-list-like-res-by-user-id/:id", getListUserLikeResById);


// Đánh giá nhà hàng
userRoutes.post("/rate-res/:id", userRateRes);
// Xóa đánh giá nhà hàng 
userRoutes.delete("/delete-rate-res/:id", userDeleteRateRes);
// Lấy danh sách đánh giá nhà hàng theo user_id
userRoutes.get("/get-list-rate-res-by-user-id/:id", getListUserRateResById);

// Đặt món
userRoutes.post("/order-by-id/:id", orderById)
// Xóa đặt món
userRoutes.delete("/delete-order-by-id/:id", deleteOrderById)

export default userRoutes;