const sql = require('mssql')
const config = require('../connect')


exports.ThemLienHe = function(req,res){
    new sql.ConnectionPool(config).connect().then(pool=>{
        return pool.request().query(
            `
            EXECUTE  [dbo].[ThemLienHe] 
            @_HoTen = \"${req.body.HoTen}\" ,
            @_Email = \"${req.body.Email}\",
            @_TieuDe = \"${req.body.TieuDe}\",
            @_NoiDung = \"${req.body.NoiDung}\"  
            `
        )
    }).then(result => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({code: 'ok', value: 
          {
            HoTen : req.body.HoTen,
            Email : req.body.Email,
            TieuDe : req.body.TieuDe,
            NoiDung : req.body.NoiDung 
          }
        });
        sql.close();
      }).catch(err => {
      
        res.status(200).send({ err})
        sql.close();
      });
}

exports.DanhSachLienHe = function(req,res, next){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(`select *from LienHe
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