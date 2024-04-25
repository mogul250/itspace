import { setFocusFor,setBlurFor,setSuccessFor } from "./functions.js";

var input = Array.from(document.querySelectorAll('input.main-input'));
var select = Array.from(document.querySelectorAll('select.main-input'));
var textarea = Array.from(document.querySelectorAll('textarea.main-input'));
select.forEach(s=>{
    input.push(s)
})
textarea.forEach(t=>{
  input.push(t)
})
try {
    input.forEach(inp=>{
       inp.addEventListener('focus',(e)=>{
         setFocusFor(inp)
       })
     })
     input.forEach(inp=>{
       inp.addEventListener('blur',(e)=>{
         if (inp.value == "") {
           setBlurFor(inp);
         }else{
           setSuccessFor(inp);
         }
       })
     })
} catch (error) {
    
}
export  {input}