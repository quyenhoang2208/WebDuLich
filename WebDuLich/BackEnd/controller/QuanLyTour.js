const sql = require('mssql')
const config = require('../connect')


exports.DanhSachTour = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select *from Tour
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

exports.DiemKhoiHanh = function(req,res, next){
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`select *from DiemKhoiHanh()

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
 exports.NgayKhoiHanh = function(req,res, next){
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`select *from NgayKhoiHanhKhoiHanh()

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

 exports.DanhSachDatTour = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select * from dbo.HoaDonTour()
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

exports.ThemTour = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[ThemTour]
       @MaTour = \"${req.body.MaTour}\",
       @TenTour=\"${req.body.TenTour}\",
       @GioiThieu=\"${req.body.GioiThieu}\",
       @AnhTour=\"${req.body.AnhTour}\",
       @NgayKhoiHanh=\"${req.body.NgayKhoiHanh}\",
       @DiemKhoiHanh=\"${req.body.DiemKhoiHanh}\",
       @GiaTour=\"${req.body.GiaTour}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Them Thanh Cong',value:
       {
        MaTour : req.body.MaTour,
        TenTour:req.body.TenTour,
        GioiThieu:req.body.GioiThieu,
        AnhTour:req.body.AnhTour,
        NgayKhoiHanh:req.body.NgayKhoiHanh,
        DiemKhoiHanh:req.body.DiemKhoiHanh,
        GiaTour:req.body.GiaTour
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.XoaTour = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[XoaTour]
       @MaTour = \"${req.body.MaTour}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Xoa Thanh Cong',value:
       {
         MaTour:req.body.MaTour
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.CapNhatTour = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[CapNhatTour]
       @MaTour = \"${req.body.MaTour}\",
       @TenTour=\"${req.body.TenTour}\",
       @GioiThieu=\"${req.body.GioiThieu}\",
       @AnhTour=\"${req.body.AnhTour}\",
       @NgayKhoiHanh=\"${req.body.NgayKhoiHanh}\",
       @DiemKhoiHanh=\"${req.body.DiemKhoiHanh}\",
       @GiaTour=\"${req.body.GiaTour}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Cap Nhat Thanh Cong',value:
       {
        MaTour : req.body.MaTour,
        TenTour:req.body.TenTour,
        GioiThieu:req.body.GioiThieu,
        AnhTour:req.body.AnhTour,
        NgayKhoiHanh:req.body.NgayKhoiHanh,
        DiemKhoiHanh:req.body.DiemKhoiHanh,
        GiaTour:req.body.GiaTour
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }
