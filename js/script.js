const numberButtons = document.querySelectorAll(".numero");
const operatorButtons = document.querySelectorAll(".operador");
const functionButtons = document.querySelectorAll(".funcao");
const equalButton = document.querySelector("#igual-btn");
const allClearButton = document.querySelector("#all-clear-btn");
const previousOperationText = document.querySelector("#operacao-anterior");
const currentOperationText = document.querySelector("#operacao-atual");
const deleteButton = document.querySelector("#delete-button");

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.clear();
    };

    delete(){
        this.currentOperation = this.currentOperation.toString().slice(0,-1);
    }

    calculate(){
        let result;

        const _previousOperation = parseFloat(this.previousOperation);
        const _currentOperation = parseFloat(this.currentOperation);

        if(isNaN(_previousOperation) || isNaN(_currentOperation)) return;

        switch (this.operation) {
            case '+': 
                result = _previousOperation + _currentOperation;
                break;
            case '-': 
                result = _previousOperation - _currentOperation;
                break;
            case '/': 
                result = _previousOperation / _currentOperation;
                break;
            case 'X': 
                result = _previousOperation * _currentOperation;
                break;
            default: 
                return;
        };

        this.currentOperation = result;
        this.operation = undefined;
        this.previousOperation = "";
    };

    chooseOperation(operation){
        if(this.currentOperation === "") return;

        if(this.previousOperation !== ''){
            this.calculate();
        };

        this.operation = operation;

        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    };

    appendNumber(number){
        if(this.currentOperation.includes('.') && number === '.') return;

        this.currentOperation = `${this.currentOperation}${number.toString()}`;
    };

    clear(){
        this.currentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;
    }; 

    updateDisplay() {
        this.previousOperationText.innerText = `${this.previousOperation} ${this.operation || ''}`;
        this.currentOperationText.innerText = this.currentOperation;
    }
};

const calculator = new Calculator(previousOperationText, currentOperationText);

for (const numberButtom of numberButtons){
    numberButtom.addEventListener('click', () => {
        calculator.appendNumber(numberButtom.innerText);
        calculator.updateDisplay();
    });
};

for (const operatorButton of operatorButtons){
    operatorButton.addEventListener('click', () =>{
        calculator.chooseOperation(operatorButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});    

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})