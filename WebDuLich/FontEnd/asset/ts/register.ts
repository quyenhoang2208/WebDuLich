import "jquery-validation/dist/jquery.validate.min";
import "../vendor/login_register";
import "../vendor/form_validation";
import "../scss/login.scss";
import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from 'sweetalert2/dist/sweetalert2.js'
import * as $ from "jquery";
import { DanhSachNguoiDung } from "../../app/Models/DanhSachNguoiDung";
import { NguoiDungServices } from "../../app/Services/NguoiDungService";
import { NguoiDung, DangKyUser } from "../../app/Models/NguoiDung";

let danhSachNguoiDung: DanhSachNguoiDung = new DanhSachNguoiDung();
let nguoidungservice: NguoiDungServices = new NguoiDungServices();

localStorage.clear();

nguoidungservice.LayDanhSachNguoiDungService().done(function(data) {
  danhSachNguoiDung.MangNguoiDung = data;
});

$("#login").click(function() {
  let TaiKhoan = $("#taikhoan").val();
  let MatKhau = $("#matkhau").val();
  if (KiemTraRongDangNhap(TaiKhoan, MatKhau)) {
    if (KiemTraDangNhap(TaiKhoan, MatKhau)) {
      let nguoidung: any = KiemTraDangNhap(TaiKhoan, MatKhau);
      if (nguoidung.PhanQuyen.trim() === "01") {
        localStorage.setItem("MaThanhVien", nguoidung.MaThanhVien.trim());
        window.location.href = "/giohang.html";
      } else {
        localStorage.setItem("MaThanhVien", nguoidung.MaThanhVien.trim());
        window.location.href = "/admin.html";
      }
    } else {
      swal("Incorrect Account", "Do you want to login? ", "question");
      $("#taikhoan").val("");
      $("#matkhau").val("");
    }
  } else {
    swal("Please enter the information", " ", "question");
    $("#taikhoan").val("");
    $("#matkhau").val("");
  }
});

function KiemTraDangNhap(TaiKhoan: string, MatKhau: string) {
  for (let i = 0; i < danhSachNguoiDung.MangNguoiDung.length; i++) {
    let nguoidung: NguoiDung = danhSachNguoiDung.MangNguoiDung[i];
    if (
      nguoidung.Password.trim() === MatKhau.trim() &&
      nguoidung.Username.trim() === TaiKhoan.trim()
    ) {
      return nguoidung;
    }
  }
  return false;
}
function KiemTraRongDangNhap(taikhoan: string, matkhau: string) {
  if (taikhoan !== "" && matkhau != "") {
    return true;
  }
  return false;
}
function KiemTRaRongDangKy(mathanhvien, username, pass, hoten, email) {
  if (
    mathanhvien !== "" &&
    username !== "" &&
    pass !== "" &&
    hoten !== "" &&
    email !== ""
  ) {
    return true;
  }
  return false;
}

$("#register").click(function() {
  let MaThanhVien: string = $("#username").val();
  let Username: string = $("#username").val();
  let Password: string = $("#password").val();
  let HoTen: string = $("#name").val();
  let Email: string = $("#email").val();

  if (KiemTRaRongDangKy(MaThanhVien, Username, Password, HoTen, Email)) {
    let nguoidung = new DangKyUser(
      MaThanhVien,
      Username,
      Password,
      HoTen,
      "01",
      Email
    );
    DangKyThanhVienLaUser(nguoidung); 
  }else{
    swal("Please enter the information", " ", "question");
  }

  function DangKyThanhVienLaUser(nguoiDung: DangKyUser) {
    nguoidungservice.DangKyThanhVien(nguoiDung).done(function(res) {
      if (res.kq) {
        swal({
          position: "center",
          type: "success",
          title: "You registered successfully",
          showConfirmButton: false,
          timer: 4000
        });
        window.location.href = "/login.html";
      } else {
        swal(
          "Account already exists",
          "Please register another account",
          "question"
        );
        $("#username").val("");
        $("#password").val("");
        $("#name").val("");
        $("#email").val("");
      }
    });
  }
});
