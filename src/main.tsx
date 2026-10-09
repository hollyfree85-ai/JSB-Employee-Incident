import Install from './install';
import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Board from './board';import Login from './login';import {hasSession,clearSession} from './api';import './globals.css';
function App(){const [signed,setSigned]=useState(hasSession);useEffect(()=>{const signin=()=>setSigned(hasSession());const signout=()=>{clearSession();setSigned(false)};window.addEventListener('jsb-signin',signin);window.addEventListener('jsb-signout',signout);const timer=setInterval(()=>{if(!hasSession())setSigned(false)},60000);return()=>{clearInterval(timer);window.removeEventListener('jsb-signin',signin);window.removeEventListener('jsb-signout',signout)}},[]);return <><Install/>{signed?<Board/>:<Login/>}</>}createRoot(document.getElementById('root')!).render(<App/>);

if('serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('/JSB-Employee-Incident/sw.js',{scope:'/JSB-Employee-Incident/'}).catch(()=>{})});
