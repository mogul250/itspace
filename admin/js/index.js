
import {setFocusFor,setBlurFor,validateForm} from '../../js/functions.js'


var loginForm = document.getElementById('login-form');

var sCard = document.createElement("div");
let home = document.getElementById('home');

loginForm.addEventListener('submit',e=>{
  e.preventDefault();
  var ins = Array.from(loginForm.querySelectorAll('input'));

  validateForm(loginForm,ins,null); 
})

var input = Array.from(document.getElementsByTagName('input'));

input.forEach(e=>{
	if (e.value.trim() != "") {
		setFocusFor(e)
	}
	e.addEventListener('focus',f=>{
		setFocusFor(e)
	})
	e.addEventListener('blur',f=>{
		if(e.value == ''){
			setBlurFor(e);
		}
	})
})
