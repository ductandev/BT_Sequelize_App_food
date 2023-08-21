import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";

const model = initModels(sequelize);

const getListUserLikeResByResId = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await model.restaurant.findOne({
      where: { res_id: id },
      include: ["user_id_users"],
    });
    if (data === null) {
      res.send("Id nhà hàng không tồn tại !");
      return;
    }
    if (data.user_id_users.length === 0) {
      res.send("Nhà hàng này chưa có ai like !");
      return;
    }

    res.status(200).send(data);
  } catch (exp) {
    console.log("🚀 ~ file: resController.js:24 ~ getListUserLikeResByResId ~ exp:", exp)
    // res.status(500).send(exp.message)
    res.status(500).send("Lỗi BE");
  }
};

const getListUserRateResByResId = async (req, res) => {
    try{
        let {id} = req.params;
        let data = await model.restaurant.findOne({
            where: {res_id: id},
            include: ["user_id_user_rate_res"]
        });
        if (data === null){
            res.send("Id nhà hàng không tồn tại !");
            return;
        }
        if (data.user_id_user_rate_res.length === 0) {
            res.send("Nhà hàng này chưa có ai đánh giá !");
            return;
        }
    
        res.status(200).send(data);
    }
    catch(exp){
        console.log("🚀 ~ file: resController.js:49 ~ getListUserRateResByResId ~ exp:", exp)
        // res.status(500).send(exp.message);
        res.status(500).send("Lỗi BE")
    }

};

export { getListUserLikeResByResId, getListUserRateResByResId };
