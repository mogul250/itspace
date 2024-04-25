import { addSpinner, alertMessage, checkEmpty, postschema, removeSpinner, request } from "./functions.js";

((ele) =>{
    let f = document.querySelector('form'),inp = f.querySelector('input'),v,e
    f.onsubmit = async function (event) {
        event.preventDefault();
        v = checkEmpty(inp)
        if (v) {
            e = inp.value.trim();
            addSpinner(this.querySelector('button'))
            postschema.body = JSON.stringify({
                email: e
            })
            let response = await request('gntrrstlnk',postschema)
            removeSpinner(this.querySelector('button'))
            f.reset()
            alertMessage(response.message.content)

        }
    }

})()