let db;


// Database creation

let request =
indexedDB.open("InventoryDB",1);



request.onupgradeneeded=function(e){

db=e.target.result;


if(!db.objectStoreNames.contains("items")){

db.createObjectStore(
"items",
{
keyPath:"id",
autoIncrement:true
});

}



if(!db.objectStoreNames.contains("transactions")){

db.createObjectStore(
"transactions",
{
keyPath:"id",
autoIncrement:true
});

}

};



request.onsuccess=function(e){

db=e.target.result;

document.getElementById("saveBtn").disabled=false;
document.getElementById("transBtn").disabled=false;

loadStock();
loadItemDropdown();
loadTransactions();

};



function addItem(){

if(!db){
    alert("Database not ready. Please wait.");
    return;
}


let item = {

    code: document.getElementById("code").value,

    name: document.getElementById("name").value,

    qty: Number(document.getElementById("qty").value)

};


let tx = db.transaction(
    ["items","transactions"],
    "readwrite"
);


let addRequest =
tx.objectStore("items").add(item);



addRequest.onsuccess=function(e){


    let itemId=e.target.result;


    // Add opening stock transaction

    if(item.qty > 0){

        tx.objectStore("transactions").add({

            itemId:itemId,

            itemName:item.name,

            type:"Opening Stock",

            qty:item.qty,

            date:new Date().toLocaleDateString()

        });

    }


};



tx.oncomplete=function(){

    loadStock();

    loadItemDropdown();

    loadTransactions();

};


}



// Stock display

function loadStock(){


let table=
document.getElementById("stockList");


table.innerHTML="";



let store=
db.transaction(
"items",
"readonly"
)
.objectStore("items");



store.openCursor().onsuccess=function(e){


let cursor=e.target.result;


if(cursor){


let item=cursor.value;



// Hide zero stock

if(item.qty>0){


table.innerHTML+=`

<tr>

<td>${item.code}</td>

<td>${item.name}</td>

<td>${item.qty}</td>

</tr>

`;

}



cursor.continue();


}


};


}






// Dropdown items

function loadItemDropdown(){


let select=
document.getElementById("itemSelect");


select.innerHTML="";



let store=
db.transaction(
"items",
"readonly"
)
.objectStore("items");



store.openCursor().onsuccess=function(e){


let cursor=e.target.result;


if(cursor){


let item=cursor.value;


select.innerHTML+=`

<option value="${item.id}">
${item.name}
</option>

`;

cursor.continue();


}


};


}








// Save transaction

function saveTransaction(){


let itemId=
Number(
document.getElementById("itemSelect").value
);



let qty=
Number(
document.getElementById("transQty").value
);



let type=
document.getElementById("type").value;




let tx=db.transaction(
["items","transactions"],
"readwrite"
);



let items=
tx.objectStore("items");



let request=
items.get(itemId);



request.onsuccess=function(){


let item=request.result;



if(type=="RESTOCK"){

item.qty += qty;

}


else{


if(item.qty < qty){

alert("Not enough stock");

return;

}


item.qty -= qty;


}



items.put(item);



let transaction={


itemId:item.id,

itemName:item.name,

type:
type=="RESTOCK"
?
"Restock"
:
"Issue",


qty:qty,


date:
new Date().toLocaleDateString()

};



tx.objectStore("transactions")
.add(transaction);



};



tx.oncomplete=function(){

loadStock();

loadItemDropdown();

loadTransactions();

};


}







// Transaction history

function loadTransactions(){


let table=
document.getElementById("transactionList");


table.innerHTML="";



let store=
db.transaction(
"transactions",
"readonly"
)
.objectStore("transactions");



store.openCursor().onsuccess=function(e){


let cursor=e.target.result;



if(cursor){


let t=cursor.value;



table.innerHTML+=`

<tr>

<td>${t.date}</td>

<td>${t.itemName}</td>

<td>${t.type}</td>

<td>${t.qty}</td>

</tr>

`;



cursor.continue();


}



};


}


// Default PIN setup

if(!localStorage.getItem("appPIN")){

    localStorage.setItem("appPIN","1234");

}



// Check lock on startup

window.onload=function(){

    document.getElementById("lockScreen")
    .style.display="block";

    document.getElementById("appContent")
    .style.display="none";

};




// Unlock function

function unlockApp(){

let entered =
document.getElementById("pinInput").value;


let saved =
localStorage.getItem("appPIN");


if(entered === saved){


document.getElementById("lockScreen")
.style.display="none";


document.getElementById("appContent")
.style.display="block";


}
else{


document.getElementById("error")
.innerHTML="Wrong PIN";


}

}
