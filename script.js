function addEvents() {
    // numbers
    document.getElementById('zero').addEventListener('click', numberInput);
    document.getElementById('one').addEventListener('click', numberInput);
    document.getElementById('two').addEventListener('click', numberInput);
    document.getElementById('three').addEventListener('click', numberInput);
    document.getElementById('four').addEventListener('click', numberInput);
    document.getElementById('five').addEventListener('click', numberInput);
    document.getElementById('six').addEventListener('click', numberInput);
    document.getElementById('seven').addEventListener('click', numberInput);
    document.getElementById('eight').addEventListener('click', numberInput);
    document.getElementById('nine').addEventListener('click', numberInput);
    // dot
    document.getElementById('dot').addEventListener('click', dotInput);
    // operators
    document.getElementById('plus').addEventListener('click', operatorInput);
    document.getElementById('minus').addEventListener('click', operatorInput);
    document.getElementById('star').addEventListener('click', operatorInput);
    document.getElementById('slash').addEventListener('click', operatorInput);
    // equals
    document.getElementById('equals').addEventListener('click', calculate);
    // clear
    document.getElementById('clear').addEventListener('click', clearDisplay);
}

function numberInput() {
    console.log(this.innerHTML);
}

function dotInput() {
    console.log(this.innerHTML);
}

function operatorInput() {
    console.log(this.innerHTML);
}

function calculate() {
    console.log(this.innerHTML);
}

function clearDisplay() {
    document.getElementById("display").value = '';
}