import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

const model = initModels(sequelize);

// R => get all
const getUser = async (req, res) => {
  // bất đồng bộ => asynchronous
  // SELECT * FROM user WHERE user_id = 1 => list object => [{},{}]
  let data = await model.user.findAll(); // => Read

  // SELECT * FROM user JOIN

  // data = await model.restaurant.findAll({
  //     include: ["user_id_users"]
  // });

  res.send(data);
};

// R => get by id

const getUserById = async (req, res) => {
  let { id } = req.params;

  // SELECT * FROM user WHERE user_id=1 LIMIT 1 => object => {}
  let data = await model.user.findOne({
    where: { user_id: id },
  }); // => Read

  res.send(data);
};

// CUD
const createUser = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;

    let checkEmail = await model.user.findAll({
      where: {
        email,
      },
    });

    if (checkEmail.length > 0) {
      res.send("Email đã tồn tại !");
      return;
    }

    let newData = {
      full_name,
      email,
      pass_word,
    };
    await model.user.create(newData);

    res.send("thêm mới thành công !");
  } catch (exp) {
    console.log(exp);
    res.status(500).send("Lỗi BE");
  }
};
const updateUser = async (req, res) => {
  let { id } = req.params;
  let { full_name, email, pass_word } = req.body;

  //check trùng email

  await model.user.update(
    { full_name, email, pass_word },
    {
      where: { user_id: id },
    }
  );

  res.send("Cập nhật thành công !");
};
const deleteUser = async (req, res) => {
  let { id } = req.params;

  // DELETE FROM user WHERE user_id = ... ;
  await model.user.destroy({ where: { user_id: id } });
  res.send("Xóa thành công !");
};

const getUserByName = async (req, res) => {
  // let [data, metadata] = await sequelize.query("SELECT * FROM user");

  let { fullName } = req.params;
  // SELECT * FROM user WHERE full_name LIKE '%...%'
  let data = await model.user.findAll({
    where: {
      full_name: {
        [Op.like]: `%${fullName}%`,
      },
    },
  });

  res.send(data);
};

// ==================================================
// Bài tập sequelize
// ==================================================
// LIKE RES
const userLikeRes = async (req, res) => {
  try {
    let { id } = req.params;
    let { res_id, date_like } = req.body;
    let data = await model.like_res.findOne({
      where: {
        user_id: id,
        res_id: res_id,
      },
    });

    if (data !== null) {
      // Kiểm tra object có null hay không
      res.send("Nhà hàng này đã được like trước đó !");
      return;
    }

    await model.like_res.create({ user_id: id, res_id, date_like });
    res.status(201).send("Thêm mới thành công !");
  } catch (exp) {
    // exp: exception
    console.log("🚀 ~ file: userController.js:129 ~ userLikeRes ~ exp:", exp);
    // res.status(500).send(exp.message);
    res.status(500).send("Lỗi BE");
  }
};

// UNLIKE RES
const userUnLikeRes = async (req, res) => {
  try {
    let { id } = req.params;
    let { res_id } = req.body;
    let data = await model.like_res.findOne({
      where: {
        user_id: id,
        res_id: res_id,
      },
    });

    if (data === null) {
      // Kiểm tra object có null hay không
      res.send("Nhà hàng này đã được unlike trước đó");
      return;
    }

    await model.like_res.destroy({
      where: {
        user_id: id,
        res_id: res_id,
      },
    });
    res.status(200).send("Unlike thành công");
  } catch (exp) {
    // exp: exception
    console.log("🚀 ~ file: userController.js:162 ~ userUnLikeRes ~ exp:", exp);
    // res.status(500).send(exp.message);
    res.status(500).send("Lỗi BE");
  }
};

// LẤY DANH SÁCH LIKE NHÀ HÀNG THEO USER_ID
const getListUserLikeResById = async (req, res) => {
  try {
    let { id } = req.params;

    // let data = await model.restaurant.findAll({
    let data = await model.user.findOne({
      where: { user_id: id },
      include: ["res_id_restaurants"],
      // where: { res_id: id },
      // include: ["user_id_users"]
    });
    if (data === null) {
      res.send("Id người dùng không tồn tại !");
      return;
    }
    if (data.res_id_restaurants.length === 0) {
      res.send("Người dùng này chưa like nhà hàng nào");
      return;
    }

    res.status(200).send(data);
  } catch (exp) {
    // exp: exception
    console.log("🚀 ~ file: userController.js:189 ~ exp:", exp);
    // res.status(500).send(exp.message);
    res.status(500).send("Lỗi BE");
  }
};

