import { DatTour, DatKhachSan } from "../../app/Models/NguoiDung";

//Hiển thị danh sách đặt tour
export function HienThiTour(object: DatTour) {
    let total: any = parseInt(object.GiaTour) * object.SoLuong*object.SoKhach;
    let content = `<tr >
    <td data-th="Product">
      <div class="row">
        <div class="col-sm-2 hidden-xs ">
          <img
            src="${object.AnhTour}"
            
            class="img-responsive"
          />
        </div>
        <div class=" col-sm-10">
          <h4 class="text-center">${object.TenTour}</h4>
         
        </div>
      </div>
    </td>
  
    <td data-th="Quantity" >
      <input  class="form-control text-center" value="${object.SoLuong}" />
    </td>
    <td data-th="Subtotal" class="text-center" sotien="${total}">$${total}</td>
    <td class="actions d-flex" data-th="">
    
      <button matour="${object.MaTour}" class="btn btn-danger btn-sm btnDeleteTour">
        <i class="fa fa-trash-o"></i>
      </button>
    </td>
  </tr>`;
  
    return content;
  }
  //Hiển thị danh sách đặt khách sạn
  export function HienThiDatKhachSan(object:DatKhachSan) {
    let total: any = object.Gia * object.SoKhachO*object.SoNgayO*object.SoLuong;
    let content = `<tr >
    <td data-th="Product">
      <div class="row">
        <div class="col-sm-2 hidden-xs ">
          <img
            src="${object.AnhKhachSan}"
            
            class="img-responsive"
          />
        </div>
        <div class=" col-sm-10">
          <h4 class="text-center">${object.TenKhachSan}</h4>
         
        </div>
      </div>
    </td>
  
    <td data-th="Quantity" >
      <input class="form-control text-center" value="${object.SoLuong}" />
    </td>
    <td data-th="Subtotal" class="text-center">$${total}</td>
    <td class="actions d-flex" data-th="">
     
      <button makhachsan= "${object.MaKhachSan}" class="btn btn-danger btn-sm btnDeleteKS">
        <i class="fa fa-trash-o"></i>
      </button>
    </td>
  </tr>`;
  
    return content;
  }