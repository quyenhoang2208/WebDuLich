

import* as  $ from 'jquery';
import { TourServices } from '../../app/Services/TourService';
import { DanhSachTour } from '../../app/Models/DanhSachTour';
import { KhachSanServices } from '../../app/Services/KhachSanService';
import { DanhSachKhachSan } from '../../app/Models/DanhSachKhachSan';
import { TinTucServices } from '../../app/Services/TinTucService';
import { DanhSachTinTuc } from '../../app/Models/DanhSachTinTuc';
import { Guest } from '../../app/Models/Guest';
import { LienHeServices } from '../../app/Services/LienHeService';
import { KhachSan } from '../../app/Models/KhachSan';
import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from 'sweetalert2/dist/sweetalert2.js'
import { LoadSelectTour, LoadDiaDiem, LoadNgayKhoiHanh } from '../../app/Controllers/XuLyTour';
import { LoadTinTuc } from '../../app/Controllers/XyLyTinTuc';


localStorage.clear();

let tourService = new TourServices();
let danhSachTour = new DanhSachTour();

let khachSanService = new KhachSanServices();
let danhSachKhachSan = new DanhSachKhachSan();


let tinTucService = new TinTucServices();
let danhSachTinTuc = new DanhSachTinTuc();
let danhsachdiadiem:[] = [];
let danhsachngaykhoihanh:[] = [];
let danhSachLoaiKhachSan:[] = [];


let contentTour:string = "";

let contentHotel:string = "";
let contentGioiThieu:string="";

tourService.LayDanhSachTourService().done(function(data:any){
   danhSachTour.MangTour = data;
})
tourService.LayDiaDiemTourService().done(function(data:any){
  danhsachdiadiem = data;
})
tourService.LayNgayKhoiHanhTourService().done(function(data:any){
  danhsachngaykhoihanh = data;

})

khachSanService.LayLoaiKhachSan().done(function(data:any){
  danhSachLoaiKhachSan = data;  
})
khachSanService.LayDanhSachKhachSanService().done(function(data:any){
  danhSachKhachSan.MangKhachSan = data;
})
tinTucService.LayDanhSachTinTucService().done(function(data:any){
  danhSachTinTuc.MangTinTuc= data;
})

LoadSelectTour(danhSachTour.MangTour);

LoadDiaDiem(danhsachdiadiem);

LoadNgayKhoiHanh(danhsachngaykhoihanh)

LoadTour(danhSachTour.MangTour);

LoadKhachSan(danhSachKhachSan.MangKhachSan);

GioiThieu(danhSachKhachSan.MangKhachSan,danhSachTour.MangTour);

LoadTinTuc(danhSachTinTuc.MangTinTuc);
/*----------------------Bat Dau Tim Kiem Tour-------------------*/ 
//kiem tra disable

$('#selectnametour').prop('disabled', false);
$('#selectlocation').prop('disabled', false);
$('#selectday').prop('disabled', false);


$('#selectnametour').click(function(){
 
   $('#selectlocation').prop('disabled', true);
   $('#selectday').prop('disabled', true);
})


$('#selectlocation').click(function(){
  
  $('#selectnametour').prop('disabled', true);
  $('#selectday').prop('disabled', true);
})

$('#selectday').click(function(){
  
  $('#selectnametour').prop('disabled', true);
  $('#selectlocation').prop('disabled', true);
})

//Tim Kiem Tour
$('.search-tour').click(function(){
  let a:string = $('#selectnametour').val();
  let b:string = $('#selectlocation').val();
  let c:string = $('#selectday').val();
 
  if(a != ""){
    localStorage.setItem('MaTour',a);
    window.location.href = "/detailTour.html";
  }else if(b != ""){
    localStorage.setItem('DiemKhoiHanh',b);
    window.location.href = "/toursearch.html"
  }else if(c != ""){
    localStorage.setItem('NgayKhoiHanh',c);
    window.location.href = "/tourSearchDay.html"
  }

})


/*----------------------Ket Thuc Tim Kiem Tour-------------------*/ 

function LoadTour(data){
  data.map(function(tour:any,index){
    if(index<8){

      contentTour += `   
    <div class="col-md-6 col-lg-3">
    <a href="#" class="block-5" style="background-image: url('${tour.AnhTour}');">
      <div class="text">
      <span class="price">Price:$ ${tour.GiaTour}</span>
      <h3 class="heading">${tour.TenTour}</h3>
      <div class="post-meta">
        <span>${tour.GioiThieu}</span>
      </div>
        <p class="star-rate"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half-full"></span> <span>500 reviews</span></p>
      </div>
    </a>
  </div>
       
    `;
    }


  })
  $('.dstours').html(contentTour);
}


