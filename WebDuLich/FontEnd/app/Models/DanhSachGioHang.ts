import { DatTour, DatKhachSan } from "./NguoiDung";


export class DanhSachDatTour{
    MangDatTour:DatTour[]= [];
    ThemDatTour(dattour:DatTour){
       this.MangDatTour.push(dattour);
    }
}
export class DanhSachDatKhachSan{
    MangDatKhachSan:DatKhachSan[]= [];
    ThemDatKhachSan(datkhachsan:DatKhachSan){
       this.MangDatKhachSan.push(datkhachsan);
    }
}