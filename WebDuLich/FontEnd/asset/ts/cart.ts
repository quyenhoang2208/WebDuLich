import * as $ from "jquery";

import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from "sweetalert2/dist/sweetalert2.js";

import { TourServices } from "../../app/Services/TourService";
import {
  DanhSachDatTour,
  DanhSachDatKhachSan
} from "../../app/Models/DanhSachGioHang";

import { KhachSanServices } from "../../app/Services/KhachSanService";
import {
  HienThiTour,
  HienThiDatKhachSan
} from "../../app/Controllers/XuLyGioHang";
import { GioHangService } from "../../app/Services/GioHangService";
import { DatTour, DatKhachSan } from "../../app/Models/NguoiDung";

const account: string = localStorage.getItem("MaThanhVien");
$("#name").html(account);


HienThiTrang();
//Kiểm tra thành viên 
function KiemTraThanhVienDatTour(data) {
  let danhsachdattour: DanhSachDatTour = new DanhSachDatTour();
  data.map(function(object) {
    if (object.MaThanhVien.trim() == account.trim()) {
      danhsachdattour.ThemDatTour(object);
    }
  });
  return danhsachdattour.MangDatTour;
}

function KiemTraThanhVienDatKhachSan(data) {
  let danhsachdatkhachsan: DanhSachDatKhachSan = new DanhSachDatKhachSan();
  data.map(function(object) {
    if (object.MaThanhVien.trim() == account.trim()) {
      danhsachdatkhachsan.ThemDatKhachSan(object);
    }
  });
  return danhsachdatkhachsan.MangDatKhachSan;
}

function LoadDatTour(data) {
  let content: string = "";

  data.map(object => {
    content += HienThiTour(object);
  });
  return content;
}
function GiaMotTour(object:DatTour){
  let total: any = parseInt(object.GiaTour) * object.SoLuong*object.SoKhach;
  return total;
}
function GiaMotKhachSan(object:DatKhachSan){
  let total: number = object.Gia * object.SoKhachO*object.SoNgayO*object.SoLuong;
  return total;
}
function TongSoTien(datatour,datakhachsan){
  let giatour:number = 0;
  let giakhachsan:number = 0;
  datatour.map(object=>{
    giatour += GiaMotTour(object);
  })
  datakhachsan.map(object=>{
    giakhachsan += GiaMotKhachSan(object);
  })
  return giatour + giakhachsan;
}



function LoadDatKhachSan(data) {
  let content: string = "";
  data.map(object => {
    content += HienThiDatKhachSan(object);
  });
  return content;
}

function HienThiTrang() {
  let datourservice = new TourServices();
  let datkhachsanservice = new KhachSanServices();

  let danhsachdattour: DanhSachDatTour = new DanhSachDatTour();
  let danhsachdatkhachsan: DanhSachDatKhachSan = new DanhSachDatKhachSan();
  datourservice.LayDanhSachDatTourService().done(function(data) {
    danhsachdattour.MangDatTour = data;
  });
  datkhachsanservice.LayDanhSachDatKhachSanService().done(function(data) {
    danhsachdatkhachsan.MangDatKhachSan = data;
  });
  let danhsachtour = KiemTraThanhVienDatTour(danhsachdattour.MangDatTour);
  let danhsachkhachsan = KiemTraThanhVienDatKhachSan(danhsachdatkhachsan.MangDatKhachSan);
  let content: string = "";
  let subtotal:any=   TongSoTien(danhsachtour,danhsachkhachsan);



  content = LoadDatTour(danhsachtour) + LoadDatKhachSan(danhsachkhachsan);
  
  $('#total').html(`$${subtotal}`);

  $("#idtbbody").html(content);
}

$("body").delegate(".btnDeleteTour", "click", function() {
  let giohangservice = new GioHangService();
  let matour = $(this).attr("matour");
  giohangservice.XoaDatTourService(account, matour).done(function() {
    swal({
      position: "center",
      type: "success",
      title: "Your Deleted Success !",
      showConfirmButton: false,
      timer: 2500
    });
    HienThiTrang();
  });


});

$("body").delegate(".btnDeleteKS", "click", function() {
  let giohangservice = new GioHangService();
  let makhachsan = $(this).attr('makhachsan');
  giohangservice.XoaDatKhachSanService(account,makhachsan).done(function() {
    swal({
      position: "center",
      type: "success",
      title: "Your Deleted Success !",
      showConfirmButton: false,
      timer: 2500
    });
    HienThiTrang();
  });

});


