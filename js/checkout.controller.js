
import { adcm, cc, getdata, getschema, geturl, request, setErrorFor, setSuccessFor, validateForm,vdtins,chaastep,shaddr,geimgturl, ellipsis, postschema, initializeSpecialCleave } from "./functions.js";
let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m

m = document.querySelector('span.ttl-m')
r = await request('getprods',getschema)
c = getdata('cart')
t = postschema
t.body = JSON.stringify({token: getdata('user')})
z = await request('getuser',t)
if (!z.success) {

}else{
    z=z.message
    localStorage.setItem('address',JSON.stringify(z.addresses))
}
if (r.success) {
    getcinfo(r.message)
}
l = getdata('address')
localStorage.setItem('next',geturl()+'/checkout/')
if (l) {
    if(getdata('_act41') != null){
        chaastep(2)
        shaddr(l[getdata('_act41')])
    }else{
        chaastep(1)
    }
}
export function getcinfo(prods) {
    p = document.querySelector('div.p-cont')
    c = getdata('cart')
    p.innerHTML= null
    if (c.length > 0) {
        t=0
        prods.forEach(product => {
            for (const cartitem of c) {
                if (cartitem.prodid == product.prodid) {
                   for(const c of  product.conditions){
                        if (c.name == cartitem.condition) {
                            i = product.conditions.indexOf(c)
                        }
                    }
                    t+= product.conditions[i].newprice * cartitem.qty;
                    if (c.indexOf(cartitem) == c.length - 1) {
                        p.innerHTML += `<div class="item w-100 h-a p-5p bsbb">
                            <div class="w-100 h-100 flex">
                                <div class="w-90p h-90p">
                                    <div class="w-100 h-100 br-5p">
                                       <img src="${geimgturl()}/product-imgz/${product.pimgs[0]}" class="w-100 h-100 contain">
                                    </div>
                                </div>
                                <div class="w-100 h-100 pl-20p bsbb">
                                    <div class="w-100 h-100">
                                        <div class="w-100 h-a br-3p  mb-10p">
                                        <a href="${geturl()}/product/${product.prodid}" class="td-none ls-n black">
                                            <span class="w-100 h-a fs-15p bold verdana capitalize">${ellipsis(product.pname,40)}</span>
                                        </a>
                                        </div>
                                        <div class="w-100 h-a br-3p  mb-10p">
                                                <ul class="p-0 m-0 ls-none h-a">
                                                    <li class="w-100 p-5p bsbb flex">
                                                        <span class="w-100 h-a fs-16p bold verdana capitalize dgray">quantity : </span>
                                                        <span class="w-100 h-a fs-16p bold consolas capitalize">${cartitem.qty}</span>
                                                    </li>
                                                    <li class="w-100 p-5p bsbb flex">
                                                        <span class="w-100 h-a fs-16p bold verdana capitalize dgray">condition : </span>
                                                        <span class="w-100 h-a fs-16p ${cc(cartitem.condition)} consolas capitalize">${cartitem.condition}</span>
                                                    </li>
                                                    <li class="w-100 p-5p bsbb flex">
                                                        <span class="w-100 h-a fs-16p bold verdana capitalize dgray">price per piece : </span>
                                                        <span class="w-100 h-a fs-16p  consolas capitalize">${adcm(product.conditions[i].newprice)} <span class"dgray capitalize fs-14p pl-5p"> RWF</span></span>
                                                    </li>
                                                    <li class="w-100 p-5p bsbb flex">
                                                        <span class="w-100 h-a fs-16p bold verdana capitalize dgray">sub total : </span>
                                                        <span class="w-100 h-a fs-16p  consolas capitalize">${adcm(product.conditions[i].newprice * cartitem.qty)} <span class"dgray capitalize fs-14p pl-5p"> RWF</span></span>
                                                    </li>
                                                </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>` 
                    }else{
                        p.innerHTML += `<div class="item w-100 h-a p-5p bsbb bb-1-s-g mb-10p">
                   <div class="w-100 h-100 flex">
                       <div class="w-90p h-90p">
                           <div class="w-100 h-100 br-5p">
                           <img src="${geimgturl()}/product-imgz/${product.pimgs[0]}" class="w-100 h-100 contain">
                           </div>
                       </div>
                       <div class="w-100 h-100 pl-20p bsbb">
                           <div class="w-100 h-100">
                               <div class="w-100 h-a br-3p  mb-10p">
                                <a href="${geturl()}/product/${product.prodid}" class="td-none ls-n black">
                                     <span class="w-100 h-a fs-15p bold verdana capitalize">${ellipsis(product.pname,40)}</span>
                                </a>
                               </div>
                               <div class="w-100 h-a br-3p  mb-10p">
                                    <ul class="p-0 m-0 ls-none h-a">
                                        <li class="w-100 p-5p bsbb flex">
                                            <span class="w-100 h-a fs-16p bold verdana capitalize dgray">quantity : </span>
                                            <span class="w-100 h-a fs-16p bold consolas capitalize">${cartitem.qty}</span>
                                        </li>
                                        <li class="w-100 p-5p bsbb flex">
                                            <span class="w-100 h-a fs-16p bold verdana capitalize dgray">condition : </span>
                                            <span class="w-100 h-a fs-16p ${cc(cartitem.condition)} consolas capitalize">${cartitem.condition}</span>
                                        </li>
                                        <li class="w-100 p-5p bsbb flex">
                                            <span class="w-100 h-a fs-16p bold verdana capitalize dgray">price per piece : </span>
                                            <span class="w-100 h-a fs-16p  consolas capitalize">${adcm(product.conditions[i].newprice)} <span class"dgray capitalize fs-14p pl-5p"> RWF</span></span>
                                        </li>
                                        <li class="w-100 p-5p bsbb flex">
                                            <span class="w-100 h-a fs-16p bold verdana capitalize dgray">sub total : </span>
                                            <span class="w-100 h-a fs-16p  consolas capitalize">${adcm(product.conditions[i].newprice * cartitem.qty)} <span class"dgray capitalize fs-14p pl-5p"> RWF</span></span>
                                        </li>
                                    </ul>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>` 
                    }
                   
                }
            }
        });
        m.innerHTML = adcm(t)
    }else{
        
    }

}
f = document.querySelector('form#add-address-form');
p = Array.from(document.querySelectorAll('form#payment-form'));
i = Array.from(f.querySelectorAll('input.main-input'));
p.forEach(paymentForm=>{
    t = Array.from(p[1].querySelectorAll('input.main-input'));
    t.forEach(input=>{
        if (input.name == 'payphonenumber') {
            initializeSpecialCleave(input,[3,3,3],9,' ')
        }
    })
    paymentForm.onsubmit = (e)=>{
        z = Array.from(p[p.indexOf(paymentForm)].querySelectorAll('.main-input'))
        e.preventDefault()
        if (paymentForm.name == 'card-payment-form'){
            validateForm(paymentForm,z,null);
        }else{
            validateForm(paymentForm,z,null);

        }
        if (paymentForm.classList.contains('op-0-3')) return 0
    }
})
f.onsubmit = (e)=>{
    e.preventDefault();
    validateForm(f,i,null);
}
i.forEach(input=>{
    input.addEventListener('keyup',(e)=>{
        e.preventDefault()
        if (input.name == 'phonenumber') {
            v=vdtins('phonenumber',input.value)
            if (v == 0) {
                setErrorFor(input,'invalid phone number')
            }else{
                setSuccessFor(input)
            }
        }else if (input.name == 'email') {
            v=vdtins('email',input.value)
            if (v == 0) {
                setErrorFor(input,'invalid email')
            }else{
                setSuccessFor(input)
            }
        }else if (input.name == 'pay-phonenumber') {
            v=vdtins('phonenumber',input.value)
            if (v == 0) {
                setErrorFor(input,'invalid phone number')
            }else{
                setSuccessFor(input)
            }
        }
    })
})
h = document.querySelector('div.sthol')
s = Array.from(h.querySelectorAll('div.step'));
s.forEach((step)=>{
    step.addEventListener('click',()=>{
        chaastep(s.indexOf(step));
    })
})
