export class KhachSan{
    public MaKhachSan:string;
    public MaLoai:string;
    public TenKhachSan:string;
    public GioiThieu:string;
    public AnhKhachSan:string;
    constructor(makhachsan:string,maloai:string,tenkhachsan:string,gioithieu:string,anhkhachsan:string){
          this.MaKhachSan = makhachsan;
          this.MaLoai = maloai;
          this.TenKhachSan = tenkhachsan;
          this.GioiThieu = gioithieu;
          this.AnhKhachSan = anhkhachsan;
    };
}