import { Tour } from "./Tour";


export class DanhSachTour{
    MangTour:Tour[]= [];
    ThemTour(tour:Tour){
       this.MangTour.push(tour);
    }
    LayThongTinTour(maTour:string){
        let tour : Object= {} ;
        this.MangTour.map(function(tourTour:Tour,index:number){
            if(tourTour.MaTour === maTour){
                 tour=tourTour  ;
            }
        });
        return tour;
    }
   
    TimTourTheoDiaDiem(tenTour:string):DanhSachTour{
        let dsTourCanTim:DanhSachTour = new DanhSachTour();
        for(let i = 0; i < this.MangTour.length; i++){
			let tourCanTim = this.MangTour[i];
			if(tourCanTim.DiemKhoiHanh.toLowerCase().trim().search(tenTour) !== -1){
				dsTourCanTim.ThemTour(tourCanTim);
			}
        }
        return dsTourCanTim;
    }
}