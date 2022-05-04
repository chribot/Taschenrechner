// globals
let op1 = '0';
let op2 = '0';
let operator = '';
let floatInput = false;
let state = 'START'; // START, OP1, OP, OP2, RESULT

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
    document.getElementById('times').addEventListener('click', operatorInput);
    document.getElementById('divide').addEventListener('click', operatorInput);
    // equals
    document.getElementById('equals').addEventListener('click', showResult);
    // clear
    document.getElementById('clear').addEventListener('click', clearDisplay);
}

function numberInput() {
    if (state === 'START' || state === 'OP1') {
        // noch kein Operator eingegeben
        if (state === 'START') {
            op1 = this.innerHTML;
            state = 'OP1';
        } else {
            op1 += this.innerHTML;
        }
        document.getElementById("display").value = op1;
    } else if (state === 'OP' || state === 'OP2') {
        if (op2 === '0')
            op2 = '';
        // Operator wurde schon eingegeben
        op2 += this.innerHTML;
        document.getElementById("display").value = op1 + ' ' + operator + ' ' + op2;
        state = 'OP2';
    }
}

function dotInput() {
    if (state === 'RESULT') {
        op1 = '0.';
        document.getElementById("display").value = op1;
        floatInput = true;
        state = 'OP1';
    } else if ((state === 'START' || state === 'OP1') && !floatInput) {
        op1 += '.';
        document.getElementById("display").value = op1;
        floatInput = true;
        state = 'OP1';
    } else if ((state === 'OP' || state === 'OP2') && !floatInput) {
        op2 += '.';
        document.getElementById("display").value = op1 + ' ' + operator + ' ' + op2;
        floatInput = true;
        state = 'OP2';
    }
    //console.log(this.innerHTML);
}

function operatorInput() {
    if (state === 'OP2') {
        // wenn Operator anstatt '=' gedrückt, Zwischenergebnis berechnen
        calculate();
        operator = this.innerHTML;
        document.getElementById("display").value = op1;
        state = 'OP';
    } else if (state === 'OP') {
        // Operator wird gewechselt
        calculate();
        operator = this.innerHTML;
        document.getElementById("display").value = op1 + ' ' + operator + ' ';
    } else if (state === 'START' || state === 'OP1' || state === 'RESULT') {
        // Operator nach Eingabe von op1
        // op1 ist am Anfang 0 oder enthält am Ende das Ergebnis
        operator = this.innerHTML;
        document.getElementById("display").value = op1 + ' ' + operator + ' ';
        state = 'OP';
    }
    floatInput = false;
}

function calculate() {
    let x = Number(op1);
    let y = Number(op2);
    if (operator === '+') {
        op1 = x + y;
    } else if (operator === '-') {
        op1 = x - y;
    } else if (operator === '\u00D7') {
        op1 = x * y;
    } else if (operator === '\u00F7') {
        if (y !== 0) {
            op1 = x / y;
        } else {
            clearDisplay();
            document.getElementById("display").value = 'Division durch 0';
            state = 'ERROR';
        }
    }
    op2 = '0';
    floatInput = false;
}

function showResult() {
    calculate();
    if (state !== 'ERROR') {
        document.getElementById("display").value = op1;
    }
    operator = '';
    state = 'RESULT';
}

function clearDisplay() {
    op1 = '0';
    operator = '';
    op2 = '0';
    floatInput = false;
    document.getElementById("display").value = '';
    state = 'START';
}