const sql = require("mssql");
const config = require("../connect");

exports.ThemBinhLuan = function(req, res, next) {
  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      return pool.request().query(
        `
            EXECUTE  [dbo].[ThemBinhLuan] 
            @_MaBinhLuan = \"${req.body.MaBinhLuan}\" ,
            @_MaThanhVien = \"${req.body.MaThanhVien}\",
            @_NoiDung = \"${req.body.NoiDung}\"  
            `
      );
    })
    .then(result => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send({
        code: "ok",
        value: {
          MaBinhLuan: req.body.MaBinhLuan,
          MaThanhVien: req.body.MaThanhVien,
          NoiDung: req.body.NoiDung
        }
      });
      sql.close();
    })
    .catch(err => {
      res.status(200).send({ err });
      sql.close();
    });
};
