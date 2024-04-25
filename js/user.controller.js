import { addshade, getdata,setBlurFor,validateForm,setSuccessFor,vdtemail,initiatelogin, geturl } from "./functions.js";

let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
let usericon = document.querySelector('svg.user--ic');
usericon.addEventListener('click',(e)=>{
    e.preventDefault();
    u = getdata('user');
    if (u) {
        c = document.createElement('div')
        let fc = usericon.parentNode.firstChild;
        if (fc.id == 'shh') {
            return setTimeout(()=>{usericon.parentNode.removeChild(fc)},100)
        }
        c.id = "shh"
        usericon.parentNode.insertBefore(c, fc);
        c.innerHTML = `<div class="w-100 h-100">
            <ul class="ls-none bc-white p-0 m-0 bsbb br-5p w-200p  us-none">
               <li class=" bb-1-s-g m-0 w-100 titles hover-2 us-none hover-6">
                <a href="${geturl()}/user/" class="td-none hover-6 black">
                    <div class="w-90 pt-15p pl-15p h-40p bsbb">
                        <span class="fs-15p klavika bold">My account</span>
                    </div>
                </a>
               </li>
               <li class="m-0 w-100 titles hover-2 us-none hover-6">
                <a href="${geturl()}/logout/" class="td-none hover-6 black">
                    <div class="w-90 pt-15p pl-15p h-40p bsbb">
                        <span class="fs-15p klavika bold">Logout</span>
                    </div>
                </a>
               </li>
           </ul>
        </div>` 
        c.className = `bsbb card-2 p-5p w-a h-a br-2p tr-0-2 r-0 bc-white p-a zi-1000`
        setTimeout(()=>{c.classList.add('mt-50p',1)})
    }else{
        initiatelogin();
    }

})
