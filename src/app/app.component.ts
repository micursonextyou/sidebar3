import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'sidebar6';
   ngOnInit(): void {
   //this.deleteCoockie("layout");
   //this.deleteCoockie("mode");
   //this.deleteCoockie("labelColor");
   this.loadVisual();
   this.contolSideBar();
   
  
    
  }
  contolSideBar(){
    const btnMenu=document.getElementById("btnMenu");
    const btnVisuales=document.getElementById("btnVisuales");
    const btnCloseVisuales=document.getElementById("btnCloseVisuales");
    const modo=document.getElementById("btnModo") as HTMLInputElement | null;
    
    
    
    const sidebar=document.querySelector(".sidebar");
    const configvisuales=document.querySelector(".config-visuales");
    const li=document.getElementsByTagName("li");
    // TODO: contola el despiegue del menu y visuales
    btnMenu?.addEventListener("click",()=>{
      sidebar?.classList.toggle("active");
    });
    btnVisuales?.addEventListener("click",()=>{
      configvisuales?.classList.add("active");
    });
    btnCloseVisuales?.addEventListener("click",()=>{
      configvisuales?.classList.remove("active");
    });
   
      
    // TODO:  recoremos los li verificando si tiene submenu cuenta con uno lo despliga si no agraga la clase activa    
    for(let i=0;i<li.length;i++){      
      li[i].childNodes[0].addEventListener("click",()=>{       
          if(!li[i].classList.contains("submenu-conteiner")){               
            for(let i=0;i<li.length;i++){
              li[i].children[0].classList.remove("active");
            }
            li[i].children[0].classList.add("active");
          }else{
            for(let i=0;i<li.length;i++){
              li[i].children[0].classList.remove("active");
            }
            li[i].children[0].children[2].classList.toggle("open");
            li[i].children[1].classList.toggle("collapse");
          }
      });
    }
    // TODO: cambiamos modos
    modo?.addEventListener("change",()=>{   
      let body=document.getElementsByTagName("body")[0];
      body.classList.toggle("dark");
      sidebar?.classList.toggle("dark-mode");
      configvisuales?.classList.toggle("dark-mode");
      if(!body.classList.contains("dark")){
        this.setCookie("layout","");
        this.setCookie("mode","");
        
      }else{
        this.setCookie("layout","dark");
        this.setCookie("mode","dark-mode");
       
      }
    });
      
  }
  
  setCookie(nombre:string,valor:string){
    let d=new Date();
    d.setTime(d.getTime()+5*24*60*60*1000);
    let caduca="expires="+d.toUTCString()+";";
    document.cookie=nombre+"="+valor+";"+ caduca +"path=/;";    
  }
  getCookie(nombre:string){
    let nom=nombre+"=";
    let arrayCookie=document.cookie.split(";");
    for(let i=0;i<arrayCookie.length;i++){
      let c=arrayCookie[i];
      while(c.charAt(0)==" "){
        c=c.substring(1);
      }
      if(c.indexOf(nombre)==0){
        return c.substring(nom.length,c.length);
      }
    }
    return ""
  }  
  deleteCoockie(nombre:string){  
    this.setCookie(nombre,"");
  }
  
  setColorLabel(color:string){
    const itemMenuLabel=document.querySelectorAll(".item-menu .item-menu-label");
    for(let i=0;i<itemMenuLabel.length;i++){
      itemMenuLabel[i].classList.remove("HC1","HC2","HC3","HC4","HC5","HC6","HC7","HC8");
      switch(color){
        case "#616161":
          itemMenuLabel[i].classList.add("HC1");
          this.setCookie("labelColor","HC1");
          break;
        case "#c62828":
          itemMenuLabel[i].classList.add("HC2");
          this.setCookie("labelColor","HC2");
          break;
        case "#c2185b":
          itemMenuLabel[i].classList.add("HC3");
          this.setCookie("labelColor","HC3");
          break;
        case "#8e24aa":
          itemMenuLabel[i].classList.add("HC4");
          this.setCookie("labelColor","HC4");
          break;
        case "#2196f3":
          itemMenuLabel[i].classList.add("HC5");
          this.setCookie("labelColor","HC5");
          break;
        case "#0288d1":
          itemMenuLabel[i].classList.add("HC6");
          this.setCookie("labelColor","HC6");
          break;
        case "#64dd17":
          itemMenuLabel[i].classList.add("HC7");
          this.setCookie("labelColor","HC7");
          break;
        case "#ff8f00":
          itemMenuLabel[i].classList.add("HC8");
          this.setCookie("labelColor","HC7");
          break;
      }
    }
  }
  
  loadVisual(){
    let layout=this.getCookie("layout");
    let mode=this.getCookie("mode");
    let label=this.getCookie("labelColor");
    
    
    const body=document.getElementsByTagName("body")[0];
    const sidebar=document.getElementById("sidebar");
    const visuales=document.getElementById("configVisuales");
    const btnModo=document.getElementById("btnModo") as HTMLInputElement | null;
    const itemMenuLabel=document.querySelectorAll(".item-menu .item-menu-label");
    if(layout!=""){
      body.classList.add(layout);
      sidebar?.classList.add(mode);
      visuales?.classList.add(mode);      
      if(btnModo!=null){
        btnModo.checked=true;
      }
    }
    if(label!=""){
      for(let i=0;i<itemMenuLabel.length;i++){
        itemMenuLabel[i].classList.remove("HC1","HC2","HC3","HC4","HC5","HC6","HC7","HC8");
        itemMenuLabel[i].classList.add(label);
      }
    }
    
  }
  
}
