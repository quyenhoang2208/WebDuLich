export class NguoiDung{
    public MaThanhVien:string;
    public Username:string;
    public Password:string;
    public HoTen:string;
    public SoDT:string;
    public DiaChi:string;
    public PhanQuyen:string;
    public Email:string;
    constructor(mathanhvien:string,username:string,password:string,hoten:string,sodt:string,diachi:string,phanquyen:string,email:string){
        this.MaThanhVien = mathanhvien;
        this.Username = username;
        this.Password = password;
        this.HoTen = hoten;
        this.SoDT = sodt;
        this.DiaChi = diachi;
        this.PhanQuyen = phanquyen;
        this.Email = email;
    }
}
export class DangKyUser{
    public MaThanhVien:string;
    public Username:string;
    public Password:string;
    public HoTen:string;
    public Email:string;
    public PhanQuyen:string;
    constructor(mathanhvien:string,username:string,password:string,hoten:string,phanquyen:string,email:string){
        this.MaThanhVien = mathanhvien;
        this.Username = username;
        this.Password = password;
        this.HoTen = hoten;
        this.Email = email;
        this.PhanQuyen = phanquyen;
    }
}
export class BinhLuan{
    public MaBinhLuan:string;
    public MaThanhVien:string;
    public NoiDung:string;
    constructor(mabinhluan:string,mathanhvien:string,noidung:string){
       this.MaBinhLuan = mabinhluan;
       this.MaThanhVien = mathanhvien;
       this.NoiDung = noidung;
    }
}
export class DatTour{
    public MaThanhVien:string;
    public MaTour:string;
    public GiaTour:string;
    public AnhTour:string
    public TenTour:string;
    public SoLuong:number;
    public SoKhach:number;
    constructor(mathanhvien:string, matour:string,gia:string,anhtour:string,tentour:string,soluong:number,sokhach:number){
        this.MaThanhVien = mathanhvien;
        this.MaTour = matour;
        this.GiaTour = gia;
        this.AnhTour = anhtour;
        this.TenTour = tentour;
        this.SoLuong = soluong;
        this.SoKhach = sokhach;
    }
}
export class DatKhachSan{
    public MaThanhVien:string;
    public MaKhachSan:string;
    public TenKhachSan:string;
    public AnhKhachSan:string;
    public Gia:number;
    public SoLuong:number;
    public SoNgayO:number;
    public SoKhachO:number;
    constructor(mathanhvien:string, makhachsan:string,tenkhachsan:string,anhkhachsan:string,gia:number,soluong:number,songayo:number,sokhacho:number){
        this.MaThanhVien = mathanhvien;
        this.MaKhachSan = makhachsan;
        this.TenKhachSan = tenkhachsan;
        this.AnhKhachSan = anhkhachsan;
        this.Gia = gia;
        this.SoLuong = soluong;
        this.SoNgayO = songayo
        this.SoKhachO = sokhacho;
    }
}

export class NguoiDungAdmin{    
    public MaThanhVien:string;
    public Username:string;
    public Password:string;
    public HoTen:string;
    public SoDT:string;
    public DiaChi:string;
    public PhanQuyen:string;

    constructor(matv,un,pass,name,sdt,dc,pq){
        this.MaThanhVien=matv;
        this.Username=un;
        this.Password=pass;
        this.HoTen=name;
        this.SoDT=sdt;
        this.DiaChi=dc;
        this.PhanQuyen=pq;
    }
}