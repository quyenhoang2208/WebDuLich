import * as $ from "jquery";
import { LienHeServices } from "../../app/Services/LienHeService";
import { Guest } from "../../app/Models/Guest";
import "../../node_modules/sweetalert2/dist/sweetalert2.min.css";
import swal from 'sweetalert2/dist/sweetalert2.js'


let lienheservice: LienHeServices = new LienHeServices();
//Gửi liên hệ của khách hàng  cho dữ liệu
$("#send").click(function() {
  let Hoten: string = $("#hoten").val();
  let Email: string = $("#email").val();
  let Tieude: string = $("#tieude").val();
  let Noidung: string = $("#noidung").val();

  if(Hoten !=="" && Email !== "" && Tieude !=="" && Noidung !== ""){
    let guest: Guest = new Guest(Hoten, Email, Tieude, Noidung);

    lienheservice.ThemLienHe(guest).done(function(res) {
      swal({
          position: 'center',
          type: 'success',
          title: 'You Sent Success',
          showConfirmButton: false,
          timer: 2500
      })
      $("#hoten").val('');
      $("#email").val('');
      $("#tieude").val('');
      $("#noidung").val('');
    });
  }else{
    swal({
        position: 'center',
        type: 'warning',
        title: 'Please Enter Information',
        showConfirmButton: false,
        timer: 2000
    })
  }
});

