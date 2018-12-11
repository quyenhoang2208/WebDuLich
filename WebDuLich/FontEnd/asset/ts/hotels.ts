

import* as  $ from 'jquery';


import { KhachSanServices } from "../../app/Services/KhachSanService";
import { DanhSachKhachSan } from "../../app/Models/DanhSachKhachSan";
import { TourServices } from '../../app/Services/TourService';
import { DanhSachTour } from '../../app/Models/DanhSachTour';
import { TinTucServices } from '../../app/Services/TinTucService';
import { DanhSachTinTuc } from '../../app/Models/DanhSachTinTuc';
import { LoadSelectHotel, LoadSelectKindHotel } from '../../app/Controllers/XyLyKhachSan';

let khachSanService = new KhachSanServices();
let danhSachKhachSan = new DanhSachKhachSan();
let danhSachLoaiKhachSan:[] = [];


let tourService = new TourServices();
let danhSachTour = new DanhSachTour();


let tinTucService = new TinTucServices();
let danhSachTinTuc = new DanhSachTinTuc();


tourService.LayDanhSachTourService().done(function(data:any){
  danhSachTour.MangTour = data;
})


tinTucService.LayDanhSachTinTucService().done(function(data:any){
  danhSachTinTuc.MangTinTuc= data;
})

khachSanService.LayDanhSachKhachSanService().done(function(data:any){
    danhSachKhachSan.MangKhachSan = data;  
})
khachSanService.LayLoaiKhachSan().done(function(data:any){
  danhSachLoaiKhachSan = data;  
})
/*---------------Bat Dau Tim Kiem Khach San-------------------*/ 


$('#selectnamehotel').prop('disabled', false);
$('#selecttypeofhotel').prop('disabled', false);


$('#selectnamehotel').click(function(){
 
   $('#selecttypeofhotel').prop('disabled', true);
})


$('#selecttypeofhotel').click(function(){
  
  $('#selectnamehotel').prop('disabled', true);
})


$('.search-submit').click(function(){
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

LoadSelectHotel( danhSachKhachSan.MangKhachSan);
LoadSelectKindHotel(danhSachLoaiKhachSan);




/*---------------Ket Thuc Tim Kiem Khach San-------------------*/ 

LoadKhachSan( danhSachKhachSan.MangKhachSan,1)
Pagination(danhSachKhachSan.MangKhachSan.length,4);


function LoadKhachSan(data,pageNum){
  let content:string = "";
  let startIndex = (pageNum-1)*4;
  let endIndex = startIndex + 4;
  let pageData = data.slice(startIndex,endIndex)

  pageData.map(function(khachsan:any){
    content += `   
    <div class="col-md-6 col-lg-6 mb-4 ">
    <a href="#" class="block-5" style="background-image: url('${khachsan.AnhKhachSan}')">
      <div class="text">
        <span class="price">${khachsan.GioiThieu}</span>
        <h3 class="heading">${khachsan.TenKhachSan}</h3>
        <div class="post-meta">
         <button makhachsan ="${khachsan.MaKhachSan}" class="btn btn-outline-warning  ksdetail" >Detail</button>
      </div>
      </div>
    </a>

    </div>
    
    `;
  })
  $('.DS').html(content);
 
}
export function Pagination(dataLength,recordsPerPage){
  let list:string = "";
  let hienthi:number = Math.ceil(dataLength/recordsPerPage);
   for(let i = 1; i<= hienthi;i++){
       list += `<li class = "itemNumber"><a href="#">${i}</a></li> `
   }
  
   $('#pagi').html(list);
   $('.itemNumber:first').addClass('active');


   $("#pagi").on('click',function(e){
    var pageNum = parseInt($(e.target).text());
    $('ul li.active').removeClass('active');
    $(e.target).closest('li').addClass("active");
    LoadKhachSan(danhSachKhachSan.MangKhachSan,pageNum)
  });
}


$('body').delegate('.ksdetail','click',function(){
  window.location.href = "/detailHotel.html";
  let makhachsan:string = $(this).attr('makhachsan');
  localStorage.setItem("MaKhachSan",makhachsan);
})



$('#numberNew').html(`(${danhSachTinTuc.MangTinTuc.length})`);
$('#numberTour').html(`(${danhSachTour.MangTour.length})`);
$('#numberHotel').html(`(${danhSachKhachSan.MangKhachSan.length})`);




