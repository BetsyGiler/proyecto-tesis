import React from "https://esm.sh/react";

import {renderToString} from "https://esm.sh/react-dom/server";

import { serve } from "https://deno.land/std@0.152.0/http/server.ts";


export default function App({pathname}){
   return (
      <>
         <style dangerouslySetInnerHTML={{__html: `
            body {
               front-family: system-ui;
               display: grid;
               place-content:center;
               heght: 100vh;
               margin: 0;
            }
         `}}>
         </style>
         {
            pathname == '/login' && <form> <imput placeholder = 'login'/ > </form>
         }
         {
            pathname == '/' && <>
               <h1> Hola Mundo Cruel!</h1>
               <button>Hola ... Junior!</button> 
            </>  
         }
          
      </>
   )
}
   
serve (req => {

   const { url } = req;

   const {pathname} = new URL('url')
   
   const app = renderToString(<App pathname = {pathname} />)   

   return new Response(app, {
      headers:{
         'content-type': 'text/html;charset=utf_8'
      }
   })
}, {port: 8000})
