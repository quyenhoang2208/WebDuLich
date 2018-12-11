import * as $ from "jquery";

import { NguoiDungServices } from "../../app/Services/NguoiDungService";
import { BinhLuan, NguoiDung } from "../../app/Models/NguoiDung";

import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from "sweetalert2/dist/sweetalert2.js";
import { DanhSachNguoiDung } from "../../app/Models/DanhSachNguoiDung";

const mathanhvien: string = localStorage.getItem("MaThanhVien");


let nguoidungservice: NguoiDungServices = new NguoiDungServices();
let danhsachnguoidung: DanhSachNguoiDung = new DanhSachNguoiDung();
nguoidungservice.LayDanhSachNguoiDungService().done(function(data) {
  danhsachnguoidung.MangNguoiDung = data;
});


LayNguoiDungLaUser(danhsachnguoidung.MangNguoiDung);
//Lấy thông tin thành viên lên bảng
function LayNguoiDungLaUser(data: any) {
  data.map(function(nguoidung: NguoiDung) {
    if (nguoidung.MaThanhVien === mathanhvien) {
      $('#ten').html(nguoidung.Username);
      $("#taikhoan").val(nguoidung.Username);
      $("#matkhau").val(nguoidung.Password);
      $("#hoten").val(nguoidung.HoTen);
      $("#email").val(nguoidung.Email);
      $("#diachi").val(nguoidung.DiaChi);
      $("#sodt").val(nguoidung.SoDT);
    }
  });
}
//cập nhật lại thông tin thành viên
$('#update').click(function(){
  let danhsachnguoidung: DanhSachNguoiDung = new DanhSachNguoiDung();
  let nguoidungservice: NguoiDungServices = new NguoiDungServices();

  nguoidungservice.LayDanhSachNguoiDungService().done(function(data) {
    danhsachnguoidung.MangNguoiDung = data;
  });
  LayNguoiDungLaUser(danhsachnguoidung.MangNguoiDung);
  swal({
    position: "center",
    type: "success",
    title: "You Update success !",
    showConfirmButton: false,
    timer: 2500
  });
})
//Lưu thông tin của thành viên 
$('#save').click(function(){
  let MaThanhVien = mathanhvien;
  let TaiKhoan = $("#taikhoan").val();
  let MatKhau = $("#matkhau").val();
  let HoTen = $("#hoten").val();
  let Email = $("#email").val();
  let DiaChi = $("#diachi").val();
  let SoDT = $("#sodt").val();

  let nguoidung:NguoiDung = new NguoiDung(MaThanhVien,TaiKhoan,MatKhau,HoTen,SoDT,DiaChi,"01",Email);
  nguoidungservice.CapNhatThongTinUser(nguoidung).done(function(data){
    swal({
      position: "center",
      type: "success",
      title: "You saved success !",
      showConfirmButton: false,
      timer: 2500
    });
  })
})
//Gửi bình luận của thành viên đó
$("#send").click(function() {
  let mathanhvien: string = localStorage.getItem("MaThanhVien");
  let MaBinhLuan: string = mathanhvien;
  let MaThanhVien: string = mathanhvien;
  let NoiDung: string = $("#noidung").val();
  let binhluan: BinhLuan = new BinhLuan(MaBinhLuan, MaThanhVien, NoiDung);

  nguoidungservice.ThemBinhLuan(binhluan).done(function(data) {
    swal({
      position: "center",
      type: "success",
      title: "You sent success !",
      showConfirmButton: false,
      timer: 2500
    });
    $("#noidung").val("");
  });
});
