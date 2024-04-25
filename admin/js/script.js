var activepg,dec,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
import {chagecontent,validateForm,geturl,setSuccessFor,setErrorFor,getParam,vdtemail, addshade,getcips,getschema,checkFileType,getdata,request,alertMessage, setFocusFor,setBlurFor, showcontent,ai, postschema} from '../../js/functions.js'
var signup_form = document.getElementById('signup-form');
var editadminform = document.getElementById('myaccount-form');

localStorage.setItem('next',`${geturl()}/admin/dashboard`)
var titles = Array.from(document.querySelectorAll('li.titles'));
let menuBut = document.querySelector('span.menu-icon');
var linkSwitcher = Array.from(document.querySelectorAll('li.linkSwitcher'));
var pagesection = Array.from(document.querySelectorAll('div.pagecontentsection'));
var input = Array.from(document.getElementsByTagName('input'));
let sidenav = document.querySelector('div.sidenav');
let pages = new Array('home','add-product','view-products','orders','log','add-discount','add-user','users','categories','sub-categories','brands','series','availability','usability','new-orders','pending-orders','delivered-orders','new-queries','queries');
let textarea = Array.from(document.getElementsByTagName('textarea'))
let select = Array.from(document.getElementsByTagName('select'))
textarea.forEach(elem=>{
	input.push(elem)
})
select.forEach(elem=>{
	input.push(elem)
})

// ======================================================= FOR TOGGLING THE MENU ==============================================



menuBut.addEventListener('click',()=>{
	(sidenav.classList.contains('hidden-resp'))? sidenav.classList.remove('hidden-resp'): sidenav.classList.add('hidden-resp')
})

// ======================================================= FOR GETTING THE REQUESTED PAGE ==============================================

a = getParam('page')
if(a != null){
	pages.forEach(target=>{
		if (a == target) {
			t = target
		}
	})
	if(t){
		v = document.querySelector('div.active');
		p = document.querySelector(`div#${t}`);
		(v!=p)? chagecontent(p,v) : showcontent(null,p)
	}else{
		window.history.pushState('','','?page=home')
		p = document.querySelector(`div#home`);
		showcontent(null,p)
	}
}else{
	window.history.pushState('','','?page=home')
	p = document.querySelector(`div#home`);
		showcontent(null,p)
}

// ======================================================= FOR LINK SWITCHERS IN THE SIDENAV ==============================================



linkSwitcher.forEach(e=>{
	e.addEventListener('click',d=>{
		d.preventDefault();
		if (e.id == 'logout') {
			localStorage.removeItem('admin')
			window.location.replace(`${geturl()}/admin/`) 
		}
		pagesection.forEach(pgsec=>{
			if (pgsec.id == e.id) {
				let activepg = document.querySelector('div.active');
				if (activepg != pgsec) {
					chagecontent(pgsec,activepg);
				}
			}
		})

	})
})

titles.forEach(ttl=>{
	ttl.addEventListener('click',e=>{
		e.preventDefault();
		var c = ttl.childNodes;
		if (c.length != 3) {
			if (c[3].classList.contains('hidden')) {
				c[3].classList.remove('hidden');
				ttl.classList.add('expand');

			}else{
				c[3].classList.add('hidden');
				ttl.classList.remove('expand');
			}
		}
	})
})




// ======================================================= FOR FOCUSES ==============================================


// inputs

input.forEach(e=>{
	e.addEventListener('focus',f=>{
		var parent = e.parentNode;
		var placeholder = parent.childNodes[5];
		if (parent.childNodes.length > 5) {
			placeholder.classList.remove('hidden');
		}
		parent.classList.add('focus');
	})
	e.addEventListener('keyup',(c)=>{
		if (e.id == 'emailsignup') {			
			vdtemail(e.value,e);
		}
	})
})
input.forEach(e=>{
	e.addEventListener('blur',f=>{
		var parent = e.parentNode;
		var placeholder = parent.childNodes[5];
		if(e.value == ''){
			if (parent.childNodes.length > 5) {
				placeholder.classList.add('hidden');
			}
			parent.classList.remove('focus');
		}
	})
})


