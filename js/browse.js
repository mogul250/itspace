let loc = window.location.href
import { getasked } from "./filter.js";
import {getPath} from './functions.js'
import { request ,geturl,cc,adcm,dcrtmgc,sf} from "./functions.js";
let prodscont = document.querySelector('div.prods-cont');

let currentPage = 0;
const productsPerPage = 30;
let isLoading = false;
let allDataLoaded = false;
let askedGlobal = null;

(async () => {
    await getparams(loc);
})();

async function getparams(url) {
    let btitle = document.querySelector('div.the-title');
    askedGlobal = {[getPath(1)]: getPath(2)}
    let brttl = document.querySelector('span.br-ttl');

    if (askedGlobal != null) {
        currentPage = 0;
        allDataLoaded = false;
        prodscont.innerHTML = null;
        await fetchProducts();
        window.addEventListener('scroll', handleScroll);
        brttl.parentNode.classList.add('center-2')
        brttl.parentNode.classList.add('ml-10p','p-6p')
        brttl.parentNode.parentNode.parentNode.className='the-h w-100 h-50p  bsbb mt-10p mb-10p  b-1-s-dgray br-5p bc-white'
        brttl.parentNode.parentNode.className='h-100 w-100 flex jc-sb'
        btitle.innerHTML = `<div class=" w-100 h-100 br-10p p-5p bsbb"><span class="w-100 h-20p br-5p flex verdana nowrap">browsing in &nbsp;<b>${askedGlobal[Object.keys(askedGlobal)]}</b></span></div>`
        brttl.innerHTML = `<span class="w-a h-a br-5p capitalize"> ${askedGlobal[Object.keys(askedGlobal)]}</span>`
        document.title =  `${(askedGlobal[Object.keys(askedGlobal)].substring(0,1).toUpperCase()+askedGlobal[Object.keys(askedGlobal)].substring(1,askedGlobal[Object.keys(askedGlobal)].length))} | ITSPACE`;
    } else {
        prodscont.innerHTML = `<div class="w-100 h-a">
                                    <div class="center p-10p bsbb w-100 h-a svg-hol">
                                        <span class="verdana fs-15p">
                                         <svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/>
                                         </svg>
                                        </span>
                                    </div>
                                    <div class="center p-40p bsbb w-100 h-100">
                                        <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no products in your selection</span>
                                    </div>
                                </div>`;
    }
}

async function fetchProducts() {
    if (isLoading || allDataLoaded) return;
    isLoading = true;

    const loader = `<div class="w-100 h-100 center-2"><div class="loader" style="border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite;"></div></div>`;
    prodscont.insertAdjacentHTML('beforeend', loader);

    let opts = {
        mode: 'cors',
        method: "post",
        body: JSON.stringify({cntn: [askedGlobal], offset: currentPage * productsPerPage, limit: productsPerPage}),
        headers: {
          "content-type": "application/json",
          'accept': '*/*'
        }
    };
    let productsBatch = await request('getprodswthcndtn', opts);

    const currentLoader = prodscont.querySelector('.loader');
    if(currentLoader) currentLoader.parentElement.remove();

    if (!productsBatch || !productsBatch.success || productsBatch.message.length === 0) {
        allDataLoaded = true;
        isLoading = false;
        if (currentPage === 0) {
            prodscont.innerHTML = `<div class="w-100 h-a">
                                        <div class="center p-10p bsbb w-100 h-a svg-hol">
                                            <span class="verdana fs-15p">
                                             <svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/>
                                             </svg>
                                            </span>
                                        </div>
                                        <div class="center p-40p bsbb w-100 h-100">
                                            <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no products in your selection</span>
                                        </div>
                                    </div>`;
        }
        return;
    }

    sf(productsBatch, prodscont, currentPage !== 0);

    currentPage++;
    isLoading = false;
}



function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const prodsContHeight = prodscont.offsetHeight;
    const prodsContTop = prodscont.getBoundingClientRect().top + scrollTop;
    const scrollPosition = scrollTop + windowHeight;

    // Trigger fetchProducts when user scrolls near the bottom of the products container (within 100px)
    if (scrollPosition >= prodsContTop + prodsContHeight - 100) {
        if (!isLoading) {
            fetchProducts();
        }
    }
}

