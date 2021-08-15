const billAmt = document.querySelector("#billAmt");
const cashGiven = document.querySelector("#cashGiven");

const errorDiv = document.querySelector(".errorMsg");

const cashGivenDiv = document.querySelector(".cashGivenInput");
const changeReturnDiv = document.querySelector(".changeReturn");

const output= document.querySelector("#output");

const nextBtn = document.querySelector("#nextBtn");
const checkBtn = document.querySelector("#checkBtn");

const noOfNotes= document.querySelectorAll(".noOfNotes");

const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];


nextBtn.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmt.value)>0){

        nextBtn.style.display = "none";
        cashGivenDiv.style.display = "block";
    }
    else{
        showError("Enter valid bill amount");
    }
} )


checkBtn.addEventListener('click', ()=>{
    clearNoOfNotes();
    hideError();
    let billAmtValue= Number(billAmt.value);
    let cashGivenValue= Number(cashGiven.value);

    if(billAmtValue>0 && cashGivenValue>0){

        if(!Number.isInteger(cashGivenValue)){
            showError("Enter valid amount in cash given field");
            return;
        }
        if(billAmtValue > cashGivenValue){
            showError("Cash is less than bill, please enter right amount");
            return;
        }
        calculateNotes(billAmtValue, cashGivenValue);
    } else{
        showError("Enter valid bill amount and cash given to continue");
        }
})

function calculateNotes(bill, cash){
    let returnAmt = cash-bill;
    
    if(returnAmt<1){
        showError("No amount should be returned");
        return;
    }
    changeReturnDiv.style.display = "block";

    for(let i=0; i<arrayNoteAmt.length; i++){
        returnAmt= compare(returnAmt, arrayNoteAmt[i], i);
    }
    
}


function compare(remainder, noteAmt, index){

    if(remainder >= noteAmt){
        let notes = Math.floor(remainder/noteAmt);
        remainder = remainder - notes*noteAmt;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}


function clearNoOfNotes(){
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}

function showError(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    changeReturnDiv.style.display = "none";
}

function hideError(){
    errorDiv.style.display = "none";
}
