import * as $ from "jquery";

import { KhachSanServices } from "../../app/Services/KhachSanService";
import { DanhSachKhachSan } from "../../app/Models/DanhSachKhachSan";
import { KhachSan } from "../../app/Models/KhachSan";

let khachSanService = new KhachSanServices();
let danhSachKhachSan = new DanhSachKhachSan();
let loaikhachsan = localStorage.getItem("MaLoai");

khachSanService.LayDanhSachKhachSanService().done(function(data: any) {
  danhSachKhachSan.MangKhachSan = data;
});
HienThiKhachSan(danhSachKhachSan.MangKhachSan, loaikhachsan);

function LoadKhachSan(data, pageNum) {
  let content: string = "";
  let startIndex = (pageNum - 1) * 4;
  let endIndex = startIndex + 4;
  let pageData = data.slice(startIndex, endIndex);

  pageData.map(function(khachsan: any) {
    content += `   
        <div class="col-md-6 col-lg-6 mb-4 ">
        <a href="#" class="block-5" style="background-image: url('${
          khachsan.AnhKhachSan
        }')">
          <div class="text">
            <span class="price">${khachsan.GioiThieu}</span>
            <h3 class="heading">${khachsan.TenKhachSan}</h3>
            <div class="post-meta">
             <button makhachsan ="${
               khachsan.MaKhachSan
             }" class="btn btn-outline-warning ksdetail " >Detail</button>
          </div>
          </div>
        </a>
    
        </div>
        
        `;
  });
  $(".DS").html(content);
}

$("body").delegate(".ksdetail", "click", function() {
  window.location.href = "/detailHotel.html";
  let makhachsan: string = $(this).attr("makhachsan");
  localStorage.setItem("MaKhachSan", makhachsan);
});
function HienThiKhachSan(data, maloai) {
  let danhsach: DanhSachKhachSan = new DanhSachKhachSan();
  data.map(function(khachsan: KhachSan) {
    if (khachsan.MaLoai === maloai) {
      danhsach.MangKhachSan.push(khachsan);
    }
  });
  LoadKhachSan(danhsach.MangKhachSan, 1);
}
