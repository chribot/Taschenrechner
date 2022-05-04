// globals
let op1 = '0';
let op2 = '';
let operator = '';

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
    document.getElementById('equals').addEventListener('click', showResult);
    // clear
    document.getElementById('clear').addEventListener('click', clearDisplay);
}

function numberInput() {
    // wenn in op1 eine Zahl steht, dann ist es ein Zwischenergebnis
    // wenn nun erneut eine Zahl eingegeben wurde, müssen wir op1 vorher löschen
    if (typeof op1 === "number")
        op1 = '0';
    // noch kein Operator eingegeben
    if (operator === '') {
        if (op1 === '0') {
            op1 = this.innerHTML;
        } else {
            op1 += this.innerHTML;
        }
        document.getElementById("display").value = op1;
    // Operator wurde schon eingegeben
    } else {
        op2 += this.innerHTML;
        document.getElementById("display").value = op1 + ' ' + operator + ' ' + op2;
    }
}

function dotInput() {
    console.log(this.innerHTML);
}

function operatorInput() {
    // in op1 steht das Ergebnis von calculate()
    // wieder in string umwandeln damit
    if (typeof op1 === "number")
        op1 = op1.toString();
    operator = this.innerHTML;
    // wenn Operator anstatt '=' gedrückt, Zwischenergebnis berechnen
    if (operator !== '' && op2 !== '') {
        calculate();
        document.getElementById("display").value = op1;
    } else {
        document.getElementById("display").value = op1 + ' ' + operator + ' ';
    }
}

function calculate() {
    let x = Number(op1);
    let y = Number(op2);
    if (operator === '+') {
        op1 = x + y;
    } else if (operator === '-') {
        op1 = x - y;
    } else if (operator === '*') {
        op1 = x * y;
    } else if (operator === '/') {
        op1 = x / y;
    }
    op2 = '';
}

function showResult() {
    calculate();
    document.getElementById("display").value = op1;
    //op1 = '0';
    op2 = '';
    operator = '';
}

function clearDisplay() {
    op1 = '0';
    op2 = '';
    document.getElementById("display").value = '';
}