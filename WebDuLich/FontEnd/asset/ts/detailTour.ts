import* as  $ from 'jquery';
import { TourServices } from '../../app/Services/TourService';
import { DanhSachTour } from '../../app/Models/DanhSachTour';


let tourService = new TourServices();
let danhSachTour = new DanhSachTour();
let content:string = "";

tourService.LayDanhSachTourService().done(function(data:any){
   danhSachTour.MangTour = data;
})

const matour= localStorage.getItem("MaTour");
HienThiTour( danhSachTour.MangTour);


function HienThiTour(data:any){
    data.map(function(tour:any){
        if(tour.MaTour === matour){
           content = `
           <div class="card">
           <img class="card-img-top" src="${tour.AnhTour}" alt="">
           <div class="card-body">
             <h4 class="card-title">${tour.TenTour}</h4>
             <p class="card-text">Prite:$  ${tour.GiaTour}</p>
           </div>
         </div>
           
           `;
        }
     })
     
     $('.renderInfo').html(content);
}