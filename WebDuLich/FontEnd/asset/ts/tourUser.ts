

import* as  $ from 'jquery';
import { TourServices } from '../../app/Services/TourService';
import { DanhSachTour } from '../../app/Models/DanhSachTour';
import { KhachSanServices } from '../../app/Services/KhachSanService';
import { DanhSachKhachSan } from '../../app/Models/DanhSachKhachSan';
import { DanhSachTinTuc } from '../../app/Models/DanhSachTinTuc';
import { TinTucServices } from '../../app/Services/TinTucService';
import { LoadDiaDiem, LoadNgayKhoiHanh, LoadSelectTour } from '../../app/Controllers/XuLyTour';
import { GioHangService } from '../../app/Services/GioHangService';

import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from 'sweetalert2/dist/sweetalert2.js'
let tourService = new TourServices();
let danhSachTour = new DanhSachTour();


let khachSanService = new KhachSanServices();
let danhSachKhachSan = new DanhSachKhachSan();


let tinTucService = new TinTucServices();
let danhSachTinTuc = new DanhSachTinTuc();
let danhsachdiadiem:[] = [];
let danhsachngaykhoihanh:[] = [];

tinTucService.LayDanhSachTinTucService().done(function(data:any){
  danhSachTinTuc.MangTinTuc= data;
})

khachSanService.LayDanhSachKhachSanService().done(function(data:any){
    danhSachKhachSan.MangKhachSan = data;  
})

tourService.LayDanhSachTourService().done(function(data:any){
   danhSachTour.MangTour = data;
})

tourService.LayDiaDiemTourService().done(function(data:any){
  danhsachdiadiem = data;
})
tourService.LayNgayKhoiHanhTourService().done(function(data:any){
  danhsachngaykhoihanh = data;

})


LoadTour(danhSachTour.MangTour,1);
Pagination(danhSachTour.MangTour.length,4);

function LoadTour(data,pageNum){
  let content:string = "";
  let startIndex = (pageNum-1)*4;
  let endIndex = startIndex + 4;
  let pageData = data.slice(startIndex,endIndex)
  pageData.map(function(tour:any){
    content += `   
   
    <div class="col-md-6 col-lg-6 mb-4">
    <a href="#" class="block-5" style="background-image: url('${tour.AnhTour}');">
      <div class="text">
        <span class="price">Price: $ ${tour.GiaTour}</span>
        <h3 class="heading">${tour.TenTour}</h3>
        <div class="post-meta">
        <button matour = "${tour.MaTour}" class="btn btn-outline-warning ml-auto btnbuy" >Buy</button>
        <span class= "ml-5">${tour.GioiThieu} </span>
        </div>
      </div>
    </a>
  </div>
    `;
  })
  $('.dstour').html(content);

}



function Pagination(dataLength,recordsPerPage){
  let list:string = "";
  let hienthi:number = Math.ceil(dataLength/recordsPerPage);
   for(let i = 1; i<= hienthi;i++){
       list += `<li class = "itemNumber"><a href="#">${i}</a></li> `
   }

   $('#pagination').html(list);
   $('.itemNumber:first').addClass('active');

}
$("#pagination").on('click',function(e){
  var pageNum = parseInt($(e.target).text());
  $('ul li.active').removeClass('active');
  $(e.target).closest('li').addClass("active");
  LoadTour(danhSachTour.MangTour,pageNum);
});


$('body').delegate('.btnbuy','click',function(){
  let giohangservice = new GioHangService();
  let matour = $(this).attr('matour');
  let mathanhvien = localStorage.getItem('MaThanhVien');
  let soluongkhach = $('#sokhach').val();
  giohangservice.DatTourService(mathanhvien,matour,soluongkhach).done(function(){
    swal({
      position: 'center',
      type: 'success',
      title: 'Thank You Subscribed !',
      showConfirmButton: false,
      timer: 2500
    })
  });

  window.location.href = '/giohang.html';
})


$('#numberNew').html(`(${danhSachTinTuc.MangTinTuc.length})`);
$('#numberTour').html(`(${danhSachTour.MangTour.length})`);
$('#numberHotel').html(`(${danhSachKhachSan.MangKhachSan.length})`);


//Tim Kiem Tour

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


$('.search-submit').click(function(){
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

LoadDiaDiem(danhsachdiadiem);
LoadNgayKhoiHanh(danhsachngaykhoihanh);
LoadSelectTour(danhSachTour.MangTour);
