import* as $ from "jquery"
const API = `http://localhost:8088/api/`

export class GioHangService{
    XoaDatTourService(mathanhvien,matour){
        return $.ajax({
            url:`${API}XoaDatTour`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({MaThanhVien:`${mathanhvien}`,MaTour:`${matour}`}),
            processData: false       
        });  
    }
    XoaDatKhachSanService(mathanhvien,makhachsan){
        return $.ajax({
            url:`${API}XoaDatKhachSan`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({MaKhachSan:`${makhachsan}`,MaThanhVien:`${mathanhvien}`}),
            processData: false       
        });  
    }
    DatKhachSanService(mathanhvien,makhachsan,songayo,sokhacho){
        return $.ajax({
            url:`${API}DatKhachSan`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({MaThanhVien:`${mathanhvien}`,MaKhachSan:`${makhachsan}`,SoNgayO:`${songayo}`,SoKhachO:`${sokhacho}`}),
            processData: false       
        });  
    }
    DatTourService(mathanhvien,matour,sokhach){
        return $.ajax({
            url:`${API}DatTour`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({MaThanhVien:`${mathanhvien}`,MaTour:`${matour}`,SoLuongKhach:`${sokhach}`}),
            processData: false  
        });
    }
}