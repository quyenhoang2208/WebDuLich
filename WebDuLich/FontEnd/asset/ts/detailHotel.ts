import* as  $ from 'jquery';


import { KhachSanServices } from "../../app/Services/KhachSanService";
import { DanhSachKhachSan } from "../../app/Models/DanhSachKhachSan";

let khachSanService = new KhachSanServices();
let danhSachKhachSan = new DanhSachKhachSan();

khachSanService.LayDanhSachKhachSanService().done(function(data:any){
    danhSachKhachSan.MangKhachSan = data;  
})

const makhachsan = localStorage.getItem("MaKhachSan");



HienThiKhachSan(danhSachKhachSan.MangKhachSan);


function HienThiKhachSan(data:any){
  let contentLeft:string = "";
  let contentRight:string = "";

    data.map(function(khachsan:any){
        if(khachsan.MaKhachSan === makhachsan){
           contentLeft = `
           <div class="card">
           <img class="card-img-top" src="${khachsan.AnhKhachSan}" alt="">
           <div class="card-body">
             <h4 class="card-title">${khachsan.TenKhachSan}</h4>
             <p class="card-text">${khachsan.GioiThieu}</p>
           </div>
         </div>
           
           `;
           contentRight =`
              
           `;

        }
     })
     
     $('.renderLeft').html(contentLeft);
     $('.renderRight').html(contentRight);

}
