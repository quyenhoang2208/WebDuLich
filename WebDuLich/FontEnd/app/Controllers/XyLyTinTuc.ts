
import * as $ from "jquery";
//Load tin tức khách sạn
export function LoadTinTuc(data:any){
    let contentTinTuc:string = "";
  
    data.map(function(tintuc:any,index){
      
        contentTinTuc += `   
          <div class="item">
                <div class="blog-entry" data-aos-delay="100">
                  <a href="blog-single.html" class="block-20" style="background-image: url('${tintuc.AnhTinTuc}');">
                  </a>
                  <div class="text p-4">
                    <div class="meta">
                      <div><a href="#"  >${tintuc.NgayDangTin.slice(0,10)}</a></div>
                    </div>
                    <h3 class="heading"><a href="#">${tintuc.TieuDeTin}</a></h3>
                    <p class="clearfix">
                      <a href="#" matintuc=${tintuc.MaTinTuc} class="float-left read">Read more</a>
                      <a href="#" class="float-right meta-chat"><span class="icon-chat"></span> 3</a>
                    </p>
                  </div>
                </div>
              </div>
       
      `;
      
    })
  
    $('.dstintuc').html( contentTinTuc);
   
  }