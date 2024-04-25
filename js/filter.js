
import {request,getschema,postschema, getParam, getPath} from './functions.js'
import {sf} from './functions.js'
let r = await request('tree',getschema)

let cont = document.getElementById("bodycont");
let filternav=document.createElement("div");
let prodscont = document.querySelector('div.prods-cont');
filternav.className=`w-100 h-a bh-0-resp p-r  bsbb t-0 zi-0 filter-nav bfull-resp ovh nowrap bmb-10p`;
let fc = cont.firstChild;
cont.insertBefore(filternav, fc);
filternav.innerHTML = `<div class="w-100 h-100 br-10p bc-white p-10p bsbb ovh">
<div class="w-100 h-a bsbb p-0p bsbb">
<div class="w-100 h-40p ">
<span class="capitalize verdana left fs-20 p-5p">
   filters
</span>
</div>
</div>
<div class="w-100 h-a bsbb bblock-resp">
    <div class="w-100 m-a h-a bsbb bblock-resp bfull-resp">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                price range
            </span>
        </div>
                <div class="theslider w-90 bfull-resp m-a p-r h-a">
                    <div id="slider" class="p-r mt-10p h-ap w-100">
                    <div class="w-100 h-60p mt-10p mb-10p bsbb flex">
                    <div class="w-100 mr-10p left parent flex">
                        <input type="number" min="0" name="min" placeholder="Min (0)" class="p-5p h-30p  no-outline bsbb b-1-s-dgray bc-white main-input w-70">
                        <div class="no-outline bsbb b-1-s-dgray bc-gray w-30 pt-10p h-30p pb-10p iblock">
                            <div class="consolas fs-14p dgray center">RWF</div>
                        </div>
                    </div>
                    <div class="p-r w-100 parent flex">
                        <input type="number" min="1" name="max" placeholder="Max" class="p-5p no-outline h-30p bsbb b-1-s-dgray bc-white main-input w-70">
                        <div class="no-outline bsbb b-1-s-dgray bc-gray w-30 pt-10p pb-10p iblock h-30p">
                            <div class="consolas fs-14p dgray center">RWF</div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div class="w-100 m-a h-a p-5p bsbb bblock-resp bfull-resp">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                categories
            </span>
        </div>
        <div class="w-100 p-10p bsbb h-a ovys left">
            <span class="w-100 h-100 verdana">
                <ul class="p-5p m-0 ls-none categories">
                   
                </ul>
            </span>
        </div>
    </div>
    <div class="w-a m-a h-a p-5p bsbb bblock-resp bfull-resp va-t">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                sub categories
            </span>
        </div>
        <div class="w-100 p-10p bsbb h-a ovys left">
            <span class="w-100 h-100 verdana">
                <ul class="p-5p m-0 ls-none subcategories">
                    
                </ul>
            </span>
        </div>
    </div>
    <div class="w-a m-a h-a p-5p bsbb bblock-resp bfull-resp va-t">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                Brands
            </span>
        </div>
        <div class="w-100 p-10p bsbb h-a left">
            <span class="w-100 h-100 verdana">
                <ul class="p-5p m-0 ls-none brands">
                    
                </ul>
            </span>
        </div>
    </div>
    <div class="w-a m-a h-a p-5p bsbb bblock-resp bfull-resp va-t">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                availability
            </span>
        </div>
        <div class="w-100 p-10p bsbb h-a ovys left">
            <span class="w-100 h-100 verdana">
                <ul class="p-5p m-0 ls-none availability">
                    
                </ul>
            </span>
        </div>
    </div>
    <div class="w-a m-a h-a p-5p bsbb bblock-resp bfull-resp va-t">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                usability
            </span>
        </div>
        <div class="w-100 p-10p bsbb h-a ovys left">
            <span class="w-100 h-100 verdana">
                <ul class="p-5p m-0 ls-none usability">
                    
                </ul>
            </span>
        </div>
    </div>
    <div class="w-a m-a h-a p-5p bsbb bblock-resp bfull-resp va-t">
        <div class="w-100 h-40p ">
            <span class="capitalize verdana left fs-17 p-5p">
                sort by
            </span>
        </div>
        <div class="w-100 p-10p bsbb h-a ovys left">
            <span class="w-100 h-100 verdana">
                <ul class="p-5p m-0 ls-none sort">
                    <li class="capitalize fs-15p">
                        <input type="radio" name="order-by" id="checkbox" value="name-asc" data-zon="order-by"> name (A-Z)
                    </li>
                    <li class="capitalize fs-15p">
                        <input type="radio" name="order-by" id="checkbox" value="name-desc" data-zon="order-by"> name (Z-A)
                    </li>
                    <li class="capitalize fs-15p">
                        <input type="radio" name="order-by" id="checkbox" value="price-desc" data-zon="order-by"> price (High to Low)
                    </li>
                    <li class="capitalize fs-15p">
                        <input type="radio" name="order-by" id="checkbox" value="price-asc" data-zon="order-by"> price (Low to High)
                    </li>
                </ul>
            </span>
        </div>
    </div>
</div>

</div>
<div class="w-100 h-60p p-10p bsbb">
    <div class="w-100 igrid">
        <span class="bcenter-500p-resp">
            <button type="button" class="bc-theme br-2p hover-2 p-10p b-none w-a center-2 right h-40p br-5p filbutton">
                <span class="#icon filter-icon center w-40p h-40p bsbb  hover-2">
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" stroke="#fff" fill="#fff" focusable="false" class="w-20p h-20p"><g class=""><path d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z M18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z" class=""></path></g></svg>
                </span>
                <span class="verdana white fs-15p capitalize">filter</span>
            </button>
        </span>
    </div>
</div>
`

