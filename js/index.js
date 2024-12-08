
var bookmarkNameInput = document.getElementById("SiteName") ;
var bookmarksiteInput = document.getElementById("SiteURL") ;
var listOfbookmark =[]
var listOfinput = document.querySelectorAll(".formContainer form .form-control") ;
var formAlert=document.getElementById("Form-validaiton")

var searchinput = document.getElementById("searchinput") ;

if (localStorage.getItem("listOfMybookmark")!=null){

   listOfbookmark=JSON.parse(localStorage.getItem("listOfMybookmark"))
   displayAllbookmark(listOfbookmark);
}


function addbookmark(){
 if (checkFormValidity()  ){
   if(!getUrlsName().includes(bookmarkNameInput.value)){ //  To check if the user has entered a bookmark name that exists in the list.    
   var bookmark = {
   name : bookmarkNameInput.value ,
   Url : bookmarksiteInput.value ,
   }
   listOfbookmark.push(bookmark)
   localStorage.setItem("listOfMybookmark",JSON.stringify(listOfbookmark))
   displayLastbookmark(bookmark)
   clearform();
   removeValidateInput();
   showSucessAlert() 
   } else { 
      swal({
         title: " This bookmark already exists in the list. Try another Website Name. :",
         icon: "warning",
       });
      // sweat alert code
   }

} else{


swal({
   title: "Site Name or Url is not valid, Please follow the rules below :",
   text: '» Site name must contain at least 3 characters \n » Site URL must be a valid one',
   icon: "error",
 });
// sweat alert code
}
}







function displayLastbookmark(bookmark){

 var container=`
        <tr>
                    <td >${listOfbookmark.length}</td>
                    <td >${bookmark.name}</td>
                    <td > <a href="${bookmark.Url}"> <button  id="VistBtn" type="button" class="btn btn-success" > <i class="fa-solid fa-eye "></i> Vist</button></a></td>
                    <td ><button  id="deleteBtn" type="button" class="btn btn-danger" onclick="Deletebookmark(${listOfbookmark.length-1})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>     
                   
                  </tr>
`


  document.getElementById("tbody").innerHTML += container
  hide4thColumnOnSearch() // when use serch input
  


}


function displayAllbookmark(listOfbookmark,term){



var container="";
for(var i=0 ; i<listOfbookmark.length ; i++){



container += 
`
        <tr>
                    <td >${i+1}</td>
                    <td >${ term ? listOfbookmark[i].name.replaceAll( term ,`<span  class="bg-warning fw-bold ">${term}</span>`) : listOfbookmark[i].name}</td>
                    <td > <a href="${listOfbookmark[i].Url}"> <button  id="VistBtn" type="button" class="btn btn-success" > <i class="fa-solid fa-eye "></i> Vist</button></a></td>
                    <td ><button  id="deleteBtn" type="button" class="btn btn-danger" onclick="Deletebookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>     
                   
                  </tr>
`

}

document.getElementById("tbody").innerHTML = container

hide4thColumnOnSearch()// when use serch input


}






function Deletebookmark(index){
   
   listOfbookmark.splice(index,1)
   localStorage.setItem("listOfMybookmark",JSON.stringify(listOfbookmark))
   displayAllbookmark(listOfbookmark);


}




function clearform(){
    bookmarkNameInput.value = ""
    bookmarksiteInput.value = ""

}


function validbookmark(elmentinput){

   var regex={
    SiteName:/^[A-Za-z0-9_]{3,}$/,
    SiteURL:/^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?/,
  
   }
  
  if (regex[elmentinput.id].test(elmentinput.value)){

   elmentinput.nextElementSibling.classList.replace("d-block", "d-none")
      // traversing to nextElementSibling in html sequence (alert div)
   if(elmentinput.classList.contains("is-invalid")){
      elmentinput.classList.replace("is-invalid", "is-valid")
      
   }else{elmentinput.classList.add("is-valid")}

   return true 
   
} else{
   elmentinput.nextElementSibling.classList.replace("d-none", "d-block")
   // traversing to nextElementSibling in html sequence (alert div)
   if(elmentinput.classList.contains("is-valid")){
      elmentinput.classList.replace("is-valid", "is-invalid")
      
   }else{elmentinput.classList.add("is-invalid")}
   return false   
  }

}




for(var i=0; i<listOfinput.length;i++){

   
   listOfinput[i].addEventListener('input',function(){


      validbookmark(this)
   
   
   })
   
   
}

function removeValidateInput(){
   for(var i=0; i<listOfinput.length;i++){
   
      
      if (listOfinput[i].classList.contains('is-valid')){
   
         listOfinput[i].classList.remove('is-valid')   } 
      
   }

}


function checkFormValidity(){

   var Validity=true;
   for(var i=0; i<listOfinput.length;i++){  
      if (!validbookmark(listOfinput[i])){
         Validity=false;
      } 
   }
   return Validity;
}



function showSucessAlert(){

document.getElementById("notification").style.animation= "none"
setTimeout(function(){document.getElementById("notification").style.animation= "notification 3s"
}, 5);


}


function getUrlsName(){ // return url names  of  bookmark object  from list bookmark (array of object)
   var UrlsName =[] ;

   for(var i=0 ; i<listOfbookmark.length ; i++){
      UrlsName.push(listOfbookmark[i].name);
 }
 return UrlsName
} 


function filterbookmark() {

   var searchbookmark=[]
  
  for( var i=0; i<listOfbookmark.length;i++   )
  
  if(  listOfbookmark[i].name.toLowerCase().includes(searchinput.value.toLowerCase())    )
  //should convert both data to lowercase to avoid case senstive
     searchbookmark.push(listOfbookmark[i])
  
     displayAllbookmark(searchbookmark,searchinput.value.toLowerCase());
  
    
  
  }
  
  function hide4thColumnOnSearch() {
   if(!searchinput.value==""){ // if searchinput not empty
 
      var fourthCOULMN =document.querySelectorAll("#tbody tr td:nth-of-type(4) ")  //return all fourth td in each tr in  tbody
      for(var i=0; i<fourthCOULMN.length; i++) {
         fourthCOULMN[i].classList.add("d-none")
      }
      document.querySelector("thead tr th:nth-of-type(4)").classList.add("d-none")  //return the first th 4th in thead
   
   }else{
   
       document.querySelector("thead tr th:nth-of-type(4)").classList.remove("d-none") // remove d-none if searchinput not empty  
      // " don't need to remove 'd-none' from the fourth column because it will be added again from the start."
   
   }
   
  }
 