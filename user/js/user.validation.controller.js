import { getdata, geturl, initiatelogin } from "../../js/functions.js";
let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
u = getdata('user')
localStorage.setItem('next',geturl()+'/user/')
if (!u) {
    initiatelogin();
}