let ins = Array.from(filternav.querySelectorAll('input.main-input'));
ins.forEach(input=>{
    input.addEventListener('blur',(e)=>{
        if (input.name == 'max') {
            let a,b
            a=ins[0].value
            b=ins[1].value
            if(a > b) ins[1].value = a  
        }

    })

})
let categories = filternav.querySelector('ul.categories')
let subcategories = filternav.querySelector('ul.subcategories')
let brands = filternav.querySelector('ul.brands')
let availability = filternav.querySelector('ul.availability')
let usability = filternav.querySelector('ul.usability')
let arr = new Array(categories,subcategories,brands,availability,usability);
if (r.success){
    r = r.message
    d(r)
}
function d(r) {
    arr.forEach(p=>{
        p.innerHTML = null
    })
    try {
        r.categories.forEach((category)=>{
            let lecli = document.createElement('li');
            lecli.className = 'capitalize fs-15p'
            arr[0].appendChild(lecli)
            lecli.innerHTML  = `<input type="radio" name="category" id="checkbox" value="${category.name}" data-zon="category"> ${category.name}`
            category.subcategories[0].forEach(subcategory=>{
                let lesli = document.createElement('li');
                lesli.className = 'capitalize fs-15p'
                arr[1].appendChild(lesli)
                lesli.innerHTML  = `<input type="radio" name="subcategory" id="checkbox" value="${subcategory.name}" data-zon="subcategory" data-parent="${category.name}"> ${subcategory.name}`
            })
        })
    } catch (error) {
        
    }
    try {
        r.brands.forEach((brand)=>{
            let lebli = document.createElement('li');
            lebli.className = 'capitalize fs-15p'
            arr[2].appendChild(lebli)
            lebli.innerHTML  = `<input type="radio" name="brand" id="checkbox" value="${brand.name}" data-zon="brand"> ${brand.name}`
        })
    } catch (error) {
        
    }
    try {
        r.availability.forEach((availability)=>{
            let leali = document.createElement('li');
            leali.className = 'capitalize fs-15p'
            arr[3].appendChild(leali)
            leali.innerHTML  = `<input type="radio" name="availability" id="checkbox" value="${availability.name}" data-zon="availability"> ${availability.name}`
        }) 
    } catch (error) {
        
    }
    try {
        r.usedin.forEach((usedin)=>{
            let leuli = document.createElement('li');
            leuli.className = 'capitalize fs-15p'
            arr[4].appendChild(leuli)
            leuli.innerHTML  = `<input type="radio" name="usedin" id="checkbox" value="${usedin.name}" data-zon="usedin"> ${usedin.name}`
        })
    } catch (error) {
        
    }
    
    filnvd({[getPath(1)]: getPath(2)},arr)
    let filbutton = filternav.querySelector('button.filbutton')
    filbutton.addEventListener('click',async ()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let ctn = []
        let fils = Array.from(filternav.querySelectorAll('input#checkbox'))
        let fila = Array.from(filternav.querySelectorAll('input#radio'))
        for (const checkbox of fils) {
           if (checkbox.checked) {
                ctn.push({[checkbox.getAttribute('data-zon')]: checkbox.value})
            }
        }
        if (ins[1].value!= '' ) {
            (ins[0].value == '')? ins[0].value = 0 : ins[0].value = ins[0].value
            ctn.push({range: [parseInt(ins[0].value),parseInt(ins[1].value)]})
        }
        for (const radio of fila) {
            if (radio.checked) {
                 ctn.push({[radio.getAttribute('data-zon')]: radio.value})
             }
         }
        
        if (ctn.length) {
            let p = postschema
            if (getPath(0)[0] == 'search') {
                let g = getPath(1)
                console.log(getPath(1))
                if (g) ctn.push({namelike :g})
                
            }
            p.body = JSON.stringify({cntn: ctn})
            let res = await request('getprodswthcndtn',p)
            sf(res,prodscont)
        }
    })
}
let filterbutt = document.querySelector('span.filter-icon');
filterbutt.addEventListener('click',e=>{
    e.preventDefault();
    if(filternav.classList.contains('h-0')){
        filternav.classList.add('mr-5p')
        filternav.classList.add('r-0')
        filterbutt.classList.add('b-1-s-dgray')
        filternav.classList.remove('h-0')   
        filternav.classList.add('h-a')   
        filternav.classList.add('p-20p')   

    }else{
        filternav.classList.remove('h-a')
        filternav.classList.add('h-0')
        filternav.classList.remove('r-0')
        filternav.classList.remove('mr-5p')
        filterbutt.classList.remove('b-1-s-dgray')
        filternav.classList.remove('p-20p')   


    }
    

})
export function getasked(url) {
    let i = new URL(url)
    let cat = {category : i.searchParams.get("category")}

    let subcategory = {subcategory: i.searchParams.get("subcategory")}
    let usedin = {usedin:i.searchParams.get("usedin")}
    let brand = {brand: i.searchParams.get("brand")}
    let family = {family: i.searchParams.get("serie")}
    let availability = {availability: i.searchParams.get("availability")}
    let ass = Array(cat,subcategory,usedin,brand,family,availability)
    let asked = null
    ass.forEach(as=>{
            if (as[Object.keys(as)]) {
                asked = as
                return asked
            }
        })
        return asked
}
function filnvd(asked,divs) {
    if(!asked) return 0
    if (Object.keys(asked) == 'category') {
        let lelis = Array.from(divs[0].querySelectorAll('input'))
        for (const radio of lelis) {
            if (radio.value != asked.category) {
                radio.parentNode.className = 'hidden'
            }else{
                radio.checked = true
            }
        }
    }else if (Object.keys(asked) == 'subcategory') {
        let lelis = Array.from(divs[1].querySelectorAll('input'))
        for (const radio of lelis) {
            if (radio.value != asked.subcategory) {
                radio.parentNode.className = 'hidden'
            }else{
                radio.checked = true
            }
        }
    }else if (Object.keys(asked) == 'brand') {
        let lelis = Array.from(divs[2].querySelectorAll('input'))
        for (const radio of lelis) {
            if (radio.value != asked.brand) {
                radio.parentNode.className = 'hidden'
            }else{
                radio.checked = true
            }
        }
    }else if (Object.keys(asked) == 'usedin') {
        let lelis = Array.from(divs[4].querySelectorAll('input'))
        for (const radio of lelis) {
            if (radio.value != asked.usedin) {
                radio.parentNode.className = 'hidden'
            }else{
                radio.checked = true
            }
        }
    }else if (Object.keys(asked) == 'availability') {
        let lelis = Array.from(divs[3].querySelectorAll('input'))
        for (const radio of lelis) {
            if (radio.value != asked.availability) {
                radio.parentNode.className = 'hidden'
            }else{
                radio.checked = true
            }
        }
    }
    
}