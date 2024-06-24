////////////////////////////////////////////////////////////  start project //////////////////////////////////////////////////////////////                                     

let title = document.getElementById('title');
    let price = document.getElementById('price');
    let taxes = document.getElementById('taxes');
    let ads = document.getElementById('ads');
    let discount = document.getElementById('discount');
    let total = document.getElementById('total');
    let count = document.getElementById('count');
    let category = document.getElementById('category');
    let submit = document.getElementById('submit');
    let mood ="create";
    let tmp;
   
    // console.log(title,price,taxes,ads,discount,total,count,category,submit)
 
 //////////////////////////////////////////////////////creat inputs/////////////////////////////////////////////////////////////////////
    function getTotal()
 {
if( price.value != ""){
     let result = ( +price.value + +taxes.value + +ads.value )- + discount.value  ;
        total.innerHTML= result;
        total.style.background="green";
    }else{
        total.innerHTML=""
        total.style.background="red";

    }
 }
 /////////////////////////////////////////////////////////////////////////////////////save inputs //////////////////////////////////////////
 let datapro ;
 if(localStorage.product !=null)
 {
    datapro= JSON.parse(localStorage.product)
 }else{ 
 datapro =[];
 }
 submit.onclick= function(){
let newPro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()
    
}
if(title.value && price.value && newPro.count<100 && category.value !="")
{
    if(mood==="create"){
        if(newPro.count>1){
            for(let i=0;i<newPro.count;i++)
            datapro.push(newPro)
        
        }else{
            datapro.push(newPro)
        
        }
        }else{
            datapro[tmp]=newPro;
            mood="create";
            submit.innerHTML="create";
            count.style.display="block";
        }
        clearInput()

}else{
    prompt("pleas fill the feild")
}

localStorage.setItem("product", JSON.stringify(datapro))
showData()
console.log(datapro)
 }
 ///////////////////////////////////////////////////////////////////clear inputs//////////////////////////////////////////////////
 function clearInput(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value="";
    count.value="";

    total.innerHTML = "";


 }
 //////////////////////////////////////////////////////////////////////read///////////////////////////////////////////////////
  function showData(){

    getTotal()
    let table ='';
    for(let i = 0 ; i <datapro.length;i++){
        table += `<tr>
        <td>${i+1} </td>
        <td>${datapro[i].title} </td>
        <td> ${datapro[i].price}</td>
        <td>${datapro[i].taxes} </td>
        <td> ${datapro[i].ads}</td>
        <td>${datapro[i].discount} </td>
        <td>${datapro[i].total} </td>
        <td>${datapro[i].count} </td>

        <td>${datapro[i].category} </td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="remove(${i})"> delete</button></td>

        
        </tr> `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll')
    if(datapro.length > 0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">deleteAll ${datapro.length}</button>
        `
    }else{
    btnDelete.innerHTML="";
    }

  }
  showData()
  /////////////////////////////////////////////////////////////////////////delete//////////////////////////////////////////
  function remove(i){
datapro.splice(i,1) 
localStorage.product= JSON.stringify(datapro)
showData()
}
///////////////////////////////////////////deleteAll/////////////////////////////////////////////////////////////
function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()


}
////////////////////////////////////////////////////update//////////////////////////////////////////////////////////////

function updateData(i){
    title.value =datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value=datapro[i].category;
    count.value=datapro[i].count;
    count.style.display="none"
    submit.innerHTML="update"
getTotal()
mood = 'update'
tmp=i;
scroll({
    top:0,
    behavior:"smooth",
})
}
///////////////////////////////////////////////////////////////search////////////////////////////////////////////////////////////////
let searchMode = 'title';
function getSearchMood(id)
{
    let search = document.getElementById ('search')
if(id=="searchTitle")
{
    searchMode='title';
}else{
    searchMode='category';

}
search.placeholder = "search by"+ searchMode

search.focus()
search.valueT="";

showData
console.log(searchMode)
}
//////////////////////////////////////////////////////////////search//////////////////////////////////////////////////
function searchData(value){
    let table ='';
    for(let i=0 ; i < datapro.length;i++){

if(searchMode=='title'){
        if(datapro[i].title.includes(value.toLowerCase())){
            table += `<tr>
            <td>${i} </td>
            <td>${datapro[i].title} </td>
            <td> ${datapro[i].price}</td>
            <td>${datapro[i].taxes} </td>
            <td> ${datapro[i].ads}</td>
            <td>${datapro[i].discount} </td>
            <td>${datapro[i].total} </td>
            <td>${datapro[i].count} </td>
    
            <td>${datapro[i].category} </td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="remove(${i})"> delete</button></td>
    
            
            </tr> `
        }

    
}



else{
    if(datapro[i].category.includes(value.toLowerCase())){
        table += `<tr>
        <td>${i} </td>
        <td>${datapro[i].title} </td>
        <td> ${datapro[i].price}</td>
        <td>${datapro[i].taxes} </td>
        <td> ${datapro[i].ads}</td>
        <td>${datapro[i].discount} </td>
        <td>${datapro[i].total} </td>
        <td>${datapro[i].count} </td>

        <td>${datapro[i].category} </td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="remove(${i})"> delete</button></td>

        
        </tr> `
    }
}
document.getElementById('tbody').innerHTML=table;

}}








