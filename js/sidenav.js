import {geturl, showsidemenu} from './functions.js'
import {menubutt} from './navigation.js'
import {thecont} from './navigation.js'

export let sidenav = document.createElement('div')
thecont.appendChild(sidenav)
sidenav.className = '#sidenav w-300p h-100 pt-100p bsbb p-f bc-white zi-50 b-1-s-dgray sidenav tr-0-3 ml--100 bw-100-500-resp t-0';
sidenav.innerHTML = `<div class="w-100 h-100 ovys #thebody">
  <div class="w-100 h-a thesidenavdata pt-5p bsbb">
      <ul class="w-100 ls-none p-0 m-0 the-sidenav-pinned">
        <li class="#thetitle h-40p bc-white p-r">
          <div class="w-100 h-100 p-10p bsbb">
            <span class="thetitle black bold verdana fs-16p bc-white w-100">
              Browse
            </span>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-120p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-90p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-96p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-75p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-100p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-89p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <div class="thetitle black verdana fs-14p pl-10p bsbb w-122p h-20p bc-gray skel br-5p">
              
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-100 h-a ovh thesidenavfooter">
      <ul class="w-100 ls-none p-0 m-0">
        <li class="#thetitle h-40p">
          <div class="w-100 h-100 p-10p bsbb">
            <span class="thetitle black bold verdana fs-16p">
              Account
            </span>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
            <a href="${geturl()}/user/" class="td-none  ls-n">
              <span class="thetitle black verdana fs-14p pl-10p bsbb capitalize hover-6">
                my account
              </span>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-100 h-a ovh thesidenavfooter">
      <ul class="w-100 ls-none p-0 m-0">
        <li class="#thetitle h-40p">
          <div class="w-100 h-100 p-10p bsbb">
            <span class="thetitle black bold verdana fs-16p">
              References
            </span>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
              <a href="${geturl()}/" class="td-none  ls-n">
                <span class="thetitle black verdana fs-14p pl-10p bsbb capitalize hover-6">
                  home
                </span>
              </a>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
              <a href="${geturl()}/about/" class="td-none  ls-n">
                <span class="thetitle black verdana fs-14p pl-10p bsbb capitalize hover-6">
                  about us
                </span>
              </a>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
              <a href="${geturl()}/contact/" class="td-none  ls-n">
                <span class="thetitle black verdana fs-14p pl-10p bsbb capitalize hover-6">
                  contact us
                </span>
              </a>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb bb-1-s-g hover-2">
              <a href="${geturl()}/terms/" class="td-none  ls-n">
                <span class="thetitle black verdana fs-14p pl-10p bsbb capitalize hover-6">
                 policy
                </span>
              </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-100 h-a ovh thesidenavfooter">
      <ul class="w-100 ls-none p-0 m-0">
        <li class="#thetitle h-40p">
          <div class="w-100 h-100 p-10p bsbb">
            <span class="thetitle black bold verdana fs-16p">
              About
            </span>
          </div>
        </li>
        <li class="#thetitle p-5p bsbb">
          <div class="w-100 h-100 p-10p bsbb hover-2 center">
            <span class="thetitle black verdana bsbb dgray">
              <span class="fs-10p">
                &copy; ${new Date().getFullYear()} IT SPACE 
              </span>
              <span class="fs-18p p-5p bsbb ta-c">
                .
              </span>
              <span class="fs-10p">
                about us 
              </span>
              <span class="fs-18p p-5p bsbb ta-c">
                .
              </span>
              <span class="fs-10p">
                help
              </span>
            </span>
          </div>
        </li>
      </ul>
  </div>
</div>`
menubutt.addEventListener('click',e=>{
  e.preventDefault();
  showsidemenu();
})
