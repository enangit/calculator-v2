
class Calculator {
    constructor(previousOperandEl, currentOperandEl){
        this.previousOperandEl = previousOperandEl
        this.currentOperandEl = currentOperandEl
       this.clear()
    }


    clear() {
        this.currentNumber = ''
        this.previousNumber = ''
        this.operator = undefined
    }
    selectOperator(operator) {
        if(this.currentNumber === '') {return}
        if(this.previousNumber !== '') {
            this.calculate()
        }
        this.previousNumber = this.currentNumber
        this.operator = operator
        this.currentNumber = '';
       
    }

    deleteNumber() {
        const newNumber = this.currentNumber.toString().slice(0, -1)
        this.currentNumber = newNumber
    }

    setNumber(number) {
       

        if(number ==='.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString();

    }

    updateDOM() {
       
       if(this.operator != null) {
            this.previousOperandEl.innerText = this.previousNumber + " " + this.operator + this.currentNumber
       }
       this.currentOperandEl.innerText = this.currentNumber;
    }

    updateDisplay() {
        
    }


    calculate() {
        let result; 

        const firstNumber = parseFloat(this.previousNumber)
        const secondNumber = parseFloat(this.currentNumber)

        if(isNaN(firstNumber) || isNaN(secondNumber)) {return}

        switch(this.operator) {
            case '*': 
                result =  firstNumber * secondNumber;
                
                break;
            case '÷': 
                result =  firstNumber / secondNumber;
               
                break;
            case '+': 
                result =  firstNumber + secondNumber;
               
                break;
            case '-': 
                result =  firstNumber - secondNumber;
                
                break;
            case '%': 
                result =  (firstNumber / 100 * secondNumber);
                
                break;
            default: 
                return;
        }

        this.currentNumber = result
        this.operator = undefined
        this.previousNumber = ''
    }

}




const previousOperandEl = document.querySelector('[data-previous-operand]')
const currentOperandEl = document.querySelector('[data-current-operand]')
const operators = document.querySelectorAll('[data-operator]')
const dataNumbersBtn = document.querySelectorAll('[data-number]')
const allClearBtn= document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const dataEqualsBtn = document.querySelector('[data-equals]')


const calculator = new Calculator(previousOperandEl, currentOperandEl)


dataNumbersBtn.forEach((numberBtn )=>{
    numberBtn.addEventListener('click', e=>{
        calculator.setNumber(e.target.innerText)
        calculator.updateDOM()
    })
})


allClearBtn.addEventListener('click', (e) => {
    calculator.clear()
    calculator.updateDOM()
})


deleteBtn.addEventListener('click', e=> {
    calculator.deleteNumber()
    calculator.updateDOM()
})

operators.forEach(operator => {
    operator.addEventListener('click', e => {
        calculator.selectOperator(e.target.innerText)
        calculator.updateDOM()
    })
})

dataEqualsBtn.addEventListener('click', e=> {
    calculator.calculate()
    calculator.updateDOM()
})