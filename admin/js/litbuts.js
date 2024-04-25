let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
import {ellipsis,checkFileType,showPreview,setSuccessFor,setErrorFor,deletechild, setBlurFor,cc, adcm, rs,getcips,ai,as,ac} from '../../js/functions.js'
let litbuts = Array.from(document.querySelectorAll('span.litbuts'));
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


