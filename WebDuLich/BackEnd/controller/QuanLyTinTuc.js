const sql = require('mssql')
const config = require('../connect')


exports.DanhSachTinTuc = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select *from TinTuc
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
exports.ThemTinTuc = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[ThemTinTuc]
       @MaTinTuc = \"${req.body.MaTinTuc}\",
       @AnhTinTuc=\"${req.body.AnhTinTuc}\",
       @NoiDungTin=\"${req.body.NoiDungTin}\",
       @NgayDangTin=\"${req.body.NgayDangTin}\",
       @TieuDeTin=\"${req.body.TieuDeTin}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Them Thanh Cong',value:
       {
        MaTinTuc:req.body.MaTinTuc,
        AnhTinTuc:req.body.AnhTinTuc,
        NoiDungTin:req.body.NoiDungTin,
        NgayDangTin:req.body.NgayDangTin,
        TieuDeTin:req.body.TieuDeTin
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.XoaTinTuc = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[XoaTinTuc]
       @MaTinTuc = \"${req.body.MaTinTuc}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Xoa Thanh Cong',value:
       {
        MaTinTuc:req.body.MaTinTuc,
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.CapNhatTinTuc= function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[CapNhatTinTuc]
       @MaTinTuc = \"${req.body.MaTinTuc}\",
       @AnhTinTuc=\"${req.body.AnhTinTuc}\",
       @NoiDungTin=\"${req.body.NoiDungTin}\",
       @NgayDangTin=\"${req.body.NgayDangTin}\",
       @TieuDeTin=\"${req.body.TieuDeTin}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Cap Nhat Thanh Cong',value:
       {
        MaTinTuc:req.body.MaTinTuc,
        AnhTinTuc:req.body.AnhTinTuc,
        NoiDungTin:req.body.NoiDungTin,
        NgayDangTin:req.body.NgayDangTin,
        TieuDeTin:req.body.TieuDeTin
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }