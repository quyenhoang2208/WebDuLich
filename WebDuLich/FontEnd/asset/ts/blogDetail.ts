import* as  $ from 'jquery';
import { TinTucServices } from '../../app/Services/TinTucService';
import { DanhSachTinTuc } from '../../app/Models/DanhSachTinTuc';


let tinTucService = new TinTucServices();
let danhSachTinTuc = new DanhSachTinTuc();



tinTucService.LayDanhSachTinTucService().done(function(data:any){
    danhSachTinTuc.MangTinTuc= data;
})

let matintuc = localStorage.getItem("MaTinTuc");
HienThiTinTuc(danhSachTinTuc.MangTinTuc);


function HienThiTinTuc(data:any){
    let contentOne:string = "";
    let contentTwo:string = "";
    data.map(function(TinTuc:any){
      
        if(TinTuc.MaTinTuc === matintuc){
            contentOne += `
           <div class="card">
           <img class="card-img-top" src="${TinTuc.AnhTinTuc}" alt="" style ="height:400px">
           <div class="card-body">
             <h4 class="card-title">${TinTuc.TieuDeTin}</h4>
             <p class="card-text">${TinTuc.NgayDangTin.slice(0,10)}</p>
           </div>
         </div>
           
           `;
           contentTwo +=`
           <h2 class="display-5 mb-5 text-center">${TinTuc.TieuDeTin}</h2>
           <hr>
           <p style="color:black; margin-top:80px" class ="text-justify" >${TinTuc.NoiDungTin}</p>
           
           `;
        }
     })
     
     $('.renderOne').html(contentOne);
     $('.renderTwo').html(contentTwo);
}