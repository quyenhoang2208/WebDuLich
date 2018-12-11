import* as  $ from 'jquery';
import { TinTucServices } from '../../app/Services/TinTucService';
import { DanhSachTinTuc } from '../../app/Models/DanhSachTinTuc';


let tinTucService = new TinTucServices();
let danhSachTinTuc = new DanhSachTinTuc();


//lấy danh sách tin tức từ database
tinTucService.LayDanhSachTinTucService().done(function(data:any){
    danhSachTinTuc.MangTinTuc= data;
})
//Load tin tức hiển thị lên màn hình
LoadTinTuc(danhSachTinTuc.MangTinTuc,1);
//Phân trang
Pagination(danhSachTinTuc.MangTinTuc.length,4);

function LoadTinTuc(data:any,pageNum:number){
    let contentTinTuc:string = "";
    let startIndex = (pageNum-1)*4;
    let endIndex = startIndex + 4;
    let pageData = data.slice(startIndex,endIndex)
    pageData.map(function(tintuc:any,index){
      
        contentTinTuc += `   
         

              <div class="col-md-6 col-lg-3">
              <div class="blog-entry" data-aos-delay="200">
                <a href="blog-single.html" class="block-20" style="background-image: url('${tintuc.AnhTinTuc}');">
                </a>
                <div class="text p-4">
                  <div class="meta">
                    <div><a href="#">${ tintuc.NgayDangTin.slice(0,10)}</a></div>
                  </div>
                  <h3 class="heading"><a href="#">${tintuc.TieuDeTin}</a></h3>
                  <p class="clearfix">
                    <a href="#" class="float-left readMore" matintuc='${tintuc.MaTinTuc}' >Read more</a>
                  </p>
                </div>
              </div>
            </div>
       
      `;
      
    })
  
    $('.dstintucs').html( contentTinTuc);
   
  }

  //Click button ReadMore thì hiển thị ra trang chi tiết tin tức
  $('body').delegate('.readMore','click',function(){
    window.location.href = "/blogDetail.html";
    let matintuc:string = $(this).attr('matintuc');
    localStorage.setItem("MaTinTuc", matintuc);
  })

 //Phân trang
  function Pagination(dataLength,recordsPerPage){
    let list:string = "";
    let hienthi:number = Math.ceil(dataLength/recordsPerPage);
     for(let i = 1; i<= hienthi;i++){
         list += `<li class = "itemNumber"><a href="#">${i}</a></li> `
     }
     $('#pagination').html(list);
     $('.itemNumber:first').addClass('active');
    
  }
  $("#pagination").on('click',function(e){
    var pageNum = parseInt($(e.target).text());
    $('ul li.active').removeClass('active');
    $(e.target).closest('li').addClass("active");
    LoadTinTuc(danhSachTinTuc.MangTinTuc,pageNum);
  });

  