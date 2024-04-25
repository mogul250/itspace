
let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m;
const ssid = g10()
const socket = io(geturl(),{ query : { id: ssid} });
localStorage.setItem('SID',ssid)
function g10() {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
socket.on('connect', () => {
  console.log('Connected to the server');
});
d = socket.emit('message', 'Hello, server!');
socket.on('acknowledge', (data) => {
  console.log(`Received acknowledgement from server: ${data}`);
});
socket.on('datarefreshed',(message)=>{
  refreshtoken()
});
socket.on('deleteadmintoken',(message)=>{
  localStorage.removeItem('admin');
  window.location.reload()
});
(()=>{
  x = getdata('cart');
  if (x == null) {
    localStorage.setItem('cart',JSON.stringify([]));
  }
})
export function checkCart() {
  var cart_badge = document.querySelector('font.cart-badge');
  var cart_badge_hol = document.querySelector('span.cart-badge-hol');
	a = getdata('cart');
  (a == null)? localStorage.setItem('cart',JSON.stringify([])) : 0
  a = getdata('cart');
  if(a.length > 0){
		if (cart_badge_hol.classList.contains('hidden')) {
			cart_badge_hol.classList.remove('hidden');
	    cart_badge.innerText = a.length;
		}else{
	    cart_badge.innerText = a.length
    }
  }else{
			cart_badge_hol.classList.add('hidden');
			cart_badge.innerText = a.length;
	}
  return a.length
}
export function showCart(theshade){
   theshade = addshade();
    var cart_cont = document.createElement('div');
    theshade.appendChild(cart_cont);
    var cart_cont_r = document.createElement('div');
    cart_cont.appendChild(cart_cont_r);
    if (window.innerWidth < 560) {
      cart_cont.className = "p-r  w-100 white h-70 p-5p btr-10p card-2 p-a b-0 bsbb bc-white";
    }else{
      cart_cont.className = 'p-r  w-450p white h-500p p-10p br-10p card-2 cntr bsbb bc-white';
      theshade.classList.add("p-10");		
    }
    window.addEventListener('resize', e=> {
      if (window.innerWidth <= 560) {
      theshade.classList.remove("p-10");
      cart_cont.className = "p-r ovh w-100 white h-70 p-5p btr-10p card-2 p-a b-0 bsbb bc-white";	
    }else{
      theshade.classList.add("p-10");
      cart_cont.className = 'p-r  w-450p white h-500p p-10p br-10p card-2 cntr bsbb bc-white';
    }
    });
    cart_cont_r.className = "w-100 h-100 p-5p bsbb";
    var itemshol = document.createElement('div');
    cart_cont_r.appendChild(itemshol);
    itemshol.className = "w-100 bsbb p-5p mt-50p h-85 p-r ovys";
    var items = document.createElement('div');
    itemshol.appendChild(items);
    items.className =''
    cart_cont_r.innerHTML = '<div class="w-100 center h-20p"><div class="w-100p br-5p h-5p bc-dgray "></div></div><div class="title p-r left pb-5p w-100 h-50p bb-1-s-g p-f c_title" bsbb><span class="left c_title w-120p center black verdana igrid h-100"><font class="verdana fs-20p bold capitalize">my&nbsp;cart</font></span></div>';
		cart_cont_r.appendChild(itemshol);
		for (var i  = 0; i <= 5; i++) {
      items.innerHTML += '<div class="hol w-100 h-80p p-r m-5p"><div class="left w-60p h-60p bc-gray skel m-5p iblock skel"></div><div class="info w-250p h-100 iblock"><div class="w-80 h-10p bc-gray m-5p br-5p skel"></div><div class="w-40 h-10p bc-gray skel m-5p br-5p"></div><div class="w-70 h-10p bc-gray m-5p skel br-5p"></div></div></div>';
		}
    animskel()
    a = getdata('cart');
    (a == null)? localStorage.setItem('cart',JSON.stringify([])) : 0
    a = getdata('cart');
    x = document.querySelector('div.c_title');
    if (a.length == 0) {
      x.innerHTML = '<font class="verdana fs-30p capitalize black">my&nbsp;cart</font>';
			items.innerHTML = `<div class="center w-100 h-200p"><p  class="center"><font class="gray w-100 fs-50p"><i class="fa fa-exclamation-circle"></i></font></p><p class="center"><font class="dgray w-100 fs-20p verdana">your cart is empty!</font></p><div class="w-100 h-40p center"><button class="br-20p h-100 w-100p bc-theme b-none p-10p bsbb __b hover-2"><font class=" white verdana">Add more</font></button></div></div>`;
			b = document.querySelector('button.__b');
      v = document.querySelector('div#body');
      n = document.querySelector('div.navigation'); 
      s = document.querySelector('div.sidenav');  
      a = new Array(v,n,s)
      
			b.addEventListener('click', e=>{
				e.preventDefault();
        a.forEach(el=>{
          if (el != null) {
            el.classList.remove('blur')
          }
        })
				closetab(theshade,theshade.parentNode);
			});
		}else{
      shwcrtcntn(a,x,items)
   	}
}
export function getPath(index) {
  let i = new URL(window.location.href)
  i = i.pathname
  i = i.split('/')
  // i.pop()
  i.shift()
  if (!index) {
    return i
  }
  return decodeURIComponent(i[index])
  
}
function shwcrtcntn(a,x,items) {
  if (a.length == 0) {
    x.innerHTML = '<font class="verdana fs-30p capitalize black">my&nbsp;cart</font>';
    items.innerHTML = `<div class="center w-100 h-200p"><p  class="center"><font class="gray w-100 fs-50p"><i class="fa fa-exclamation-circle"></i></font></p><p class="center"><font class="dgray w-100 fs-20p verdana">your cart is empty!</font></p><div class="w-100 h-40p center"><button class="br-20p h-100 w-100p bc-theme b-none p-10p bsbb __b hover-2"><font class=" white verdana">Add more</font></button></div></div>`;
    return 0;
  }
  p = ()=>{
    z = 0
    a.forEach(pr=>{
      z+= pr.price*pr.qty
    })
    return z
  }
  x.innerHTML = `<span class="shol left w-a center igrid h-100 ml-10p"><div class="w-100 h-100"><font class="black capitalize verdana left w-50p igrid">total:&nbsp;</font><font class="theme verdana fs-15p capitalize igrid p-2p">${adcm(p())} rwf</font></div></span><span class="igrid right center h-100 mr-10p"><a href="${geturl()}/checkout/" class="td-none ls-none ls-n td-none"><button class="button bc-theme white br-5p center verdana b-none py-7p px-15p hover-2 bsbb"><font class="fs-15p fs-15p center mt--2p">Check out</font></button></a></span>`;
  items.innerHTML = "";
   a.forEach(d=>{
    items.innerHTML += `<div class="w-100 h-80p p-r mt-5p bb-1-s-g">
    <table class="w-100 bsbb">
      <tr>
        <td rowspan="2">
          <div class="left w-60p h-60p bc-white iblock">
            <span class="w-100 h-100 p-r">
              <img src="${geimgturl()}/product-imgz/${d.image}" class="w-100 h-100 contain">
            </span>
          </div>
        </td>
        <td class="w-a">
          <div class="w-100 h-25p bc-white bsbb">
            <span class="w-100 h-100 p-4p bc-white w-100 __16141134">
              <a href="${geturl()}/product/${d.prodid}" class="td-none ls-n">
                <font class="fs-16p black poppsins capitalize verdana hover-2 _16141134"  title="${d.pname}">
                  ${ellipsis(d.pname,20)}
                </font>	
              </a>
            </span>
          </div>
        </td>
        <td>
          <div class="w-80  h-25p bc-white">
            <span class="w-100 h-100 p-4p bc-white right">
              <span class="fs-16p black verdana capitalize nowrap">
              ${adcm(d.price)} <span class="fs-14p dgray consolas capitalize nowrap">RWF</span>
              </span>	
            </span>
          </div>
        </td>

      </tr>
      <tr>
        <td>
          <div class="h-25p bc-white mt--2p p-0 p-r igrid">
            <span class="w-100 h-100">
              <div class="inhol w-100 h-a p-5p">
                <div class="left br-1p h-20p w-20p center igrid b-1-s-gray">
                  <span class="w-100 h-100 center">
                    <span class="center fs-16p us-none minus hover-2 black consolas" id="${d.prodid}">
                      -
                    </span>
                  </span>
                </div>
                <div class=" left center br-1p h-20p w-20p igrid b-1-s-gray">
                  <span class="w-100 h-100 center">
                    <span class="center fs-16p us-none quantity black consolas" id="${d.prodid}">${d.qty}</span>
                  </span>
                </div>
                <div class=" br-1p h-20p w-20p center igrid b-1-s-gray">
                  <span class="w-100 h-100 center">
                    <span class="center fs-16p us-none plus hover-2 black consolas" id="${d.prodid}">
                      +
                    </span>
                  </span>
                </div>
              </div>
            </span>
          </div>
          <div class=" h-25p bc-white right igrid">
            <span class="w-100 h-100 p-4p bc-white w-100">
              <font class="fs-14p ${cc(d.condition)} verdana capitalize p-5p bc-tr-theme br-2p">
              ${d.condition}
              </font>	
            </span>
          </div>
        </td>
        <td>
          <div class="w-100 h-100 bc-white p-5p center bsbb">
            <span class="center w-100 h-100 bc-white">
              <font class="center removeb red verdana hover-2" id="${d.prodid}">
                &times;&nbsp;remove
              </font>
            </span>
          </div>
        </td>
      </tr>
    </table>
  </div>`;
  });
  var plus = Array.from(items.querySelectorAll('span.plus'));
  var minus = Array.from(items.querySelectorAll('span.minus'));

  var removeb = Array.from(document.querySelectorAll('font.removeb'));
  removeb.forEach(xc=>{
    xc.addEventListener('click',e=>{
      e.preventDefault();
      l =  removecartitem(xc.id,items);
      shwcrtcntn(l,x,items)
      checkCart()
    })
  })
  plus.forEach(plus=>{
    plus.addEventListener('click',e=>{
      e.preventDefault();
      addcrtqty(plus.id,a);
      l = getdata('cart')
      shwcrtcntn(l,x,items)
      checkCart()
    })
  })
  minus.forEach(minus=>{
    minus.addEventListener('click',e=>{
      e.preventDefault();
      mnuscrtqty(minus.id,a);
      l = getdata('cart')
      shwcrtcntn(l,x,items)
      checkCart()
    })
  })
}
function  addcrtqty(prodid,cart) {
  cart.forEach(item=>{
    if (item.prodid == prodid) {
      cart[cart.indexOf(item)].qty+= 1
      localStorage.setItem('cart',JSON.stringify(cart))
    }
  })
}
function  mnuscrtqty(prodid,cart) {
  cart.forEach(item=>{
    if (item.prodid == prodid &&  cart[cart.indexOf(item)].qty > 1) {
      cart[cart.indexOf(item)].qty-= 1
      localStorage.setItem('cart',JSON.stringify(cart))
    }
  })
}
export async function request(url,options){
  if (url == 'tree') {
    t = getdata('tree')
    if (!t) {
      z = await fetch(`${geturl()}/api/`+url,options);
      y = await z.json();
      Object.assign(y,{status: z.status})
      localStorage.setItem('tree',JSON.stringify(y))
      return y;
    }else{
      return t
    }
  }else if (url == 'getprods') {
    t = getdata('getprods')
    if (!t) {
      z = await fetch(`${geturl()}/api/`+url,options);
      y = await z.json();
      Object.assign(y,{status: z.status})
      localStorage.setItem('getprods',JSON.stringify(y))
      return y;
    }else{
      return t
    }
  }else if (url == 'getpinned'){
    t = getdata('getpinned')
    if (!t) {
      z = await fetch(`${geturl()}/api/`+url,options);
      y = await z.json();
      Object.assign(y,{status: z.status})
      localStorage.setItem('getpinned',JSON.stringify(y))
      return y;
    }else{
      return t
    }

  }
  try {
    if (url.indexOf('edit') !=-1 || url.indexOf('add') !=-1 || url.indexOf('delete') !=-1 || url.indexOf('remdiscount') !=-1 || url.indexOf('pin') != -1) {
      if (url != 'addorder' && url != 'addfeedback' && url != 'add-address' && url != 'deletefeedback' ) {
        socket.emit('refresh','data');
      }
    }
    z = await fetch(`${geturl()}/api/`+url,options);
    y = await z.json();
    Object.assign(y,{status: z.status})
    return y;
  } catch (error) {
    // alertMessage(error);
    return {success:false,message:'an error occured'}
  }


}
export function addSpinner(element) {
  element.setAttribute(`data-innertext`,element.innerHTML)
  element.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true">loading...</span>`
  element.setAttribute('disabled',true)
}
export function removeSpinner(element) {
  element.innerHTML = element.getAttribute(`data-innertext`)
  element.removeAttribute('disabled')
}
export function addshade(){
  let thebody = document.querySelector('div.cont'); 
  var shaddow = document.createElement('div');
  thebody.appendChild(shaddow);
  shaddow.className = "w-100 h-100 ovh p-f bsbb bc-tblack t-0 zi-10000 blur";	
  var close = document.createElement('div');
  close.className = "p-a t-0 r-0 w-50p h-50p m-20p center ovh";
  close.innerHTML = `<span class='w-100 h-100 white p-10p bsbb center'><font class='fs-50p white w-100 p-r hover-2'><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><line fill="none" stroke="#fff" stroke-width="2" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"/></g><g><line fill="none" stroke="#fff" stroke-width="2" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"/></g></svg></font></span>`;
  shaddow.appendChild(close)
  close.addEventListener('click',e=>{
	  e.preventDefault();
		closetab(shaddow,thebody);
	});
  return shaddow;
}
export function closetab(element,parent){
  try {
    parent.removeChild(element); 
    document.body.classList.remove('ovh')
  } catch (error) {
    
  }
}
export function getdata(item){
  try {
    return JSON.parse(localStorage.getItem(item));
  } catch (error) {
    return null 
  }
}
export function alertMessage(message){
  q =  addshade();
  a = document.createElement('div')
  q.removeChild(q.firstChild)
  q.appendChild(a)
  a.className = "w-300p h-a p-20p bsbb bc-white cntr zi-10000 br-10p card-5" 
  a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg"><span class="fs-18p black capitalize igrid center h-100 verdana">message</span></div><div class="body w-100 h-a p-5p grid center mt-10p"><span class="fs-15p dgray capitalize left verdana">${message}</span></div><div class="mssg-footer w-100 h-30p mt-10p  bsbb center-2"><span class="w-60p br-2p hover-2 h-a bc-theme p-5p white capitalize verdana center accept">ok</span></div>`;
  let accept = a.querySelector('span.accept')
  let body = document.querySelector('div#body');
  let nav = document.querySelector('div.navigation'); 
  let sidenav = document.querySelector('div.sidenav');  
  let thebody = document.querySelector('div.cont'); 
  let thea = new Array(body,nav,sidenav)
  accept.addEventListener('click',e=>{
	  e.preventDefault();
    thea.forEach(el=>{
      if (el != null) {
        el.classList.remove('blur')
      }
    })
		closetab(q,thebody);
	});
}
export function showsidemenu(){
  f = document.querySelector('div.sidenav');
  g = document.querySelector('div.theshade');
  v = document.querySelector('div#body');
  g.innerHTML = null
  if (f.classList.contains('ml--100')) {
    v.classList.add('blur');
    v.classList.add('tr-0-4');
    // f.classList.remove('hidden');
    f.classList.remove('ml--100');
    f.classList.add('ml-0');
    g.classList.remove('hidden');
    g.classList.add('ml-0');
    document.body.classList.add('ovh')
    
  } else {
    // f.classList.add('hidden');
    v.classList.remove('tr-0-4');
    v.classList.remove('blur');
    f.classList.add('ml--100');
    f.classList.remove('ml-0');
    g.classList.add('hidden');
    g.classList.remove('ml-0');
    document.body.classList.remove('ovh')
    g.innerHTML = null;

  }
}
export function deletechild(element,parent) {
  try {
    parent.removeChild(element);
  } catch (error) {
  }
}
export function searchFunc(input){
  x = input.parentNode.childNodes[1];
  if (input.value.trim().length > 0) {
    x.classList.add('ml-88');
    viewrecs(input.value,input);
    document.body.classList.add('ovh')


  }else{
    g = document.querySelector('div.theshade');
    g.classList.add('hidden');
    x.classList.remove('ml-88');
    document.body.classList.remove('ovh')

    g.innerHTML = null
  }
}
export async function viewrecs(s,ele){
  g = document.querySelector('div.theshade');
  g.classList.remove('hidden');
  if (g.innerHTML == ""){
   d =  showsskle(g);
  }
  let v = {
    mode: 'cors',
    method: "POST",
    body: JSON.stringify({needle: s}),
    headers: {
      "content-type": "application/json",
      'accept': '*/*'

    }
  } 
  r = await request(`search`,v);
  if (r.success) {
    showrecs(d,r);
  }
}
export function showrecs(cont,resp) {
  g = cont.childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1]
  p = cont.childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1]
  b = cont.childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[1]
  k = cont.childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[3].childNodes[1]
  t = Array(g,p);
  h = Array(b,k);
  b.classList.remove('pl-20p')
  t.forEach(ttl=>{
    ttl.classList.remove('w-200p')
    ttl.classList.add('w-100')
    ttl.classList.remove('h-10p')
    ttl.classList.add('h-40p')
    ttl.classList.remove('m-5p')
    ttl.classList.remove('bc-gray')
    ttl.classList.remove('skel')
    setInterval(()=>{ttl.classList.remove('anim')},100)
    t[0].innerHTML = "<span class='w-100 h-100 verdana  fs-16p'>categories & brands</span>"
    t[1].innerHTML = "<span class='w-100 h-100 verdana  fs-16p'>products</span>"
  })
  h.forEach(bdy=>{
    bdy.classList.replace('pl-20p','p-0')
    bdy.classList.replace('pl-10p','p-0')

    bdy.innerHTML = null;
  })
  try {
    resp.message.categories.forEach(cat=>{
      l = document.createElement('li');
      l.className = 'w-100';
      l.innerHTML = `<div class="w-100 h-100 flex">
                      <div class="the-thumb w-50p h-50p m-5p iblock">
                        <div class="w-50p h-50p br-50 m-5p">
                          <img src="${geimgturl()}/images/${cat.image}" class="w-100 h-100 contain">
                        </div>
                      </div>
                      <div class="the-desc w-60 h-50p p-5p mt-5p bsbb iblock">
                        <div class="w-80 h-15p br-5  m-5p"><a href="${geturl()}/browse/category/${cat.name}" class="td-none black ls-n"><span class='w-100 h-100 verdana  fs-15p'>${cat.name}</span></a></div>
                        <div class="w-60 h-20p br-5 m-5p"><span class='w-100 h-100 verdana dgray  fs-12p'>in categories</span></div>
                      </div>
                    </div> `
      b.appendChild(l)
    })
  } catch (error) {
    
  }
  try {
    resp.message.brands.forEach(brand=>{
      l = document.createElement('li');
      l.className = 'w-100';
      l.innerHTML = `<div class="w-100 h-100 flex">
                      <div class="the-thumb w-50p h-50p m-5p iblock">
                        <div class="w-50p h-50p br-50  m-5p">
                          <img src="${geimgturl()}/brands/${brand.image}" class="w-100 h-100 contain">
                        </div>
                      </div>
                      <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                      <div class="w-80 h-15p br-5  m-5p"><a href="${geturl()}/browse/brand/${brand.name}" class="td-none black ls-n"><span class='w-100 h-100 verdana  fs-15p'>${brand.name}</span></a></div>
                      <div class="w-60 h-20p br-5 m-5p"><span class='w-100 h-100 verdana dgray  fs-12p'>in brands</span></div>
                      </div>
                    </div> `
      b.appendChild(l)
    })
  } catch (error) {
    
  }
  try {
    resp.message.series.forEach(serie=>{
      l = document.createElement('li');
      l.className = 'w-100';
      l.innerHTML = `<div class="w-100 h-100 flex">
                      <div class="the-thumb w-50p h-50p m-5p iblock">
                        <div class="w-50p h-50p br-50 m-5p">
                        <img src="${geimgturl()}/images/${serie.image}" class="w-100 h-100 contain">
                        </div>
                      </div>
                      <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                      <div class="w-100 h-15p br-5  m-5p"><a href="${geturl()}/browse/serie/${serie.famname}" class="td-none black ls-n"><span class='w-100 h-100 verdana  fs-15p'>${serie.famname}</span></a></div>
                      <div class="w-100 h-20p br-5 m-5p"><span class='w-100 h-100 verdana dgray  fs-12p'>a serie from <font class="theme hover-2"><a href="${geturl()}/browse/brand/${serie.brandname}" class="td-none theme ls-n">${serie.brandname}</a></font> brand</span></div>
                      </div>
                    </div> `
      b.appendChild(l)
    })
  } catch (error) {
    
  }
  try {
    resp.message.subcategories.forEach(subcat=>{
      l = document.createElement('li');
      l.className = 'w-100';
      l.innerHTML = `<div class="w-100 h-100 flex">
                      <div class="the-thumb w-50p h-50p m-5p iblock">
                        <div class="w-50p h-50p br-50 m-5p">
                        <img src="${geimgturl()}/images/${subcat.image}" class="w-100 h-100 contain">
                        </div>
                      </div>
                      <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                      <div class="w-100 h-15p br-5  m-5p"><a href="${geturl()}/browse/subcategory/${subcat.name}" class="td-none black ls-n"><span class='w-100 h-100 verdana  fs-15p'>${subcat.name}</span></a></div>
                      <div class="w-100 h-20p br-5 m-5p"><span class='w-100 h-100 verdana dgray  fs-12p'>a subcategory from <font class="theme hover-2"><a href="${geturl()}/browse/category/${subcat.catname}" class="td-none theme ls-n">${subcat.catname}</a></font></span></div>
                      </div>
                    </div> `
      b.appendChild(l)
    })
  } catch (error) {
    
  }
  if (resp.message.categories.length == 0 && resp.message.subcategories.length == 0 && resp.message.brands.length == 0 && resp.message.series.length == 0) {
    l = document.createElement('li');
    l.className = 'w-100';
    l.innerHTML = `<div class="w-100 h-100 flex">
                    <div class="the-desc w-100 h-100p p-5p bsbb m-5p iblock">
                      <div class="w-100 h-100 br-5  m-5p center">
                        <span class='w-100 h-100 verdana  fs-18p dgray center'>no brands or categories found</span>
                      </div>
                    </div>
                  </div> `
    b.appendChild(l)
  }
  resp.message.prods.forEach(prod=>{
    l = document.createElement('li');
    l.className = 'w-100 pb-10p';
    l.innerHTML = `<div class="w-100 h-100 flex ${(resp.message.prods.indexOf(prod) != (resp.message.prods.length-1))? 'bb-1-s-g':''} pb-10p">
                    <div class="the-thumb w-65p h-65p p-5p bsbb iblock">
                      <div class="w-100 h-100 br-5p">
                        <img src="${geimgturl()}/product-imgz/${prod.pimgs[0]}" alt="" class="w-100 h-100 b-none contain">
                      </div>
                    </div>
                    <div class="the-desc w-80 h-100 p-5p bsbb iblock">
                    <div class="w-100 h-a"><a href="${geturl()}/product/${prod.prodid}" class="td-none black ls-n"><span class='w-100 h-100 verdana  fs-15p'>${prod.pname}</span></a></div>
                    <div class="w-100 h-20p br-5 m-5p"><span class='w-100 h-100 verdana dgray  fs-12p'>in <a href="${geturl()}/browse/category/${prod.catname}" class="td-none black ls-n"><font class="theme hover-2">${prod.catname}</font></a> , <a href="${geturl()}/browse/subcategory/${prod.subcatname}" class="td-none black ls-n"><font class="theme hover-2">${prod.subcatname}</font></a>, <a href="${geturl()}/browse/brand/${prod.brandname}" class="td-none black ls-n"><font class="theme hover-2">${prod.brandname}</font></a>, <a href="${geturl()}/browse/usedin/${prod.usedinname}" class="td-none black ls-n"><font class="theme hover-2">${prod.usedinname}</font></a>, <a href="${geturl()}/browse/serie/${prod.famname}" class="td-none black ls-n"><font class="theme hover-2">${prod.famname}</font></a></span></div>
                    </div>
                  </div> `
    k.appendChild(l)
  })
  if (resp.message.prods.length == 0) {
    l = document.createElement('li');
    l.className = 'w-100';
    l.innerHTML = `<div class="w-100 h-100 flex">
                    <div class="the-desc w-100 h-100p p-5p bsbb m-5p iblock">
                      <div class="w-100 h-100 br-5  m-5p center">
                        <span class='w-100 h-100 verdana  fs-18p dgray'>no products found</span>
                      </div>
                    </div>
                  </div> `
    k.appendChild(l)
  }
}
export function showsskle(g) {
  x = document.createElement('div');
  x.className = "w-80 cntr h-70 bc-white mt-50p br-5p p-10p bsbb zi-1000 b-mgc-resp"
  a = document.createElement('div');
  a.className = "w-100 h-100 p-a";
  a.addEventListener('click',df=>{
    df.preventDefault();
    g.classList.add('hidden');
    document.body.classList.remove('ovh')
    g.innerHTML = null;
  })
  g.appendChild(a)
  g.appendChild(x)
  x.innerHTML=`<div class="w-100 h-100 ovys ovxh">
    <div class="the-series w-100 h-a p-10p bsbb">
      <div class="w-100 h-100 p-10p bsbb">
        <div class="the-parents">
          <div class="the-title p-5p bsbb">
            <div class="w-200p h-10p br-5p bc-gray skel m-5p"></div>
          </div>
          <div class="the-content p-5p bsbb">
            <ul class="ls-none m-0 w-100 bsbb pl-10p">
              <li class="w-100">
                <div class="w-100 h-100">
                  <div class="the-thumb w-50p h-50p m-5p iblock">
                    <div class="w-50p h-50p br-50 bc-gray skel m-5p"></div>
                  </div>
                  <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                    <div class="w-80 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-60 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-65 h-5p br-5 bc-gray skel m-5p"></div>
                  </div>
                </div>
              </li>
              <li class="w-100">
                <div class="w-100 h-100">
                  <div class="the-thumb w-50p h-50p m-5p iblock">
                    <div class="w-50p h-50p br-50 bc-gray skel m-5p"></div>
                  </div>
                  <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                    <div class="w-80 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-60 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-65 h-5p br-5 bc-gray skel m-5p"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="the-products mt-10p">
          <div class="the-title p-5p bsbb">
            <div class="w-200p h-10p br-5p bc-gray skel m-5p"></div>
          </div>
          <div class="the-content p-5p bsbb">
            <ul class="ls-none m-0 w-100 bsbb pl-20p">
              <li class="w-100">
                <div class="w-100 h-100">
                  <div class="the-thumb w-50p h-50p m-5p iblock">
                    <div class="w-50p h-50p br-10p bc-gray skel m-5p"></div>
                  </div>
                  <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                    <div class="w-80 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-60 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-65 h-5p br-5 bc-gray skel m-5p"></div>
                  </div>
                </div>
              </li>
              <li class="w-100">
                <div class="w-100 h-100">
                  <div class="the-thumb w-50p h-50p m-5p iblock">
                    <div class="w-50p h-50p br-10p bc-gray skel m-5p"></div>
                  </div>
                  <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                    <div class="w-80 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-60 h-5p br-5 bc-gray skel m-5p"></div>
                    <div class="w-65 h-5p br-5 bc-gray skel m-5p"></div>
                  </div>
                </div>
              </li>
              <li class="w-100">
              <div class="w-100 h-100">
                <div class="the-thumb w-50p h-50p m-5p iblock">
                  <div class="w-50p h-50p br-10p bc-gray skel m-5p"></div>
                </div>
                <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                  <div class="w-80 h-5p br-5 bc-gray skel m-5p"></div>
                  <div class="w-60 h-5p br-5 bc-gray skel m-5p"></div>
                  <div class="w-65 h-5p br-5 bc-gray skel m-5p"></div>
                </div>
              </div>
            </li>
            <li class="w-100">
              <div class="w-100 h-100">
                <div class="the-thumb w-50p h-50p m-5p iblock">
                  <div class="w-50p h-50p br-10p bc-gray skel m-5p"></div>
                </div>
                <div class="the-desc w-60 h-50p p-5p bsbb m-5p iblock">
                  <div class="w-80 h-5p br-5 bc-gray skel m-5p"></div>
                  <div class="w-60 h-5p br-5 bc-gray skel m-5p"></div>
                  <div class="w-65 h-5p br-5 bc-gray skel m-5p"></div>
                </div>
              </div>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`
  animskel();
  return x;
}

