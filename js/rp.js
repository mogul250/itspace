import { addSpinner, alertMessage, checkEmpty, getPath, postschema, removeSpinner, request, setErrorFor } from "./functions.js";

((ele) =>{
    let f = document.querySelector('form'),pass = f.querySelector('input[name="password"]'),conf = f.querySelector('input[name="confirm-password"]'),v,e;
    f.onsubmit = async function (event) {
        event.preventDefault();
        v = checkEmpty(pass)
        e = checkEmpty(conf)
        if (v && e) {
            if (pass.value != conf.value) {
                return setErrorFor(pass,"passwords do not match")
            }
            addSpinner(this.querySelector('button'))
            postschema.body = JSON.stringify({
                password : pass.value,
                token: getPath(1)
            })
            let response = await request('rstpsswrd',postschema)
            removeSpinner(this.querySelector('button'))
            alertMessage(response.message)
        }
    }

})()