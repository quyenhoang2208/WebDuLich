const sql = require('mssql')
const config = require('../connect')


exports.DanhSachThanhVien = function(req,res, next){
  new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query(`select *from ThanhVien
      `)
    }).then(result => {
      let rows = result.recordset
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
    }).catch(err => {
      console.log(err);
      res.status(200).send({ message: "${err}"})
      sql.close();
    });
}

exports.ThemNguoiDung = function(req, res){
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
      EXECUTE  [dbo].[ThemThanhVien] 
       @_MaThanhVien = \"${req.body.MaThanhVien}\"
      ,@_Username = \"${req.body.Username }\"
      ,@_Password =\" ${req.body.Password}\"
      ,@_HoTen = \"${req.body.HoTen}\"
      ,@_SoDT = \"${req.body.SoDT}\"
      ,@_DiaChi = \"${req.body.DiaChi}\"
      ,@_PhanQuyen = \"${req.body.PhanQuyen}\"
      ,@_Email = \"${req.body.Email}\"
   
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({code: 'ok', value: 
      {
        MaThanhVien : req.body.MaThanhVien,
        Username : req.body.Username, 
        Password : req.body.Password,
        HoTen : req.body.HoTen,
        SoDT : req.body.SoDT,
        DiaChi : req.body.DiaChi,
        PhanQuyen : req.body.PhanQuyen,
        Email : req.body.Email
      }
    });
    sql.close();
  }).catch(err => {
    console.log(err);
    res.status(200).send({ err})

    sql.close();
  });
  
}
exports.DangKyUser = function(req, res){
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
      EXECUTE  [dbo].[DangKyUser] 
       @_MaThanhVien = \"${req.body.MaThanhVien}\"
      ,@_Username = \"${req.body.Username }\"
      ,@_Password =\" ${req.body.Password}\"
      ,@_HoTen = \"${req.body.HoTen}\"
      ,@_Email = \"${req.body.Email}\"
      ,@_PhanQuyen = \"${req.body.PhanQuyen}\"
    

    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({kq:true,code: 'ok', value: 
      {
        MaThanhVien : req.body.MaThanhVien,
        Username : req.body.Username, 
        Password : req.body.Password,
        HoTen : req.body.HoTen,
        Email : req.body.Email,
        PhanQuyen : req.body.PhanQuyen
      }
    });
    sql.close();
  }).catch(err => {
    
    res.status(200).send({kq:false})

    sql.close();
  });
  
}

exports.CapNhatThongTinUser = function(req, res){
  console.log(req);
  new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(`
      EXECUTE  [dbo].[CapNhatThongTinUser] 
       @_MaThanhVien = \"${req.body.MaThanhVien}\"
      ,@_Username = \"${req.body.Username }\"
      ,@_Password =\" ${req.body.Password}\"
      ,@_HoTen = \"${req.body.HoTen}\"
      ,@_SoDT = \"${req.body.SoDT}\"
      ,@_DiaChi = \"${req.body.DiaChi}\"
      ,@_PhanQuyen = \"${req.body.PhanQuyen}\"
      ,@_Email = \"${req.body.Email}\"
   
    `)
  }).then(result => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send({code: 'ok', value: 
      {
        MaThanhVien : req.body.MaThanhVien,
        Username : req.body.Username, 
        Password : req.body.Password,
        HoTen : req.body.HoTen,
        SoDT : req.body.SoDT,
        DiaChi : req.body.DiaChi,
        PhanQuyen : req.body.PhanQuyen,
        Email : req.body.Email
      }
    });
    sql.close();
  }).catch(err => {
    console.log(err);
    res.status(200).send({ err})

    sql.close();
  });
  
}


 exports.XoaNguoiDung = function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[XoaNguoiDung]
       @MaThanhVien = \"${req.body.MaThanhVien}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Xoa Thanh Cong',value:
       {
        MaThanhVien:req.body.MaThanhVien,
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }

 exports.CapNhatNguoiDung= function(req,res, next){
  console.log(req);
   new sql.ConnectionPool(config).connect().then(pool => {
       return pool.request().query(`
       exec [dbo].[CapNhatNguoiDung]
       @MaThanhVien = \"${req.body.MaThanhVien}\",
       @Username=\"${req.body.Username}\",
       @Password=\"${req.body.Password}\",
       @HoTen=\"${req.body.HoTen}\",
       @SoDT=\"${req.body.SoDT}\",
       @DiaChi=\"${req.body.DiaChi}\",
       @PhanQuyen=\"${req.body.PhanQuyen}\"
       `)
     }).then(result => {
       res.setHeader('Access-Control-Allow-Origin', '*')
       res.status(200).send({code: 'Cap Nhat Thanh Cong',value:
       {
        MaThanhVien:req.body.MaThanhVien,
        Username:req.body.Username,
        Password:req.body.Password,
        HoTen:req.body.HoTen,
        SoDT:req.body.SoDT,
        DiaChi:req.body.DiaChi,
        PhanQuyen:req.body.PhanQuyen
       }
      })
       sql.close();
     }).catch(err => {
       console.log(err)
       res.status(200).send({ message: "${err}"})
       sql.close();
     });
 }