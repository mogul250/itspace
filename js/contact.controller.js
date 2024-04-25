import { getParam, setErrorFor, validateForm, vdtins, setSuccessFor } from "./functions.js";
import { input } from "./inputs.controller.js";
let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
s = getParam('subject')
m = getParam('message')
input.forEach((inp) => {
    if (inp.name == 'subject') {
        inp.value = s
    }else if(inp.name == 'message'){
        inp.value = m
        inp.focus()

    }
    inp.addEventListener('keyup',(e)=>{
        if (inp.name == 'phonenumber') {
            d = vdtins('phonenumber',inp.value)
            if (!d) {
                setErrorFor(inp,'invalid phone number')
            }else{
                setSuccessFor(inp)
            }
        }if (inp.name == 'email') {
            d = vdtins('email',inp.value)
            if (!d) {
                setErrorFor(inp,'invalid email')
            }else{
                setSuccessFor(inp)
            }
        }
    })
});
f= document.querySelector('form#contact-form')
f.addEventListener('submit',(d)=>{
    d.preventDefault()
    validateForm(f,input,null);
})