function LoadKhachSan(data:any){
  data.map(function(khachsan:any,index){
    if(index < 3){

      contentHotel += `   
    
    <div class="col-md-4 ">
    <a href="#" class="block-5" style="background-image: url('${khachsan.AnhKhachSan}');">
      <div class="text">
      <span class="price">${khachsan.GioiThieu}</span>
        <h3 class="heading">${khachsan.TenKhachSan}</h3>
      
        <p class="star-rate"><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star"></span><span class="icon-star-half-full"></span> <span>500 reviews</span></p>
      </div>
    </a>
    </div>
    `;
    }
  })
  $('.dskhachsan').html(contentHotel);
}

function GioiThieu(dataKS:any,dataTour:any){
  dataKS.map(function(khachsan:any,index){
    if(index < 2){

      contentGioiThieu += `   
    
      <div class="col-lg-3 promo ">
      <a href="#" class="promo-img mb-4" style="background-image: url('${khachsan.AnhKhachSan}');"></a>
      <div class="text text-center">
        <h2>${khachsan.TenKhachSan}</h2>
        <h3 class="price"><span>from</span> $299</h3>
        <a href="#" makhachsan ="${khachsan.MaKhachSan}" class="hotelRead">Read more</a>
      </div>
    </div>
    `;
    }
  })


  dataTour.map(function(tour:any,index){
    if(index < 2){

      contentGioiThieu += `   
      <div class="col-lg-3 promo ">
      <a href="#" class="promo-img mb-4" style="background-image: url('${tour.AnhTour}');"></a>
      <div class="text text-center">
        <h2>${tour.TenTour}</h2>
        <h3 class="price"><span>from</span>$ ${tour.GiaTour}</h3>
        <a href="#"  matour ="${tour.MaTour}" class="tourRead">Read more</a>
      </div>
    </div>
    `;
    }
  })
  $('.gioithieu').html(contentGioiThieu);
}


$('body').delegate('.hotelRead','click',function(){
  let makhachsan:string = $(this).attr('makhachsan');
  localStorage.setItem("MaKhachSan",makhachsan);
   window.location.href = "/detailHotel.html";
})


$('body').delegate('.tourRead','click',function(){
  let matour:string = $(this).attr('matour');
  localStorage.setItem("MaTour",matour);
   window.location.href = "./detailTour.html";
})


$('body').delegate('.read','click',function(){
  window.location.href = "/blogDetail.html";
  let matintuc:string = $(this).attr('matintuc');
  localStorage.setItem("MaTinTuc", matintuc);
})


/*---------------Bat Dau Tim Kiem Khach San-------------------*/ 


LoadSelectHotel( danhSachKhachSan.MangKhachSan);
LoadSelectKindHotel(danhSachLoaiKhachSan);

function LoadSelectHotel(data:any) {
  let contentOptionName: string = "";
  let contentSelectName: string = "";
  data.map(function(khachsan: KhachSan) {
    contentOptionName += `
       <option style="color:black" value="${khachsan.MaKhachSan}">${
      khachsan.TenKhachSan
    }</option>`;
  });
  contentSelectName =
    `<option class="text-center" style="color:red" value="">Select Name Hotel</option>` +
    contentOptionName;
  $("#selectnamehotel").html(contentSelectName);
}

 function LoadSelectKindHotel(data:any) {
  let contentOptionKind: string = "";
  let contentSelectKind: string = "";
  data.map(function(loai: any) {
    contentOptionKind += `
       <option style="color:black" value="${loai.MaLoai}">${
      loai.TenLoai
    }</option>`;
  });
  contentSelectKind =
    `<option class="text-center" style="color:red" value="">Select Type of Hotel</option>` +
    contentOptionKind;
  $("#selecttypeofhotel").html(contentSelectKind);
}

$('#selectnamehotel').prop('disabled', false);
$('#selecttypeofhotel').prop('disabled', false);


$('#selectnamehotel').click(function(){
 
   $('#selecttypeofhotel').prop('disabled', true);
})


$('#selecttypeofhotel').click(function(){
  
  $('#selectnamehotel').prop('disabled', true);
})


$('.search-hotel').click(function(){
  let makhachsan:string = $('#selectnamehotel').val();
  let loaikhachsan:string = $('#selecttypeofhotel').val();
 
  if( makhachsan != ""){
    localStorage.setItem('MaKhachSan',makhachsan);
    window.location.href = "/detailHotel.html";
  }else if(loaikhachsan != ""){
    localStorage.setItem('MaLoai',loaikhachsan);
    window.location.href = "/hotelSearchType.html"
  }
})


//Gui email for subscribe

let lienheservice: LienHeServices = new LienHeServices();
$('#sendEmail').click(res=>{

   let Email:string = $('#subscribe').val();
  if(Email !==""){
    let guest: Guest = new Guest("An Danh", Email, "Subscribe", "Gửi email subscribe");
    lienheservice.ThemLienHe(guest).done(function(res) {
      swal({
        position: 'center',
        type: 'success',
        title: 'Thank You Subscribed !',
        showConfirmButton: false,
        timer: 2500
      })
      $('#subscribe').val('')
    })
  }else{
    swal({
      position: 'center',
      type: 'warning',
      title: 'Please Enter Your Email!',
      showConfirmButton: false,
      timer: 2000
    })
  }
   
})