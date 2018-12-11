import* as $ from "jquery"
import { TinTuc } from "../Models/TinTuc";
const API = `http://localhost:8088/api/`
export class TinTucServices{
   
    LayDanhSachTinTucService(){
        return $.ajax({
            async:false,
            url:`${API}DanhSachTinTuc`,
            type:"GET",
            dataType:"json"
        })
    }
    XoaTinTuc(maTinTuc:string){
        return $.ajax({
            type:"POST",
            url:`http://localhost:8088/api/XoaTinTuc`,
            contentType: 'application/json',
            data: JSON.stringify({MaTinTuc: `${maTinTuc}`}),
            dataType: 'json',
            processData: false ,
        })
    }   
    ThemTinTuc(tintuc:TinTuc){
        return $.ajax({
            url:`http://localhost:8088/api/ThemTinTuc`,
            dataType: 'json',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(tintuc),
            processData: false,
        });
    }
    CapNhatTinTuc(tintuc:TinTuc){
        return $.ajax({
        type:'POST',
        url:`http://localhost:8088/api/CapNhatTinTuc`,
        data:JSON.stringify(tintuc),//object gui len
        dataType:'json',//mong muon tra ve
        contentType:'application/json', //kieu du lieu gui len
    })
    }
    
}