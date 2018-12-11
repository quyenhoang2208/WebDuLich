import* as $ from "jquery"
import { KhachSan } from "../Models/KhachSan";
const API = `http://localhost:8088/api/`
export class KhachSanServices{
   
    LayDanhSachKhachSanService(){
        return $.ajax({
            async:false,
            url:`${API}DanhSachKhachSan`,
            type:"GET",
            dataType:"json"
        })
    }
    LayLoaiKhachSan(){
        return $.ajax({
            async:false,
            url:`${API}LoaiKhachSan`,
            type:"GET",
            dataType:"json"
        })
    }
    LayDanhSachDatKhachSanService(){
        return $.ajax({
            async:false,
            url:`${API}DanhSachDatKhachSan`,
            type:"GET",
            dataType:"json"
        })
    }
    XoaKhachSan(maKhachSan:string){
        return $.ajax({
            type:"POST",
            url:`http://localhost:8088/api/XoaKhachSan`,
            contentType: 'application/json',
            data: JSON.stringify({MaKhachSan: `${maKhachSan}`}),
            dataType: 'json',
            processData: false ,
        })
    }   
    ThemKhachSan(khachsan:KhachSan){
        return $.ajax({
            url:`http://localhost:8088/api/ThemKhachSan`,
            dataType: 'json',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(khachsan),
            processData: false,
        });
    }
    CapNhatKhachSan(khachsan:KhachSan){
        return $.ajax({
        type:'POST',
        url:`http://localhost:8088/api/CapNhatKhachSan`,
        data:JSON.stringify(khachsan),//object gui len
        dataType:'json',//mong muon tra ve
        contentType:'application/json', //kieu du lieu gui len
    })
    }
}