export function animskel() {
  let skel = Array.from(document.getElementsByClassName('skel'));
  skel = shuffleArray(skel)
  let i=0
  skel.forEach(ele=>{
      setTimeout(()=>{
          ele.classList.add('anim')
      },i)
      i+=100;
  })
}
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export function hide(element) {
	element.classList.add("hidden")
}
export function show(element) {
	element.classList.remove("hidden")
}
export function v_(bscont,pw) {
	if (bscont.parentNode.clientWidth < pw) {
		show(bscont);
	} else {
		hide(bscont);
		
	}
}
export function geturl() {
   i = new URL(window.location.href)
   return i.origin
}
export function geimgturl() {
  i = `${geturl()}/api`
  return i
}
export async function dcrtmgc(elem,aa,index,cond) {
  aa = await request('getprods',getschema)
  if (!aa.success) {
    return 0
  }
	let cart = JSON.parse(localStorage.getItem('cart'))
	let added = false; 
	let f = false
  try {
    aa.message.forEach(prod=>{
      if(prod.prodid == elem.id){
        cart.forEach(prodc=>{
          if (prodc.prodid == elem.id) {
            f = true;
            return false;
          }
        })
        if (f == false) {
          cart.push({prodid: prod.prodid,pname: prod.pname,condition: cond,price:prod.conditions[index].newprice ,qty: 1,image: prod.pimgs[0]})
          localStorage.setItem('cart',JSON.stringify(cart));
          added = true
          addsCard('item added to cart',true)
          checkCart()
        }else{
          addsCard('item is already in the cart',false)
        }
      }
    })
    return added
  } catch (error) {
    
  }
	
}
export function adcm(n) {
  try {
    if (!Number(n)) {
      return n
    }
    d = n.toString().split('.')
    n= Array.from(n.toString().split('.')[0]).reverse()
    let s = "";
    let i = 0;
    for(const t of n ){
      if(i % 3 == 0 && i!= 0){
        s+=`p${t}`
      }else{
        s+=t
      }
      i++
    }
    s= Array.from(s).reverse().toString().replace(/,/gi,"")
    s=s.replace(/p/gi,",")
    if (d[1]) {
      s+=`.${d[1]}`
    }
    return (s)
    
  } catch (error) {
    return n
  }
}

export function cc(cond) {
	if (cond == "new") {
		return 'theme'
	}else if(cond == "used"){
		return 'orange'
	}else if (cond == "refubrished") {
		return 'green'
		
	}else if (cond == "available") {
		return 'dgray'
		
	}else{
    return 'red'
  }
}
export function removecartitem(id) {
  a = getdata('cart');
  a.forEach(item=>{
    if (item.prodid == id) {
      a.splice(a.indexOf(item),1)
    }
  })
  localStorage.setItem('cart',JSON.stringify(a));
  return a;

}
export function setFocusFor(input) {
  const rep = input.parentElement;
  rep.classList.remove('error');
  rep.classList.remove('blur');
  rep.classList.add('focus');
  rep.classList.remove('success');
  const small = rep.querySelector('small');
  small.classList.add('hidden');
}
export function setBlurFor(input) {
  const rep = input.parentElement;
  rep.classList.remove('focus');
  rep.classList.remove('error');
  rep.classList.remove('success');
  const small = rep.querySelector('small');
  let _err = rep.querySelector('span').childNodes[1];
  let _succ = rep.querySelector('span').childNodes[3];
   _err.classList.add('hidden');
  _succ.classList.add('hidden');
  small.classList.add('hidden');
}
export function setErrorFor(input,message) {
  try{
    const rep = input.parentElement;
    const small = rep.querySelector('small');
    small.classList.remove('hidden');
    small.innerText = message;
    s = rep.querySelector('span')
    let _err = s.childNodes[1];
    let _succ = s.childNodes[3];
    _err.classList.remove('hidden');
    _succ.classList.add('hidden');
    rep.classList.remove('success');
    rep.classList.add('error');
  }catch(error){
   
  }
  
}
export function setSuccessFor(input) {
  const rep = input.parentElement;
  // rep.classList.remove('focus');
  rep.classList.remove('error');
  rep.classList.add('success');
  if ( rep.querySelector('svg')) {
    let _err = rep.querySelector('span').childNodes[1];
    let _succ = rep.querySelector('span').childNodes[3];
    _err.classList.add('hidden');
    _succ.classList.remove('hidden');
  }
  const small = rep.querySelector('small');
  small.classList.add('hidden');
}
export async function promptPassword() {
  let b = addshade(),
  a = document.createElement('div');
  b.appendChild(a)
  a.className = "w-400p h-a p-10p bsbb bc-white cntr zi-10000 br-5p verdana" 
  a.innerHTML = `<div class="head w-100 h-a py-10p px-15p bsbb">
                                  <span class="fs-17p dgray capitalize igrid h-100 verdana">Password Authentication</span>
                              </div>
                              <div class="body w-100 h-a p-5p grid">
                                <small class="dgray p-10p bsbb">you need to enter your current password for this action</small>
                                  <form method="post" id="rec-password-form" name="rec-password-form">
                                    <div class="mx-10p p-10p">
                                      <label for="password " class="form-label my-10p block">current password</label>
                                      <input type="password" class="form-control p-10p bsbb b-none w-100 no-outline br-5p b-1-s-dgray block main-input" placeholder="password" name="password" id="password">
                                      <small class="w-100 red pl-3p verdana capitalize"></small>
                                    </div>
                                    <div class="my-10p flex jc-sb px-10p">
                                      <button type="submit" class=" b-none bc-theme white py-10p hover-2 px-15p bsbb br-5p">Proceed</button>
                                      <span class=" right h-100 center pr-10p">
                                        <span class="verdana black h-100 fs-13p capitalize"><a href="/forgot-password" id="signup" class="td-none theme">forgot password ?</a></span>
                                      </span>
                                    </div>
                                  </form>
                              </div>`
  let m = a.querySelector('form#rec-password-form'),
  v = a.querySelector('input#password');
  v.focus()
  return new Promise((resolve, reject) => {
    m.onsubmit =  (event)=>{
      event.preventDefault()
      if (v.value.trim() != '') {
          resolve(v.value)
        deletechild(b,b.parentNode)
      }else{
        setErrorFor(v,'enter the password')
      }
    }
  })
}
export async function initializeCleave(phoneElement, idElement) {
  if (phoneElement) {
    const phoneNumber = new Cleave(phoneElement, { phone: true, phoneRegionCode: "RW", prefix: '+250' });
  }
  if (idElement) {
    const nationalID = new Cleave(idElement, {
        numericOnly: true,
        blocks: [1, 4, 1, 7, 1, 2],
        delimiter: ' ',
        delimiterLazyShow: true,
        onValueChanged: function (e) {
            const formattedValue = e.target.rawValue;
            if (formattedValue.length > 16) {
                nationalID.setRawValue(formattedValue.substring(0, 16));
            }
        }
    });
  }
}

export function vdtins(type,value) {
  if (type == 'phonenumber') {
    if (value.length > 9 || value.length < 9) return 0;
    if (value.charAt(0) != 7) return 0;
    if (value.charAt(1) != 8 && value.charAt(1) != 9 && value.charAt(1) != 3 && value.charAt(1) != 2) return 0;
    return 1;
  }else if (type == 'email') {
    p =  /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(value.match(p)){
      return 1
    }else{
      return 0
    }
  }
}

