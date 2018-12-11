import* as  $ from 'jquery';
import { TourServices } from '../../app/Services/TourService';
import { DanhSachTour } from '../../app/Models/DanhSachTour';
import { Tour } from '../../app/Models/Tour';

let tourService = new TourServices();
let danhSachTour = new DanhSachTour();



tourService.LayDanhSachTourService().done(function(data:any){
    danhSachTour.MangTour = data;
})

let diemKhoiHanh:string = localStorage.getItem('DiemKhoiHanh');

LoadTour( danhSachTour.MangTour,diemKhoiHanh) ;

$('.diemkhoihanh').html(`<h2 class="text-center">Departure Location:${diemKhoiHanh}</h2>`)


function LoadTour(data:any,diemkhoihanh){
   let content:string = "";
   let danhSachTour = new DanhSachTour();

   data.map(function(tour:any){
      
      if(tour.DiemKhoiHanh === diemkhoihanh){
           danhSachTour.ThemTour(tour);
      }
      
   })
   danhSachTour.MangTour.map(function(tour:Tour){
    content += `   
   
    <div class="col-md-4 col-lg-4 mb-4">
    <a  class="block-5" style="background-image: url('${tour.AnhTour}');">
      <div class="text ">
        <span class="price">Price: $ ${tour.GiaTour}</span>
        <h3 class="heading">${tour.TenTour}</h3>
        <div class="post-meta">
          <button matour = "${tour.MaTour}" class="btn btn-outline-warning ml-auto btndetail" >Detail</button>
          <span class= "ml-5">${tour.GioiThieu} </span>
        </div>
      </div>

    </a>
  </div>
    `;
  })
   
  $('.dstour').html(content);

}
//Click chi tiet tour
$('body').delegate('.btndetail','click',function(){
    let MaTour = $(this).attr('matour');
    localStorage.setItem('MaTour',MaTour);

    window.location.href = '/detailTour.html';
})



