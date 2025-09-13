var q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m;
import {searchFunc,checkCart,geturl} from './functions.js'
export let thecont = document.querySelector('div#cont');
export let thenav = document.createElement('div');
thenav.className = 'w-100 h-110p bsbb bb-1-s-dg zi-1000 bc-theme p-f navigation t-0 thenav';
thecont.appendChild(thenav);
u = document.createElement('div')
u.className = 'w-60p h-60p p-f b-0 r-0 m-20p zi-20'
thecont.appendChild(u)
u.innerHTML=`<a href="https://wa.me/250788247133/?text=Hello i have visited your site and i was asking for more information" target="_blank">
  <div class="w-100 h-100 center bc-green card-4 hover-2 br-50">

              <span class="icon whatsap-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
              <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#fff"></path>
              </svg>
              </span>
</div></a>`
thenav.innerHTML = `<div class="w-100 h-70p p-5p bsbb p-r bc-white" style="/*background: linear-gradient(130deg, rgb(24 37 98) 60%, rgba(0,178,238,1) 100%);*/">
<div class="w-100 h-100 bsbb zi-10000 capitalize">
<ul class="ls-none w-100 h-100 flex jc-sb p-0 m-0">
<li class="ml-5p w-a h-a verdana"><a class="td-none ls-n black w-100 h-100 center" href="${geturl()}"><img src="${geturl()}/icons/favicon.png" class="w-95p h-65p contain"></a></li>
        <li class="hidden-resp">
          <div class="verdana center-2 h-100">
          <span class="pl-10p pr-10p bsbb"><a href="${geturl()}/about/" class="td-none ls-n"><span class="nowrap hover-2 black">About us</span></a></span>
          <span class="pl-10p pr-10p bsbb"><a href="${geturl()}/contact/" class="td-none ls-n"><span class="nowrap hover-2 black">contact us</span></a></span>
          <span class="pl-10p pr-10p bsbb"><a href="${geturl()}/terms/" class="td-none ls-n"><span class="nowrap hover-2 black">policy</span></a></span>
          </div>
        </li>
        <li class="bfull-resp w-50">
        <div class="p-6p w-100 h-100 bsbb gob-resp  p-r search-sec">
        <div class=" w-100 h-90 bmt-10p p-r bfull-resp ovh">
              <form action="" method="post" class="h-100 w-100 flex" id ="searchFrm">
              <div class="#icon search-icon w-60p h-100 p-a r-0 center transparent">
                <button type="submit" class="b-none p-0 ml--23p bc-orange py-10p px-10p br-20p white hover-2">
                <span class="p-5p capitalize">
                  search
                </span>
                </button>
              </div>
                <span class="w-30p h-30p p-a #search-icon mt-8p ml-10p">
                  <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" width="25" height="25" focusable="false" role="none" stroke="#ccc" fill="#ccc" style="stroke-width: 0px;">
                    <g>
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                      </path>
                    </g>
                  </svg>
                </span>
                <input type="text" name="search" class="b-2-s-orange no-outline br-20p w-100 h-100 pl-35p bsbb b-none" placeholder="what are you looking for..." id="searchTxt">
                </form>
                </div>
                </div>
                </li>
                <li class="w-a h-100 center pr-10p bp-a-resp r-0 bmt--10p">
                <div class="p-5p bsbb h-50p w-110p jc-sb flex p-r ics">
                <span class="#icon h-100 center-2 w-a">
                  <svg version="1.1" class="w-20p h-20p p-r hover-2 wishicon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 51.997 51.997" style="fill: #000;" xml:space="preserve">
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
                <span class="#icon cart-icon h-100 center">
                  <span class="hidden p-a br-50 w-15p h-15p theme bc-orange ml-20p cart-badge-hol ">
                    <font class="white consolas fs-12p center cart-badge iblock w-100 h-100">0</font>
							    </span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="carticon hover-2"  width="20px" height="25px" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" style="stroke: #000; fill: #000;">
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
                <span class="#icon user-icon h-100 center pt-7p bsbb mt--2p hover-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" class="user--ic">
                <g id="User / User_02">
                <path id="Vector" d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </svg>
              </span>
              </div>
              </li>
      </ul>
    </div>
    </div>
    <div class="w-100 h-40p p-5p bsbb ovh bc-orange">
    <div class="w-100 h-100">
      <ul class="ls-none w-100 h-100 flex p-0 m-0 ml-0">
      <li class="w-a h-100 menubutt hover-2 bp-a-resp p-r">
      <span class="#icon menu-icon ml-6p  w-100 h-100 flex">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 21.25H10M15 21.25H25M5 15H25M5 8.75H15M20 8.75H25" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="verdana  capitalize hover-2 w-a h-a center white">All&nbsp;Categories</span>
              </span>
              </li>
              <li class="w-95 h-a ovxh center pr-10p pl-10p bsbb">
              <ul class="ls-none w-100 h-100 center-2 horizontal no-scroll poppsins ovyh jc-sb m-0 p-0 hidden-resp nav-pinned-space">
              <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
              </li>
              <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
              </li>
              <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
              </li>
              <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
            </li>
            <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
              </li>
              <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
              </li>
              <li class="w-a h-a">
              <div class="verdana pl-15p pr-15p capitalize hover-2 bc-gray skel br-5p w-80p h-25p ml-10p"></div>
              </li>
          </ul>
          </li>
          </ul>
          </div>
          </div>`     
export let menubutt = document.querySelector('li.menubutt');
a = document.querySelector('input#searchTxt');
f = document.querySelector('form#searchFrm');
f.addEventListener('submit',ff=>{
  ff.preventDefault();
  if (a.value.trim() != "") {
    window.location.replace(`${geturl()}/search/${a.value.trim()}`)
  }
})
a.addEventListener('focus',cv=>{
  cv.preventDefault();
  
})
a.addEventListener('keyup',e=>{
  e.preventDefault()
  searchFunc(a);
})
checkCart()
          // var banner = document.getElementById('banner');
// window.onscroll = function() {scrollFunction()};
// window.onload = function() {scrollFunction()};

// var prevScrollpos = window.pageYOffset;
// function scrollFunction() {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
    //     navbar.classList.remove("mt-8p");
    //     banner.classList.remove("mt--100p");
    //     banner.classList.add('tr-0-4');
    //     navbar.classList.add('tr-0-4');
    
    //   } else {
      //     navbar.classList.add("mt-8p");
//     banner.classList.add("mt--100p");
//     navbar.classList.add('tr-0-4');
//     banner.classList.add('tr-0-4');

//   }
//   prevScrollpos = currentScrollPos;
// }