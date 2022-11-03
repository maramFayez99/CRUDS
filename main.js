let tittle =document.getElementById('tittle');
let price =document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let tmp;
//get total

function getTotal(){
   if(price.value != ''){
    let result =(+price.value+ +taxes.value+ +ads.value)-+discount.value;
    total.innerHTML=result;
    total.style.background='green';

   }else{
    total.innerHTML='';
    total.style.background='#0d6efd';
   }


}

//create ptoduct
let dataproduct;
if(localStorage.product != null){
    dataproduct=JSON.parse(localStorage.product );
}else{
    dataproduct=[]; 
}

submit.onclick=function(){
    let newproduct={
        tittle:tittle.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    
//count
if(tittle.value !='' &&price.value !='' &&category.value !='' && newproduct.count<100){
    if(mood ==='create'){
        if(newproduct.count>1){
            for(let i=0;i<newproduct.count;i++){
                dataproduct.push(newproduct);
            }
        }else{
            dataproduct.push(newproduct);
        }
       
    }else{
       
        dataproduct[tmp]=newproduct;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';
    }
    clearData();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: ' successfully',
        showConfirmButton: false,
        timer: 2000
      })
}

  
  
    //localstorege
    localStorage.setItem('product',   JSON.stringify(dataproduct)  );
    showData();

    console.log(dataproduct);
}

//clear input after After entering the data automatically
function clearData(){
   tittle.value='',
   price.value='',
   taxes.value='',
   ads.value='',
   discount.value='',
   total.innerHTML='',
   count.value='',
   category.value=''
}

//read data
//${i+1}مشان الاندكس يبلش من رقم 1
function showData(){
    getTotal();
let result='';
for(let i=0; i< dataproduct.length ; i++){
    result+=`
   <tr>
    <th scope="row">${i+1}</th>  
    <td>${dataproduct[i].tittle}</td>
    <td>${dataproduct[i].price}</td>
    <td>${dataproduct[i].taxes}</td>
    <td>${dataproduct[i].ads}</td>
    <td>${dataproduct[i].discount}</td>
    <td>${dataproduct[i].total}</td>
    <td>${dataproduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>`   
}

document.getElementById("data").innerHTML=result;
let deleteAll=document.getElementById("deleteAll");
if(dataproduct.length>0){
    deleteAll.innerHTML=`
    <button  onclick="deleteAll()" >delete All(${dataproduct.length})</button>
    `
}else{
    deleteAll.innerHTML='';
}

}
showData();

//delete



function deleteData(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            dataproduct.splice(i,1);
     localStorage.product=JSON.stringify(dataproduct);
     showData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}

//delete all
function deleteAll(){
 
    let timerInterval
   
    Swal.fire({
      title: 'deleting....',
      html: 'I will delete in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    localStorage.clear();
    dataproduct.splice(0);
    showData();
}


//update
function updateData(i) {
tittle.value=dataproduct[i].tittle;
price.value=dataproduct[i].price;
taxes.value=dataproduct[i].taxes;
ads.value=dataproduct[i].ads;
discount.value=dataproduct[i].ads;
getTotal()
count.style.display='none';
submit.innerHTML='update';
category.value=dataproduct[i].category;
mood='update';
tmp=i;
scroll({
top:0,
behavior:'smooth'
})
}



//search
let moodSearch='tittle';

function getSearchMood(id)   //ستخدم هاي لما اكبس ع السيرش تاستل والكاتسجوري
{         
     
let search=document.getElementById('search');  // ناديت ع حقل السيرش  نفسه
if(id =='searchtittle'){
    moodSearch='tittle';
   
}else{
    moodSearch='category';
  
}
search.placeholder='search By ' +moodSearch;
search.focus(); //لما اكبس ع زر السيرش تايتل,كاتيجوري افتح المربع السيرش نفسه
search.value='';//مشان يفضيلي السيرش تلقائيا بعد ما ابحث
showData();//بعد ما ابحث  ويفضي السيرش بدي يرجع يعرض البيانات متل ما كانت تلقائي
}



function searchData(e){
    let result='';
    for( let i=0; i<dataproduct.length;i++){
if(moodSearch =='tittle'){

    if(dataproduct[i].tittle.includes(e.toLowerCase())){
        result+=`
        <tr>
         <th scope="row">${i}</th>
         <td>${dataproduct[i].tittle}</td>
         <td>${dataproduct[i].price}</td>
         <td>${dataproduct[i].taxes}</td>
         <td>${dataproduct[i].ads}</td>
         <td>${dataproduct[i].discount}</td>
         <td>${dataproduct[i].total}</td>
         <td>${dataproduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
       `   
    }

}
else{
    
        if(dataproduct[i].category.includes(e.toLowerCase())){
            result+=`
            <tr>
             <th scope="row">${i}</th>
             <td>${dataproduct[i].tittle}</td>
             <td>${dataproduct[i].price}</td>
             <td>${dataproduct[i].taxes}</td>
             <td>${dataproduct[i].ads}</td>
             <td>${dataproduct[i].discount}</td>
             <td>${dataproduct[i].total}</td>
             <td>${dataproduct[i].category}</td>
             <td><button onclick="updateData(${i})" id="update">update</button></td>
             <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
           </tr>
           `   
        }
    
}
document.getElementById("data").innerHTML=result;
}
}
