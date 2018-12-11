import * as $ from "jquery";
import { KhachSan } from "../Models/KhachSan";

//Load chọn khách sạn
export function LoadSelectHotel(data:any) {
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
//Load loại khách sạn
export function LoadSelectKindHotel(data:any) {
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


