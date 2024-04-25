let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
import { alertMessage, geturl,cc,request,adcm,checkCart,dcrtmgc,geimgturl,getdata,postschema,addsCard, getPath } from "./functions.js";
let prods_cont = document.querySelector('div.related-prods-cont')
for (let i = 0; i < 20; i++) {
    prods_cont.innerHTML+= `<div class="product w-250p h-350p bc-white br-5p ovh ml-10p mr-10p mb-15p mt-15p iblock hover-4 bfull-500-resp bm-a-resp">
    <div class="w-100 h-170p">
        <div class="image p-10p bsbb w-100 h-100 bc-dgray skel br-5p">
            <span class="w-100 h-100">
                <img src="" class="w">
            </span>
        </div>
        <div class="w-100 h-180p">
            <div class="title w-100 h-30p p-5p bsbb">
                <span class="verdana left fs-16p p-5p bsbb black bc-gray skel br-5p w-70 h-100"></span>
            </div>
            <div class="cats w-100 pl-15p h-30p mt-5p bsbb ovh flex">
                <span class="verdana left fs-14p bsbb bc-gray skel w-40p m-2p br-5p h-10p"></span>
                <span class="verdana left fs-14p bsbb bc-gray skel w-90p m-2p br-5p h-10p"></span>
                <span class="verdana left fs-14p bsbb bc-gray skel w-60p m-2p br-5p h-10p"></span>
            </div>
            <div class="cond w-100 pl-15p h-20p bsbb ovh">
                <span class="verdana left fs-14p bsbb green bc-gray skel p-3p br-3p center h-70 w-40p"></span>
            </div>
            <div class="w-100 h-a p-15p bsbb">
                <table class="w-100">
                    <tr>
                        <td colspan="2">
                            <div class="w-70p h-20p bsbb bc-gray skel br-5p ">
                                <span class="verdana w-a left fs-15p dgray bc-gray skel w-60p"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="w-100p h-25p bsbb bc-gray skel br-5p">
                                <span class="verdana w-a left fs-15p black"></span>
                            </div>
                        </td>
                        <td>
                            <div class=" bsbb h-40p w-80p bc-dgray br-5p right skel">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>	
        </div>
    </div>
</div>`
    
}
getparams(window.location.href);
async function getparams(url) {
    let i = new URL(url)
    let id = {id: getPath(1)}
    if (id.id == null) {
        alertMessage('product not found')
    }else{
        let opts = {
            mode: 'cors',
            method: "POST",
            body : JSON.stringify(id),
            headers: {
              "content-type": "application/json",
              'accept': '*/*'
        
            }}
        let res = await request('getproduct',opts)
        if (res.success) {
            document.title =  `${res.message[0].pname.substring(0,1).toUpperCase()+res.message[0].pname.substring(1,res.message[0].pname.length)} | ITSPACE`
            const titleMetaTag = document.querySelector('meta[property="og:title"]');
            const descriptionMetaTag = document.querySelector('meta[property="og:description"]');
            const imageMetaTag = document.querySelector('meta[property="og:image"]');
            const priceMetaTag = document.querySelector('meta[property="product:price:amount"]');

            titleMetaTag.setAttribute('content', res.message[0].pname.substring(0,1).toUpperCase()+res.message[0].pname.substring(1,res.message[0].pname.length));
            descriptionMetaTag.setAttribute('content', res.message[0].description);
            imageMetaTag.setAttribute('content', `${geimgturl()}/product-imgz/${res.message[0].pimgs[0]}`);
            priceMetaTag.setAttribute('content', `${adcm(res.message[0].conditions[0].newprice)} RWF`);
            let phol = document.querySelector('div.prodname-hol')
            let pspectitlhol = document.querySelector('li.spestitle')
            let pspecs = document.querySelector('ul.pspecs')
            let pshinfo = document.querySelector('ul.pshinfo')
            let shinfotitle = document.querySelector('ul.shinfotitle')
            let proddescttlhol = document.querySelector('li.proddesc')
            let proddesc = document.querySelector('li.proddesccntnt')
            let tgsttl = document .querySelector('li.tgsttl');
            let tgscntnt = document .querySelector('ul.tgscntnt');
            let prcttlhol = document.querySelector('li.prcttlhol');
            let prchol = document.querySelector('li.prchol');
            let bttnshol = document.querySelector('div.bttns-hol');
            let imghol = document.querySelector('div.img-preview');
            let secimghol = document.querySelector('div.sm-img-preview');
            let fbbody = document.querySelector('div.fb-body');
            let conds;
            res.message.forEach(pd => {
                getrelated(Array({category:pd.catname},{subcategory:pd.subcatname},{usedin:pd.usedinname},{idnot: pd.prodid}))
                secimghol.innerHTML = null;
                pd.pimgs.forEach(src=>{
                    if (pd.pimgs.indexOf(src) == 0) {
                        secimghol.innerHTML+=`<div class="w-50p h-50p bsbb m-10p bsbb igrid">
                                            <div class="w-100 h-50p p-r br-5p p-5p bsbb hover-2 b-1-s-theme active sm-img">
                                                <img src="${geimgturl()}/product-imgz/${src}" alt="" class="w-100 h-100 b-none contain">
                                            </div>
                                        </div>`
                    }else{
                        secimghol.innerHTML+=`<div class="w-50p h-50p bsbb m-10p bsbb igrid">
                                                <div class="w-100 h-50p p-r br-5p p-5p bsbb hover-2 sm-img">
                                                    <img src="${geimgturl()}/product-imgz/${src}" alt="" class="w-100 h-100 b-none contain">
                                                </div>
                                            </div>`
                    }
                })
                fbbody.innerHTML = null

                for (const feedback of pd.feedbacks) {
                    let f = document.createElement('div')
                    f.className = `fb w-100 h-a pb-10p bsbb ${(pd.feedbacks.indexOf(feedback) == (pd.feedbacks.length-1))? ' ' : 'bb-1-s-g mb-10p'}`
                    fbbody.appendChild(f)
                    f.innerHTML = `
                    <div class="unames">
                        <span class="black nowrap h-20p w-100p block verdana capitalize fs-13p">${feedback.firstname} ${feedback.lastname}</span>
                    </div>
                    <div class="message flex pl-10p bsbb">
                        ${(feedback.image != 'null') ? `<div class="img w-70p h-70p br-5p"><img src="${geimgturl()}/feedback-imgz/${feedback.image}" class="w-100 h-100 contain"></div>` : ''}
                        
                        <div class="mssg w-100 h-a">
                            <span class="w-100 h-a m-5p block bsbb dgray verdana fs-12p">${feedback.message}</span>
                        </div>
                </div>`
                }
                if (pd.feedbacks.length == 0) {
                    fbbody.innerHTML = `<div class="w-100 h-a">
                    <div class="center p-10p bsbb w-100 h-100p svg-hol">
                        <span class="verdana fs-15p"><svg class="w-60p h-60p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/> </svg></span>
                    </div>
                    <div class="center p-10p bsbb w-100 h-100">
                        <span class="verdana fs-18p ta-c dgray">this product has no feedbacks</span>
                    </div>
                </div>`
                }
                let sm = Array.from(secimghol.querySelectorAll('div.sm-img'))
                sm.forEach(img=>{
                    img.addEventListener('click',()=>{
                        sm.forEach(p=>{p.classList.remove('b-1-s-theme','active')})
                        let s = img.querySelector('img').src
                        img.classList.add('b-1-s-theme','active')
                        imghol.querySelector('img').src = s
                        
                    })
                })
                imghol.innerHTML = `<div class="w-100 h-100 p-5p bsbb br-5p">
                                        <img src="${geimgturl()}/product-imgz/${pd.pimgs[0]}" alt="" class="w-100 h-100 b-none contain">
                                        <span class="verdana h-40p w-40p bsbb center br-50 p-3p right shbut us-none hover-2 p-a t-0 r-0 m-10p">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="mt--5p">
                                                <path d="M9.71 6.71L11 5.41V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V5.41L14.29 6.71C14.383 6.80373 14.4936 6.87812 14.6154 6.92889C14.7373 6.97966 14.868 7.0058 15 7.0058C15.132 7.0058 15.2627 6.97966 15.3846 6.92889C15.5064 6.87812 15.617 6.80373 15.71 6.71C15.8037 6.61704 15.8781 6.50644 15.9289 6.38458C15.9797 6.26272 16.0058 6.13201 16.0058 6C16.0058 5.86799 15.9797 5.73728 15.9289 5.61542C15.8781 5.49356 15.8037 5.38296 15.71 5.29L12.71 2.29C12.617 2.19627 12.5064 2.12188 12.3846 2.07111C12.2627 2.02034 12.132 1.9942 12 1.9942C11.868 1.9942 11.7373 2.02034 11.6154 2.07111C11.4936 2.12188 11.383 2.19627 11.29 2.29L8.29 5.29C8.1017 5.4783 7.99591 5.7337 7.99591 6C7.99591 6.2663 8.1017 6.5217 8.29 6.71C8.47831 6.8983 8.7337 7.00409 9 7.00409C9.2663 7.00409 9.5217 6.8983 9.71 6.71Z" fill="#0F1111"/>
                                                <path d="M18 9H15V11H18V20H6V11H9V9H6C5.46957 9 4.96086 9.21071 4.58579 9.58579C4.21071 9.96086 4 10.4696 4 11V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V11C20 10.4696 19.7893 9.96086 19.4142 9.58579C19.0391 9.21071 18.5304 9 18 9Z" fill="#0F1111"/>
                                                </svg>
                                        </span>
                                    </div>`
                phol.innerHTML = `<div class="w-100 h-100 bsbb pttl bb-1-s-g">
                <div class="w-100 h-a flex jc-sb right">
                    <span class="verdana h-100 w-100 capitalize bold fs-16p wrap left">${pd.pname}</span>
                    </span>
                </div>
                <div class="w-100 h-40p bsbb p-5p rates-hol flex"></div>
                
                </div>`
                let rateshol = phol.querySelector('div.rates-hol')
                    for (let index = 1; index <= 5; index++) {
                        rateshol.innerHTML+= ` <span class="#icon h-30p center-2 w-25p">
                        <span class="#icon h-30p center-2 w-40p">
                        <svg xmlns="http://www.w3.org/2000/svg" class="rateicon" fill="#f2f2f2" width="20" height="20" viewBox="0 0 32 32" version="1.1">
                        <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"/>
                        </svg>`
                    }
                    let ratio = 0
                    let rated = 0;
                    for (const feedback of pd.feedbacks) {
                        if (feedback.rate) {
                            ratio += parseInt(feedback.rate)
                            rated++
                        }
                    }
                    
                    if (pd.feedbacks.length == 0) {
                        rateshol.innerHTML = `<span class="dgray capitalize fs-13p bsbb verdana">no ratings available</span>`
                    }else{
                        ratio = parseInt(ratio/rated)
                        let rateicons = Array.from(rateshol.querySelectorAll('svg.rateicon'));
                        for (const rate of rateicons) {
                            if (rateicons.indexOf(rate)< ratio) {
                                rate.style.fill = 'gold'
                            }
                        }
                        rateshol.innerHTML += `<span class="pl-10p bsbb fs-12p capitalize center-2 verdana">${rated} total rates</span>`
                    }
                pspectitlhol.innerHTML = `<div class="w-100 h-100 p-5p">
                ${(pd.catname == 'services')? `<span class="verdana h-100 w-100 capitalize fs-16p">service details</span>
                </div>`: `<span class="verdana h-100 w-100 capitalize fs-16p">specitifations</span>`}
                </div>
                `
                shinfotitle.innerHTML = `<div class="w-100 h-100 p-5p">
                ${(pd.catname == 'services')? `
                </div>`: `<span class="verdana h-100 w-100 capitalize fs-16p">shipment and delivery info</span>`}
                </div>
                `
                pspecs.innerHTML = null
                pshinfo.innerHTML = null
                pspecs.classList.add('bb-1-s-g')
                pspecs.className = 'ls-none m-0 pl-10p bsbb pspecs'
                pshinfo.className = 'ls-none m-0 pl-10p bsbb pshinfo'
                tgsttl.innerHTML = `<div class="w-100 bsbb h-25p">
                                        <span class="verdana h-100 w-100 capitalize fs-16p">tags</span>
                                    </div>`
                Object.keys(pd.pspecs).forEach(spec=>{
                    let leli = document.createElement('li');
                    pspecs.appendChild(leli)
                    leli.className = 'w-100 p-2p bsbb'
                    leli.innerHTML=`<div class="w-100 h-a flex">
                                        <span class="verdana h-100 w-a capitalize fs-12p nowrap">${spec}:</span>
                                        <span class="verdana h-100 w-a capitalize  fs-12p pl-10p dgray">${pd.pspecs[spec]}</span>
                                    </div>`
                })
                Object.keys(pd.shipment_info).forEach(info=>{
                    let leli = document.createElement('li');
                    pshinfo.appendChild(leli)
                    leli.className = 'w-100 p-2p bsbb'
                    leli.innerHTML=`<div class="w-100 h-a flex">
                                        <span class="verdana h-100 w-a capitalize fs-12p nowrap">${info}:</span>
                                        <span class="verdana h-100 w-a capitalize  fs-12p pl-10p dgray">${pd.shipment_info[info]}</span>
                                    </div>`
                })
                proddescttlhol.className = 'w-100  proddesc'
                proddescttlhol.innerHTML = '<div class="ls-none m-0 p-10p bsbb"><span class="verdana h-100 w-100 capitalize fs-16p">description</span></div>'
                proddesc.innerHTML = `<div class="ls-none m-0 pl-10p bsbb"><span class="verdana h-100 w-100 fs-13p dgray">${pd.description}</span></div>`
                tgscntnt.classList.replace('h-40p','h-a')
                tgscntnt.classList.replace('flex','v')
                tgscntnt.innerHTML = `  <li class="w-100 bsbb">
                                                <a class="td-none ls-n" href="${geturl()}/browse/category/${pd.catname}"><span class="w-a h-a iblock mt-5p bc-tr-theme theme consolas fs-14p br-2p pl-6p pr-6p ml-5p bsbb nowrap">${pd.catname} </span></a>
                                                <a class="td-none ls-n" href="${geturl()}/browse/brand/${pd.brandname}"><span class="w-a h-a iblock mt-5p bc-tr-theme theme consolas fs-14p br-2p pl-6p pr-6p ml-5p bsbb nowrap">${pd.brandname} </span></a>
                                                <a class="td-none ls-n" href="${geturl()}/browse/subcategory/${pd.subcatname}"><span class="w-a h-a iblock mt-5p bc-tr-theme theme consolas fs-14p br-2p pl-6p pr-6p ml-5p bsbb nowrap">${pd.subcatname} </span></a>
                                                <a class="td-none ls-n" href="${geturl()}/browse/serie/${pd.famname}"><span class="w-a h-a iblock mt-5p bc-tr-theme theme consolas fs-14p br-2p pl-6p pr-6p ml-5p bsbb nowrap">${pd.famname} </span></a>
                                                <a class="td-none ls-n" href="${geturl()}/browse/usedin/${pd.usedinname}"><span class="w-a h-a iblock mt-5p bc-tr-theme theme consolas fs-14p br-2p pl-6p pr-6p ml-5p bsbb nowrap">${pd.usedinname} </span></a>
                                                <a class="td-none ls-n" href="${geturl()}/browse/availability/${pd.availability}"><span class="w-a h-a iblock mt-5p bc-tr-theme theme consolas fs-14p br-2p pl-6p pr-6p ml-5p bsbb nowrap">${pd.availability} </span></a>
                                        </li>
                                        `
                prcttlhol.innerHTML = '<div class="ls-none m-0 pl-10p bsbb"><span class="verdana h-100 w-100 capitalize fs-16p">conditions</span></div>'
                prchol.innerHTML = null
                prchol.classList.replace('m-10p','h-a')
                pd.conditions.forEach(cond=>{
                    if(pd.conditions.indexOf(cond)==0){
                        prchol.innerHTML +=`<span class="conds hover-2 verdana left m-5p  fs-14p bsbb ${cc(cond.name)} bc-gray pr-15p pl-15p br-3p center pt-2p pb-4p w-a b-1-s-theme active" id="${pd.conditions.indexOf(cond)}">${cond.name}</span>`
                    }
                     else{
                        prchol.innerHTML +=`<span class="conds hover-2 verdana left m-5p  fs-14p bsbb ${cc(cond.name)} bc-gray pr-15p pl-15p br-3p center pt-2p pb-4p w-a" id="${pd.conditions.indexOf(cond)}">${cond.name}</span>`
                     }    


                })
                
                prchol.innerHTML +=`<div class=" left bsbb w-100"><span class="verdana left  fs-16p bsbb center-2 pt-2p pb-4p  h-100"><span class="fs-13p pr-10p pt-2p dgray">Price</span><span class="condprice bold-2 poppsins" id="">${adcm(pd.conditions[0].newprice)}</span> <span class="fs-13p pl-10p pt-2p dgray">RWF</span></span></div>`
                conds= document.querySelectorAll('span.conds')
                conds.forEach(bu=>{
                    bu.addEventListener('click',e=>{
                        conds.forEach(cntn=>{cntn.classList.remove('b-1-s-theme','active')})
                        e.preventDefault()
                        bu.classList.add('b-1-s-theme','active')
                        chpri(parseInt(bu.id),res.message[0].conditions,document.querySelector('span.condprice'),bu.innerText)
                    })
                })
                bttnshol.innerHTML = `${(pd.catname == 'services')?`
                <div class="w-a h-100 hover-2 mr-20p right">
                    <span class="add-to-cart flex w-100 h-100">
                        <a class="bc-orange td-none b-none br-5p center-2 pl-10p pr-10p" href="${geturl()}/contact/?subject=requesting for a service&message=hello i am interested in this service of yours called ${pd.pname} can i get more information about it..">
                            <span class="white center-2 w-100 h-100 fs-15p capitalize verdana">request</span></a>
                    </span>
                </div>
                <div class="w-a h-100 right">
                <span class=" flex w-100 h-100">
                    <button class="hover-2 b-none bc-green br-5p whatsappdealbut">
                        <span class="white center-2 w-100 h-100 fs-15p">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                            <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#fff"/>
                            </svg>
                        </span>
                    </button>
                </span>
            </div>`: `<div class="w-a h-100 right">
                <span class=" flex w-100 h-100">
                    <button id="${pd.prodid}" class="buynowbutt hover-2 b-none  br-5p center-2 pl-10p pr-10p bc-orange br-5p"><span class="white center-2 w-100 h-100 fs-15p">Buy now</span></button>
                </span>
            </div>
                <div class="w-a h-100 hover-2 ml-20p mr-20p right">
                    <span class="add-to-cart flex w-100 h-100">
                        <button class="hover-2 b-none bc-theme br-5p center-2 pl-10p pr-10p _211820" id="${pd.prodid}">
                            <span class="w-a h-a center-2">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="carticon hover-2" width="15px" height="15px" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" style="stroke: #fff; fill: #fff;">
                                <g>
                                <g>
                                <g>
                                    <g>
                                    <polygon points="311.2,365.5 63,365.5 11,126.7 250.7,126.7 250.7,146.5 36.5,146.5 79.9,345.7 296.3,345.7 416.2,11 501,11       501,31.9 431,31.9     "></polygon>
                                    </g>
                                    <g>
                                    <g>
                                    <path d="m262.4,501c-29.7,0-54.1-24-54.1-54.2 0-30.2 24.4-54.2 54.1-54.2s54.1,24 54.1,54.2c0,30.2-24.4,54.2-54.1,54.2zm0-87.6c-19.1,0-33.9,15.6-33.9,33.4 0,18.8 14.8,33.4 33.9,33.4s33.9-15.6 33.9-33.4c5.68434e-14-18.8-15.9-33.4-33.9-33.4z"></path>
                                    </g>
                                    <g>
                                    <path d="m108.6,501c-29.7,0-54.1-24-54.1-54.2 0-30.2 24.4-54.2 54.1-54.2s54.1,24 54.1,54.2c0,30.2-24.4,54.2-54.1,54.2zm0-87.6c-19.1,0-33.9,15.6-33.9,33.4 0,18.8 14.8,33.4 33.9,33.4s33.9-15.6 33.9-33.4c-1-18.8-15.9-33.4-33.9-33.4z"></path>
                                    </g>
                                    </g>
                                </g>
                                </g>
                                </g>
                                </svg>
                            </span>
                            <span class="white center-2 w-100 h-100 fs-15p capitalize">add</span></button>
                    </span>
                </div>
                <div class="w-a h-100 right">
                <span class=" flex w-100 h-100">
                    <button id="${pd.prodid}" class="buynowbutt hover-2 b-none bc-green br-5p whatsappdealbut">
                        <span class="white center-2 w-100 h-100 fs-15p">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                            <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#fff"/>
                            </svg>
                        </span>
                    </button>
                </span>
            </div>`}`
            let whatsappdealbut = document.querySelector('button.whatsappdealbut');
            let buynowbutt = document.querySelector('button.buynowbutt');
    
            whatsappdealbut.addEventListener('click',()=>{
    
                mkwhtspdeal(pd.pname,`${geturl()}/product-imgz/${pd.pimgs[0]}`,pd.conditions[0].name,adcm(pd.conditions[0].newprice))
            })
            let shbut = document.querySelector('span.shbut')
            shbut.addEventListener('click',()=>{
                adsb(pd.pname,`${geturl()}/product-imgz/${pd.pimgs[0]}`,pd.conditions[0].name,adcm(pd.conditions[0].newprice),shbut.parentNode)
            })
                let _211820 = Array.from(document.querySelectorAll('button._211820'));
                _211820.forEach((button) => {
                    button.addEventListener('click',e=>{
                        try {
                            e.preventDefault()
                            let index,cond;
                            conds.forEach(elem=>{
                                if(elem.classList.contains('active')){
                                    index = elem.id
                                    cond = elem.textContent
                                    return 0
                                }
                            })
                            let b = dcrtmgc(button,res,index,cond)
                            checkCart()   
                        } catch (error) {
                        }
                    })
                });
                try {
                    buynowbutt.addEventListener('click',e=>{
                        e.preventDefault()
                        let index,cond;
                        conds.forEach(elem=>{
                            if(elem.classList.contains('active')){
                                index = elem.id
                                cond = elem.textContent
                                return 0
                            }
                        })
                        localStorage.setItem('cart',JSON.stringify([]))
                        dcrtmgc(buynowbutt,res,index,cond)
                        checkCart()
                        window.open(`${geturl()}/checkout/`,'_blank')   
                    })
                    } catch (error) {
                    }
            
        });

        } else {
            
        }
    }


}
function adsb(name,image,condition,price,element) {
    let thec = document.createElement('div');
    let fc = element.firstChild;
    if (fc.id == 'shh') {
        element.querySelector('span.shbut').classList.remove('b-1-s-gray')
        return setTimeout(()=>{element.removeChild(fc)},100)
    }
    thec.id = "shh"
    element.insertBefore(thec, fc);
    element.querySelector('span.shbut').classList.add('b-1-s-gray')
    thec.className = 'bsbb card-2 p-5p w-a h-a br-2p tr-0-2 r-0 bc-white p-a zi-1000'
    setTimeout(()=>{thec.classList.add('mt-50p',1)})
    thec.innerHTML = `<div class="w-100 h-100">
                <ul class="ls-none bc-white p-0 m-0 bsbb br-5p w-200p  us-none">
						<li class=" bb-1-s-g m-0 w-100 titles hover-2 us-none " data-share="facebook">
							<div class="w-90 pt-15p pl-15p h-40p bsbb">
								<span class=" pt-5p"><i class="fa fa-motorcycle theme"></i></span>
								<span class="fs-15p theme klavika bold">facebook</span>
							</div>
						</li>
						<li class=" m-0 w-100 titles hover-2 us-none bb-1-s-g" data-share="instagram">
							<div class="w-100 w-90 pt-15p pl-15p h-40p bsbb">
								<span class="fs-15p black ">
                                    <svg aria-label="Instagram" class="_ab6-" height="20" role="img" viewBox="32 4 113 32" width="70">
                                        <path clip-rule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z">
                                        </path>
                                    </svg>
                                </span>
							</div>
						</li>
						<li class="m-0 w-100 linkSwitcher hover-2 us-none titles hover-2 us-none" data-share="whatsapp">
							<div class="w-100 w-90 pt-15p pl-15p h-40p bsbb">
								<span><i class="fas fa-user theme"></i></span>
								<span class="fs-15p green helvetica">whatsapp</span>
							</div>
						</li>
					</ul>
    </div>`
    var titles = Array.from(document.querySelectorAll('li.titles'));
    titles.forEach(ttl=>{
        ttl.addEventListener('click',e=>{
            e.preventDefault();
            let x = ttl.getAttribute('data-share')
            if (x == 'facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,'_blank')
            }else if(x == 'instagram'){

            }else if(x == 'whatsapp'){
                window.open(`whatsapp://send?text= check out this ${condition} ${name} which is pricing ${(price)} RWF at ${window.location.href}`,'_blank')
            }
        })
    })

}
function mkwhtspdeal(name,image,condition,price) {
    window.open(`https://wa.me/250788247133/?text= hello i've been surfing through your business website and found this ${condition} ${name} which is pricing ${(price)} RWF can i get more information`,'_blank') 
}
function chpri(index,conds,prihol,key) {
    let thepri = conds[index].newprice
    prihol.textContent= adcm(thepri)
    prihol.id = key
}
async function getrelated(conds) {
    let opts = {
        mode: 'cors',
        method: "POST",
        body : JSON.stringify({cntn:conds}),
        headers: {
          "content-type": "application/json",
          'accept': '*/*'
    
        }}
    var rel = await request('getprodswthcndtn',opts)
    a441618154(rel,prods_cont)
    
}
export function a441618154(aa,parent){
    if (aa.success) {
        if ( aa.message.length > 0) {
			parent.innerHTML = null;
			aa.message.forEach(d=>{
				parent.innerHTML+=`<div class="product w-250p h-380p bc-white br-20p hover-4 ovh ml-10p mr-10p mb-15p mt-15p iblock bfull-resp b-1-s-white">
						<div class="w-100 h-170p">
							<div class="image bsbb w-100 h-100 br-5p p-r">
								<span class="#icon wish-icon h-20p w-40p p-10p  center-2 w-a p-a" data-id="${d.prodid}">
									<svg version="1.1" class="w-20p h-20p p-r hover-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve">
									<g>
									<path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
										c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
										c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
										C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25
										c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826
										c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514
										c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z"/>
									</g>
								</svg>
							</span>
								<span class="verdana r-0 fs-14p bsbb p-a t-0 ${cc(d.conditions[0].name)} bc-gray p-10p center h-30p bblr-3p w-a capitalize" id="${0}">${d.conditions[0].name}
								</span>
								<span class="w-100 h-100 p-5p bsbb block">
                                    <a href="${geturl()}/product/${d.prodid}" class="td-none ls-n black block w-100 h-100">
									<img src="${geimgturl()}/product-imgz/${d.pimgs[0]}" class="w-100 h-100 contain">
                                    </a>
								</span>
							</div>
                            </div>
							<div class="w-100 h-200p">
                                <div class="title w-100 h-100p p-5p bsbb center">
                                    <a href="${geturl()}/product/${d.prodid}" class="td-none ls-n black block w-100 h-a"><span class="verdana left fs-16p p-5p bsbb black capitalize w-100 wrap fs-14p">${d.pname}</span></a>
                                </div>
								
								<div class="w-100 h-a p-15p bsbb">
									<table class="w-100 h-100">
										<tr>
											<td>
												<div class="w-100 h-100 bsbb center-2 mb-10p">
													<span class="verdana w-a  fs-14p black price 0" id="${d.conditions[0].name}">${adcm(d.conditions[0].newprice)} RWF</span>
												</div>
											</td>
										</tr>
										</tr>
											<td>
												<div class="w-100 h-100 bsbb ">
													<span class=" w-100 button">
                                                        ${(d.catname == 'services')? `<a class="w-100 h-100 bsbb p-5p white bc-orange td-none b-none br-20p center-2 hover-2 " href="${geturl()}/contact/?subject=requesting for a service&message=hello i am interested in this service of yours called ${d.pname} can i get more information about it..">
                                                        <span class="verdana w-a h-100 p-5p bsbb">
                                                            request
                                                        </span>
                                                    </a>`: `<button type="button" class="w-100 h-100 bsbb p-5p white bc-theme b-none br-20p center-2 hover-2 _311820" id="${d.prodid}">
                                                        <span class="#icon cart-icon h-100 w-30p">
                                                            <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clip-path="url(#clip0_6_146)">
                                                                    <path d="M7.82031 9.29688C7.51562 9.29688 7.27344 9.05469 7.27344 8.75C7.27344 8.44531 7.51562 8.20312 7.82031 8.20312C8.125 8.20312 8.36719 8.44531 8.36719 8.75C8.36719 9.05469 8.11719 9.29688 7.82031 9.29688ZM3.44531 9.29688C3.14062 9.29688 2.89844 9.05469 2.89844 8.75C2.89844 8.44531 3.14062 8.20312 3.44531 8.20312C3.75 8.20312 3.99219 8.44531 3.99219 8.75C3.99219 9.05469 3.74219 9.29688 3.44531 9.29688ZM3.35937 7.73438C2.94531 7.73438 2.58594 7.40625 2.53906 6.99219L2.00781 3.25781L1.70312 1.51562C1.67969 1.32812 1.51562 1.17188 1.33594 1.17188H0.9375C0.804687 1.17188 0.703125 1.07031 0.703125 0.9375C0.703125 0.804688 0.804687 0.703125 0.9375 0.703125H1.33594C1.75 0.703125 2.11719 1.03125 2.17187 1.44531L2.47656 3.1875L3.00781 6.92969C3.02344 7.10937 3.1875 7.26562 3.35937 7.26562H8.4375C8.57031 7.26562 8.67187 7.36719 8.67187 7.5C8.67187 7.63281 8.57031 7.73438 8.4375 7.73438H3.35937ZM3.75 6.48438C3.625 6.48438 3.52344 6.39062 3.51562 6.26562C3.50781 6.20312 3.53125 6.14062 3.57031 6.09375C3.60937 6.04688 3.67187 6.01562 3.72656 6.01562L7.96875 5.70312C8.15625 5.70312 8.32031 5.55469 8.34375 5.375L8.83594 2.5625C8.85156 2.42969 8.8125 2.28906 8.73437 2.20312C8.67969 2.14062 8.60937 2.10938 8.52344 2.10938H3.125C2.99219 2.10938 2.89062 2.00781 2.89062 1.875C2.89062 1.74219 2.99219 1.64062 3.125 1.64062H8.53906C8.75781 1.64062 8.95312 1.73438 9.10156 1.89062C9.26562 2.07813 9.34375 2.35156 9.3125 2.625L8.82031 5.4375C8.77344 5.84375 8.40625 6.16406 8 6.16406L3.78125 6.47656C3.76562 6.48438 3.75781 6.48438 3.75 6.48438Z" fill="white"/>
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_6_146">
                                                                        <rect width="10" height="10" fill="white"/>
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </span>
                                                        <span class="verdana w-a h-100 p-5p bsbb">
                                                            add
                                                        </span>
                                                    </button>`}
													</span>
												</div>
											</td>
										</tr>
									</table>
								</div>	
							</div>
						</div>
					</div>`;
			})
            let wish = Array.from(parent.querySelectorAll('span.wish-icon'))
                wish.forEach(wishlistbut=>{
                    wishlistbut.addEventListener('click',async()=>{
                        u = getdata('user')
                        if (!u) {
                            alertMessage('wish list is not available')
                        }else{
                            p = postschema
                            p.body = JSON.stringify({pid: wishlistbut.getAttribute('data-id'),token: u}) 
                            r = await request('addtowishlist',p);
                            if (r.success) {
                                addsCard(r.message,true)
                            }
                        }
                    })
                })
		}else{
			parent.innerHTML = `<div class="w-100 h-a">
									<div class="center p-10p bsbb w-100 h-100p svg-hol">
										<span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/> </svg></span>
									</div>
									<div class="center p-10p bsbb w-100 h-100">
										<span class="verdana fs-18p ta-c dgray">it seems like there are <br> no products in your selection</span>
									</div>
								</div>`;
		}
	}else{
		parent.innerHTML = `<div class="w-100 h-a"><div class="center p-10p bsbb w-100 h-100">
											<span class="verdana fs-18p ta-c dgray">oops, an error has occured while trying to connect to the server</span>
									</div></div>`;
	}
    let _311820 = document.querySelectorAll('button._311820');
    _311820.forEach(button => {
        button.addEventListener('click',e=>{
            e.preventDefault()
            let x = button.parentNode.parentNode.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1].childNodes[1].classList[5]
            let y = button.parentNode.parentNode.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1].childNodes[1].id
            dcrtmgc(button,aa,x,y)
        })
    });
}