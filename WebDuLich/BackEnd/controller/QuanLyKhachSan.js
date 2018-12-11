const sql = require('mssql')
const config = require('../connect')


exports.DanhSachKhachSan = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select *from KhachSan
      `)
    }).then(result => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
    }).catch(err => {
      res.status(200).send({ message: "${err}"})
      sql.close();
    });
}
exports.ChiTietLoaiKhachSan = function(req,res, next){
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`select *from ChiTietLoaiKhachSan()
       `)
     }).then(result => {
       let rows = result.recordset
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).json(rows);
       sql.close();
     }).catch(err => {
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }
 exports.LoaiKhachSan = function(req,res, next){
  
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`select *from LoaiKhachSan()
       `)
     }).then(result => {
       let rows = result.recordset
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).json(rows);
       sql.close();
     }).catch(err => {
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.DanhSachDatKhachSan = function(req,res,next){
    new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select *from HoaDonKhachSan()
      `)
    }).then(result => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
    }).catch(err => {
      res.status(200).send({ message: "${err}"})
      sql.close();
    });
 }

 exports.ThemKhachSan = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[ThemKhachSan]
       @MaKhachSan = \"${req.body.MaKhachSan}\",
       @MaLoai=\"${req.body.MaLoai}\",
       @TenKhachSan=\"${req.body.TenKhachSan}\",
       @GioiThieu=\"${req.body.GioiThieu}\",
       @AnhKhachSan=\"${req.body.AnhKhachSan}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({res:true,code: 'Them Thanh Cong',value:
       {
         MaKhachSan:req.body.MaKhachSan,
         MaLoai:req.body.MaLoai,
         TenKhachSan:req.body.TenKhachSan,
         GioiThieu:req.body.GioiThieu,
         AnhKhachSan:req.body.AnhKhachSan
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.XoaKhachSan = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[XoaKhachSan]
       @MaKhachSan = \"${req.body.MaKhachSan}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Xoa Thanh Cong',value:
       {
         MaKhachSan:req.body.MaKhachSan,
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.CapNhatKhachSan = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[CapNhatKhachSan]
       @MaKhachSan = \"${req.body.MaKhachSan}\",
       @MaLoai=\"${req.body.MaLoai}\",
       @TenKhachSan=\"${req.body.TenKhachSan}\",
       @GioiThieu=\"${req.body.GioiThieu}\",
       @AnhKhachSan=\"${req.body.AnhKhachSan}\"

       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Cap Nhat Thanh Cong',value:
       {
         MaKhachSan:req.body.MaKhachSan,
         MaLoai:req.body.MaLoai,
         TenKhachSan:req.body.TenKhachSan,
         GioiThieu:req.body.GioiThieu,
         AnhKhachSan:req.body.AnhKhachSan
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 