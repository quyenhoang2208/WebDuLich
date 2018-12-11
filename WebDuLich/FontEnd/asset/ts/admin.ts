import* as  $ from 'jquery';
import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';
import swal from 'sweetalert2/dist/sweetalert2.js'

import { KhachSanServices } from '../../app/Services/KhachSanService';
import { DanhSachKhachSan } from '../../app/Models/DanhSachKhachSan';
import {KhachSan} from '../../app/Models/KhachSan'

import {TourServices} from '../../app/Services/TourService';
import {DanhSachTour} from '../../app/Models/DanhSachTour';
import {Tour} from '../../app/Models/Tour'

import {NguoiDungServices} from '../../app/Services/NguoiDungService';
import {DanhSachNguoiDung} from '../../app/Models/DanhSachNguoiDung';
import {NguoiDung, NguoiDungAdmin} from '../../app/Models/NguoiDung'

import {TinTucServices} from '../../app/Services/TinTucService';
import {DanhSachTinTuc} from '../../app/Models/DanhSachTinTuc';
import {TinTuc} from '../../app/Models/TinTuc'



//---------------- QUAN LI KHACH SAN ---------------
HienThiKhachSan();
function HienThiKhachSan(){
    let khachSanSV = new KhachSanServices();
    let danhSachKS = new DanhSachKhachSan();
    khachSanSV.LayDanhSachKhachSanService().done(function(data:any){
        danhSachKS.MangKhachSan = data;
        LoadKhachSan(danhSachKS.MangKhachSan);
    }).fail(function(error){
        alert("error");
    })
}
function LoadKhachSan(data:any){
    let contentKS: string ="";
    data.map(function(kq:KhachSan){
        contentKS += `
        <tr>
        <td>${kq.MaKhachSan}</td>
        <td>${kq.MaLoai}</td>
        <td>${kq.TenKhachSan}</td>
        <td>${kq.GioiThieu}</td>
        <td><img src=${kq.AnhKhachSan} style="width:100px"/></td>
        <td>
        <button maKhachSan="${kq.MaKhachSan}" class="btn btn-danger btnXoaKhachSan">Xóa</button>
        <button layMaKhachSan="${kq.MaKhachSan}" class="btn btn-success btnSuaKhachSan" data-toggle="modal" data-target="#myModalKhachSan">Sửa</button>
        </td>
        </tr>
        `
    })
   $('#tbodyKhachSan').html(contentKS);
}
//xoa khach san
$('body').delegate('.btnXoaKhachSan', 'click', function () {
  
    let khachSanSV = new KhachSanServices();
    let khachSan = $(this).attr('maKhachSan');
    swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            swal(
                // 'Deleted!',
                // 'Xóa thành công.',
                // 'success',
                {
                position: 'center',
                type: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500,
            })
            khachSanSV.XoaKhachSan(khachSan).done(function(ketqua)
            {
                if(ketqua){
                    HienThiKhachSan();
                }
            }) 
        }
    
    })
})
//them khach san
$('body').delegate('#btnThemKhachSan', 'click', function () {
    $('.modal-header').html("***THÊM KHÁCH SẠN***");
    var modalFooter = `<button class = "btn btn-danger btnThemKs" data-dismiss="modal" >Thêm Khách Sạn</button>
                            <button class = "btn btn-success btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);
    $('.modal-body input').val('');
});
$('body').delegate('.btnThemKs', 'click', function () {
    let khachSanSV = new KhachSanServices();

    let MaKhachSan =$("#MaKhachSan").val();
    let MaLoai =$("#LoaiKhachSan").val();
    let TenKhachSan=$("#TenKhachSan").val() ;
    let GioiThieu=$("#GioiThieu").val() ;
    let AnhKhachSan =$("#AnhKhachSan").val();
    
    let khachSan=new KhachSan(MaKhachSan,MaLoai,TenKhachSan,GioiThieu,AnhKhachSan);
    khachSanSV.ThemKhachSan(khachSan).done(function(ketqua){
      if(ketqua){
        HienThiKhachSan();
      }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Thêm thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//chinh sua khach san
$('body').delegate('.btnSuaKhachSan','click',function(){
    let danhSachKS = new DanhSachKhachSan();
    let khachSanSV = new KhachSanServices();

    khachSanSV.LayDanhSachKhachSanService().done(function(data){
        danhSachKS.MangKhachSan=data;
    })
    

    $('.modal-header').html("***SỬA KHÁCH SẠN***");
    var modalFooter = `<button class = "btn btn-danger btnSuaKs" data-dismiss="modal">Lưu thông tin</button>
                            <button class = "btn btn-dark btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);

    let maKhachSan= $(this).attr("layMaKhachSan");
    let khachSan : any = danhSachKS.LayThongTinKhachSan(maKhachSan);

     if(khachSan !=null){
         $("#MaKhachSan").val(khachSan.MaKhachSan);
         $("#LoaiKhachSan").val(khachSan.MaLoai);
         $("#TenKhachSan").val(khachSan.TenKhachSan);
         $("#GioiThieu").val(khachSan.GioiThieu);
         $("#AnhKhachSan").val(khachSan.AnhKhachSan);
     }
})
$('body').delegate('.btnSuaKs', 'click', function () {

    let khachSanSV = new KhachSanServices();
    
    let MaKhachSan =$("#MaKhachSan").val();
    let MaLoai =$("#LoaiKhachSan").val();
    let TenKhachSan=$("#TenKhachSan").val() ;
    let GioiThieu=$("#GioiThieu").val() ;
    let AnhKhachSan =$("#AnhKhachSan").val();

    let khachSan = new KhachSan(MaKhachSan,MaLoai,TenKhachSan,GioiThieu,AnhKhachSan);
    khachSanSV.CapNhatKhachSan(khachSan).done(function(ketqua){
        if(ketqua){
            HienThiKhachSan();
        }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//Tìm kiếm tên khách sạn
$("#txtNhapTenKS").keyup(function () {
    let khachSanSV = new KhachSanServices();
    let danhSachKS = new DanhSachKhachSan();

    let key: string = $(this).val().toString().trim().toLowerCase();

    khachSanSV.LayDanhSachKhachSanService().done(function(data){
        danhSachKS.MangKhachSan=data;
    })
    let mangCanTim = danhSachKS.TimKhachSanTheoTen(key);  
    
    LoadKhachSan(mangCanTim.MangKhachSan);
})



//---------------- QUAN LI TOUR ---------------
HienThiTour();
function HienThiTour(){
    let tourSV = new TourServices();
    let danhSachTour = new DanhSachTour();
    tourSV.LayDanhSachTourService().done(function(data:any){
        danhSachTour.MangTour= data;
        LoadTour(danhSachTour.MangTour);
    }).fail(function(error){
        alert("error");
    })
}
function LoadTour(data:any){
    let contentTour: string ="";
    data.map(function(kq:Tour){
        contentTour += `
        <tr>
        <td>${kq.MaTour}</td>
        <td>${kq.TenTour}</td>
        <td>${kq.GioiThieu}</td>
        <td><img src=${kq.AnhTour} style="width:100px"/></td>
        <td>${kq.NgayKhoiHanh.slice(0,10)}</td>
        <td>${kq.DiemKhoiHanh}</td>
        <td>${kq.GiaTour} $ </td>
        <td>
        <button maTour="${kq.MaTour}" class="btn btn-danger btnXoaTour">Xóa</button>
        <button layMaTour="${kq.MaTour}" class="btn btn-success btnSuaTour" data-toggle="modal" data-target="#myModalTour">Sửa</button>
        </td>
        </tr>
        `
    })
   $('#tbodyTour').html(contentTour);
}
//xoa tour
$('body').delegate('.btnXoaTour', 'click', function () {
    let tourSV = new TourServices();

    let tour = $(this).attr('maTour');
    swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            swal(
                {
                position: 'center',
                type: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500,
            })
            tourSV.XoaTour(tour).done(function(ketqua)
            {
                if(ketqua){
                    HienThiTour();
                }
            }) 
        }
    
    })
})
//them tour
$('body').delegate('#themTour', 'click', function () {
    $('.modal-header').html("***THÊM TOUR***");
    var modalFooter = `<button class = "btn btn-danger btnThemT" data-dismiss="modal" >Thêm Tour</button>
                            <button class = "btn btn-success btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);
    $('.modal-body input').val('');
});
$('body').delegate('.btnThemT', 'click', function () {
    let tourSV = new TourServices();

    let MaTour =$("#MaTour").val();
    let TenTour =$("#TenTour").val();
    let GioiThieu =$("#GioiThieu").val();
    let AnhTour=$("#AnhTour").val() ;
    let NgayKhoiHanh=$("#NgayKhoiHanh").val();
    let DiemKhoiHanh =$("#DiemKhoiHanh").val();
    let GiaTour =$("#GiaTour").val();
    
    let tour = new Tour(MaTour,TenTour,GioiThieu,AnhTour,NgayKhoiHanh,DiemKhoiHanh,GiaTour);
    tourSV.ThemTour(tour).done(function(ketqua){
      if(ketqua){
        HienThiTour();
      }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Thêm thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//chinh sua tour
$('body').delegate('.btnSuaTour','click',function(){
    let tourSV = new TourServices();
    let danhSachTour = new DanhSachTour();

    tourSV.LayDanhSachTourService().done(function(data){
        danhSachTour.MangTour=data;
    })
    
    $('.modal-header').html("***SỬA TOUR***");
    var modalFooter = `<button class = "btn btn-danger btnSuaT" data-dismiss="modal">Lưu thông tin</button>
                            <button class = "btn btn-dark btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);

    let maTour= $(this).attr("layMaTour");
    let tour : any = danhSachTour.LayThongTinTour(maTour);

     if(tour !=null){
         $("#MaTour").val(tour.MaTour);
         $("#TenTour").val(tour.TenTour);
         $("#GioiThieu").val(tour.GioiThieu);
         $("#AnhTour").val(tour.AnhTour);
         $("#NgayKhoiHanh").val(tour.NgayKhoiHanh);
         $("#DiemKhoiHanh").val(tour.DiemKhoiHanh);
         $("#GiaTour").val(tour.GiaTour);
     }
})
$('body').delegate('.btnSuaT', 'click', function () {

    let tourSV = new TourServices();

    let MaTour =$("#MaTour").val();
    let TenTour =$("#TenTour").val();
    let GioiThieu=$("#GioiThieu").val() ;
    let AnhTour =$("#AnhTour").val();
    let NgayKhoiHanh =$("#NgayKhoiHanh").val();
    let DiemKhoiHanh =$("#DiemKhoiHanh").val();
    let GiaTour =$("#GiaTour").val();
    
    let tour = new Tour(MaTour,TenTour,GioiThieu,AnhTour,NgayKhoiHanh,DiemKhoiHanh,GiaTour);
    tourSV.CapNhatTour(tour).done(function(ketqua){
        if(ketqua){
            HienThiTour();
        }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//Tìm kiếm tour
$("#txtNhapTour").keyup(function () {
    let tourSV = new TourServices();
    let danhSachTour = new DanhSachTour();

    let key: string = $(this).val().toString().trim().toLowerCase();

    tourSV.LayDanhSachTourService().done(function(data){
        danhSachTour.MangTour=data;
    })

    let mangCanTim = danhSachTour.TimTourTheoDiaDiem(key);
    
    LoadTour(mangCanTim.MangTour);
})


//---------------- QUAN LI NGUOI DUNG ---------------
HienThiNguoiDung();
function HienThiNguoiDung(){
    let nguoiDungSV = new NguoiDungServices();
    let danhSachND = new DanhSachNguoiDung();
    nguoiDungSV.LayDanhSachNguoiDungService().done(function(data:any){
        danhSachND.MangNguoiDung = data;
        LoadNguoiDung(danhSachND.MangNguoiDung);
    }).fail(function(error){
        alert("error");
    })
}
function LoadNguoiDung(data:any){
    let contentND: string ="";
    data.map(function(kq:NguoiDung){
        contentND += `
        <tr>
        <td>${kq.MaThanhVien}</td>
        <td>${kq.Username}</td>
        <td>${kq.Password}</td>
        <td>${kq.HoTen}</td>
        <td>${kq.SoDT}</td>
        <td>${kq.DiaChi}</td>
        <td>${kq.PhanQuyen}</td>
        <td>
        <button maNguoiDung="${kq.MaThanhVien}" class="btn btn-danger btnXoaNguoiDung">Xóa</button>
        <button layMaNguoiDung="${kq.MaThanhVien}" class="btn btn-success btnSuaNguoiDung" data-toggle="modal" data-target="#myModalUser">Sửa</button>
        </td>
        </tr>
        `
    })
   $('#tbodyUser').html(contentND);
}
//xoa nguoi dung
$('body').delegate('.btnXoaNguoiDung', 'click', function () {
  
    let nguoiDungSV = new NguoiDungServices();
    let danhSachND = new DanhSachNguoiDung();
 
    let nguoiDung = $(this).attr('maNguoiDung');
    swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            swal(
                {
                position: 'center',
                type: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500,
            })
            nguoiDungSV.XoaNguoiDung(nguoiDung).done(function(ketqua)
            {
                if(ketqua){
                    HienThiNguoiDung();
                }
            }) 
        }
    
    })
})
//thêm người dùng
$('body').delegate('#btnThemUser', 'click', function () {
    $('.modal-header').html("***THÊM NGƯỜI DÙNG***");
    var modalFooter = `<button class = "btn btn-danger btnThemNd" data-dismiss="modal" >Thêm Người Dùng</button>
                            <button class = "btn btn-success btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);
    $('.modal-body input').val('');
});
$('body').delegate('.btnThemNd', 'click', function () {
    let nguoiDungSV = new NguoiDungServices();

    let MaThanhVien =$("#MaThanhVien").val();
    let Username =$("#Username").val();
    let Password=$("#Password").val() ;
    let HoTen=$("#HoTen").val() ;
    let SoDT=$("#SoDT").val();
    let DiaChi =$("#DiaChi").val();
    let PhanQuyen =$("#PhanQuyen").val();
    
    let nguoiDung:any  = new NguoiDungAdmin(MaThanhVien,Username,Password,HoTen,SoDT,DiaChi,PhanQuyen);

    nguoiDungSV.ThemNguoiDungAdmin(nguoiDung).done(function(ketqua){
      if(ketqua){
        HienThiNguoiDung();
      }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Thêm thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//chinh sua nguoi dung
$('body').delegate('.btnSuaNguoiDung','click',function(){
    let nguoiDungSV = new NguoiDungServices();
    let danhSachND = new DanhSachNguoiDung();

    nguoiDungSV.LayDanhSachNguoiDungService().done(function(data){
        danhSachND.MangNguoiDung=data;
    })
    

    $('.modal-header').html("***SỬA NGƯỜI DÙNG***");
    var modalFooter = `<button class = "btn btn-danger btnSuaNd" data-dismiss="modal">Lưu thông tin</button>
                            <button class = "btn btn-dark btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);

    let maNguoiDung= $(this).attr("layMaNguoiDung");
    let nguoiDung : any = danhSachND.LayThongTinNguoiDung(maNguoiDung);

     if(nguoiDung !=null){
         $("#MaThanhVien").val(nguoiDung.MaThanhVien);
         $("#Username").val(nguoiDung.Username);
         $("#Password").val(nguoiDung.Password);
         $("#HoTen").val(nguoiDung.HoTen);
         $("#SoDT").val(nguoiDung.SoDT);
         $("#DiaChi").val(nguoiDung.DiaChi);
         $("#PhanQuyen").val(nguoiDung.PhanQuyen);
     }
})
$('body').delegate('.btnSuaNd', 'click', function () {

    let nguoiDungSV = new NguoiDungServices();
    let danhSachND = new DanhSachNguoiDung();

    let MaThanhVien =$("#MaThanhVien").val();
    let Username =$("#Username").val();
    let Password=$("#Password").val() ;
    let HoTen=$("#HoTen").val() ;
    let SoDT =$("#SoDT").val();
    let DiaChi =$("#DiaChi").val();
    let PhanQuyen =$("#PhanQuyen").val();

    let nguoiDung:any = new NguoiDungAdmin(MaThanhVien,Username,Password,HoTen,SoDT,DiaChi,PhanQuyen);
    nguoiDungSV.CapNhatNguoiDung(nguoiDung).done(function(ketqua){
        if(ketqua){
            HienThiNguoiDung();
        }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//Tìm kiếm tên người dùng
$("#txtNhapTenUser").keyup(function () {
    let nguoiDungSV = new NguoiDungServices();
    let danhSachND = new DanhSachNguoiDung();

    let key: string = $(this).val().toString().trim().toLowerCase();

    nguoiDungSV.LayDanhSachNguoiDungService().done(function(data){
        danhSachND.MangNguoiDung=data;
    })
    let mangCanTim = danhSachND.TimNguoiDungTheoTen(key);  
    
    LoadNguoiDung(mangCanTim.MangNguoiDung);
})



//---------------- QUAN LI TIN TUC ---------------
HienThiTinTuc();
function HienThiTinTuc(){
    let tinTucSV = new TinTucServices();
    let danhSachTT = new DanhSachTinTuc();

    tinTucSV.LayDanhSachTinTucService().done(function(data:any){
        danhSachTT.MangTinTuc = data;
        LoadTinTuc(danhSachTT.MangTinTuc);
    }).fail(function(error){
        alert("error");
    })
}
function LoadTinTuc(data:any){
    let contentTT: string ="";
    data.map(function(kq:TinTuc){
        contentTT += `
        <tr>
        <td>${kq.MaTinTuc}</td>
        <td><img src=${kq.AnhTinTuc} style="width:100px"/></td>
        <td>${kq.NoiDungTin}</td>
        <td>${kq.NgayDangTin.slice(0,10)}</td>
        <td>${kq.TieuDeTin}</td>
        <td>
        <button maTinTuc="${kq.MaTinTuc}" class="btn btn-danger btnXoaTinTuc">Xóa</button>
        <button layMaTinTuc="${kq.MaTinTuc}" class="btn btn-success btnSuaTinTuc" data-toggle="modal" data-target="#myModalTinTuc">Sửa</button>
        </td>
        </tr>
        `
    })
   $('#tbodyTinTuc').html(contentTT);
}
//xóa tin tức
$('body').delegate('.btnXoaTinTuc', 'click', function () {
  
    let tinTucSV = new TinTucServices();

    let tinTuc = $(this).attr('maTinTuc');
    swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            swal(
                // 'Deleted!',
                // 'Xóa thành công.',
                // 'success',
                {
                position: 'center',
                type: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500,
            })
            tinTucSV.XoaTinTuc(tinTuc).done(function(ketqua)
            {
                if(ketqua){
                    HienThiTinTuc();
                }
            }) 
        }
    
    })
})
//thêm tin tức
$('body').delegate('#btnThemTinTuc', 'click', function () {
    $('.modal-header').html("***THÊM TIN TỨC***");
    var modalFooter = `<button class = "btn btn-danger btnThemTt" data-dismiss="modal" >Thêm Tin tức</button>
                            <button class = "btn btn-success btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);
    $('.modal-body input').val('');
});
$('body').delegate('.btnThemTt', 'click', function () {
    let tinTucSV = new TinTucServices();

    let MaTinTuc =$("#MaTinTuc").val();
    let AnhTinTuc =$("#AnhTinTuc").val();
    let NoiDungTin=$("#NoiDungTin").val() ;
    let NgayDangTin=$("#NgayDangTin").val() ;
    let TieuDeTin =$("#TieuDeTin").val();
    
    let tinTuc=new TinTuc(MaTinTuc,AnhTinTuc,NoiDungTin,NgayDangTin,TieuDeTin);
    tinTucSV.ThemTinTuc(tinTuc).done(function(ketqua){
      if(ketqua){
        HienThiTinTuc();
      }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Thêm thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//chinh sua tin tuc
$('body').delegate('.btnSuaTinTuc','click',function(){
    let tinTucSV = new TinTucServices();
    let danhSachTT = new DanhSachTinTuc();

    tinTucSV.LayDanhSachTinTucService().done(function(data){
        danhSachTT.MangTinTuc=data;
    })
    

    $('.modal-header').html("***SỬA TIN TỨC***");
    var modalFooter = `<button class = "btn btn-danger btnSuaTt" data-dismiss="modal">Lưu thông tin</button>
                            <button class = "btn btn-dark btnHuy" data-dismiss="modal" >Hủy</button>`;
    $('.modal-footer').html(modalFooter);

    let maTinTuc= $(this).attr("layMaTinTuc");
    let tinTuc : any = danhSachTT.LayThongTinTinTuc(maTinTuc);

     if(tinTuc !=null){
         $("#MaTinTuc").val(tinTuc.MaTinTuc);
         $("#AnhTinTuc").val(tinTuc.AnhTinTuc);
         $("#NoiDungTin").val(tinTuc.NoiDungTin);
         $("#NgayDangTin").val(tinTuc.NgayDangTin);
         $("#TieuDeTin").val(tinTuc.TieuDeTin);
     }
})
$('body').delegate('.btnSuaTt', 'click', function () {

    let tinTucSV = new TinTucServices();
    
    let MaTinTuc =$("#MaTinTuc").val();
    let AnhTinTuc =$("#AnhTinTuc").val();
    let NoiDungTin=$("#NoiDungTin").val() ;
    let NgayDangTin=$("#NgayDangTin").val() ;
    let TieuDeTin =$("#TieuDeTin").val();

    let tinTuc = new TinTuc(MaTinTuc,AnhTinTuc,NoiDungTin,NgayDangTin,TieuDeTin);
    tinTucSV.CapNhatTinTuc(tinTuc).done(function(ketqua){
        if(ketqua){
            HienThiTinTuc();
        }
    }).fail(function(err){
        alert("error");
    })
    swal({
        position: 'center',
        type: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
    })
});
//Tìm kiếm tên 
$("#txtNhapTenTinTuc").keyup(function () {
    let tinTucSV = new TinTucServices();
    let danhSachTT = new DanhSachTinTuc();

    let key: string = $(this).val().toString().trim().toLowerCase();

    tinTucSV.LayDanhSachTinTucService().done(function(data){
        danhSachTT.MangTinTuc=data;
    })
    let mangCanTim = danhSachTT.TimTinTucTheoTen(key);  
    
    LoadTinTuc(mangCanTim.MangTinTuc);
})
