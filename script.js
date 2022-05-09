document.querySelectorAll(".num-btn")
        .forEach((numBtn) => 
                numBtn.addEventListener('click', numPressed));

var input = '';
var num1 = '0';
var num2 = '0';
var firstSecondEntry = 1;
var arthOp = '+';

//Store number on button press
var displayScreen = document.getElementById("display-screen");
function numPressed(e){

    //to prevent double decimal and allow initial decimal
    if(e.target.value == '.'){
        if((input+'').indexOf('.') != -1) return;

        if(input == '')
            input = '0';
    }

    input += e.target.value;
    updateVars();
    updateDisplay(input);
}

//updates var as per the user input
function updateVars(){
    if(firstSecondEntry == 1)   num1 = parseFloat(input);
    else if(firstSecondEntry == 2) num2 = parseFloat(input);
    else console.error("ERROR in Entry Var");
}

//Update number on display
function updateDisplay(num){
    displayScreen.textContent = (num);
}

document.querySelectorAll(".arth-btn").forEach((btn) => {
    btn.addEventListener('click', arithmatic)
});

//on arithmatic btn press if it was 2nd or subsequent input
//then run equal function and update arithmaticOp
//if first input then change var to 2nd input and update op
function arithmatic(e) {
    if(firstSecondEntry == 2 && input !== ''){
        equalOp();
    }
    else{
        resetInputVar();
        firstSecondEntry = 2;
    }
    arthOp = e.target.value;
}

document.getElementById('b-equals')
        .addEventListener('click',equalOp);
function equalOp(){
    //do nothing if first input
    if(firstSecondEntry == 1) return;  

    var result = 0;
    var n1 = parseFloat(num1);
    var n2 = parseFloat(num2);

    switch(arthOp){
        case '+':   result = (n1 + n2);
                    break;
        case '-':   result = (n1 - n2);
                    break;
        case 'x':   result = (n1 * n2);
                    break;
        case '/':   result = (n1 / n2);
                    break;
    }
    updateDisplay(result);
    
    //Store answer as first input and reset 2nd input
    //to store new user entry
    num1 = ''+result;
    num2 = '';
    resetInputVar();

}


//delete button
document.getElementById("b-del")
        .addEventListener('click', delEntry)
function delEntry(e){
    input = 0;
    updateVars();
    updateDisplay(input);
}

function resetInputVar(){
    input = '';
}

//reset button
document.getElementById('b-reset')
        .addEventListener('click', resetAll);
function resetAll(){
    resetInputVar();
    num1 = '0';
    num2 = '0';
    firstSecondEntry = 1;
    updateDisplay('0');

}


//theme changing
var themeSwitchBtn = document.querySelector(".theme-toggle-container");
themeSwitchBtn.addEventListener('click', toggleTheme);

var selTheme = 1;
function toggleTheme(e){
    selTheme++;
    if(selTheme > 3)    selTheme = 1;

    toggleSw();
    
    updateTheme();
}

function toggleSw(){
    console.log(`toggle ${themeSwitchBtn}`);
    switch(selTheme){
        case 1:
            themeSwitchBtn.style.justifyContent = 'flex-start';
            break;
        case 2:
            themeSwitchBtn.style.justifyContent = 'center';
            break;
        case 3:
            themeSwitchBtn.style.justifyContent = 'flex-end';
            break;
    }
}

//read previous theme from storage and apply
window.onload = function(){
    console.log(localStorage.getItem("selTheme"));
    selTheme = localStorage.getItem("selTheme") || 1;
    updateTheme();
}

function updateTheme(){
    var bodyTag = document.getElementsByTagName('body')[0];
    //remove all classes from body since they are being used to sel theme
    bodyTag.removeAttribute('class');
    bodyTag.classList.add(`theme-${selTheme}`);

    //save theme to local broser storage
    localStorage.setItem("selTheme", selTheme);

    //update toggle button
    toggleSw();
}