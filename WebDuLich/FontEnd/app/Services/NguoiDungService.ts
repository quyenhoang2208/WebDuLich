import* as $ from "jquery"
import { NguoiDung, DangKyUser } from "../Models/NguoiDung";
const API = `http://localhost:8088/api/`
export class NguoiDungServices{
   
    LayDanhSachNguoiDungService(){
        return $.ajax({
            async:false,
            url:`${API}DanhSachThanhVien`,
            type:"GET",
            dataType:"json"
        })
    }

    ThemNguoiDung (nguoiDung:NguoiDung){
        
        return $.ajax({
            url:`${API}ThemThanhVien`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(nguoiDung ),
            processData: false       
        });       
    }
    DangKyThanhVien(user:DangKyUser){
        return $.ajax({
            url:`${API}DangKyUser`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(user ),
            processData: false 
        })
    }
    ThemBinhLuan(binhluan:any){
        return $.ajax({
            url:`${API}ThemBinhLuan`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(binhluan),
            processData: false 
        })
    }
    CapNhatThongTinUser(nguoiDung:NguoiDung){
        return $.ajax({
            url:`${API}CapNhatThongTinUser`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(nguoiDung),
            processData: false 
        })
    }

    XoaNguoiDung(maThanhVien:string){
        return $.ajax({
            type:"POST",
            url:`http://localhost:8088/api/XoaNguoiDung`,
            contentType: 'application/json',
            data: JSON.stringify({MaThanhVien: `${maThanhVien}`}),
            dataType: 'json',
            processData: false ,
        })
    }   
    ThemNguoiDungAdmin(nguoidung:NguoiDung){
        return $.ajax({
            url:`http://localhost:8088/api/ThemNguoiDung`,
            dataType: 'json',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(nguoidung),
            processData: false,
        });
    }
    CapNhatNguoiDung(nguoidung:NguoiDung){
        return $.ajax({
        type:'POST',
        url:`http://localhost:8088/api/CapNhatNguoiDung`,
        data:JSON.stringify(nguoidung),//object gui len
        dataType:'json',//mong muon tra ve
        contentType:'application/json', //kieu du lieu gui len
    })
    }

    
}