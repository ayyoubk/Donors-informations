'use strict';

let donateForm=document.getElementById('donate-form');
let donorsTable=document.getElementById('donor-table');
let totalAmount=document.getElementById('total');

Donars.allDonations=[];
function Donars(name,age,amount){
  this.name=name;
  this.age=age;
  this.amount=amount;

  Donars.allDonations.push(this);
}

Donars.prototype.renderNewDonor=function(){
  let newRow=document.createElement('tr');
  donorsTable.appendChild(newRow);

  let cellOfName=document.createElement('td');
  cellOfName.textContent=this.name;
  newRow.appendChild(cellOfName);

  let cellOfAge=document.createElement('td');
  cellOfAge.textContent=this.age;
  newRow.appendChild(cellOfAge);

  let cellOfAmount=document.createElement('td');
  cellOfAmount.textContent=this.amount;
  newRow.appendChild(cellOfAmount);

};
function updateTotal(){
  let total =0;
  for(let i=0; i<Donars.allDonations.length ; i++){
    total=total+Donars.allDonations[i].amount;
  }
  totalAmount.innerHTML=`Total : ${total} JD`;
}

function getRandomInt18to30() {
  return Math.floor(Math.random() * (30 - 18 + 1) + 18);
}

donateForm.addEventListener('submit',handleFormSubmit);

function handleFormSubmit(event){
  event.preventDefault();
  let donorName=event.target[0].value;
  let donationAmount=parseInt(event.target[1].value);
  let donorAge=getRandomInt18to30();

  let newDonor= new Donars(donorName,donorAge,donationAmount);
  newDonor.renderNewDonor();
  updateTotal();
  saveDonationsToLs();

}

function saveDonationsToLs(){
  let arrayOfDonations=JSON.stringify(Donars.allDonations);
  localStorage.setItem('donations',arrayOfDonations);
}

function getPreviousDonations(){
  let savedData=localStorage.getItem('donations');
  let editedArray=JSON.parse(savedData);
  if (editedArray!== null){
    for(let i=0;i<editedArray.length;i++){
      let newInst= new Donars(editedArray[i].name,editedArray[i].age,editedArray[i].amount);
      newInst.renderNewDonor();
    }
    updateTotal();

  }
}
getPreviousDonations();
