import { NguoiDung, NguoiDungAdmin } from "./NguoiDung";

export class DanhSachNguoiDung{
    
    MangNguoiDung:NguoiDung[]=[];
    ThemNguoiDung(nguoidung:NguoiDung){
       this.MangNguoiDung.push(nguoidung);
    }


    MangNguoiDungAdmin:NguoiDungAdmin[] =[];
    
    LayThongTinNguoiDung(maNguoiDung:string){
        let nguoiDung : Object= {} ;
        this.MangNguoiDung.map(function(nd:NguoiDung){
            if(nd.MaThanhVien === maNguoiDung){
                nguoiDung = nd;
            }
        });
        return nguoiDung;
    }

    ThemNguoiDungAdmin(nguoiDung:NguoiDungAdmin){
        this.MangNguoiDungAdmin.push(nguoiDung);
    }

    TimNguoiDungTheoTen(tenNguoiDung:string):DanhSachNguoiDung{
        let dsNguoiDungCanTim:DanhSachNguoiDung = new DanhSachNguoiDung();
        for(let i = 0; i < this.MangNguoiDungAdmin.length; i++){
			let ndCanTim = this.MangNguoiDungAdmin[i];
			if(ndCanTim.HoTen.toLowerCase().trim().search(tenNguoiDung) !== -1){
				dsNguoiDungCanTim.ThemNguoiDungAdmin(ndCanTim);
			}
		}
		return dsNguoiDungCanTim;
    }
}