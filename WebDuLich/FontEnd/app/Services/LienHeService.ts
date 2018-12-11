import* as $ from "jquery"
import { Guest } from "../Models/Guest";
const API = `http://localhost:8088/api/`
export class LienHeServices{
   
    ThemLienHe(guest:Guest){
        
        return $.ajax({
            url:`${API}ThemLienHe`,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(guest),
            processData: false       
        });       
    }
}