import* as $ from "jquery"
import { Tour } from "../Models/Tour";
const API =`http://localhost:8088/api/`
export class TourServices{
   
    LayDanhSachTourService(){
        return $.ajax({
            async:false,
            url:`${API}DanhSachTour`,
            type:"GET",
            dataType:"json"
        })
    }
    LayDiaDiemTourService(){
        return $.ajax({
            async:false,
            url:`${API}DiemKhoiHanh`,
            type:"GET",
            dataType:"json"
        })
    }
    LayNgayKhoiHanhTourService(){
        return $.ajax({
            async:false,
            url:`${API}NgayKhoiHanh`,
            type:"GET",
            dataType:"json"
        })
    }
    LayDanhSachDatTourService(){
        return $.ajax({
            async:false,
            url:`${API}DanhSachDatTour`,
            type:"GET",
            dataType:"json"
        })
    }
    XoaTour(maTour:string){
        return $.ajax({
            type:"POST",
            url:`http://localhost:8088/api/XoaTour`,
            contentType: 'application/json',
            data: JSON.stringify({MaTour: `${maTour}`}),
            dataType: 'json',
            processData: false ,
        })
    }   
    ThemTour(tour:Tour){
        return $.ajax({
            url:`http://localhost:8088/api/ThemTour`,
            dataType: 'json',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(tour),
            processData: false,
        });
    }
    CapNhatTour(tour:Tour){
        return $.ajax({
        type:'POST',
        url:`http://localhost:8088/api/CapNhatTour`,
        data:JSON.stringify(tour),//object gui len
        dataType:'json',//mong muon tra ve
        contentType:'application/json', //kieu du lieu gui len
    })
    }

}