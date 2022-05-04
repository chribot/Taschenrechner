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
    // Tastatur
    document.addEventListener('keyup', keyPressed);
    document.addEventListener('keydown', preventShortcuts);
}

function numberInput() {
    if (state === 'START' || state === 'RESULT' || state === 'OP1') {
        // noch kein Operator eingegeben
        if (state === 'START' || state === 'RESULT' || op1 === '0') {
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
    this.blur(); // Focus von der Taste nehmen
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
    this.blur(); // Focus von der Taste nehmen
}

function operatorInput() {
    if (state === 'OP2') {
        // wenn Operator anstatt '=' gedrückt, Zwischenergebnis berechnen
        calculate();
        operator = this.innerHTML;
        state = 'OP';
    } else if (state === 'OP') {
        // Operator wird gewechselt
        operator = this.innerHTML;
    } else if (state === 'START' || state === 'OP1' || state === 'RESULT') {
        // Operator nach Eingabe von op1
        // op1 ist am Anfang 0 oder enthält am Ende das Ergebnis
        operator = this.innerHTML;
        state = 'OP';
    }
    document.getElementById("display").value = op1 + ' ' + operator + ' ';
    floatInput = false;
    this.blur(); // Focus von der Taste nehmen
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
    this.blur(); // Focus von der Taste nehmen
}

function clearDisplay() {
    op1 = '0';
    operator = '';
    op2 = '0';
    floatInput = false;
    document.getElementById("display").value = '';
    state = 'START';
    this.blur(); // Focus von der Taste nehmen
}

function keyPressed(event) {
    switch (event.key) {
        case '0': document.getElementById('zero').click(); break;
        case '1': document.getElementById('one').click(); break;
        case '2': document.getElementById('two').click(); break;
        case '3': document.getElementById('three').click(); break;
        case '4': document.getElementById('four').click(); break;
        case '5': document.getElementById('five').click(); break;
        case '6': document.getElementById('six').click(); break;
        case '7': document.getElementById('seven').click(); break;
        case '8': document.getElementById('eight').click(); break;
        case '9': document.getElementById('nine').click(); break;
        case '.': document.getElementById('dot').click(); break;
        case '+': document.getElementById('plus').click(); break;
        case '-': document.getElementById('minus').click(); break;
        case '*': document.getElementById('times').click(); break;
        case '/': document.getElementById('divide').click(); break;
        case 'Enter': document.getElementById('equals').click(); break;
        case 'Backspace': document.getElementById('clear').click(); break;
    }
}

function preventShortcuts(event) {
    // Shortcuts im Browser ausschalten, die unsere Tastenkombinationen verwenden
    // 'shift' + '*'
    // 'shift' + '/'
    if (event.shiftKey) {
        if (event.key === '*' || event.key === '/')
        event.preventDefault();
    }
}