export function chaastep(step) {
  h = document.querySelector('div.sthol')
  s = Array.from(h.querySelectorAll('div.step'));
  c = document.querySelector('div','the-chkout-b');
  d = Array.from(c.querySelectorAll('div.form-hol'));
  d.forEach(phol=>{
    if (phol.classList.contains('active')) {
        if(d.indexOf(phol)> step){
          phol.classList.replace('l-0','l-100')
        }else{
          phol.classList.replace('l-0','l--100')
        }
        phol.classList.remove('active')
    }
  })
  s.forEach(stp=>{
    if (s.indexOf(stp)<step) {
      stp.querySelector('div.stinit').classList.replace('bc-dgray','bc-theme')
      stp.querySelector('div.stinit').classList.replace('bc-tr-theme','bc-theme')
      stp.classList.add('prev')
    }else{
      stp.querySelector('div.stinit').classList.replace('bc-theme','bc-dgray')
      stp.querySelector('div.stinit').classList.replace('bc-tr-theme','bc-dgray')
      stp.classList.remove('prev')
    }
  })
  try {
    d[step].classList.remove('l--100')
    d[step].classList.remove('l-100')
    d[step].classList.add('l-0')
    d[step].classList.add('active')
    initadstpfrm(d[step],step);
  } catch (error) {
    
  }
  try {
    s[step].classList.add('active')
    s[step].querySelector('div.stinit').classList.replace('bc-dgray','bc-tr-theme')
  } catch (error) {

  }
}
function initadstpfrm(container,step) {
  if (step == 1) {
    a = container.querySelector('div.adhol')
    l = getdata('address')
    a.innerHTML = null
    if (l) {
      for (const location of l) {
        a.innerHTML+= `<div class="w-a h-a p-5p bsbb igrid bfull-resp va-t">
          <div class="b-1-s-dgray w-100 br-5p h-100 hover-2 p-5p bsbb loc" id="${l.indexOf(location)}">
            <ul class="p-0 m-0 ls-none h-a">
              <li class="w-100 p-5p bsbb flex">
                  <span class="w-100 h-a fs-12p bold verdana capitalize dgray">Names : </span>
                  <span class="w-100 h-a fs-12p bold consolas capitalize">${location.firstname} ${location.lastname}</span>
              </li>
              <li class="w-100 p-5p bsbb flex">
                <span class="w-100 h-a fs-12p bold verdana capitalize dgray">Phone : </span>
                <span class="w-100 h-a fs-12p bold consolas capitalize">${location.phonenumber}</span>
              </li>
              <li class="w-100 p-5p bsbb flex">
                  <span class="w-100 h-a fs-12p bold verdana capitalize dgray">address : </span>
                  <span class="w-100 h-a fs-12p consolas capitalize">${location.address}</span>
              </li>
              <li class="w-100 p-5p bsbb flex">
                  <span class="w-100 h-a fs-12p bold verdana capitalize dgray">street : </span>
                  <span class="w-100 h-a fs-12p  consolas capitalize">${location.street} </span>
              </li>
              <li class="w-100 p-5p bsbb flex">
                  <span class="w-100 h-a fs-12p bold verdana capitalize dgray">Apartment : </span>
                  <span class="w-100 h-a fs-12p  consolas capitalize">${location.apartment}</span>
              </li>
            </ul>
          </div>
        </div>`
      }
    }
      a.innerHTML+= `<div class="w-200p h-150p p-5p bsbb igrid bfull-resp">
      <div class="b-1-s-dgray w-100 br-5p h-100 hover-2 p-5p bsbb" id="add">
        <div class="center h-100 w-100">
          <span class="fs-30p dgray center us-none">
            +
          </span>
          <span class="fs-20p dgray verdana center us-none">
            Add
          </span>
        </div>
      </div>
    </div>`
    h = Array.from(a.querySelectorAll('div.loc'))
    b = a.querySelector('div#add')

    b.addEventListener('click',(e)=>{
      e.preventDefault();
      chaastep(0)
    })
    h.forEach((address)=>{
      address.addEventListener('click',(e)=>{
        h.forEach((a)=>{
          a.classList.replace('b-1-s-theme','b-1-s-dgray')
          a.classList.remove('active')
        })
        address.classList.replace('b-1-s-dgray','b-1-s-theme')
        address.classList.add('active')
        localStorage.setItem('_act41',address.id)
        l=getdata('address')
        shaddr(l[getdata('_act41')])
        chaastep(2)
      })
    })
  }else if(step == 2){
    let cpcards = Array.from(container.querySelectorAll('span.cpcards'))
    cpcards.forEach((changepaymentmethodcard)=>{
      changepaymentmethodcard.addEventListener('click',()=>{
        cpcards.forEach((cp)=>{
          cp.classList.remove('active','bb-1-s-theme','bc-tr-theme','theme')
        })
        changepaymentmethodcard.classList.add('active','bb-1-s-theme','bc-tr-theme','theme')
        chpform(cpcards.indexOf(changepaymentmethodcard))
      })
    })
    function chpform(step) {
      let pform = Array.from(container.querySelectorAll('div.pform'));
      if (step == 1) {
        pform[0].classList.replace('l-0','l--100')
        pform[1].classList.replace('l-100','l-0')

      }else if(step == 0){
        pform[1].classList.replace('l-0','l-100')
        pform[0].classList.replace('l--100','l-0')
      }
    }
  }
}
export function shaddr(address) {
  n = document.querySelector('div#act-addr-hol')
  n.innerHTML = `<div class="w-a h-a p-5p bsbb igrid bfull-resp">
      <div class="b-1-s-dgray w-100 br-5p h-100 hover-2 p-5p bsbb">
      <ul class="p-0 m-0 ls-none h-a">
          <li class="w-100 p-5p bsbb flex">
              <span class="w-100 h-a fs-12p bold verdana capitalize dgray">Names : </span>
              <span class="w-100 h-a fs-12p bold consolas capitalize nowrap">${address.firstname} ${address.lastname}</span>
          </li>
          <li class="w-100 p-5p bsbb flex">
          <span class="w-100 h-a fs-12p bold verdana capitalize dgray">Phone : </span>
          <span class="w-100 h-a fs-12p bold consolas capitalize">${address.phonenumber}</span>
          </li>
          <li class="w-100 p-5p bsbb flex">
              <span class="w-100 h-a fs-12p bold verdana capitalize dgray">address : </span>
              <span class="w-100 h-a fs-12p consolas capitalize nowrap">${address.address}</span>
          </li>
          <li class="w-100 p-5p bsbb flex">
              <span class="w-100 h-a fs-12p bold verdana capitalize dgray">street : </span>
              <span class="w-100 h-a fs-12p  consolas capitalize">${address.street} </span>
          </li>
          <li class="w-100 p-5p bsbb flex">
              <span class="w-100 h-a fs-12p bold verdana capitalize dgray">Apartment : </span>
              <span class="w-100 h-a fs-12p  consolas capitalize">${address.apartment}</span>
          </li>
      </ul>
      </div>
  </div>`
}
export async function validateForm(form,inputs,formdata) {
  let val = 1;
  if (form.name == "contact_form") {
    inputs.forEach(inp=>{
      if (inp.name == "firstname") {
        if (inp.value == "") {
          setErrorFor(inp,"firstname is required");
          val = 0;
        }
      }else if (inp.name == "lastname") {
        if (inp.value == "") {
          setErrorFor(inp,"lastname is required");
          val = 0;
        }
      }else if (inp.name == "email") {
        if (inp.value == "") {
          setErrorFor(inp,"please enter your email");
          val = 0;
        }else{
          val = vdtins('email',inp.value)
          if(!val) setErrorFor(inp,"invalid email");
        }
      }else if (inp.name == "subject") {
        if (inp.value == "") {
          setErrorFor(inp,"please enter your subject");
          val = 0;
        }
      }else if (inp.name == "message") {
        if (inp.value == "") {
          setErrorFor(inp,"your message is required!");
          val = 0;
        }
      }else if (inp.name == "phonenumber") {
        if (inp.value == "") {
          setErrorFor(inp," enter your phone number");
          val = 0;
        }else{
          val = vdtins('phonenumber',inp.value)
          if(!val) setErrorFor(inp,"invalid phone number");
        }
      }
    })
    if(val == 1){
        inputs.forEach(inm=>{
          setBlurFor(inm);
        })
        sendmessage(inputs,'message',form,formdata);
      }
  }else if (form.name =='signup-form') {
    let passval
    inputs.forEach(async (inp)=>{
      if (inp.name == "firstname") {
          if (inp.value == "") {

            setErrorFor(inp,"firstname is required");
            val = 0;
          }else{
            setSuccessFor(inp);
          }
        }else if (inp.name == "lastname") {
          if (inp.value == "") {

            setErrorFor(inp,"lastname is required");
            val = 0;
          }else{
            setSuccessFor(inp);
          }
        }else if (inp.name == "email") {
          if (inp.value == "") {

            setErrorFor(inp,"please enter your email");
            val = 0;
          }else{
            val = await vdtemail(inp.value,inp);
          }
        }else if (inp.name == "password") {
          if (inp.value == "") {

            setErrorFor(inp,"please enter your password");
            val = 0;
          }else{
            passval = inp.value;
            setSuccessFor(inp);
          }
        }else if (inp.name == "confirm") {
          if (inp.value == "") {

            setErrorFor(inp,"confirm your password");
            val = 0;
          }else if (inp.value != passval) {
            setErrorFor(inp,"passwords do not match");
            val = 0;
          }else{
            setSuccessFor(inp);
          }
        }   
    })
     if(val == 1){
        inputs.forEach(inm=>{
          setBlurFor(inm);
        }) 
        sessionStorage.setItem('val',0);
        sendmessage(inputs,'signup',form,formdata);
      }else{
      }
  }else if (form.name == 'login-form') {
    inputs.forEach(inp=>{
      if (inp.name == "email") {
            if (inp.value == "") {
              setErrorFor(inp,"enter your email");
              val = 0;
            }
          }else if (inp.name == "password") {
            if (inp.value == "") {
              setErrorFor(inp,"password is required");
              val = 0;
            }
      }

    })
    if(val == 1){
        inputs.forEach(inm=>{
          setBlurFor(inm);
        })
        sendmessage(inputs,'login',form,formdata);
      }
  }else if (form.name == 'admin-login-form') {
    inputs.forEach(inp=>{
      if (inp.name == "username") {
            if (inp.value == "") {
              setErrorFor(inp,"enter your username");
              val = 0;
            }else{
              setSuccessFor(inp);
            }
          }else if (inp.name == "password") {
            if (inp.value == "") {
              setErrorFor(inp,"password is required");
              val = 0;
            }else{
              setSuccessFor(inp);
            }
      }

    })
    if(val == 1){
      sendmessage(inputs,'adminlogin',form,formdata);
    }
  }else if (form.name == 'add-address-form') {
    inputs.forEach(inp=>{
      if (inp.name == "email") {
            if (inp.value == "") {
              setErrorFor(inp,"enter your email");
              val = 0;
            }else{
              val = vdtins('email',inp.value)
              if (val == 0) setErrorFor(inp,'invalid email')
            }
      }else if (inp.name == "apartment") {
            if (inp.value == "") {
              setErrorFor(inp,"enter your apartment");
              val = 0;
            }
      }else if (inp.name == "address") {
        if (inp.value == "") {
          setErrorFor(inp,"enter your address");
          val = 0;
        }
      }else if (inp.name == "street") {
        if (inp.value == "") {
          setErrorFor(inp,"enter your street");
          val = 0;
        }
      }else if (inp.name == "phonenumber") {
        if (inp.value == "") {
          setErrorFor(inp,"enter your phone number");
          val = 0;
        }else{
          val = vdtins('phonenumber',inp.value)
          if (val == 0) setErrorFor(inp,'invalid phone number')
        }
      }else if (inp.name == "firstname") {
        if (inp.value == "") {
          setErrorFor(inp,"enter your firstname");
          val = 0;
        }
      }else if (inp.name == "lastname") {
        if (inp.value == "") {
          setErrorFor(inp,"enter your lastname");
          val = 0;
        }
      }
    })
    v = {}
    if(val == 1){
      inputs.forEach(inm=>{
        Object.assign(v,{[inm.name]: inm.value})
      })
      v.phonenumber = '+250'+v.phonenumber
      a = getdata('address');
      if (a){
        a.push(v);
        let addrrr = a
        postschema.body = JSON.stringify({
          token : getdata('user'),
          address: a
        })
        addSpinner(form.querySelector('button'))
        let addaddrrss = await request('add-address',postschema)
        removeSpinner(form.querySelector('button'))
        if (addaddrrss.success) {
          form.reset();
        }
        alertMessage(addaddrrss.message)
        console.log(addrrr)
        localStorage.setItem('address',JSON.stringify(addrrr))
      }else{
        postschema.body = JSON.stringify({
          token : getdata('user'),
          address: [v]
        })
        addSpinner(form.querySelector('button'))
        let addaddrrss = await request('add-address',postschema)
        removeSpinner(form.querySelector('button'))
        if (addaddrrss.success) {
          form.reset();
        }
        alertMessage(addaddrrss.message)
        localStorage.setItem('address',JSON.stringify([v]))
      }
      chaastep(1) 
    }
  }else if (form.name == 'card-payment-form') {
    v = {}
    if(val == 1){
      sendmessage(inputs,'placeorder',form,v);
    }
  }else if (form.name == 'mobile-money-form') {
    inputs.forEach(inp=>{
      if (inp.name == "isp") {
            if (inp.value == "") {
              setErrorFor(inp,"select your ISP");
              val = 0;
            }
      }else if (inp.name == "payphonenumber") {
            if (inp.value == "") {
              setErrorFor(inp,"enter phone number");
              val = 0;
            }else{
              if (inp.value.replace(/ /gi,"").length == 9) {
                v= 1 
                
              }else{
                v = 0
              }
              if (v == 0) {
                  setErrorFor(inp,'invalid phone number')
                  val = 0;
              }else{
                  setSuccessFor(inp)
              }
          }
      }
    })
    v = {}
    if(val == 1){
      inputs.forEach(inm=>{
        Object.assign(v,{[inm.name]: inm.value})
      })
      v.payphonenumber = '250'+v.payphonenumber.replace(/ /gi,"")
      sendmessage(inputs,'placeorder',form,v);
    }
  }
}
export function initializeSpecialCleave(element,blocks,length,delimitator) {
  const nationalID = new Cleave(element, {
    numericOnly: true,
    blocks,
    delimiter: delimitator || ' ',
    delimiterLazyShow: true,
    onValueChanged: function (e) {
        const formattedValue = e.target.rawValue;
        if (formattedValue.length > length) {
            nationalID.setRawValue(formattedValue.substring(0, length));
        }
    }
  });
}
export function checkEmpty(input){
  try {
    if (input.classList.contains('optional')) {
      setSuccessFor(input)
      return 1
    }
    if (input.value == '' || input.value == '+250') {
      if (input.getAttribute('data-optional') || input.classList.contains('optional')) {
        return 1
      }else if (input.getAttribute('data-custom-inp')) {
        setErrorFor(input,`please answer this question`)
        return 0
      }else{
        setErrorFor(input,`please ${(input.tagName == "SELECT")? 'select' : 'enter'} the ${input.name}`)
        return 0
      }
    }else{
        setSuccessFor(input)
      return 1
    }
    
  } catch (error) {
    console.log(error)
  }
}
export async function sendmessage(inputs,type,form,formdata) {
  if (type == 'message') {
    var values = {};
    inputs.forEach(inp=>{
      if (inp.name == "firstname") {
          if (inp.value != "") {
            Object.assign(values,{firstname: inp.value});
          }
        }else if (inp.name == "lastname") {
          if (inp.value != "") {
            Object.assign(values,{lastname: inp.value});
          }
        }else if (inp.name == "email") {
          if (inp.value != "") {
            Object.assign(values,{email: inp.value});
          }
        }else if (inp.name == "phonenumber") {
          if (inp.value != "") {
            Object.assign(values,{phonenumber: '+250'+inp.value});
          }
        }else if (inp.name == "subject") {
          if (inp.value != "") {
            Object.assign(values,{subject: inp.value});
          }
        }if (inp.name == "message") {
          if (inp.value != "") {
            Object.assign(values,{message: inp.value});
          }
        }
    })
    p = postschema
    p.body = JSON.stringify(values)
    r = await request('addquery',p)
    if (!r.success) return 0
    alertMessage(r.message)
    form.reset();
  }else if (type == 'signup') {
    var values = {};
     inputs.forEach(inp=>{
      if (inp.name == "firstname") {
        if (inp.value != "") {
          Object.assign(values,{firstname: inp.value});
        }else{
            setErrorFor(inp,"fill this field");
          }
      }else if (inp.name == "lastname") {
        if (inp.value != "") {
          Object.assign(values,{lastname: inp.value});
        }else{
            setErrorFor(inp,"fill this field");
          }
      }else if (inp.name == "email") {
        if (inp.value != "") {
          Object.assign(values,{email: inp.value});
        }else{
            setErrorFor(inp,"fill this field");
          }
      }else if (inp.name == "password") {
        if (inp.value != "") {
          Object.assign(values,{password: inp.value});
        }else{
          setErrorFor(inp,"fill this field");
        }
      }
    })
    p = postschema
    p.body = JSON.stringify(formdata)
    r = await request('signup',p)
    if (r.success == false) {
      alertMessage(r.message);
    }else{
      alertMessage(r.message); 
      inputs.forEach(inp=>{
        setBlurFor(inp)
      })         
      form.reset();
    }   
  }else if(type == 'login'){
    var values = {};
    inputs.forEach(inp=>{
        if (inp.name == "email") {
          if (inp.value != "") {
              Object.assign(values,{email: inp.value});
          }else{
            setErrorFor(input,"fill this field");
          }
        }else if (inp.name == "password") {
          if (inp.value != "") {
              Object.assign(values,{password: inp.value});
          }
        }
    })
    p = postschema
    p.body =  JSON.stringify(values)
    r = await request('login',p)
    if (r.success == false) {
      if (r.status == 404) {
        alertMessage("incorrect email or password");
      }else if (r.status == 403) {
        alertMessage("user banned");
      }
    }else if(r.success){
      localStorage.setItem("user",JSON.stringify(r.message.token));
      alertMessage("you have been successfully logged in");
      form.reset();
      window.location.href = localStorage.getItem('next');
    }
  }else if(type == 'adminlogin'){
    var values = {};
      inputs.forEach(inp=>{
          if (inp.name == "username") {
            if (inp.value != "") {
                Object.assign(values,{username: inp.value});
            }else{
              setErrorFor(inp,"fill this field");
            }
          }else if (inp.name == "password") {
            if (inp.value != "") {
                Object.assign(values,{password: inp.value});
            }
          }
      })
      o = {
            mode: 'cors',
            method: "POST",
            body : JSON.stringify(values),
            headers: {
              "content-type": "application/json",
              'accept': '*/*'

            }
        }
      r = await request('adminlogin',o)
      if (r.success == false) {
        alertMessage("incorrect username or password");
      }else if(r.success){
        alertMessage("you have been successfully logged in");
         inputs.forEach(inp=>{
          setBlurFor(inp)
         })
        form.reset();
        localStorage.setItem("admin",JSON.stringify(r.message.token));
        let url = new URL(window.location.href);
        url.pathname = `/admin/dashboard`;
        window.location.href = url.toString()
      }
  }else if (type == 'placeorder') {
    m = form.name;
    d = formdata;
    p = getdata('cart')
    a = getdata('_act41');
    l = getdata('address');
    if (!l || a == null) {
      return alertMessage('select or add an address to continue')
    }
    l = l[a]
    u = getdata('user')
    if(!u){ 
      initiatelogin();
      alertMessage('login to add an order'); 
    }else{
      if (p.length > 0) {
        s = postschema
        s.body = JSON.stringify({payment: {method: m,data: d},products: p, address: l,token: u})
        form.classList.add('op-0-3');
        let shade
        socket.on('confirmPayment', (link)=>{
          form.querySelector('button').innerText = 'processing payments...'
          form.querySelector('button').classList.add('capitalize','white')
          shade = addshade()
          let c = document.createElement('div')
          c.className = `w-520p h-85 bc-white cntr br-10p card-6 b-mgc-resp ovh`
          shade.appendChild(c)
          c.innerHTML = `<iframe src="${link}" class ="w-100 h-100 b-none"></iframe>`
          
        }) 
        socket.on('PaymentCompleted', (link)=>{
          if (link) {
            form.querySelector('button').innerText = 'placing order...'
            form.querySelector('button').classList.add('capitalize','white')
          }
          deletechild(shade,shade.parentNode)
          
        })
        socket.on('processingPayment',data=>{
          form.querySelector('button').innerText = 'processing payments...'
          form.querySelector('button').classList.add('capitalize','white')
        })
        r = await request('addorder',s)
        form.querySelector('button').innerText = 'Pay & place order'
        if (r.success) {
          form.reset();
          form.classList.remove('op-0-3');
          localStorage.setItem('cart',JSON.stringify([]))
          p = await request('getprods',getschema)
          c = getdata('cart')
          getcinfo(p.message)
          alertMessage(r.message)
          checkCart()
        }else{
          form.classList.remove('op-0-3');
          alertMessage(r.message)
        }
      }else{
        alertMessage('add items to your cart to add an order')
      }
    } 
    
  }
}
export function chagecontent(newactive,prevactive) {
  newactive.classList.add('active');
  prevactive.classList.remove('active');
  newactive.classList.remove('ml-100');
  newactive.classList.remove('ml--100');
  prevactive.classList.add('ml--100');
  swtchcntnt(prevactive,newactive);
}
export function checkFileType(input) {
  var type = input.files[0].type.split(/\//);
  return type;
}
export function checkFileSize(input) {
  var size = input.files[0].size;
  return size;
}
export function ellipsis(text, limit) {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
}
export async function showPreview(input) {
    const file = input.files[0];
    const reader = new FileReader();
    const blob = await new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    return blob
}
export async function givePreview(link) {
      d = window.getComputedStyle(link)
      let canvas = document.createElement('canvas');
      link.crossOrigin = "Anonymous";
      canvas.width = link.naturalWidth;
      canvas.height = link.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(link, 0, 0, link.naturalWidth, link.naturalHeight);
      return canvas.toDataURL()
}
export async function showcontent(data,targetdiv) {
  if (targetdiv.id == 'users'){
		window.history.pushState('','','?page=users')
      var atr = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].innerHTML = null;
      targetdiv.childNodes[3].childNodes[1].appendChild(atr);
      atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                  <span class="fs-15p verdana p-10p">#</span>
                </td>
                <td class="p-10p bsbb bb-1-s-g">
                  <span class="fs-15p verdana p-10p no-wrap">First name</span>
                </td>
                <td class="p-10p bsbb bb-1-s-g">
                  <span class="fs-15p verdana p-10p no-wrap">Last name</span>
                </td>
                <td class="p-10p bsbb bb-1-s-g">
                  <span class="fs-15p verdana p-10p">Email</span>
                </td>
                <td class="p-10p bsbb bb-1-s-g">
                  <span class="fs-15p verdana p-10p">action</span>
                </td>
                `;
      let counter = 1;
      p = postschema
      p.body =  JSON.stringify({token :getdata('admin')});
      r = await request('getusers',p)
      if (!r.success) {
        return 0
      }

      r.message.forEach(users=>{
        a = document.createElement('tr');
        targetdiv.childNodes[3].childNodes[1].appendChild(a);
        a.innerHTML = `
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${counter}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${users.firstname}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${users.lastname}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${users.email}</span>
                </td>
                <td class="p-10p flex jc-sb">
                ${(users.status == 'active')? ` <span class="fs-14p verdana orange center hover-2 us-none banlink capitalize" id='${users.id}'>ban</span>`: ` <span class="fs-14p verdana theme center hover-2 us-none banlink capitalize" id='${users.id}'>un ban</span>`}
                <span class="fs-14p verdana theme center hover-2 us-none viewlink capitalize" id='${users.id}'>view</span>
                  <span class="fs-14p verdana red center hover-2 us-none deletelink capitalize" id='${users.id}'>delete</span>
                </td>`;
                counter+=1;
      })
      const ban = Array.from(targetdiv.querySelectorAll('span.banlink'));
      const deletee = Array.from(targetdiv.querySelectorAll('span.deletelink'));
      
        deletee.forEach(del=>{
          del.addEventListener('click',async e=>{
            e.preventDefault();
            p = postschema
            p.body = JSON.stringify({token: getdata('admin'),userid: del.id})
            r = await request('deleteuser',p)
            if (!r.success) return 0
            alertMessage(r.message) 
            showcontent(null,targetdiv)
          })
        })
        const view = Array.from(targetdiv.querySelectorAll('span.viewlink'));
      
        view.forEach(view=>{
          view.addEventListener('click',async e=>{
            e.preventDefault();
            p = postschema
            p.body = JSON.stringify({token: getdata('admin'),userid: view.id})
            r = await request('getuserinfo',p)
            if (!r.success) return 0
            // alertMessage(r.message) 
            showUser(r.message);
            // showcontent(null,targetdiv)
          })
        })
        ban.forEach(banlink=>{
          banlink.addEventListener('click',async e=>{
            e.preventDefault();
            p = postschema
            p.body = JSON.stringify({token: getdata('admin'),userid: banlink.id})
            r = await request('ban',p)
            if (!r.success) return 0
            alertMessage(r.message) 
            showcontent(null,targetdiv)
          })
        })
  }else if (targetdiv.id == 'add-product') {
		window.history.pushState('','','?page=add-product')
    o = getschema
    t= await request('tree',o)
    s = Array.from(document.querySelectorAll('select.main-input'))
    for (const select of s) {
      if (select.name == 'product-category') {
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.categories,s)
      }else if(select.name == 'product-brand'){
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.brands,s)
      }else if(select.name == 'product-usability'){
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.usedin,s)
      }else if(select.name == 'product-availability'){
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.availability,s)
      }
    }
    f = targetdiv.querySelector('form#add-product-form');
    f.addEventListener('submit',async (e)=>{
      e.preventDefault()
      i = Array.from(f.querySelectorAll('input.main-input'))
      t = Array.from(f.querySelectorAll('textarea.main-input'))
      s = Array.from(f.querySelectorAll('select.main-input'))
      t.forEach(textarea=>{
        i.push(textarea)
      })
      s.forEach(select=>{
        i.push(select)
      })
      p = Array.from(f.querySelectorAll('div.previewpanel'));
      let images,conditions,specifications,dinfos
      for (const panel of p) {
        if (panel.title == 'images') {
           images = getcips(panel)
        }else if (panel.title == 'conditions') {
           conditions = getcips(panel)
        }else if (panel.title == 'specifications') {
           specifications = getcips(panel)
        }else if (panel.title == 'dinfo') {
          dinfos = getcips(panel)
       }
      }
      let name,quantity,description,catid,subcatid,brandid,famid,usedin,availability
      for(const input of i){
        if (input.value == '') {
          setErrorFor(input,'this is a required field')
        }else(
          setSuccessFor(input)
        )
        if (input.id == 'name') {
           name = input.value
        }else if (input.id == 'quantity') {
          quantity = input.value
         
        }else if (input.id == 'description') {
           description = input.value
          
        }else if (input.id == 'category') {
           catid = input.value
          
        }else if (input.id == 'subcategory') {
           subcatid = input.value
          
        }else if (input.id == 'brand') {
           brandid = input.value
          
        }else if (input.id == 'serie') {
           famid = input.value
          
        }else if (input.id == 'usability') {
           usedin = input.value
          
        }else if (input.id == 'availability') {
           availability = input.value
          
        }
      }
      if(name != '' && quantity != '' && description != '' && catid != '' && subcatid != '' && brandid != '' && famid != '' && usedin != '' && availability != '' && images.length > 0 && conditions.length > 0 && Object.keys(specifications).length > 0 && Object.keys(dinfos).length > 0){
        o = {
          name: name,
          quantity: quantity,
          description: description,
          catid: catid,
          subcatid: subcatid,
          brandid: brandid,
          famid: famid,
          usedin: usedin,
          availability: availability,
          images: images,
          conditions: conditions,
          dinfos,
          specifications: specifications,
          token: getdata('admin')
        }
          l = {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(o),
            headers: {
              "content-type": "application/json",
              'accept': '*/*'
          }
        }
        addSpinner(f.querySelector('button.main-but'))
        r = await request('addproduct',l)
        removeSpinner(f.querySelector('button.main-but'))
        if (r.success) {
          alertMessage(r.message)
          f.reset()
        }else{
          alertMessage(r.message)
        }
      }else{
      }
    })
  }else if (targetdiv.id == 'view-products') {
		window.history.pushState('','','?page=view-products')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">product name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">category</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">edit</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('getprods',o)
    if (!t.success) {
      return 0
    }
    t.message.forEach(prod=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${prod.pname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${prod.catname}</span>
              </td>
              <td class="p-10p flex jc-sb">
                <span class="fs-14p nowrap mr-10p bsbb  verdana green center-2 hover-2 us-none adddiscountlink" id='${prod.prodid}'>add discount</span>
                <span class="fs-14p nowrap mr-10p bsbb  verdana red center-2 hover-2 us-none deletelink" id='${prod.prodid}'>delete</span>
              </td>
              <td class=" jc-sb">
              <div class="flex w-100 h-100">
                <span class="fs-14p nowrap mr-10p bsbb  verdana orange center-2 hover-2 us-none editlink" id='${prod.prodid}'>price</span>
                <span class="fs-14p nowrap mr-10p bsbb  verdana orange center-2 hover-2 us-none editprodlink" id='${prod.prodid}'>info</span>
              </div>
              </td>
              `;
              counter+=1;
    })

    const adddiscount = Array.from(document.querySelectorAll('span.adddiscountlink'));
    var deletelink = Array.from(document.querySelectorAll('span.deletelink'));
    var editprodlink = Array.from(document.querySelectorAll('span.editprodlink'));
    editprodlink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({id:s.id})
        v = await request('getproduct',p)
        if (v.success) {
          sheditproductform(v.message)
        }
      })
    })
    var editlink = Array.from(document.querySelectorAll('span.editlink'));
    editlink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({id:s.id})
        v = await request('getproduct',p)
        if (v.success) {
          sheditpriceform(v.message)
        }
      })
    })
    adddiscount.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({id:s.id})
        v = await request('getproduct',p)
        if (v.success) {
          shadddiscountform(v.message)
        }
      })
    })
    deletelink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({prodid:s.id,token: getdata('admin')})
        v = await request('deleteprod',p)
        if (v.success) {
          showcontent(null,targetdiv)
          alertMessage(v.message);
        }
      })
    })
  }else if (targetdiv.id == 'new-queries') {
		window.history.pushState('','','?page=new-queries')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">Contactor name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">phone number</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">subject</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    p = postschema
    p.body = JSON.stringify({token: getdata('admin')})
    r = await request('getnewqueries',p)
    if (!r.success) return 0

    r.message.forEach(queries=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${queries.fullname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${queries.phone}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${queries.subject}</span>
              </td>
              <td class="p-10p">
              <span class="fs-14p verdana green  hover-2 us-none view" id='${queries.id}'>view</span>
                <span class="fs-14p verdana orange right hover-2 us-none seen nowrap" id='${queries.id}'>mark as seen</span>
              </td>`;
              counter+=1;
    })
    const view = Array.from(document.querySelectorAll('span.view'));
    const seen = Array.from(document.querySelectorAll('span.seen'));
      view.forEach(vl=>{
        vl.addEventListener('click',e=>{
          r.message.forEach(async queries=>{
            if (queries.id == vl.id) {
              showq(r.message[r.message.indexOf(queries)])
              p = postschema
              p.body = JSON.stringify({token: getdata('admin'),status: 'seen',queryid: vl.id})
              await request('chquest',p)
              showcontent(null,targetdiv)
            }
          })
        })
      })
  }else if (targetdiv.id == 'queries') {
		window.history.pushState('','','?page=queries')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">Contactor name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">phone number</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">subject</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    p = postschema
    p.body = JSON.stringify({token: getdata('admin')})
    r = await request('getqueries',p)
    if (!r.success) return 0

    r.message.forEach(queries=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${queries.fullname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${queries.phone}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${queries.subject}</span>
              </td>
              <td class="p-10p">
              <span class="fs-14p verdana green  hover-2 us-none view" id='${queries.id}'>view</span>
              </td>`;
              counter+=1;
    })
    const view = Array.from(document.querySelectorAll('span.view'));
      view.forEach(vl=>{
        vl.addEventListener('click',e=>{
          r.message.forEach(async queries=>{
            if (queries.id == vl.id) {
              showq(r.message[r.message.indexOf(queries)])
            }
          })
        })
      })
  }else if (targetdiv.id == 'home'){
		window.history.pushState('','','?page=home')
    var cards = Array.from(targetdiv.querySelectorAll('span.cardsc'));
    p = postschema
    p.body = JSON.stringify({token : getdata('admin')})
    r = await request('ftchnbrs',p)
    if (!r.success) return 0
    addnbrs(r.message)
    function addnbrs(numbers) {
      numbers.forEach(numb=>{
      cards.forEach(nbrs=>{
          if (nbrs.id == Object.keys(numb)) {
            nbrs.innerText = numb[Object.keys(numb)]
          }
        })
      })
    }
  }else if (targetdiv.id == 'new-orders') {
		window.history.pushState('','','?page=new-orders')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">Owner name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total price</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total products</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counti = 1;
    o = postschema
    o.body = JSON.stringify({token: getdata('admin')})
    t = await request('getneworders',o)
    if (!t.success) {
      return 0
    }

    t.message.forEach(order=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counti}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana norwap">${order.firstname} ${order.lastname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana nowrap">${adcm(order.totalprice)} <small class="dgray consolas">RWF</small></span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.products.length}</span>
              </td>
              <td class="p-10p flex jc-sb">
                <span class="fs-14p verdana green center-2 hover-2 us-none viewlink" id='${order.id}'>view</span>
              </td>`;
              counti+=1;
    })
    var viewlink = Array.from(targetdiv.querySelectorAll('span.viewlink'));
      viewlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          postschema.body = JSON.stringify({token: getdata('admin'),orderid: s.id})
          r = await request('getorder',p)
          if (!r.success) {
            return 0
          }
          postschema.body = JSON.stringify({token: getdata('admin'),orderid: s.id,status: 'pending'})
          c = await request('chorst',p)
          showOrder(r.message);
        })
      })
    
  }else if (targetdiv.id == 'pending-orders') {
		window.history.pushState('','','?page=pending-orders')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">Owner name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total price</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total products</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = postschema
    o.body = JSON.stringify({token: getdata('admin')})
    t = await request('getpendingorders',o)
    if (!t.success) {
      return 0
    }
    t.message.forEach(order=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana norwap">${order.firstname} ${order.lastname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana nowrap">${adcm(order.totalprice)} <small class="dgray consolas">RWF</small></span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.products.length}</span>
              </td>
              <td class="p-10p flex jc-sb">
                <span class="fs-14p verdana green center-2 hover-2 us-none viewlink" id='${order.id}'>view</span>
                <span class="fs-14p verdana theme center-2 hover-2 us-none deliverlink" id='${order.id}'>deliver</span>
              </td>`;
              counter+=1;
    })
    var viewlink = Array.from(targetdiv.querySelectorAll('span.viewlink'));
    var deliverlink = Array.from(targetdiv.querySelectorAll('span.deliverlink'));
      viewlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          postschema.body = JSON.stringify({token: getdata('admin'),orderid: s.id})
          r = await request('getorder',p)
          if (!r.success) {
            return 0
          }
          showOrder(r.message);
        })
      })
      deliverlink.forEach(d=>{
        d.addEventListener('click',async(e)=>{
          e.preventDefault();
          p=postschema
          postschema.body = JSON.stringify({token: getdata('admin'),orderid: d.id,status: 'delivered'})
          c = await request('chorst',p)
          showcontent(null,targetdiv)
          if(c.success) alertMessage('order status changed successfully')
        })
      })
  }else if (targetdiv.id == 'delivered-orders') {
		window.history.pushState('','','?page=delivered-orders')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">Owner name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total price</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total products</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = postschema
    o.body = JSON.stringify({token: getdata('admin')})
    t = await request('getdeliveredorders',o)
    if (!t.success) {
      return 0
    }
    t.message.forEach(order=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana norwap">${order.firstname} ${order.lastname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana nowrap">${adcm(order.totalprice)} <small class="dgray consolas">RWF</small></span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.products.length}</span>
              </td>
              <td class="p-10p flex jc-sb">
                <span class="fs-14p verdana green center-2 hover-2 us-none viewlink capitalize" id='${order.id}'>view</span>
              </td>`;
              counter+=1;
    })
    var viewlink = Array.from(targetdiv.querySelectorAll('span.viewlink'));
      viewlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          postschema.body = JSON.stringify({token: getdata('admin'),orderid: s.id})
          r = await request('getorder',p)
          if (!r.success) {
            return 0
          }
          showOrder(r.message);
        })
      })
  }else if (targetdiv.id == 'orders') {
		window.history.pushState('','','?page=orders')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p nowrap">Owner name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total price</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">total products</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = postschema
    o.body = JSON.stringify({token: getdata('admin')})
    t = await request('getorders',o)
    if (!t.success) {
      return 0
    }
    t.message.forEach(order=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana norwap">${order.firstname} ${order.lastname}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana nowrap">${adcm(order.totalprice)} <small class="dgray consolas">RWF</small></span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${order.products.length}</span>
              </td>
              <td class="p-10p flex jc-sb">
                <span class="fs-14p verdana green center-2 hover-2 us-none viewlink capitalize" id='${order.id}'>view</span>
              </td>`;
              counter+=1;
    })
    var viewlink = Array.from(targetdiv.querySelectorAll('span.viewlink'));
      viewlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          postschema.body = JSON.stringify({token: getdata('admin'),orderid: s.id})
          r = await request('getorder',p)
          if (!r.success) {
            return 0
          }
          showOrder(r.message);
        })
      })
  }else if (targetdiv.id == 'add-user') {
		window.history.pushState('','','?page=add-user')
  }else if (targetdiv.id == 'categories') {
		window.history.pushState('','','?page=categories')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('tree',o)
    if (!t.success) {
      return 0
    }
    t.message.categories.forEach((category)=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${category.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${category.name}</span>
              </td>
              <td class="p-10p flex jc-sb">
                ${(category.pinned == 1)? `<span class="fs-14p verdana orange center-2 hover-2 us-none unpinlink" id='${category.id}'>unpin</span>`: `<span class="fs-14p verdana green center-2 hover-2 us-none pinlink" id='${category.id}'>pin</span>`}
                <span class="fs-14p verdana red center-2 hover-2 us-none deletelink" id='${category.id}'>delete</span>
              </td>`;
              counter+=1;
    })

    const pinlink = Array.from(targetdiv.querySelectorAll('span.pinlink'));
    var deletelink = Array.from(targetdiv.querySelectorAll('span.deletelink'));
    var unpinlink = Array.from(targetdiv.querySelectorAll('span.unpinlink'));
    pinlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({type: 'categories',id:s.id,token: getdata('admin')})
          r = await request('pin',p)
          if (r.success) {
            showcontent(null,targetdiv)
            alertMessage(r.message);
          }
        })
      })
      unpinlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({type: 'categories',id:s.id,token: getdata('admin')})
          r = await request('unpin',p)
          if (r.success) {
            showcontent(null,targetdiv)
            alertMessage(r.message);
          }
        })
      })
      deletelink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({catid:s.id,token: getdata('admin')})
          v = await request('deletecategory',p)
          if (v.success) {
            showcontent(null,targetdiv)
            alertMessage(v.message);
          }
        })
      })
     
  }else if (targetdiv.id == 'sub-categories') {
		window.history.pushState('','','?page=sub-categories')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">category</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('tree',o)
    if (!t.success) {
      return 0
    }
    t.message.categories.forEach(category=>{
      category.subcategories[0].forEach(subcategories=>{
        a = document.createElement('tr');
        targetdiv.childNodes[3].childNodes[1].appendChild(a);
        a.innerHTML = `
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${counter}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${subcategories.id}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${subcategories.name}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${category.name}</span>
                </td>
                <td class="p-10p flex jc-sb">
                ${(subcategories.pinned == 1)? `<span class="fs-14p verdana orange center-2 hover-2 us-none unpinlink" id='${subcategories.id}'>unpin</span>`: `<span class="fs-14p verdana green center-2 hover-2 us-none pinlink" id='${subcategories.id}'>pin</span>`}
                <span class="fs-14p verdana red center-2 hover-2 us-none deletelink" id='${subcategories.id}'>delete</span>
              </td>`;
              counter+=1;
    })
  })

    const pinlink = Array.from(targetdiv.querySelectorAll('span.pinlink'));
    var deletelink = Array.from(targetdiv.querySelectorAll('span.deletelink'));
    var unpinlink = Array.from(targetdiv.querySelectorAll('span.unpinlink'));
    pinlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({type: 'subcategories',id:s.id,token: getdata('admin')})
          r = await request('pin',p)
          if (r.success) {
            showcontent(null,targetdiv)
            alertMessage(r.message);
          }
        })
      })
      unpinlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({type: 'subcategories',id:s.id,token: getdata('admin')})
          r = await request('unpin',p)
          if (r.success) {
            showcontent(null,targetdiv)
            alertMessage(r.message);
          }
        })
      })
      deletelink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({subcatid:s.id,token: getdata('admin')})
          v = await request('deletesubcategory',p)
          if (v.success) {
            showcontent(null,targetdiv)
            alertMessage(v.message);
          }
        })
      })
  }else if (targetdiv.id == 'brands') {
		window.history.pushState('','','?page=brands')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('tree',o)
    if (!t.success) {
      return 0
    }
    t.message.brands.forEach((brands)=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${brands.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${brands.name}</span>
              </td>
              <td class="p-10p flex jc-sb">
              ${(brands.pinned == 1)? `<span class="fs-14p verdana orange center-2 hover-2 us-none unpinlink" id='${brands.id}'>unpin</span>`: `<span class="fs-14p verdana green center-2 hover-2 us-none pinlink" id='${brands.id}'>pin</span>`}
              <span class="fs-14p verdana red center-2 hover-2 us-none deletelink" id='${brands.id}'>delete</span>
            </td>`;
            counter+=1;
  })

  const pinlink = Array.from(targetdiv.querySelectorAll('span.pinlink'));
  var deletelink = Array.from(targetdiv.querySelectorAll('span.deletelink'));
  var unpinlink = Array.from(targetdiv.querySelectorAll('span.unpinlink'));
  pinlink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({type: 'brands',id:s.id,token: getdata('admin')})
        r = await request('pin',p)
        if (r.success) {
          showcontent(null,targetdiv)
          alertMessage(r.message);
        }
      })
    })
    unpinlink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({type: 'brands',id:s.id,token: getdata('admin')})
        r = await request('unpin',p)
        if (r.success) {
          showcontent(null,targetdiv)
          alertMessage(r.message);
        }
      })
    })
    deletelink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({brandid:s.id,token: getdata('admin')})
        v = await request('deletebrand',p)
        if (v.success) {
          showcontent(null,targetdiv)
          alertMessage(v.message);
        }
      })
    })
   
  }else if (targetdiv.id == 'series') {
		window.history.pushState('','','?page=series')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">brand</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('tree',o)
    if (!t.success) {
      return 0
    }
    t.message.brands.forEach((brand)=>{
      brand.series[0].forEach((series)=>{
        a = document.createElement('tr');
        targetdiv.childNodes[3].childNodes[1].appendChild(a);
        a.innerHTML = `
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${counter}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${series.id}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${series.name}</span>
                </td>
                <td class="p-10p bsbb">
                  <span class="fs-14p verdana">${brand.name}</span>
                </td>
                <td class="p-10p flex jc-sb">
                ${(series.pinned == 1)? `<span class="fs-14p verdana orange center-2 hover-2 us-none unpinlink" id='${series.id}'>unpin</span>`: `<span class="fs-14p verdana green center-2 hover-2 us-none pinlink" id='${series.id}'>pin</span>`}
                <span class="fs-14p verdana red center-2 hover-2 us-none deletelink" id='${series.id}'>delete</span>
              </td>`;
              counter+=1;
    })
  })

    const pinlink = Array.from(targetdiv.querySelectorAll('span.pinlink'));
    var deletelink = Array.from(targetdiv.querySelectorAll('span.deletelink'));
    var unpinlink = Array.from(targetdiv.querySelectorAll('span.unpinlink'));
    pinlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({type: 'families',id:s.id,token: getdata('admin')})
          r = await request('pin',p)
          if (r.success) {
            showcontent(null,targetdiv)
            alertMessage(r.message);
          }
        })
      })
      unpinlink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({type: 'families',id:s.id,token: getdata('admin')})
          r = await request('unpin',p)
          if (r.success) {
            showcontent(null,targetdiv)
            alertMessage(r.message);
          }
        })
      })
      deletelink.forEach(s=>{
        s.addEventListener('click',async(e)=>{
          e.preventDefault();
          p = postschema
          p.body = JSON.stringify({famid:s.id,token: getdata('admin')})
          v = await request('deletefamily',p)
          if (v.success) {
            showcontent(null,targetdiv)
            alertMessage(v.message);
          }
        })
      })
  }else if (targetdiv.id == 'availability') {
		window.history.pushState('','','?page=availability')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">name</span>
              </td>
  
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('tree',o)
    if (!t.success) {
      return 0
    }
    t.message.availability.forEach((avs)=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
          <td class="p-10p bsbb">
            <span class="fs-14p verdana">${counter}</span>
          </td>
          <td class="p-10p bsbb">
            <span class="fs-14p verdana">${avs.id}</span>
          </td>
          <td class="p-10p bsbb">
            <span class="fs-14p verdana">${avs.name}</span>
          </td>
          <td class="p-10p flex jc-sb">
          ${(avs.pinned == 1)? `<span class="fs-14p verdana orange center-2 hover-2 us-none unpinlink" id='${avs.id}'>unpin</span>`: `<span class="fs-14p verdana green center-2 hover-2 us-none pinlink" id='${avs.id}'>pin</span>`}
          <span class="fs-14p verdana red center-2 hover-2 us-none deletelink" id='${avs.id}'>delete</span>
        </td>`;
        counter+=1;
})

const pinlink = Array.from(targetdiv.querySelectorAll('span.pinlink'));
var deletelink = Array.from(targetdiv.querySelectorAll('span.deletelink'));
var unpinlink = Array.from(targetdiv.querySelectorAll('span.unpinlink'));
pinlink.forEach(s=>{
  s.addEventListener('click',async(e)=>{
    e.preventDefault();
    p = postschema
    p.body = JSON.stringify({type: 'availability',id:s.id,token: getdata('admin')})
    r = await request('pin',p)
    if (r.success) {
      showcontent(null,targetdiv)
      alertMessage(r.message);
    }
  })
})
unpinlink.forEach(s=>{
  s.addEventListener('click',async(e)=>{
    e.preventDefault();
    p = postschema
    p.body = JSON.stringify({type: 'availability',id:s.id,token: getdata('admin')})
    r = await request('unpin',p)
    if (r.success) {
      showcontent(null,targetdiv)
      alertMessage(r.message);
    }
  })
})
deletelink.forEach(s=>{
  s.addEventListener('click',async(e)=>{
    e.preventDefault();
    p = postschema
    p.body = JSON.stringify({avid:s.id,token: getdata('admin')})
    v = await request('deleteavailability',p)
    if (v.success) {
      showcontent(null,targetdiv)
      alertMessage(v.message);
    }
  })
})

  }else if (targetdiv.id == 'usability') {
		window.history.pushState('','','?page=usability')
    var atr = document.createElement('tr');
    targetdiv.childNodes[3].childNodes[1].innerHTML = null;
    targetdiv.childNodes[3].childNodes[1].appendChild(atr);
    atr.innerHTML = ` <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">#</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">id</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">name</span>
              </td>
              <td class="p-10p bsbb bb-1-s-g">
                <span class="fs-15p verdana p-10p">action</span>
              </td>
              `;
    let counter = 1;
    o = {
      mode: 'cors',
      method: "GET",
      headers: {
        "content-type": "application/json",
        'accept': '*/*'
      }}
    t = await request('tree',o)
    if (!t.success) {
      return 0
    }
    t.message.usedin.forEach(usability=>{
      a = document.createElement('tr');
      targetdiv.childNodes[3].childNodes[1].appendChild(a);
      a.innerHTML = `
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${counter}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${usability.id}</span>
              </td>
              <td class="p-10p bsbb">
                <span class="fs-14p verdana">${usability.name}</span>
              </td>
              <td class="p-10p flex jc-sb">
              ${(usability.pinned == 1)? `<span class="fs-14p verdana orange center-2 hover-2 us-none unpinlink" id='${usability.id}'>unpin</span>`: `<span class="fs-14p verdana green center-2 hover-2 us-none pinlink" id='${usability.id}'>pin</span>`}
              <span class="fs-14p verdana red center-2 hover-2 us-none deletelink" id='${usability.id}'>delete</span>
            </td>`;
            counter+=1;
  })

  const pinlink = Array.from(targetdiv.querySelectorAll('span.pinlink'));
  var deletelink = Array.from(targetdiv.querySelectorAll('span.deletelink'));
  var unpinlink = Array.from(targetdiv.querySelectorAll('span.unpinlink'));
  pinlink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({type: 'usedin',id:s.id,token: getdata('admin')})
        r = await request('pin',p)
        if (r.success) {
          showcontent(null,targetdiv)
          alertMessage(r.message);
        }
      })
    })
    unpinlink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({type: 'usedin',id:s.id,token: getdata('admin')})
        r = await request('unpin',p)
        if (r.success) {
          showcontent(null,targetdiv)
          alertMessage(r.message);
        }
      })
    })
    deletelink.forEach(s=>{
      s.addEventListener('click',async(e)=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({usedinid:s.id,token: getdata('admin')})
        v = await request('deleteusedin',p)
        if (v.success) {
          showcontent(null,targetdiv)
          alertMessage(v.message);
        }
      })
    })
  }
}
export function swtchcntnt(extra,newdiv) {
  var content = newdiv.id;
  switch(content){
    case 'home':
      showcontent("home",newdiv);
      break;
    case 'users':
      showcontent("database.users",newdiv);
      break;
    case 'view-products':
      showcontent("database.blogs",newdiv);
      break;
    case 'new-queries':
      showcontent("database.blogs",newdiv);
      break;
    case 'queries':
        showcontent("database.blogs",newdiv);
        break;
    case 'add-product':
      showcontent("addBlog",newdiv);
      break;
    case 'new-orders':
      showcontent("addUser",newdiv);
      break;
    case 'pending-orders':
      showcontent("addUser",newdiv);
        break;
    case 'delivered-orders':
        showcontent("addUser",newdiv);
        break;
    case 'add-discount':
      showcontent("addUser",newdiv);
      break;
    case 'orders':
      showcontent("database.queries",newdiv);
      break;
    case 'log':
      showcontent("database.log",newdiv);
      break;
    case 'add-user':
      showcontent("database.log",newdiv);
      break;
    case 'categories':
      showcontent("database.log",newdiv);
      break
    case 'sub-categories':
      showcontent("database.log",newdiv);
      break
    case 'brands':
      showcontent("database.log",newdiv);
      break
    case 'series':
      showcontent("database.log",newdiv);
      break
    case 'availability':
      showcontent("database.log",newdiv);
      break
    case 'usability':
      showcontent("database.log",newdiv);
      break
  }
}
export async function vdtemail(value,input) {
 let pattern =  /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
 if(input.value.match(pattern)){
    p = postschema 
    p.body = JSON.stringify({email:input.value.trim()})
    r = await request('checkEmail',p)
    if (r.success) {
      setErrorFor(input,"the entered email is in use!");
      sessionStorage.setItem('val',0)
    }else{
      setSuccessFor(input);
      sessionStorage.setItem('val',1)
      
    }    
 }else{
   setErrorFor(input,"try to use a valid email address");
   sessionStorage.setItem('val',0)
 }
 return sessionStorage.getItem('val')
}
export function getParam(param) {
  let i = new URL(window.location.href)
  let val = i.searchParams.get(param)
  return val
  
}
export function rs(string){
  string=string.replace(/,/gi,"")
  return string
}
export function ats(elem,obj,elems,parent,subparent) {
  for (const category of obj) {
    o = document.createElement('option');
    (category.name == parent && elem.id == 'category') ? cch(c(),category.subcategories[0],subparent) : '';
    (category.name == parent && elem.id == 'brand') ? cch(b(),category.series[0],subparent) : '';
    (category.name == parent) ? o.setAttribute('selected','') : '';
    (category.name == parent) ? setFocusFor(elem) : '';
    o.className = 'p-10p bsbb'
    o.innerHTML = `<div class="w-100 h-100 block verdana black">${category.name}</div>`
    elem.appendChild(o)
  }
  function c() {
    for(const select of elems){
      if (select.name == 'product-subcategory') {
        return select
      }
    }
  }
  function b() {
    for(const select of elems){
      if (select.name == 'product-serie') {
        return select
      }
    }
  }
  elem.addEventListener('change',e=>{
    e.preventDefault();
    if(elem.id == 'category'){
      if (elem.value != '') {
        obj.forEach(category=>{
          if (category.name == elem.value) {
              cch(c(),category.subcategories[0])
          }
        })
      }else{
        c().innerHTML = '<option></option>'
      }
    }else if(elem.id == 'brand'){
      if (elem.value != '') {
        obj.forEach(category=>{
          if (category.name == elem.value) {
              cch(b(),category.series[0])
          }
        })
      }else{
        c().innerHTML = '<option></option>'
      }
    }
  })
}
export function cch(elem,obj,subparent) {
  elem.innerHTML = `<option></option>`
  for (const subcategory of obj) {
    d = document.createElement('option');
    (subcategory.name == subparent) ? setFocusFor(elem) : '';
    d.className = 'p-10p bsbb'
    d.innerHTML = `<div class="w-100 h-100 block verdana black">${subcategory.name}</div>`;
    (subcategory.name == subparent) ? d.setAttribute('selected','') : '';
    elem.appendChild(d)
  }
  
}
export function getcips(parent) {
  c = Array.from(parent.querySelectorAll('span.chip'))
  if (parent.title == 'specifications') {
      d = {}
  }else if (parent.title == 'conditions') {
      d = []
  }else if(parent.title == 'images'){
      d = []
  }else if (parent.title == 'dinfo') {
      d = {}
  }
  c.forEach(chip=>{
      if (parent.title == 'specifications') {
          Object.assign(d,{[chip.childNodes[0].textContent]: chip.childNodes[2].textContent})
      }else if (parent.title == 'dinfo') {
        Object.assign(d,{[chip.childNodes[0].textContent]: chip.childNodes[2].textContent})
      } else if (parent.title == 'conditions') {
          d.push({name:chip.childNodes[0].textContent,price:parseInt(rs(chip.childNodes[2].textContent))})
      }else if (parent.title == 'images') {
          d.push(chip.querySelector('img').src)
      }
  })
  return d
}
export const postschema = {
    mode: 'cors',
    method: "POST",
    body: null,
    headers: {
      "content-type": "application/json",
      'accept': '*/*',
      'ss-id' : ssid

    }
}
export const getschema =  {
    mode: 'cors',
    method: "GET",
    headers: {
      "content-type": "application/json",
      'accept': '*/*'

    }
}
export function initiatelogin() {
  s = addshade();
  c = document.createElement('div')
  c.className = `w-80 h-70 bc-white cntr br-5p card-6 b-mgc-resp`
  s.appendChild(c)
  c.innerHTML = `<div class="data-cont w-100 h-100  bsbb p-10p ovh p-r" id="login">
  <div class="w-45 h-100 p-40p bsbb igrid t-0 hidden-resp">
     <img src="/icons/login.webp" class="contain w-100 h-100">
  </div>
  <div class="w-50 h-100 p-a bsbb p-r r-0 p-20p igrid bp-0-resp bfull-resp">
      <div class="text w-100  bsbb bsbb p-r  ">
          <span class="right w-100 h-100 p-r ovh">
              <div class="w-100 h-100 p-10p bsbb  igrid m-0 user-form  tr-0-3 l-0 p-r">
                  <form method="post" name="login-form" onsubmit="function f(e) {e.preventDefault();}" class="p-10p bsbb" id="login-form">
                      <div class="w-100 h-60p mt-30p mb-10p p-10p bsbb">
                          <div class="w-100 igrid mr-10p left parent p-r">
                              <label class="capitalize fs-15p verdana">email</label>
                              <input type="email" name="email" placeholder="" class="br-5p bsbb p-15p no-outline bsbb b-1-s-dgray bc-white mt-10p">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana hidden ml-5p">error mssg</small>
                          </div>
                      </div>
                      <div class="w-100 h-60p mt-30p mb-10p p-10p bsbb">
                          <div class="w-100 igrid mr-10p left parent p-r">
                              <label class="capitalize fs-15p verdana">password</label>
                              <input type="password" name="password" placeholder="" class="br-5p bsbb p-15p no-outline bsbb b-1-s-dgray bc-white mt-10p">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana hidden ml-5p">error mssg</small>
                          </div>
                      </div>
                      
                      <div class="w-100  h-60p mt-60p p-r right mb-10p p-10p bsbb">
                          <div class="w-100 h-100">
                              <span class="iblock left h-100">
                                  <span class="verdana black h-100 fs-13p capitalize">not yet a member<a href="signup" id="signup" class="td-none theme switch-link ml-5p">signup</a></span>
                              </span>
                              <span class="block right h-100">
                                  <button class="bc-theme p-10p b-none w-100p br-2p hover-2">
                                      <span class="verdana white fs-15p capitalize">login</span>
                                  </button>
                              </span>
                              </div>
                              <span class="block left h-100">
                                <span class="verdana black h-100 fs-13p capitalize"><a href="/forgot-password" id="signup" class="td-none theme">forgot password ?</a></span>
                              </span>
                      </div>
                  </form>
              </div>
              <div class="w-100 h-100 p-10p bsbb igrid m-0 user-form  p-a t-0 tr-0-3 l-100">
                  <form method="post" name="signup-form" onsubmit="function f(e) {e.preventDefault();}" class="p-10p bsbb" id="signup-form">
                      <div class="w-100 h-60p mt-30p mb-10p p-10p bsbb">
                          <div class="w-50 bsbb igrid mr-10p left parent p-r">
                              <label class="verdana capitalize fs-15p ">first name</label>
                              <input type="text" name="firstname" placeholder="" class="br-5p bsbb  no-outline bsbb b-1-s-dgray bc-white w-100 p-15p mt-10p">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana hidden ml-5p">error mssg</small>
                          </div>
                          <div class="p-r w-45 bsbb igrid parent">
                              <label class="verdana capitalize fs-15p left">last name</label>
                              <input type="text" name="lastname" placeholder="" class="br-5p bsbb no-outline bsbb b-1-s-dgray bc-white w-100 p-15p mt-10p">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana left hidden ml-5p">error mssg</small>
                          </div>
                      </div>
                      <div class="w-100 h-60p mt-30p mb-10p p-10p bsbb">
                          <div class="w-100 igrid mr-10p left parent p-r">
                              <label class="verdana capitalize fs-15p ">email</label>
                              <input type="text" name="email" placeholder="" class="br-5p bsbb p-15p no-outline bsbb b-1-s-dgray bc-white mt-10p" id="emailsignup">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana left hidden ml-5p">error mssg</small>

                          </div>
                      </div>
                      <div class="w-100 h-60p mt-30p mb-10p p-10p bsbb">
                          <div class="w-50 bsbb igrid mr-10p left parent p-r">
                              <label class="verdana capitalize fs-15p ">password</label>
                              <input type="text" name="password" placeholder="" class="br-5p bsbb  no-outline bsbb b-1-s-dgray bc-white w-100 p-15p mt-10p">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana hidden ml-5p">error mssg</small>
                          </div>
                          <div class="p-r w-45 bsbb igrid parent">
                              <label class="verdana capitalize fs-15p left">confirm password</label>
                              <input type="text" name="confirm" placeholder="" class="br-5p bsbb no-outline bsbb b-1-s-dgray bc-white w-100 p-15p mt-10p">
                              <span class="p-a r-0 mt-43p mr-10p center">
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                                      <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                                  </svg>
                                  <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="10" cy="10" r="10" fill="#68D753"/>
                                      <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                                      <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                                  </svg>
                              </span>
                              <small class="red verdana left hidden ml-5p">error mssg</small>
                          </div>
                      </div>
                      
                      <div class="w-100  h-60p mt-20p p-r right mb-10p p-10p bsbb">
                          <div class="w-100 h-100">
                              <span class="iblock left h-100">
                                      <span class="verdana black h-100 fs-13p capitalize">already a member<a href="login" id="login" class=" px-5p bsbb td-none theme switch-link">login</a></span>
                              </span>
                              <span class="iblock right h-100">
                                  <button class="bc-theme p-10p b-none w-100p br-2p hover-2">
                                      <span class="verdana white fs-15p capitalize">signup</span>
                                  </button>
                              </span>
                          </div>
                      </div>
                  </form>
              </div>
          </span>
      </div>
      <div class=" mt--95p w-100 center py-5p bsbb">
        <span class="center-2 hover-2 py-5p px-15p bsbb w-100 b-1-s-gray h-45p" id="authGoogle">
          <span class="w-30p h-30p mx-5p"><img src="/api/brands/google.png" class="contain w-30p h-30p"></span>
          <span class="w-100 helvetica capitalize"> continue with google</span>
        </span>
      </div>
      
  </div>
  </div>`
  var input = Array.from(c.getElementsByTagName('input'));
  var login_form = document.getElementById('login-form');
  var signup_form = document.getElementById('signup-form');
  var sL = Array.from(document.querySelectorAll("a.switch-link"));
  signup_form.addEventListener('submit',e=>{
    e.preventDefault();
    var ins = Array.from(signup_form.querySelectorAll('input'));
    let data = {};
      ins.forEach(inputs=>{
          Object.assign(data,{ [inputs.name]:inputs.value.trim()});
        })
    validateForm(signup_form,ins,data);
    
  })
  login_form.addEventListener('submit',e=>{
    e.preventDefault();
      var ins = Array.from(login_form.querySelectorAll('input'));
      let data = {};
      ins.forEach(inputs=>{
          Object.assign(data,{ [inputs.name]:inputs.value.trim()});
        })
      validateForm(login_form,ins,data);
    
  })
  input.forEach(inp=>{
    inp.addEventListener('focus',e=>{
      inp.parentNode.classList.add('focus');
    })
  })
  input.forEach(inp=>{
    inp.addEventListener('blur',e=>{
      inp.parentNode.classList.remove('focus');
      if (inp.value == "") {
        setBlurFor(inp);
      }else{
        setSuccessFor(inp);
      }
    })
    if (inp.id == 'emailsignup') {
      inp.addEventListener('keyup',e=>{
        vdtemail(inp.value,inp);
      })
    }
  })
  sL.forEach(swl=>{
    swl.addEventListener("click",e=>{
      e.preventDefault();
        showForm(swl.id);
    })
  })
  document.getElementById('authGoogle').addEventListener('click', () => {
    // Open a popup window for Google login
    const popup = window.open(`${geturl()}/auth/google`, 'Google Login', 'width=500,height=500');
  
    // Check for the token in the localStorage when the popup is closed
    const checkTokenInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkTokenInterval);
        const token = localStorage.getItem('user');
        if (!token) {
          console.error('Google Login Error')
        }else{
          alertMessage("you have been successfully logged in");
          window.location.href = localStorage.getItem('next');
        }
      }
    }, 1000);
  });
  
  // Listen for messages from the popup
  window.addEventListener('message', (event) => {
    if (event.data.type === 'google-auth') {
      // Store the token in localStorage
      localStorage.setItem('user', JSON.stringify(event.data.token));
    }
  });
  
}
export function showForm(form) {
var forms = Array.from(document.querySelectorAll("div.user-form"));
if (form == "signup") {
  forms[0].classList.replace('l-0','l--100');
  forms[1].classList.replace('l-100','l-0');
}else if (form == "login"){
  forms[0].classList.replace('l--100','l-0');
  forms[1].classList.replace('l-0','l-100');
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
                                          <span class="w-100 h-a fs-18p bold verdana capitalize">${product.pname}</span>
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
                              <span class="w-100 h-a fs-18p bold verdana capitalize">${product.pname}</span>
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

export function addsCard(message,dec) {
  let sCard = document.createElement('div');
  let thenav
     thenav = document.querySelector('div.thenav');
     thenav.appendChild(sCard);
	sCard.className = "success-card p-a nwecard";
	c = Array.from(document.querySelectorAll('div.success-card'));
	if (c.length <= 1) {
		sCard.className = "card success-card w-a h-20p p-a mt-100p bc-white br-20p p-10p cntr t-0 zi-0 tr-0-4  ovh";
		var scard_hol = document.createElement('div');
		sCard.appendChild(scard_hol);
		scard_hol.classList.add('w-a');
		scard_hol.classList.add('h-a');
    if (dec) {
      d=`<svg version="1.1" class="w-20p h-20p" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="fill: var(--green);" xml:space="preserve"><g><g id="check_x5F_alt"><path style="fill: var(--green);"d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383 L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z"/></g></g></svg>`
    }else{
      d=`<svg version="1.1" fill="#ff0000" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30" height="30" viewBox="0 0 64 64" fill="#ff0000" enable-background="new 0 0 64 64" xml:space="preserve"><g><line fill="none" stroke="#ff0000" stroke-width="2" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"></line></g><g><line fill="none" stroke="#ff0000" stroke-width="2" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"></line></g></svg>`
    }
		scard_hol.innerHTML = `<span class='left center w-40p l-0 h-100 bc-white p-a green igrid t-0  '>${d}</span><span class=' horizontal fs-14p igrid right w-a  h-100 mt--1p zi--1 p-r black verdana ml-30p mr-5p'>${message}</span>`;
		setTimeout(removecard,2000,sCard);	
	}else{
    c = document.querySelectorAll('div.nwecard')
    c.forEach(card=>{
      card.parentNode.removeChild(card)
    })
	}
	
}

