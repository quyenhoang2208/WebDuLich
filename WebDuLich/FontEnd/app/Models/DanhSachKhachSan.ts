import { KhachSan } from "./KhachSan";


export class DanhSachKhachSan{
    MangKhachSan:KhachSan[] =[];
    ThemKhachSan(khachsan:KhachSan){
       this.MangKhachSan.push(khachsan);
    }
    LayThongTinKhachSan(maKhachSan:string){
        let khachSan : Object= {} ;
        this.MangKhachSan.map(function(ks:KhachSan){
            if(ks.MaKhachSan === maKhachSan){
                khachSan = ks   ;
            }
        });
        return khachSan;
    }

    TimKhachSanTheoTen(tenKhachSan:string):DanhSachKhachSan{
        let dsKhachSanCanTim:DanhSachKhachSan = new DanhSachKhachSan();
        for(let i = 0; i < this.MangKhachSan.length; i++){
			let ksCanTim = this.MangKhachSan[i];
			if(ksCanTim.TenKhachSan.toLowerCase().trim().search(tenKhachSan) !== -1){
				dsKhachSanCanTim.ThemKhachSan(ksCanTim);
			}
		}
		return dsKhachSanCanTim;
    }
}