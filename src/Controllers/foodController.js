
// nơi định nghĩa chức năng của đối tượng
const getFood = (req, res) => {

   
    res.send("Danh sách food");

}

const findFood = (req, res) => {
    res.send("Tìm food");

}

export { getFood, findFood }

// yarn add mysql2
// yarn add sequelize