function removecard(sCard) {
	sCard.classList.remove('add-success');
	setTimeout(deleteCard,1000,sCard); 
}
function deleteCard(sCard) {
  let navbar = document.querySelector('div.thenav')
	navbar.removeChild(sCard);
}
export function showOrder(orderinfo) {
    orderinfo = orderinfo[0]
    let address = orderinfo.uaddress
    s = addshade();
    c = document.createElement('div')
    c.className = `w-80 h-80 bc-white cntr br-5p card-6 b-mgc-resp`
    s.appendChild(c)
    c.innerHTML = `<div class="p-r w-100 h-100">
                    <div class="w-100 h-70p p-5p bsbb the-h bb-1-s-g">
                        <div class="w-100 h-100 p-20p bsbb">
                            <span class="verdana helvetica fs-20p capitalize">Order information</span>
                        </div>
                    </div>
                    <div class="w-100 h-76 p-5p bsbb ovys">
                        <div class="w-a h-a p-20p bsbb">
                        <p class="verdana"><span class="fs-16p capitalize">date added</span></p>
                        <span class="w-100 h-a fs-16p bold verdana capitalize dgray">date : </span>
                                    <span class="w-100 h-a fs-16p bold consolas capitalize nowrap">${orderinfo.date}</span>
                        <p class="verdana"><span class="fs-16p capitalize">order address</span></p>
                        <div class="w-a h-a p-5p bsbb igrid bfull-resp">
                            <div class="w-100 br-5p h-100 hover-2 p-5p bsbb">
                            <ul class="p-0 m-0 ls-none h-a">
                                <li class="w-100 p-5p bsbb flex">
                                    <span class="w-100 h-a fs-16p bold verdana capitalize dgray">Names : </span>
                                    <span class="w-100 h-a fs-16p bold consolas capitalize nowrap">${address.firstname} ${address.lastname}</span>
                                </li>
                                <li class="w-100 p-5p bsbb flex">
                                <span class="w-100 h-a fs-16p bold verdana capitalize dgray">Phone : </span>
                                <span class="w-100 h-a fs-16p bold consolas capitalize">${address.phonenumber}</span>
                                </li>
                                <li class="w-100 p-5p bsbb flex">
                                    <span class="w-100 h-a fs-16p bold verdana capitalize dgray">address : </span>
                                    <span class="w-100 h-a fs-16p consolas capitalize nowrap">${address.address}</span>
                                </li>
                                <li class="w-100 p-5p bsbb flex">
                                    <span class="w-100 h-a fs-16p bold verdana capitalize dgray">street : </span>
                                    <span class="w-100 h-a fs-16p  consolas capitalize">${address.street} </span>
                                </li>
                                <li class="w-100 p-5p bsbb flex">
                                    <span class="w-100 h-a fs-16p bold verdana capitalize dgray">Apartment : </span>
                                    <span class="w-100 h-a fs-16p  consolas capitalize">${address.apartment}</span>
                                </li>
                            </ul>
                            </div>
                        </div
                    </div>
                      <div class=" w-100 h-70 ovys p-10p bsbb">
                        <table class="w-100 h-a theb">
                          <tr class="">
                              <td class="p-10p bsbb bb-1-s-g">
                                <span class="fs-15p verdana p-10p">#</span>
                              </td>
                              <td class="p-10p bsbb bb-1-s-g">
                                <span class="fs-15p verdana p-10p">Product name</span>
                              </td>
                              <td class="p-10p bsbb bb-1-s-g">
                                <span class="fs-15p verdana p-10p">condition</span>
                              </td>
                              <td class="p-10p bsbb bb-1-s-g">
                                <span class="fs-15p verdana p-10p">quantity</span>
                              </td>
                              <td class="p-10p bsbb bb-1-s-g">
                                <span class="fs-15p verdana p-10p">unit price</span>
                              </td>
                              <td class="p-10p bsbb bb-1-s-g">
                                <span class="fs-15p verdana p-10p">total price</span>
                              </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div class="w-100 h-60p p-10p bsbb p-a b-0 l-0">
                      <span class="p-7p bsbb white bc-theme capiatilze br-2p verdana right hover-2" id="print_b"">print</span>
                    </div>
                    </div>
                    `
  let theb = c.querySelector('table'),print_b = c.querySelector('#print_b');
  print_b.onclick =  function (event) {
    event.preventDefault();
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    var linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      linkElement.href = '/css/styling.css';
      printWindow.document.head.appendChild(linkElement);
    printWindow.document.write(c.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  let products = orderinfo.products
  i = 1
  products.forEach(pinfo=>{
    t = document.createElement('tr');
    t.innerHTML = 
      `<td class="p-10p bsbb">
        <span class="fs-14p verdana">${i}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.pname}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.condition}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.qty}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${adcm(pinfo.unitprice)} <small class="consolas dgray">RWF</small></span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${adcm(pinfo.totalprice)} <small class="consolas dgray">RWF</small></span>
      </td>
      `;
      theb.appendChild(t)
      i+=1;
  })
  v = document.createElement('tr')
  theb.appendChild(v);
  v.innerHTML =`<td class="h-50p">
                  <span class="fs-14p verdana p-5p bsbb">Total</span>
                </td>
                <td colspan="5">
                  <span class="fs-14p verdana right p-10p bsbb">${adcm(orderinfo.totalprice)} <small class="consolas dgray">RWF</small></span>
                </td>`
}
export function showUser(userinfo) {
  s = addshade();
  c = document.createElement('div')
  c.className = `w-80 h-80 bc-white cntr br-5p card-6 b-mgc-resp`
  s.appendChild(c)
  c.innerHTML = `<div class="p-r w-100 h-100 ovys">
                  <div class="w-100 h-70p p-5p bsbb the-h bb-1-s-g">
                      <div class="w-100 h-100 p-20p bsbb">
                          <span class="verdana helvetica fs-20p capitalize">orders</span>
                      </div>
                  </div>
                  <div class=" w-100 h-a ovys p-10p bsbb">
                  <table class="w-100 h-a theob">
                    <tr class="">
                        <td class="p-10p bsbb bb-1-s-g">
                          <span class="fs-15p verdana p-10p">#</span>
                        </td>
                        <td class="p-10p bsbb bb-1-s-g">
                          <span class="fs-15p verdana p-10p nowrap">Nbr of products</span>
                        </td>
                        <td class="p-10p bsbb bb-1-s-g">
                          <span class="fs-15p verdana p-10p">date</span>
                        </td>
                        <td class="p-10p bsbb bb-1-s-g">
                          <span class="fs-15p verdana p-10p">Status</span>
                        </td>
                        <td class="p-10p bsbb bb-1-s-g">
                          <span class="fs-15p verdana p-10p nowrap">total price</span>
                        </td>
                    </tr>
                  </table>
                </div>
                <div class="w-100 h-70p p-5p bsbb the-h bb-1-s-g">
                    <div class="w-100 h-100 p-20p bsbb">
                        <span class="verdana helvetica fs-20p capitalize">feedbacks</span>
                    </div>
                </div>  
                    <div class=" w-100 h-a ovys p-10p bsbb">
                      <table class="w-100 h-a thefb">
                        <tr class="">
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p">#</span>
                            </td>
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p">user</span>
                            </td>
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p nowrap">Product name</span>
                            </td>
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p">rate</span>
                            </td>
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p">message</span>
                            </td>
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p">date</span>
                            </td>
                            <td class="p-10p bsbb bb-1-s-g">
                              <span class="fs-15p verdana p-10p">action</span>
                            </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  </div>
                  `
let theb = c.querySelector('table.theob');
let orders = userinfo.orders
i = 1
if (orders.length) {
  orders.forEach(pinfo=>{
    t = document.createElement('tr');
    t.innerHTML = 
      `<td class="p-10p bsbb">
        <span class="fs-14p verdana">${i}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${JSON.parse(pinfo.products).length}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.date}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.status}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${adcm(pinfo.totalprice)} <small class="consolas dgray">RWF</small></span>
      </td>
      `;
      theb.appendChild(t)
      i+=1;
  })
}else{
  t = document.createElement('tr');
    t.innerHTML = 
      `<td class="p-10p bsbb" colspan="8">
        <div class="w-100 h-a">
        <div class="center p-10p bsbb w-100 h-a svg-hol">
          <span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"></path> <circle cx="12" cy="12" r="10"></circle> </svg></span>
        </div>
        <div class="center p-40p bsbb w-100 h-100">
          <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no orders for this user</span>
        </div>
      </div>
      </td>
      `;
      theb.appendChild(t)
}
let thefb = c.querySelector('table.thefb');
let feedbacks = userinfo.feedbacks
i = 1
if (feedbacks.length) {
  feedbacks.forEach(pinfo=>{
    t = document.createElement('tr');
    t.innerHTML = 
      `<td class="p-10p bsbb">
        <span class="fs-14p verdana">${i}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana capitalize nowrap">${userinfo.info.firstname} ${userinfo.info.lastname}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.pname}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana nowrap">${pinfo.rate} Star</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.message}</span>
      </td>
      <td class="p-10p bsbb">
        <span class="fs-14p verdana">${pinfo.dateadded}</span>
      </td>
      <td class="p-10p bsbb">
      <span class="fs-14p verdana red center hover-2 us-none deletelink capitalize" id='${pinfo.id}'>delete</span>
      </td>
      `;
      thefb.appendChild(t)
      i+=1;
    })
    const dele = Array.from(thefb.querySelectorAll('span.deletelink'));
        
    dele.forEach(del=>{
      del.addEventListener('click',async e=>{
        e.preventDefault();
        p = postschema
        p.body = JSON.stringify({token: getdata('admin'),feedbackid: del.id})
        try {
          del.parentNode.parentNode.parentNode.removeChild(del.parentNode.parentNode)
        } catch (error) {
          
        }
        r = await request('deletefeedback',p)

        if (!r.success) return 0
        alertMessage(r.message)
      })
    })
  
}else{
  t = document.createElement('tr');
    t.innerHTML = 
      `<td class="p-10p bsbb" colspan="8">
      <div class="w-100 h-a">
      <div class="center p-10p bsbb w-100 h-a svg-hol">
        <span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"></path> <circle cx="12" cy="12" r="10"></circle> </svg></span>
      </div>
      <div class="center p-40p bsbb w-100 h-100">
        <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no feedbacks for this user</span>
      </div>
    </div>
      </td>
      `;
      thefb.appendChild(t)
}
}
export function sf(aa,parent) {
  if (aa.success) {
  if ( aa.message.length > 0) {

    parent.innerHTML = null;
    aa.message.forEach(d=>{
                  parent.innerHTML+=  `<div id="${d.prodid}" class="product w-100 h-a bc-white bsbb ovh mr-10p ${(aa.message.indexOf(d) == 0)? 'mt-15p': ''} iblock hover-2 ${(aa.message.indexOf(d) == (aa.message.length-1))? '': 'bb-1-s-g'}  bfull-resp">
                      <div class="w-100 h-100 bsbb flex bfull-resp">
                          <div class="image p-10p bsbb iblock w-100p h-100p br-5p">
                          <span class="w-100 h-100">
                            <a href="${geturl()}/product/${d.prodid}" class="td-none ls-n black w-100 h-100 flex">
                               <img src="${geimgturl()}/product-imgz/${d.pimgs[0]}" alt="" class="w-100 h-100 b-none contain">
                            </a>
                          </span>
                          </div>
                          <div class="w-80 h-a iblock pl-20p bsbb">
                              <div class="title w-100 h-a p-5p bsbb">
                              <a href="${geturl()}/product/${d.prodid}" class="td-none ls-n black w-100 h-100 flex"><span class="verdana left fs-13p bsbb black capitalize prodname">${d.pname}</span></a>
                              </div>
                              <div class="desc w-100 h-a p-5p bsbb ">
                              <span class="verdana left fs-13p bsbb dgray wrap">in <a href="${geturl()}/browse/category/${d.catname}" class="td-none ls-n"><font class="theme">${d.catname}</font></a> , <a href="${geturl()}/browse/subcategory/${d.subcatname}" class="td-none ls-n"><font class="theme">${d.subcatname}</font></a> , <a href="${geturl()}/browse/brand/${d.brandname}" class="td-none ls-n"><font class="theme">${d.brandname}</font></a> , <a href="${geturl()}/browse/serie/${d.famname}" class="td-none ls-n"><font class="theme">${d.famname}</font></a> , <a href="${geturl()}/browse/usedin/${d.usedinname}" class="td-none ls-n"><font class="theme">${ellipsis(d.usedinname,20)}</font></a></span>
                              </div>
                              <div class="av w-100 h-a p-5p bsbb ">
                              <div class="flex"> 
                                <span class="verdana left fs-13p bsbb bc-gray pb-3p pl-10p pr-10p pt-1p br-3p center h-100 w-a dgray m-3p">${d.availability}</span>
                                <span class="verdana left fs-13p bsbb bc-gray pb-3p pl-10p pr-10p pt-1p br-3p center h-100 w-a m-3p ${cc(d.conditions[0].name)}">${d.conditions[0].name}</span>
                              </div>
                              <span class="verdana left fs-14p bsbb center-2 ml-20p h-100"><span class="condprice bold-2" id="">${adcm(d.conditions[0].newprice)}</span> <span class="fs-11p pl-10p pt-2p dgray consolas">RWF</span></span>
                              </div>
                          </div>
                      </div>
                  </div>`
              
    })
    let viewByB = Array.from(document.querySelectorAll('span.viewByB'))
    viewByB.forEach(button=>{
      button.onclick = function (event) {
        event.preventDefault()
        let els = viewByB.find(function (bb) { return bb != button})
        els.children[1].classList.replace('theme','dgray')
        button.children[1].classList.replace('dgray','theme')
        let prods = Array.from(parent.querySelectorAll('div.product'))

        if (viewByB.indexOf(button) == 0) {
          prods.forEach(product=>{
            product.classList.replace('w-250p','w-100')
            let pinfo = aa.message.find(function (prod) {return product.id == prod.prodid}),pnameHol = product.querySelector('.prodname')
            product.classList.replace('h-400p','h-a')
            product.classList.remove('iblock')
            product.children[0].classList.replace('block','flex')
            product.children[0].children[0].classList.replace('w-100','w-100p')
            product.children[0].children[0].classList.replace('h-200p','h-100p')
            product.children[0].children[1].classList.replace('w-100','w-80')
            pnameHol.innerText = pinfo.pname
          })
        }else{
          prods.forEach(product=>{
            product.classList.replace('w-100','w-250p')
            let pinfo = aa.message.find(function (prod) {return product.id == prod.prodid}),pnameHol = product.querySelector('.prodname')
            product.classList.replace('h-a','h-400p')
            product.classList.add('iblock')
            product.children[0].classList.replace('flex','block')
            product.children[0].children[0].classList.replace('w-100p','w-100')
            product.children[0].children[1].classList.replace('w-80','w-100')
            product.children[0].children[1].classList.replace('pl-20p','p-10p')
            product.children[0].children[0].classList.replace('h-100p','h-200p')
            pnameHol.innerText = ellipsis(pinfo.pname,70)
          })
        }
      }
    })
  }else{
    parent.innerHTML = `<div class="w-100 h-a">
                <div class="center p-10p bsbb w-100 h-a svg-hol">
                  <span class="verdana fs-15p"><svg class="w-100p h-100p" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="removeIconTitle" stroke="#ccc" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ccc"> <title id="removeIconTitle">Remove</title> <path d="M17,12 L7,12"/> <circle cx="12" cy="12" r="10"/> </svg></span>
                </div>
                <div class="center p-40p bsbb w-100 h-100">
                  <span class="verdana fs-18p ta-c dgray">it seems like there are <br> no products in your selection</span>
                </div>
              </div>`;
    }
  }else{
    parent.innerHTML = `<div class="w-100 h-a"><div class="center p-10p bsbb w-100 h-100">
                    <span class="verdana fs-18p ta-c dgray">oops, an error has occured while trying to connect to the server</span>
                </div></div>`;
  }
}
async function shadddiscountform(product) {
  s = addshade();
  a = document.createElement('div')
	s.appendChild(a)
  a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp"
  a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a discount</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
              <div class="avdisc w-100 h-a p-10p bsbb">
                
              </div>
							<form method="post" id="add-discount-form" name="add-discount-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="w-100 parent bsbb p-r">
										<label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">condition</label>
										<select type="text" id="condition" name="product-condition" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
												<option></option>
										</select>
										<span class="p-a r-0 t-0 mr-10p mt-10p">
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#FF0000"/>
												<path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
											</svg>
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#68D753"/>
												<line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
												<line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
											</svg>
										</span>
										<small class="red verdana left hidden ml-5p">error mssg</small>				
									</div>
								</div>
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="p-r w-100 mr-10p left parent flex">
										<input type="number" name="newprice" placeholder="New price" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input w-40" id="newprice">
                    <div class="no-outline bsbb b-1-s-dgray bc-gray w-60 pt-10p pb-10p iblock">
                        <div class="consolas fs-14p dgray p-5p bsbb cprihol">current price: </div>
                    </div>
										<span class="p-a r-0 mt-10p mr-5p">
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
												<path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
											</svg>
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#68D753"></circle>
												<line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
												<line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
											</svg>
										</span>
										<small class="red verdana hidden ml-5p p-a mt-50p w-100 ">error mssg</small>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                  <div class="w-100 igrid">
                          <span class="center iblock">
                              <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                  <span class="verdana white fs-15p capitalize">add discount</span>
                              </button>
                          </span>
                      </div>
                  </div>
							</form>
						</div>`
		f = a.querySelector('form#add-discount-form')
		j = a.querySelector('div.avdisc')
		s = Array.from(f.querySelectorAll('select.main-input'))
		s.forEach(select=>{
			select.addEventListener('focus',e=>{
				setFocusFor(select);
			})
			select.addEventListener('blur',e=>{
				if (select.value == '') {
					setBlurFor(select);
				}
			})
      let cprihol = a.querySelector('div.cprihol')
      select.addEventListener('change',e=>{
        if (select.value !='') {
          cprihol.textContent = `current price: ${adcm(product[0].conditions[select.value].newprice)} RWF`
        }
			})
		})
		o = getschema
		t= await request('tree',o)
		if (!t.success) {
			return 0
		}
    let avdisc = a.querySelector('div.avdisc')
		for (const condition of product[0].conditions) {
      if (!condition.promotion) {
        o = document.createElement('option')
        o.value = product[0].conditions.indexOf(condition)
        o.className = 'p-10p bsbb'
        o.setAttribute('data-price',condition.newprice)
        o.innerHTML = `<div class="w-100 h-100 block verdana black">${condition.name}</div>`
        s[0].appendChild(o)
        
      }else{
        avdisc.innerHTML+=`<span class="w-100 p-5p bsbb remdisc hover-2 block dgray consolas fs-24p mb-10p b-1-s-dgray br-1p" data-id="${product[0].conditions.indexOf(condition)}">click to remove promotion on "${condition.name}"</span>`
      }
		}
		let remdisc = Array.from(avdisc.querySelectorAll('span.remdisc'))
    for (const removediscount of remdisc) {
      removediscount.addEventListener('click',async e=>{
        p=postschema
        p.body = JSON.stringify({ 
          product: product[0].prodid,
          condition: removediscount.getAttribute('data-id'),
          token: getdata('admin')})
       
          r = await request('remdiscount',p)
          if (r.success) {
          alertMessage(r.message)
          removediscount.parentNode.removeChild(removediscount)
          f.reset()
          }else{
          alertMessage(r.message)
          }
      })
      
    }
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('.main-input'))
			let newprice,condition
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'newprice') {
				 newprice = input.value
			  }
			  if (input.id == 'condition') {
				condition = input.value
			 }
			}
			if(newprice != '' && condition != ''){
			  o = {
        product: product[0].prodid,
				newprice: newprice,
				condition: condition,
				token: getdata('admin')
			  }
				l = {
				  mode: 'cors',
				  method: "POST",
				  body: JSON.stringify(o),
				  headers: {
					"content-type": "application/json",
					'accept': '*/*'
				}
			  }
			  r = await request('adddiscount',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		})
}
async function sheditpriceform(product) {
  s = addshade();
  a = document.createElement('div')
	s.appendChild(a)
  a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp"
  a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">edit price</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
              <div class="avdisc w-100 h-a p-10p bsbb">
                
              </div>
							<form method="post" id="add-discount-form" name="add-discount-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="w-100 h-100 parent bsbb p-r">
										<label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">condition</label>
										<select type="text" id="condition" name="product-condition" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
												<option></option>
										</select>
										<span class="p-a r-0 t-0 mr-10p mt-10p">
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#FF0000"/>
												<path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
											</svg>
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#68D753"/>
												<line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
												<line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
											</svg>
										</span>
										<small class="red verdana left hidden ml-5p">error mssg</small>				
									</div>
								</div>
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="p-r w-100 h-100 mr-10p left parent flex">
										<input type="number" name="newprice" placeholder="New price" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input w-40" id="newprice">
                    <div class="no-outline bsbb b-1-s-dgray bc-gray w-60 h-100 center-2 iblock">
                        <div class="consolas fs-14p dgray p-5p bsbb cprihol">current price: </div>
                    </div>
										<span class="p-a r-0 mt-10p mr-5p">
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#FF0000"></circle>
												<path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"></path>
											</svg>
											<svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
												<circle cx="10" cy="10" r="10" fill="#68D753"></circle>
												<line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"></line>
												<line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"></line>
											</svg>
										</span>
										<small class="red verdana hidden ml-5p p-a mt-50p w-100 ">error mssg</small>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                  <div class="w-100 igrid">
                          <span class="center iblock">
                              <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                  <span class="verdana white fs-15p capitalize">proceed</span>
                              </button>
                          </span>
                      </div>
                  </div>
							</form>
						</div>`
		f = a.querySelector('form#add-discount-form')
		j = a.querySelector('div.avdisc')
		s = Array.from(f.querySelectorAll('select.main-input'))
		s.forEach(select=>{
			select.addEventListener('focus',e=>{
				setFocusFor(select);
			})
			select.addEventListener('blur',e=>{
				if (select.value == '') {
					setBlurFor(select);
				}
			})
      let cprihol = a.querySelector('div.cprihol')
      select.addEventListener('change',e=>{
        if (select.value !='') {
          cprihol.textContent = `current price: ${adcm(product[0].conditions[select.value].newprice)} RWF`
        }
			})
		})
		o = getschema
		t= await request('tree',o)
		if (!t.success) {
			return 0
		}
		for (const condition of product[0].conditions) {
        o = document.createElement('option')
        o.value = product[0].conditions.indexOf(condition)
        o.className = 'p-10p bsbb'
        o.setAttribute('data-price',condition.newprice)
        o.innerHTML = `<div class="w-100 h-100 block verdana black">${condition.name}</div>`
        s[0].appendChild(o)
		}
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('.main-input'))
			let newprice,condition
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'newprice') {
				 newprice = input.value
			  }
			  if (input.id == 'condition') {
				condition = input.value
			 }
			}
			if(newprice != '' && condition != ''){
			  o = {
        product: product[0].prodid,
        conditions : [{price: newprice,condid: condition}],
				token: getdata('admin')
			  }
				l = {
				  mode: 'cors',
				  method: "POST",
				  body: JSON.stringify(o),
				  headers: {
					"content-type": "application/json",
					'accept': '*/*'
				}
			  }
			  r = await request('editprodpri',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		})
}
async function sheditproductform(product) {
  product = product[0]
  s = addshade();
  a = document.createElement('div')
	s.appendChild(a)
  a.className = "w-80 h-80 p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp"
  a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">edit product</span>
						</div>
						<div class="body w-100 h-90 ovys p-5p grid mt-10p">
            <div class="w-100 bsbb ovys p-10p">
            <div class="form-holder w-100 h-100">
              <form method="POST" action="" id="edit-product-form" name="edit-product-form">
                <div class="f-content w-100 h-100">
                  <div class="1st w-100 h-a p-5p">
                    <div class="title black bb-1-s-g p-5p">
                      <span class="fs-20p bold capitalize verdana">basic information</span>
                    </div>
                    <div class="w-100 h-a flex bblock-resp mb-30p">
                      <div class="w-50 parent mt-30p p-10p bsbb  p-r bfull-resp">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">product name</label>
                        <input type="text" id="name" name="product-name" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input" placeholder="" value="${product.pname}">	
                        <span class="p-a r-0 t-0 mr-20p mt-20p">
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                            <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#68D753"/>
                            <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                            <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                          </svg>
                        </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                      <div class="w-50 parent mt-30p p-10p bsbb  p-r bfull-resp">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">product quantity</label>
                        <input type="number" id="quantity" name="product-quantity" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input" placeholder="" value="${product.quantity}">	
                        <span class="p-a r-0 t-0 mr-20p mt-20p">
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                            <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#68D753"/>
                            <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                            <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                          </svg>
                        </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                    </div>
                    <div class="w-100 parent mt-30p p-10p bsbb bm-a-resp  p-r bfull-resp">
                      <textarea type="text" name="description" id="description" class=" black b-1-s-dgray consolas w-100 h-80p no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input" placeholder="description">${product.description}</textarea>
                      <span class="p-a r-0 t-0 mt-20p mr-20p">
                        <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                          <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                        </svg>
                        <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="10" fill="#68D753"/>
                          <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                          <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                        </svg>
                      </span>
                      <small class="red verdana left hidden ml-5p"></small>				
                    </div>
                    <div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
                      <div class="p-r w-170p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
                        <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
                        <label>
                          select images
                        </label>
                        </div>
                        <input type="file" name="image" placeholder="Thumbnail" class="p-a l-0 t-0 center hover-2 h-40p w-100 op-0">
                        <span class="p-a r-0 mt--37p mr-5p w-20p h-20p zi-10000">
                        <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                          <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                        </svg>
                        <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="10" fill="#68D753"/>
                          <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                          <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                        </svg>
                        </span>
                        <small class="red verdana hidden ml-5p">error mssg</small>
                        <div class="w-100 h-a bsbb mt-10p">
                        <div class="butt-hol">
                          <span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none litbuts" id="images">add images</span>
                        </div>
                      </div>
                      </div>
                      <div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
                        <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select images to preview them here</span></div>
                        
                      </div>
                    </div>
                  </div>
                  <div class="2nd w-100 h-a p-5p">
                    <div class="title black bb-1-s-g p-5p">
                      <span class="fs-20p bold capitalize verdana">other related informations</span>
                    </div>
                    <div class="w-100 flex p-10p bsbb b-p-0-resp bblock-resp">
                      <div class="w-100 parent p-10p bsbb p-r">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">category</label>
                          <select type="text" id="category" name="product-category" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
                            <option></option>
                          </select>
                          <span class="p-a r-0 t-0 mr-20p mt-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                      <div class="w-100 parent p-10p bsbb p-r">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">subcategory</label>
                          <select type="text" id="subcategory" name="product-subcategory" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
                            <option></option>
                          </select>
                          <span class="p-a r-0 t-0 mr-20p mt-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                      <div class="w-100 parent p-10p bsbb p-r">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">brand</label>
                        <select type="text" id="brand" name="product-brand" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
                          <option></option>
                        </select>
                        <span class="p-a r-0 t-0 mr-20p mt-20p">
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                            <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#68D753"/>
                            <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                            <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                          </svg>
                        </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                      <div class="w-100 parent p-10p bsbb p-r">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">serie</label>
                        <select type="text" id="serie" name="product-serie" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
                          <option></option>
                        </select>
                        <span class="p-a r-0 t-0 mr-20p mt-20p">
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                            <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#68D753"/>
                            <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                            <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                          </svg>
                        </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                      <div class="w-100 parent p-10p bsbb p-r">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">usability</label>
                        <select type="text" id="usability" name="product-usability" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
                          <option></option>
                        </select>
                        <span class="p-a r-0 t-0 mr-20p mt-20p">
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                            <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#68D753"/>
                            <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                            <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                          </svg>
                        </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                      <div class="w-100 parent p-10p bsbb p-r">
                        <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">availability</label>
                        <select type="text" id="availability" name="product-availability" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
                          <option></option>
                        </select>
                        <span class="p-a r-0 t-0 mr-20p mt-20p">
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                            <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                          </svg>
                          <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#68D753"/>
                            <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                            <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                          </svg>
                        </span>
                        <small class="red verdana left hidden ml-5p">error mssg</small>				
                      </div>
                    </div>
                    <div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
                      <div class="p-10p bsbb w-100">
                        <div class="w-100 parent p-10p bsbb p-r">
                          <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">specification name</label>
                          <input type="text" id="specification-name" name="specification-name" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p">
                          <span class="p-a r-0 t-0 mt-20p mr-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                          <small class="red verdana left hidden ml-5p">error mssg</small>				
                        </div>
                        <div class="w-100 parent p-10p bsbb p-r">
                          <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">specification value</label>
                          <input type="text" id="specification-value" name="specification-value" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p">
                          <span class="p-a r-0 t-0 mt-20p mr-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                          <small class="red verdana left hidden ml-5p">error mssg</small>				
                        </div>
                        <div class="w-100 h-a bsbb p-10p">
                          <div class="butt-hol">
                            <span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none litbuts" id="specifications" >add specification</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="p-r w-90  right h-100 parent p-10p bsbb bsbb bfull-resp">
                          <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="specifications">
                          <span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p 	capitalize">add specifications to preview them here</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="3rd w-100 h-a p-5p bsbb">
                    <div class="title black bb-1-s-g p-5p">
                      <span class="fs-20p bold capitalize verdana">prices and conditions</span>
                    </div>
                    <div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
                      <div>
                        <div class="w-100 parent p-10p bsbb p-r">
                          <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">condition name</label>
                          <input type="text" id="condition-name" name="condition-name" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p">
                          <span class="p-a r-0 t-0 mt-20p mr-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                          <small class="red verdana left hidden ml-5p">error mssg</small>				
                        </div>
                        <div class="w-100 parent p-10p bsbb p-r">
                          <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">condition price</label>
                          <input type="number" id="condition-price" name="condition-price" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p">
                          <span class="p-a r-0 t-0 mt-20p mr-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                          <small class="red verdana left hidden ml-5p">error mssg</small>				
                        </div>
                        <div class="w-100 h-a p-10p bsbb">
                          <div class="butt-hol">
                            <span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none litbuts" id="conditions">add condition</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="p-r w-90  right h-100 parent p-10p bsbb bsbb bfull-resp">
                        <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="conditions">
                        <span class="placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize bsbb">add conditions to preview them here</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="4th w-100 h-a p-5p bsbb">
                    <div class="title black bb-1-s-g p-5p">
                      <span class="fs-20p bold capitalize verdana">shipment and delivery info</span>
                    </div>
                    <div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
                      <div class="p-10p bsbb w-100">
                        <div class="w-100 parent p-10p bsbb p-r">
                          <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">shipment info name</label>
                          <input type="text" id="dinfo-name" name="dinfo-name" class="black b-1-s-dgray consolas w-100 no-outline bsbb p-10p mt--2p fs-15p br-2p">
                          <span class="p-a r-0 t-0 mt-20p mr-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                          <small class="red verdana left hidden ml-5p">error mssg</small>				
                        </div>
                        <div class="w-100 parent p-10p bsbb p-r">
                          <label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">shipment info value</label>
                          <input type="text" id="dinfo-value" name="dinfo-value" class="black b-1-s-dgray consolas w-100 no-outline bsbb p-10p mt--2p fs-15p br-2p">
                          <span class="p-a r-0 t-0 mt-20p mr-20p">
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000"/>
                              <path d="M11.0717 5.27273L10.8757 11.3281H9.12429L8.92827 5.27273H11.0717ZM9.99787 14.1236C9.69389 14.1236 9.43253 14.0156 9.21378 13.7997C8.99787 13.5838 8.88991 13.3224 8.88991 13.0156C8.88991 12.7145 8.99787 12.4574 9.21378 12.2443C9.43253 12.0284 9.69389 11.9205 9.99787 11.9205C10.2905 11.9205 10.5476 12.0284 10.7692 12.2443C10.9936 12.4574 11.1058 12.7145 11.1058 13.0156C11.1058 13.2202 11.0533 13.4062 10.9482 13.5739C10.8459 13.7415 10.7109 13.875 10.5433 13.9744C10.3786 14.0739 10.1967 14.1236 9.99787 14.1236Z" fill="white"/>
                            </svg>
                            <svg width="15" height="15" viewBox="0 0 20 20" class="hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#68D753"/>
                              <line x1="6.38765" y1="8.96481" x2="9.54712" y2="12.8401" stroke="white"/>
                              <line x1="8.80605" y1="12.7273" x2="14.8872" y2="6.64614" stroke="white"/>
                            </svg>
                          </span>
                          <small class="red verdana left hidden ml-5p">error mssg</small>				
                        </div>
                        <div class="w-100 h-a bsbb p-10p">
                          <div class="butt-hol">
                            <span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none litbuts" id="dinfo" >add shipment info</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="p-r w-90  right h-100 parent p-10p bsbb bsbb bfull-resp">
                          <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="dinfo">
                          <span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p 	capitalize">add required infos to preview them here</span>
                        </div>
                      </div>
                    </div>
                    <div class="buttons w-100 h-a mt-p p-10p bsbb ovh">
                      <div class="button-hol w-100 h-100 p-10p bsbb">
                        <button type="submit" class="b-none br-2p bc-theme white p-15p bsbb right verdana center hover-2 main-but">
                          <span class="fs-15p">edit the product</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
						</div>`
  f = a.querySelector('form#edit-product-form')
  let i = Array.from(f.querySelectorAll('input'))
  p = Array.from(f.querySelectorAll('div.previewpanel'));
  let litbuts = Array.from(f.querySelectorAll('span.litbuts'));
  litbuts.forEach(button=>{
      button.addEventListener('click',()=>{
          if(button.id == 'conditions'){
              p =  button.parentNode.parentNode.parentNode
              i = Array.from(p.querySelectorAll('input'));
              i.forEach(input=>{
                  (input.value == '')? setErrorFor(input,'') : setSuccessFor(input);
              })
              if(i[0].value != '' && i[1].value != ''){
                  v = p.parentElement.childNodes[3].childNodes[1]
                  d = {[i[0].value]: i[1].value}
                  i.forEach(input=>{
                      input.value = null;
                      setBlurFor(input)
                  })
                  ac(d,v)
              }
          }else if (button.id == 'specifications') {
              p =  button.parentNode.parentNode.parentNode
              i = Array.from(p.querySelectorAll('input'));
              i.forEach(input=>{
                  (input.value == '')? setErrorFor(input,'') : setSuccessFor(input);
              })
              if(i[0].value != '' && i[1].value != ''){
                  v = p.parentElement.childNodes[3].childNodes[1]
                  d = {[i[0].value]: i[1].value}
                  i.forEach(input=>{
                      input.value = null;
                      setBlurFor(input)
                  })
                  as(d,v)
              }
          
          }else if (button.id == 'dinfo') {
            p =  button.parentNode.parentNode.parentNode
            i = Array.from(p.querySelectorAll('input'));
            i.forEach(input=>{
                (input.value == '')? setErrorFor(input,'') : setSuccessFor(input);
            })
            if(i[0].value != '' && i[1].value != ''){
                v = p.parentElement.childNodes[3].childNodes[1]
                d = {[i[0].value]: i[1].value}
                i.forEach(input=>{
                    input.value = null;
                    setBlurFor(input)
                })
                as(d,v)
              }
            }else if (button.id == 'images') {
              p =  button.parentNode.parentNode.parentNode.parentNode
              i = Array.from(p.querySelectorAll('input'));
              i.forEach(inp=>{
                  if (inp.type == 'file' && inp.value == '') {
                      setErrorFor(inp,"choose an image");
                      return 0;
                    }else if (inp.type == 'file' && inp.value != '') {
                      d = checkFileType(inp)[0];
                      if (d == 'image') {
                        setSuccessFor(inp);
                        ai(inp,p.querySelector('div.previewpanel'))
                        return 1;
                      }else{
                        setErrorFor(inp,'only images are allowed')
                        return 0;
                      }
              
                    }
              })
          }
      })
  })

  for (const panel of p) {
    if (panel.title == 'images') {
       product.pimgs.forEach(async (image)=>{
        let img = document.createElement('img');
        img.src = geimgturl()+'/product-imgz/'+image
        img.addEventListener('load',()=>{
          ai(img,panel)
        })
       })
    }else if (panel.title == 'conditions') {
      product.conditions.forEach(condition=>{
        ac({[condition.name]:condition.newprice},panel)
      })
    }else if (panel.title == 'specifications') {
      Object.keys(product.pspecs).forEach(spec=>{
        as({[spec] : product.pspecs[spec]},panel)
      })
    }else if (panel.title == 'dinfo') {
      Object.keys(product.shipment_info).forEach(sinfo=>{
        as({[sinfo] : product.shipment_info[sinfo]},panel)
      })
    }

  }
  i.forEach(input=>{
    if (input.value != '') {
      setFocusFor(input)
    }
    input.addEventListener('focus',()=>{
      setFocusFor(input)
    })
    input.addEventListener('blur',()=>{
      if (input.value.trim() == '') {
        setBlurFor(input)
      }
    })
  })
  t= await request('tree',o)
  s = Array.from(a.querySelectorAll('select.main-input'))
    for (const select of s) {
      if (select.name == 'product-category') {
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.categories,s,product.catname,product.subcatname)
      }else if(select.name == 'product-brand'){
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.brands,s,product.brandname,product.famname)
      }else if(select.name == 'product-usability'){
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.usedin,s,product.usedinname)
      }else if(select.name == 'product-availability'){
        select.innerHTML = `<option></option>`
        setBlurFor(select)
        ats(select,t.message.availability,s,product.availability)
      }
    }
		f.addEventListener('submit',async (e)=>{
      e.preventDefault()
      i = Array.from(f.querySelectorAll('input.main-input'))
      t = Array.from(f.querySelectorAll('textarea.main-input'))
      s = Array.from(f.querySelectorAll('select.main-input'))
      t.forEach(textarea=>{
        i.push(textarea)
      })
      s.forEach(select=>{
        i.push(select)
      })
      p = Array.from(f.querySelectorAll('div.previewpanel'));
      let images,conditions,specifications,dinfos
      for (const panel of p) {
        if (panel.title == 'images') {
           images = getcips(panel)
        }else if (panel.title == 'conditions') {
          conditions = getcips(panel)
        }else if (panel.title == 'specifications') {
           specifications = getcips(panel)
        }else if (panel.title == 'dinfo') {
          dinfos = getcips(panel)
       }
      }
      let name,quantity,description,catid,subcatid,brandid,famid,usedin,availability
      for(const input of i){
        if (input.value == '') {
          setErrorFor(input,'this is a required field')
        }else(
          setSuccessFor(input)
        )
        if (input.id == 'name') {
           name = input.value
        }else if (input.id == 'quantity') {
          quantity = input.value
         
        }else if (input.id == 'description') {
           description = input.value
          
        }else if (input.id == 'category') {
           catid = input.value
          
        }else if (input.id == 'subcategory') {
           subcatid = input.value
          
        }else if (input.id == 'brand') {
           brandid = input.value
          
        }else if (input.id == 'serie') {
           famid = input.value
          
        }else if (input.id == 'usability') {
           usedin = input.value
          
        }else if (input.id == 'availability') {
           availability = input.value
          
        }
      }
      let info = dinfos
      // return console.log(info)
      if(name != '' && quantity != '' && description != '' && catid != '' && subcatid != '' && brandid != '' && famid != '' && usedin != '' && availability != '' && images.length > 0 && conditions.length > 0 && Object.keys(specifications).length > 0 && Object.keys(dinfos).length > 0){
        o = {
          prodinfo: {
            name: name,
            quantity: quantity,
            description: description,
            catid: catid,
            subcatid: subcatid,
            brandid: brandid,
            famid: famid,
            usedin: usedin,
            availability: availability,
            images: images,
            dinfos,
            conditions: conditions,
            specifications: specifications
          },
          product: product.prodid,
          token: getdata('admin')
        }
          l = {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(o),
            headers: {
              "content-type": "application/json",
              'accept': '*/*'
          }
        }
        addSpinner(f.querySelector('button.main-but'))
        r = await request('editprodinfo',l)
        removeSpinner(f.querySelector('button.main-but'))
        if (r.success) {
          alertMessage(r.message)
          f.reset()
        }else{
          alertMessage(r.message)
        }
      }else{
      }
    })
}
function showq(queryinfo) {
  s = addshade();
  c = document.createElement('div')
  c.className = `w-80 h-80 bc-white cntr br-5p card-6 b-mgc-resp`
  s.appendChild(c)
  c.innerHTML = `<div class="p-r w-100 h-100">
                  <div class="w-100 h-70p p-5p bsbb the-h bb-1-s-g">
                      <div class="w-100 h-100 p-20p bsbb">
                          <span class="verdana helvetica fs-20p capitalize">query information</span>
                      </div>
                  </div>
                  <div class="w-100 h-90 p-5p bsbb ovys">
                    <div class="w-a h-a p-20p bsbb">
                      <p class="verdana"><span class="fs-16p capitalize">full names</span></p>
                        <span class="w-100 h-a fs-16p bold consolas dgray capitalize nowrap">${queryinfo.fullname}</span>
                      <p class="verdana"><span class="fs-16p capitalize">requester's address</span></p>
                      <ul class="p-0 m-0 ls-none h-a">
                        <li class="w-100 p-5p bsbb flex">
                            <span class="w-100 h-a fs-16p bold verdana capitalize dgray">email : </span>
                            <span class="w-100 h-a fs-16p bold consolas dgray nowrap">${queryinfo.email}</span>
                        </li>
                        <li class="w-100 p-5p bsbb flex">
                            <span class="w-100 h-a fs-16p bold verdana capitalize dgray">Phone : </span>
                            <span class="w-100 h-a fs-16p bold consolas capitalize">${queryinfo.phone}</span>
                        </li>
                      </ul>
                      <p class="verdana"><span class="fs-16p capitalize">subject</span></p>
                        <span class="w-100 h-a fs-16p bold consolas capitalize">${queryinfo.subject}</span>
                      <p class="verdana"><span class="fs-16p capitalize">message</span></p>
                        <span class="w-100 h-a fs-16p bold consolas capitalize">${queryinfo.message}</span>
                      <p class="verdana"><span class="fs-16p capitalize">date added</span></p>
                        <span class="w-100 h-a fs-16p bold consolas capitalize nowrap">${queryinfo.dateadded}</span>
                  </div>
                </div>
                  `
}
export async function ai(input,parent) {
  let p = parent.querySelector('span.placeholder')
  if (p) {
      deletechild(p,parent)
  }
  s = (input.classList.length == 0) ? await givePreview(input) : await showPreview(input);
  (input.classList.length > 0) ? input.value = null : null;
  if (s == 'data:,') {
    return
  }
  c = document.createElement('span')
  c.className = 'w-60p h-60p b-1-s-gray br-2p m-5p iblock chip p-r';
  r = document.createElement('div');
  r.className = "w-20p h-20p p-a bc-white remove b-1-s-gray center br-50 hover t-0 r-0 mr--10p mt--5p"
  r.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><line fill="none" stroke="#000" stroke-width="1" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"></line></g><g><line fill="none" stroke="#000" stroke-width="1" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"></line></g></svg>`
  c.innerHTML = `<span class="p-5p block h-100 w-100 bsbb p-r"><img src="${s}" class="w-100 h-100 contain"></span> `
  c.appendChild(r)
  parent.appendChild(c)
  k = getcips(parent)
  r = Array.from(document.querySelectorAll('div.remove'));
  r.forEach(remove=>{
      remove.addEventListener('click',e=>{
          e.preventDefault();
          try {
          deletechild(remove.parentNode,parent)
          l = Array.from(parent.querySelectorAll('span.chip'))
          if(l.length == 0){
              parent.innerHTML = `<span class="placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize bsbb">add conditions to preview them here</span>`
          }
          } catch (error) {
              console.log(error)
          }
      })
  })
}
export function ac(info,parent) {
  p = parent.querySelector('span.placeholder')
  if (p) {
      deletechild(p,parent)
  }
  c = document.createElement('span')
  c.className = 'w-a h-20p b-1-s-gray br-2p p-5p m-5p fs-13p iblock chip verdana dgray consolas ';
  r = document.createElement('div');
  r.className = "w-20p h-20p p-r right bc-white remove mb-5p ml-5p  b-1-s-gray center br-50 hover"
  r.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><line fill="none" stroke="#000" stroke-width="1" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"></line></g><g><line fill="none" stroke="#000" stroke-width="1" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"></line></g></svg>`
  c.innerHTML = `<span class="p-5p bsbb consolas ${cc(Object.keys(info)[0])} fs-12p">${Object.keys(info)[0]}</span> : <span class="p-5p bsbb consolas black fs-12p">${adcm(info[Object.keys(info)[0]])}</span> RWF`
  c.appendChild(r)
  let found = 0
  for(const chip of parent.childNodes){
      if (chip) {
          t = chip.childNodes[0]
          if (t && t.textContent == Object.keys(info)[0]) {
           found = 1
          }
      }
  }
  (!found)? parent.appendChild(c): null
  d = getcips(parent)
  r = Array.from(document.querySelectorAll('div.remove'));
  r.forEach(remove=>{
      remove.addEventListener('click',e=>{
          e.preventDefault();
          try {
              deletechild(remove.parentNode,parent)
              l = Array.from(parent.querySelectorAll('span.chip'))
              if(l.length == 0){
                  parent.innerHTML = `<span class="placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize bsbb">add conditions to preview them here</span>`
          }
          } catch (error) {
              console.log(error)
          }
          
      })
  })
}
export function as(info,parent) {
  let p = parent.querySelector('span.placeholder')
  if (p) {
      deletechild(p,parent)
  }
  c = document.createElement('span')
  c.className = 'w-a h-20p b-1-s-gray br-2p p-5p m-5p fs-13p iblock chip verdana dgray consolas ';
  r = document.createElement('div');
  r.className = "w-20p h-20p p-r right bc-white remove mb-5p ml-5p  b-1-s-gray center br-50 hover"
  r.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><line fill="none" stroke="#000" stroke-width="1" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"></line></g><g><line fill="none" stroke="#000" stroke-width="1" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"></line></g></svg>`
  c.innerHTML = `<span class="p-5p bsbb consolas black fs-12p">${Object.keys(info)[0]}</span> : <span class="p-5p bsbb consolas dgray fs-12p">${info[Object.keys(info)[0]]}</span> `
  c.appendChild(r)
  let found = 0
  for(const chip of parent.childNodes){
      if (chip) {
          t = chip.childNodes[0]
          if (t && t.textContent == Object.keys(info)[0]) {
           found = 1  
          }
      }
  }
  (!found)? parent.appendChild(c): null
  d = getcips(parent)
  r = Array.from(document.querySelectorAll('div.remove'));
  r.forEach(remove=>{
      remove.addEventListener('click',e=>{
          e.preventDefault();
          try {
          deletechild(remove.parentNode,parent)
          l = Array.from(parent.querySelectorAll('span.chip'))
          if(l.length == 0){
              parent.innerHTML = `<span class="placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize bsbb">add conditions to preview them here</span>`
          }
          } catch (error) {
              console.log(error)
          }
          
      })
  })
}
async function refreshtoken(params) {
  g= getschema
  localStorage.removeItem('tree')
  localStorage.removeItem('getpinned')
  localStorage.removeItem('getprods')
  
}