import* as  $ from 'jquery';
//Load chọn địa điểm khởi hành 
export function LoadDiaDiem(danhsachdiadiem){
    let contentOptionLocation:string = "";
    let contentSelectLocation:string = "";
    danhsachdiadiem.map(function(tour:any,index){
      contentOptionLocation += `
      <option style="color:black" value="${tour.DiemKhoiHanh}">${tour.DiemKhoiHanh}</option>`;
      
    })
    contentSelectLocation = `<option class="text-center" style="color:pink" value="">Select Departure Location</option>` + contentOptionLocation;
    $('#selectlocation').html(contentSelectLocation);
  }
  //Load chọn ngày khởi hành
  export function LoadNgayKhoiHanh(danhsachngaykhoihanh){
    let contentOptionDay:string = "";
    let contentSelectDay:string = "";
    danhsachngaykhoihanh.map(function(tour:any,index){
      let day:string =  tour.NgayKhoiHanh.slice(8,10) +"/" +tour.NgayKhoiHanh.slice(5,7) +"/"+tour.NgayKhoiHanh.slice(0,4)  ;
  
      contentOptionDay += `
      <option style="color:black" value="${tour.NgayKhoiHanh.slice(0,10)}">${day}</option>`;
      
    })
    contentSelectDay = `<option class="text-center" style="color:pink" value="0">Select Departure Day</option>` + contentOptionDay;
    $('#selectday').html(contentSelectDay);
  }
  //Load chọn tìm kiếm tour
  export function LoadSelectTour(data){
    let contentOptionName:string = "";
    let contentSelectName:string = "";
    data.map(function(tour:any,index){
      contentOptionName += `
       <option style="color:black" value="${tour.MaTour}">${tour.TenTour}</option>`;
    
    })
    contentSelectName = `<option class="text-center" style="color:pink" value="">Select Name Tour</option>` + contentOptionName;
    $('#selectnametour').html(contentSelectName);
  
  }



  