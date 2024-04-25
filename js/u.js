var input = Array.from(document.getElementsByTagName('input'));
var select = Array.from(document.getElementsByTagName('select'));

input.forEach(e=>{
	e.addEventListener('focus',f=>{
		var parent = e.parentNode;
		parent.classList.add('focus');
	})
})
input.forEach(e=>{
	e.addEventListener('blur',f=>{
		var parent = e.parentNode;
		if(e.value == ''){
			parent.classList.remove('focus');
		}
	})
})
if (select != undefined) {
	select.forEach(e=>{
	e.addEventListener('focus',f=>{
		var parent = e.parentNode;
		parent.classList.add('focus');
	})
	})
	select.forEach(e=>{
		e.addEventListener('blur',f=>{
			var parent = e.parentNode;
			if(e.value == ''){
				parent.classList.remove('focus');
			}
		})
	})
	console.log(select);
}else{
	console.log('error');
}