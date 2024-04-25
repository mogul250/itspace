import {hide} from './functions.js'
import {show} from './functions.js'
import {i} from './prods.js'
var _scl = Array.from(document.querySelectorAll('div.scroll-but-left'));
var _scr = Array.from(document.querySelectorAll('div.scroll-but-right'));
let a = Array(_scl,_scr)

if (_scl.length > 0 && _scr.length > 0) {
	_scl.forEach(scroll_l=>{
		scroll_l.addEventListener('click', e=>{
			e.preventDefault();
			let currentDiv = scroll_l.parentNode.parentNode.parentNode.parentNode.childNodes[3];
			let currentSpos = currentDiv.scrollLeft;
			let m = parseInt(window.getComputedStyle(scroll_l.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]).marginLeft)+parseInt(window.getComputedStyle(scroll_l.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]).marginRight);
			currentDiv.scrollLeft = currentSpos - (scroll_l.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].clientWidth+m);
			currentSpos = currentDiv.scrollLeft;
		})
		// scroll_l.addEventListener('xxx', e=>{
		// 	// e.preventDefault();
		// 	// currentDiv = scroll_l.parentNode.parentNode.parentNode.parentNode.childNodes[3];
		// 	// currentSpos = currentDiv.scrollLeft;
		// 	// currentDiv.scrollLeft = currentSpos - 250;
		// 	// currentSpos = currentDiv.scrollLeft;
		// 	console.log("vv")
		// })

	})
	_scr.forEach(scroll_r=>{
		scroll_r.addEventListener('click', e=>{
			e.preventDefault();
			let currentDiv = scroll_r.parentNode.parentNode.parentNode.parentNode.childNodes[3];
			let currentSpos = currentDiv.scrollLeft;
			let m = parseInt(window.getComputedStyle(scroll_r.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]).marginLeft)+parseInt(window.getComputedStyle(scroll_r.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]).marginRight);
			currentDiv.scrollLeft = currentSpos + scroll_r.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].clientWidth+m;
			currentSpos = currentDiv.scrollLeft;
			
		})
	})
}
// var prevScrollpos = window.pageYOffset;
// div.addEventListener('scroll',e=>{
// 	e.preventDefault();
// 	var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos < currentScrollPos) {
//     div.style.backgroundColor = "red";
//   } else {
//     div.style.backgroundColor = "blue";
//   }
//   console.log(prevScrollpos,currentScrollPos);
//   prevScrollpos = currentScrollPos;
// })
