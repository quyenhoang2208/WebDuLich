import * as $ from "jquery";

import { KhachSanServices } from "../../app/Services/KhachSanService";
import { DanhSachKhachSan } from "../../app/Models/DanhSachKhachSan";
import { GioHangService } from "../../app/Services/GioHangService";
import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from "sweetalert2/dist/sweetalert2.js";

let khachSanService = new KhachSanServices();
let danhSachKhachSan = new DanhSachKhachSan();

khachSanService.LayDanhSachKhachSanService().done(function(data: any) {
  danhSachKhachSan.MangKhachSan = data;
});

/*---------------Bat Dau Tim Kiem Khach San-------------------*/

$(".search-submit").click(function() {
  let makhachsan: string = $("#selectnamehotel").val();
  let loaikhachsan: string = $("#selecttypeofhotel").val();

  if (makhachsan != "") {
    localStorage.setItem("MaKhachSan", makhachsan);
    window.location.href = "/detailHotel.html";
  } else if (loaikhachsan != "") {
    localStorage.setItem("MaLoai", loaikhachsan);
    window.location.href = "/hotelSearchType.html";
  }
});

LoadKhachSan(danhSachKhachSan.MangKhachSan, 1);

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
           }" class="btn btn-outline-warning btnBuyHotel" >Buy</button>
        </div>
        </div>
      </a>
  
      </div>
      
      `;
  });
  $(".DS").html(content);
}

Pagination(danhSachKhachSan.MangKhachSan.length, 4);

/*---------------Ket Thuc Tim Kiem Khach San-------------------*/

function Pagination(dataLength, recordsPerPage) {
  let list: string = "";
  let hienthi: number = Math.ceil(dataLength / recordsPerPage);
  for (let i = 1; i <= hienthi; i++) {
    list += `<li class = "itemNumber"><a href="#">${i}</a></li> `;
  }

  $("#pagi").html(list);
  $(".itemNumber:first").addClass("active");

  $("#pagi").on("click", function(e) {
    var pageNum = parseInt($(e.target).text());
    $("ul li.active").removeClass("active");
    $(e.target)
      .closest("li")
      .addClass("active");
    LoadKhachSan(danhSachKhachSan.MangKhachSan, pageNum);
  });
}

$("body").delegate(".giohang", "click", function() {
  window.location.href = "/giohang.html";
  let makhachsan: string = $(this).attr("makhachsan");
  localStorage.setItem("MaKhachSan", makhachsan);
  localStorage.setItem("MaTour", makhachsan);
  localStorage.setItem("ThanhVien", makhachsan);
});

///Dat Khach San

$("body").delegate(".btnBuyHotel", "click", function() {
  let giohangservice = new GioHangService();
  let mathanhvien = localStorage.getItem("MaThanhVien");
  let makhachsan = $(this).attr("makhachsan");
  let SoNgayO: number = $("#songay").val();
  let SoNguoiO: number = $("#songuoi").val();
  giohangservice
    .DatKhachSanService(mathanhvien, makhachsan, SoNgayO, SoNguoiO)
    .done(function() {
      
      setTimeout(function() {
        swal({
          position: "center",
          type: "success",
          title: "Buy Successed!",
          showConfirmButton: false,
          timer: 4000
        });
        window.location.href = "/giohang.html";
      }, 1000);
    });
});
