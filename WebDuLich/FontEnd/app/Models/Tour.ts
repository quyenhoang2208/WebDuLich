export class Tour{
    public MaTour:string;
    public TenTour:string;
    public GioiThieu:string;
    public AnhTour:string;
    public NgayKhoiHanh:string;
    public DiemKhoiHanh:string;
    public GiaTour:string;

    constructor(matour:string,tentour:string,gioithieu:string,anhtour:string,ngaykhoihanh:string,diemkhoihanh:string,giatour:string){
        this.MaTour = matour;
        this.TenTour = tentour;
        this.GioiThieu = gioithieu;
        this.AnhTour = anhtour;
        this.NgayKhoiHanh = ngaykhoihanh;
        this.DiemKhoiHanh = diemkhoihanh;
        this.GiaTour = giatour;
    }
}