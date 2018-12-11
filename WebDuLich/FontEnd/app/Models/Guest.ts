export class Guest{
    public HoTen:string;
    public Email:string;
    public TieuDe:string;
    public NoiDung:string;
    constructor(hoten:string, email:string,tieude:string,noidung:string){
       this.HoTen = hoten;
       this.Email = email;
       this.TieuDe = tieude;
       this.NoiDung = noidung;
    }
}