// RATE RES
const userRateRes = async (req, res) => {
  try {
    let { id } = req.params;
    let { res_id, amount, date_rate } = req.body;

    let data = await model.rate_res.findOne({
      where: {
        user_id: id,
        res_id: res_id,
      },
    });

    if (data !== null) {
      // Kiểm tra nhà hàng đã được đánh giá số sao trước đó hay chưa
      res.send("Nhà hàng này đã được đánh giá trước đó !");
      return;
    }

    await model.rate_res.create({ user_id: id, res_id, amount, date_rate });
    res.status(201).send("Đánh giá thành công !");
  } catch (exp) {
    console.log("🚀 ~ file: userController.js:218 ~ userRateRes ~ exp:", exp);
    // res.status(500).send(exp.message);
    res.status(500).send("Lỗi BE");
  }
};

// DELETE RATE RES
const userDeleteRateRes = async (req, res) => {
  try {
    let { id } = req.params;
    let { res_id } = req.body;
    let data = await model.rate_res.findOne({
      where: {
        user_id: id,
        res_id: res_id,
      },
    });

    if (data === null) {
      res.send("Nhà hàng này chưa được đánh giá trước đó !");
      return;
    }

    await model.rate_res.destroy({
      where: {
        user_id: id,
        res_id: res_id,
      },
    });
    res.status(200).send("Xóa đánh giá thành công");
  } catch (exp) {
    console.log(
      "🚀 ~ file: userController.js:249 ~ userDeleteRateRes ~ exp:",
      exp
    );
    // res.status(500).send(exp.message);
    res.status(500).send("Lỗi BE");
  }
};

// LẤY DANH SÁCH ĐÁNH GIÁ NHÀ HÀNG THEO USER_ID
const getListUserRateResById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await model.user.findOne({
      where: { user_id: id },
      include: ["res_id_restaurant_rate_res"],
    });

    if (data === null) {
      res.send("Id người dùng không tồn tại !");
      return;
    }
    if (data.res_id_restaurant_rate_res.length === 0) {
      res.send("Người dùng này chưa đánh giá nhà hàng nào");
      return;
    }

    res.status(200).send(data);
  } catch (exp) {
    console.log(
      "🚀 ~ file: userController.js:271 ~ getListUserRateResById ~ exp:",
      exp
    );
    // res.status(500).send(exp.message);
    res.status(500).send("Lỗi BE");
  }
};

// USER ĐẶT MÓN ---> USER 1 MÓN
const orderById = async (req, res) => {
  try {
    let { id } = req.params;
    let { food_id, amount, arr_sub_id } = req.body;
    let data = await model.order.findOne({
      where: {
        user_id: id,
        food_id: food_id,
      },
    });

    if (data !== null) {
      res.send("Người dùng đã đặt món này rồi !");
      return;
    }

    await model.order.create({ user_id: id, food_id, amount, arr_sub_id });
    res.status(201).send("Thêm mới thành công !");
  } catch (exp) {
    console.log("🚀 ~ file: userController.js:310 ~ orderById ~ exp:", exp);
    res.status(500).send("Lỗi BE");
  }
};

// XÓA ĐẶT MÓN
const deleteOrderById = async (req, res) => {
  let { id } = req.params;
  let { food_id } = req.body;
  let data = await model.order.findOne({
    where: {
      user_id: id,
      food_id: food_id,
    },
  });
  if (data === null) {
    res.send("Người dùng chưa đặt món này nên không thể xóa !");
    return;
  }
  await model.order.destroy({
    where: {
      user_id: id,
      food_id: food_id,
    },
  });
  res.status(200).send("Xóa đặt món thành công");
};

export {
  getUser,
  getUserById,
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
};
