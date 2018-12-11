const express = require('express');
const router = express.Router();

const lienhe = require("../controller/QuanLyLienHe");
const khachsan = require("../controller/QuanLyKhachSan");
const tour = require("../controller/QuanLyTour");
const tintuc =  require("../controller/QuanLyTinTuc");
const nguoidung = require("../controller/QuanLyThanhVien");
const binhluan = require("../controller/QuanLyBinhLuan");
const giohang = require("../controller/QuanLyGioHang");



router.get("/DanhSachKhachSan",khachsan.DanhSachKhachSan);
router.get("/ChiTietKhachSan",khachsan.ChiTietLoaiKhachSan);
router.get("/LoaiKhachSan",khachsan.LoaiKhachSan);
router.get("/DanhSachDatKhachSan",khachsan.DanhSachDatKhachSan);





router.get("/DanhSachTour",tour.DanhSachTour);
router.get("/DiemKhoiHanh",tour.DiemKhoiHanh);
router.get("/NgayKhoiHanh",tour.NgayKhoiHanh);
router.get("/DanhSachDatTour",tour.DanhSachDatTour);


router.get("/DanhSachTinTuc",tintuc.DanhSachTinTuc);


router.get("/DanhSachThanhVien",nguoidung.DanhSachThanhVien);
router.post("/ThemThanhVien",nguoidung.ThemNguoiDung );
router.post("/DangKyUser",nguoidung.DangKyUser );
router.post("/CapNhatThongTinUser",nguoidung.CapNhatThongTinUser );



router.get("/DanhSachLienHe",lienhe.DanhSachLienHe);
router.post("/ThemLienHe",lienhe.ThemLienHe);

router.post("/ThemBinhLuan",binhluan.ThemBinhLuan);




//Gio Hang
router.post("/XoaDatTour",giohang.XoaDatTour);
router.post("/XoaDatKhachSan",giohang.XoaKhachSan);

router.post("/DatKhachSan",giohang.ThemDatKhachSan);
router.post("/DatTour",giohang.ThemDatTour);



//Quan ly admin
//admin
router.post("/ThemKhachSan",khachsan.ThemKhachSan);
router.post("/XoaKhachSan",khachsan.XoaKhachSan);
router.post("/CapNhatKhachSan",khachsan.CapNhatKhachSan);
//


//admin
router.post("/ThemTour",tour.ThemTour);
router.post("/XoaTour",tour.XoaTour);
router.post("/CapNhatTour",tour.CapNhatTour);
//


//admin
router.post("/ThemTinTuc",tintuc.ThemTinTuc);
router.post("/XoaTinTuc",tintuc.XoaTinTuc);
router.post("/CapNhatTinTuc",tintuc.CapNhatTinTuc);



//admin
router.post("/ThemNguoiDung",nguoidung.ThemNguoiDung);
router.post("/XoaNguoiDung",nguoidung.XoaNguoiDung);
router.post("/CapNhatNguoiDung",nguoidung.CapNhatNguoiDung);
//




module.exports = router;