// ======================================================= FOR FORM SUBMITION ==============================================


signup_form.addEventListener('submit',e=>{
	e.preventDefault();
	var ins = Array.from(signup_form.querySelectorAll('input'));
    let data = {};
       ins.forEach(inputs=>{
          Object.assign(data,{ [inputs.name]:inputs.value.trim()});
        })
	validateForm(signup_form,ins,data); 
  })
  editadminform.addEventListener('submit',async e=>{
	e.preventDefault();
	var ins = Array.from(editadminform.querySelectorAll('input'));
    let data = {};
       ins.forEach(inputs=>{
          Object.assign(data,{ [inputs.name]:inputs.value.trim()});
        })
		Object.assign(data,{ token: getdata('admin')});
	o = postschema
	postschema.body = JSON.stringify(data)
	r = await request('editadmin',o)
	if (!r.success) return 0
	alertMessage(r.message)
  })

// ===========================================================	ADDING EVENTS ON ADDPARENT BUTTONS =======================================
let addparentbutton = Array.from(document.querySelectorAll('button.addparentbutton'));
for (const button of addparentbutton) {
	button.addEventListener('click',e=>{
		e.preventDefault()
		addparentfunc(button.getAttribute('data-type'))
	})
}
async function addparentfunc(type) {
	s = addshade()
	a = document.createElement('div')
	s.appendChild(a)
	if (type == 'categories') {
		a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
		a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a category</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-category-form" name="add-category-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="p-r w-100 igrid mr-10p left parent">
										<input type="text" name="name" placeholder="Category name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name">
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
										<small class="red verdana hidden ml-5p">error mssg</small>
									</div>
								</div>
								<div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
									<div class="p-r w-200p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
									  <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
										<label>
											select an image
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
											<span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none virtualitbut nowrap" id="images">Add an image</span>
										</div>
									</div>
									</div>
									<div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
									  <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select an image to preview it here</span></div>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">add category</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
							</form>
						</div>`
		f = a.querySelector('form#add-category-form')
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('input.main-input'))
			s = Array.from(f.querySelectorAll('select.main-input'))
			s.forEach(select=>{
			  i.push(select)
			})
			p = Array.from(f.querySelectorAll('div.previewpanel'));
			let images
			for (const panel of p) {
			  if (panel.title == 'images') {
				 images = getcips(panel)
			  }
			}
			let name
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'name') {
				 name = input.value
			  }
			}
			if(name != '' && images.length > 0){
			  o = {
				name: name,
				image: images,
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
			  r = await request('addcategory',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		  })
	}else if(type == 'subcategories'){
		a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
		a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a subcategory</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-subcategory-form" name="add-subcategory-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="w-100 parent bsbb p-r">
										<label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">category</label>
										<select type="text" id="category" name="product-category" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
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
									<div class="p-r w-100 igrid mr-10p left parent">
										<input type="text" name="name" placeholder="Subcategory name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name">
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
										<small class="red verdana hidden ml-5p">error mssg</small>
									</div>
								</div>
								<div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
									<div class="p-r w-200p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
									  <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
										<label>
											select an image
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
											<span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none virtualitbut nowrap" id="images">Add an image</span>
										</div>
									</div>
									</div>
									<div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
									  <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select an image to preview it here</span></div>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">add subcategory</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
							</form>
						</div>`
		f = a.querySelector('form#add-subcategory-form')
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
		})
		o = getschema
		t= await request('tree',o)
		if (!t.success) {
			return 0
		}
		for (const category of t.message.categories) {
			o = document.createElement('option')
			o.value = category.id
			o.className = 'p-10p bsbb'
			o.innerHTML = `<div class="w-100 h-100 block verdana black">${category.name}</div>`
			s[0].appendChild(o)
		}
		
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('input.main-input'))
			p = Array.from(f.querySelectorAll('div.previewpanel'))
			s.forEach(select=>{
				i.push(select)
			})
			let images
			for (const panel of p) {
			  if (panel.title == 'images') {
				 images = getcips(panel)
			  }
			}
			let name,category
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'name') {
				 name = input.value
			  }
			  if (input.id == 'category') {
				category = input.value
			 }
			}
			if(name != '' && images.length > 0 && category != ''){
			  o = {
				name: name,
				catid: category,
				image: images,
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
			  r = await request('addsubcategory',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		})
	}else if (type == 'brands') {
		a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
		a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a brand</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-brand-form" name="add-brand-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="p-r w-100 igrid mr-10p left parent">
										<input type="text" name="name" placeholder="Brand name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name">
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
										<small class="red verdana hidden ml-5p">error mssg</small>
									</div>
								</div>
								<div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
									<div class="p-r w-200p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
									  <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
										<label>
											select an image
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
											<span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none virtualitbut nowrap" id="images">Add an image</span>
										</div>
									</div>
									</div>
									<div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
									  <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select an image to preview it here</span></div>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">add brand</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
							</form>
						</div>`
		f = a.querySelector('form#add-brand-form')
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('input.main-input'))
			s = Array.from(f.querySelectorAll('select.main-input'))
			s.forEach(select=>{
			  i.push(select)
			})
			p = Array.from(f.querySelectorAll('div.previewpanel'));
			let images
			for (const panel of p) {
			  if (panel.title == 'images') {
				 images = getcips(panel)
			  }
			}
			let name
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'name') {
				 name = input.value
			  }
			}
			if(name != '' && images.length > 0){
			  o = {
				name: name,
				image: images,
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
			  r = await request('addbrand',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		  })
	}else if(type == 'families'){
		a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
		a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a series</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-series-form" name="add-series-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="w-100 parent bsbb p-r">
										<label class="dgray p-a fs-13p label pi-none capitalize us-none zi-1000 verdana">brand</label>
										<select type="text" id="brand" name="product-brand" class="black b-1-s-dgray consolas w-100 no-outline center bsbb p-10p mt--2p fs-15p br-2p main-input">
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
									<div class="p-r w-100 igrid mr-10p left parent">
										<input type="text" name="name" placeholder="Series name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name">
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
										<small class="red verdana hidden ml-5p">error mssg</small>
									</div>
								</div>
								<div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
									<div class="p-r w-200p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
									  <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
										<label>
											select an image
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
											<span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none virtualitbut nowrap" id="images">Add an image</span>
										</div>
									</div>
									</div>
									<div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
									  <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select an image to preview it here</span></div>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">add Series</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
							</form>
						</div>`
		f = a.querySelector('form#add-series-form')
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
		})
		o = getschema
		t= await request('tree',o)
		if (!t.success) {
			return 0
		}
		for (const brand of t.message.brands) {
			o = document.createElement('option')
			o.value = brand.id
			o.className = 'p-10p bsbb'
			o.innerHTML = `<div class="w-100 h-100 block verdana black">${brand.name}</div>`
			s[0].appendChild(o)
		}
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('input.main-input'))
			p = Array.from(f.querySelectorAll('div.previewpanel'))
			s.forEach(select=>{
				i.push(select)
			})
			let images
			for (const panel of p) {
			  if (panel.title == 'images') {
				 images = getcips(panel)
			  }
			}
			let name,brand
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'name') {
				 name = input.value
			  }
			  if (input.id == 'brand') {
				brand = input.value
			 }
			}
			if(name != '' && images.length > 0 && brand != ''){
			  o = {
				fname: name,
				brandname: brand,
				image: images,
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
			  r = await request('addfamily',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		})
	}else if (type == 'usedin') {
		a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
		a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add a usability</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-usedin-form" name="add-usedin-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="p-r w-100 igrid mr-10p left parent">
										<input type="text" name="name" placeholder="Usability name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name">
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
										<small class="red verdana hidden ml-5p">error mssg</small>
									</div>
								</div>
								<div class="w-100 h-a mt-10p mb-10p p-10p bsbb flex bblock-resp">
									<div class="p-r w-200p  mr-10p mt-10p left parent ovh h-100 bfull-resp">
									  <div class="p-10p no-outline bsbb b-1-s-dgray bc-white w-100 h-40p hover-2 dgray capitalize fs-14p consolas nowrap p-r mb-10p">
										<label>
											select an image
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
											<span class="w-100 p-10p bsbb h-a verdana bc-orange white center hover-2 us-none virtualitbut nowrap" id="images">Add an image</span>
										</div>
									</div>
									</div>
									<div class="p-r w-90  right h-100 parent p-10p bsbb bfull-resp">
									  <div class="no-outline previewpanel bsbb b-1-s-dgray bc-white w-100 h-a left" title="images"><span class="bsbb placeholder w-100 h-100p p-10p center verdana dgray fs-13p capitalize" name="images">select an image to preview it here</span></div>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">add usability</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
							</form>
						</div>`
		f = a.querySelector('form#add-usedin-form')
		f.addEventListener('submit',async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('input.main-input'))
			s = Array.from(f.querySelectorAll('select.main-input'))
			s.forEach(select=>{
			  i.push(select)
			})
			p = Array.from(f.querySelectorAll('div.previewpanel'));
			let images
			for (const panel of p) {
			  if (panel.title == 'images') {
				 images = getcips(panel)
			  }
			}
			let name
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'name') {
				 name = input.value
			  }
			}
			if(name != '' && images.length > 0){
			  o = {
				name: name,
				image: images,
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
			  r = await request('addusedin',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		  })
	}else if (type == 'availability') {
		a.className = "w-500p h-a p-20p bsbb bc-white cntr zi-10000 br-5p b-mgc-resp" 
		a.innerHTML = `<div class="head w-100 h-40p p-5p bsbb bb-1-s-dg">
							<span class="fs-18p black capitalize igrid center h-100 verdana">add an availability</span>
						</div>
						<div class="body w-100 h-a p-5p grid mt-10p">
							<form method="post" id="add-availability-form" name="add-availability-form">
								<div class="w-100 h-60p mt-10p mb-10p p-10p bsbb">
									<div class="p-r w-100 igrid mr-10p left parent">
										<input type="text" name="name" placeholder="Availability name" class="p-10p no-outline bsbb b-1-s-dgray bc-white main-input" id="name">
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
										<small class="red verdana hidden ml-5p">error mssg</small>
									</div>
								</div>
								<div class="w-a  h-60p mt-10p p-r right mb-10p p-10p bsbb">
                                    <div class="w-100 igrid">
                                        <span class="center iblock">
                                            <button type="submit" class="bc-theme br-2p hover-2 p-10p b-none w-100">
                                                <span class="verdana white fs-15p capitalize">add availability</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
							</form>
						</div>`
		f = a.querySelector('form#add-availability-form')
		f.onsubmit = async (e)=>{
			e.preventDefault()
			i = Array.from(f.querySelectorAll('input.main-input'))
			let name
			for(const input of i){
			  if (input.value == '') {
				setErrorFor(input,'this is a required field')
			  }else(
				setSuccessFor(input)
			  )
			  if (input.id == 'name') {
				 name = input.value
			  }
			}
			if(name != ''){
			  o = {
				name: name,
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
			  r = await request('addavailability',l)
			  if (r.success) {
				alertMessage(r.message)
				f.reset()
			  }else{
				alertMessage(r.message)
			  }
			}else{
			}
		  }
	}
	let litbuts = Array.from(a.querySelectorAll('span.virtualitbut'));
	litbuts.forEach(button=>{
		button.onclick = ()=>{
			 if (button.id == 'images') {
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
		}
	})
}