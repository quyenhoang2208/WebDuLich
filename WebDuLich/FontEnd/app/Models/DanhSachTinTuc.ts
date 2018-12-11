import { TinTuc } from "./TinTuc";


export class DanhSachTinTuc{
    //MangTinTuc:[] =[];
    MangTinTuc:Array<TinTuc> =[];
    ThemTinTuc(tinTuc:TinTuc){
        this.MangTinTuc.push(tinTuc);
    }
    LayThongTinTinTuc(maTinTuc:string){
        let tinTuc : Object= {} ;
        this.MangTinTuc.map(function(tt:TinTuc){
            if(tt.MaTinTuc === maTinTuc){
                tinTuc = tt  ;
            }
        });
        return tinTuc;
    }

   
    TimTinTucTheoTen(tieuDe:string):DanhSachTinTuc{
        let dsTinTucCanTim:DanhSachTinTuc = new DanhSachTinTuc();
        for(let i = 0; i < this.MangTinTuc.length; i++){
			let ttCanTim = this.MangTinTuc[i];
			if(ttCanTim.TieuDeTin.toLowerCase().trim().search(tieuDe) !== -1){
                dsTinTucCanTim.ThemTinTuc(ttCanTim);
			}
		}
		return dsTinTucCanTim;
    }
}