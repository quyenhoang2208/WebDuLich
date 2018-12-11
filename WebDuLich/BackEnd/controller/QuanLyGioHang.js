const sql = require('mssql');
const config = require('../connect');

exports.XoaDatTour = function(req,res){
    new sql.ConnectionPool(config).connect().then(pool=>{
        return pool.request().query(
            `
            EXECUTE  [dbo].[XoaDatTour] 
            @MaThanhVien = \"${req.body.MaThanhVien}\" ,
            @MaTour = \"${req.body.MaTour}\" 
            `
        )
    }).then(result => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({code: 'ok', value: 
          {
            MaThanhVien : req.body.MaThanhVien,
            MaTour : req.body.MaTour   
          }
        });
        sql.close();
      }).catch(err => {
        res.status(200).send({ err})
        sql.close();
      });
}
exports.XoaKhachSan = function(req,res){
  new sql.ConnectionPool(config).connect().then(pool=>{
      return pool.request().query(
          `
          EXECUTE  [dbo].[XoaDatKhachSan] 
          @MaKhachSan = \"${req.body.MaKhachSan}\" ,
          @MaThanhVien = \"${req.body.MaThanhVien}\" 
          `
      )
  }).then(result => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send({code: 'ok', value: 
        {
          MaThanhVien : req.body.MaThanhVien,
          MaKhachSan : req.body.MaKhachSan   
        }
      });
      sql.close();
    }).catch(err => {
      res.status(200).send({ err})
      sql.close();
    });
}
exports.ThemDatKhachSan = function(req,res){
  new sql.ConnectionPool(config).connect().then(pool=>{
      return pool.request().query(
          `
          EXECUTE  [dbo].[ThemDatKhachSan] 
          @MaThanhVien = \"${req.body.MaThanhVien}\",
          @MaKhachSan = \"${req.body.MaKhachSan}\",
          @SoNgayO = ${req.body.SoNgayO} ,
          @SoLuong = ${req.body.SoKhachO} 

          `
      )
  }).then(result => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send({code: 'ok', value: 
        {
          MaThanhVien : req.body.MaThanhVien,
          MaKhachSan:req.body.MaKhachSan,
          SoNgayO : req.body.SoNgayO,
          SoKhachO:req.body.SoKhachO
        }
      });
      sql.close();
    }).catch(err => {
      res.status(200).send({ err})
      sql.close();
    });
}

exports.ThemDatTour = function(req,res){
  new sql.ConnectionPool(config).connect().then(pool=>{
      return pool.request().query(
          `
          EXECUTE  [dbo].[ThemDatTour] 
          @MaThanhVien = \"${req.body.MaThanhVien}\",
          @MaTour = \"${req.body.MaTour}\",
          @SoLuongKhach = ${req.body.SoLuongKhach}
          `
      )
  }).then(result => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send({code: 'ok', value: 
        {
          MaThanhVien : req.body.MaThanhVien,
          MaTour:req.body.MaTour,
          SoLuongKhach : req.body.SoLuongKhach
        }
      });
      sql.close();
    }).catch(err => {
      res.status(200).send({ err})
      sql.close();
    });
}