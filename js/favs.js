import { getParam, getdata,request,postschema,getschema,addshade,shuffleArray,closetab,cc,geturl,adcm,dcrtmgc,geimgturl,addsCard,alertMessage } from "./functions.js";
let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m;

let currentPage = 0;
let isLoading = false;
let allDataLoaded = false;
const limit = 30;
const loader = `<div class="w-100 h-100 center-2"><div class="loader" style="border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite;"></div></div>`;
let wishlistIds = [];

const favContainer = document.querySelector('div.fav-c');

async function fetchFavs() {
    if (isLoading || allDataLoaded) return;
    isLoading = true;
    
    favContainer.insertAdjacentHTML('beforeend', loader);

    let favs = getdata('favs');
    if (!favs) {
        favs = await new Promise(resolve => {
            const inter = setInterval(() => {
                const v = getdata('favs');
                if (v !== null) {
                    clearInterval(inter);
                    resolve(v);
                }
            }, 1000);
        });
    }

    const user = getdata('user');
    if (user && currentPage === 0) { // Only fetch on initial load
        const p = postschema;
        p.body = JSON.stringify({ token: user });
        const wishlistResponse = await request('getwishlistids', p);
        if (wishlistResponse.success) {
            wishlistIds = wishlistResponse.message;
        }
    }

    if (favs) {
        const postData = postschema;
        const offset = currentPage * limit;
        postData.body = JSON.stringify({ cntn: favs, limit: limit, offset: offset });
        const response = await request('getprodswthorcndtn', postData);
        
        const currentLoader = favContainer.querySelector('.loader');
        if(currentLoader) currentLoader.parentElement.remove();

        if (response.success) {
            if (response.message.length > 0) {
                addfav(response, favContainer, wishlistIds);
                currentPage++;
            } else {
                allDataLoaded = true;
                if (currentPage === 0) {
                    favContainer.innerHTML = `<div class="w-100 h-a">
                        <div class="center p-10p bsbb w-100 h-100p svg-hol">
                            <span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/> </svg></span>
                        </div>
                        <div class="center p-10p bsbb w-100 h-100">
                            <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no products in your selection</span>
                        </div>
                    </div>`;
                }
            }
        } else {
            favContainer.innerHTML = `<div class="w-100 h-a"><div class="center p-10p bsbb w-100 h-100">
                                            <span class="verdana fs-18p ta-c dgray">oops, an error has occured while trying to connect to the server</span>
                                    </div></div>`;
        }
    }
    isLoading = false;
}

export function addfav(aa, parent, wishlistIds = []) {
	if (aa.success) {
		if ( aa.message.length > 0) {
			if (currentPage === 0) {
			    parent.innerHTML = '';
            }
			aa.message.forEach(d=>{
                const inWishlist = wishlistIds.includes(d.prodid);
                const wishlistStyle = inWishlist ? 'style="fill:var(--main-color); stroke: var(--main-color);"' : '';
				parent.innerHTML+=`<div class="product w-250p h-380p bc-white br-20p bmb-10p-resp ovh ml-10p mr-10p mb-15p mt-15p iblock b-1-s-white bm-a-resp bfull-resp ">
						<div class="w-100 h-170p">
							<div class="image bsbb w-100 h-100 br-5p p-r">
								<span class="#icon wish-icon h-20p w-40p p-10p  center-2 w-a p-a" data-id="${d.prodid}">
									<svg version="1.1" class="w-20p h-20p p-r hover-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve">
									<g>
									<path ${wishlistStyle} d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
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
                                    <a href="${geturl()}/product/${d.prodid}" class="td-none ls-n black">
									    <img src="${geimgturl()}/product-imgz/${d.pimgs[0]}" class="w-100 h-100 contain">
                                    </a>    

								</span>
							</div>
							<div class="w-100 h-200p">
								<div class="title w-100 h-100p p-5p bsbb">
									<a href="${geturl()}/product/${d.prodid}" class="td-none ls-n black"><span class="verdana left fs-14p p-5p bsbb black capitalize">${d.pname}</span></a>
								</div>
								<div class="w-100 h-a p-15p bsbb">
									<table class="w-100">
										<tr>
											<td>
												<div class="w-100 h-100 bsbb center-2 mb-10p">
													<span class="verdana w-a  fs-14p black price 0 bold-2" id="${d.conditions[0].name}">${adcm(d.conditions[0].newprice)} RWF</span>
												</div>
											</td>
										</tr>
										</tr>
											<td>
												<div class="w-100 h-100 bsbb ">
													<span class=" w-100 button">${(d.catname == 'services')? `<a class="w-100 h-100 bsbb p-5p white bc-orange td-none b-none br-20p center-2 hover-2 " href="${geturl()}/contact/?subject=requesting for a service&message=hello i am interested in this service of yours called ${d.pname} can i get more information about it..">
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
            let _311820 = parent.querySelectorAll('button._311820')
			_311820.forEach(button => {
				button.addEventListener('click',e=>{
					let x = parseInt(button.parentNode.parentNode.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1].childNodes[1].classList[5])
					let y = button.parentNode.parentNode.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1].childNodes[1].id
					e.preventDefault()
					dcrtmgc(button,aa,x,y)
				})
			});
		}
	}
}

fetchFavs();

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= favContainer.offsetTop + favContainer.offsetHeight - 200) {
        fetchFavs();
    }
});
