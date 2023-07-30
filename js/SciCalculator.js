//Seleccion de elementos
const input_element = document.querySelector('.input');
const output_operation_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');

//Variables
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL";
let data = {
    operation : [],
    formula : []
}

let ans = 0;

//Botones de la calculadora
let calculatorButtons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },{
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },{
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "mathFunction"
    },{
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "mathFunction"
    },{
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },{
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },{
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigoFunction"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigoFunction"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigoFunction"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },{
        name : "acos",
        symbol : "acos",
        formula : "invTrigo(Math.acos,",
        type : "trigoFunction"
    },{
        name : "asin",
        symbol : "asin",
        formula : "invTrigo(Math.asin,",
        type : "trigoFunction"
    },{
        name : "atan",
        symbol : "atan",
        formula : "invTrigo(Math.atan,",
        type : "trigoFunction"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "x!",
        formula : FACTORIAL,
        type : "mathFunction"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "mathFunction"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "mathFunction"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "mathFunction"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "mathFunction"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

//Crear Botones de Calculadora
function createCalculatorButtons(){
    const btnsPerRow = 8;
    let addedBtns = 0;

    calculatorButtons.forEach( button => {
        if(addedBtns % btnsPerRow == 0){
            input_element.innerHTML += `<div class="row"></div>`;
        }

        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                        </button>`;
        
        addedBtns++;
    })
}
createCalculatorButtons();

//RAD Y DEG
let RADIAN = true;

const radBtn = document.getElementById("rad");
const degBtn = document.getElementById("deg");

radBtn.classList.add("active-angle");

function angleToggler(){
    radBtn.classList.toggle("active-angle");
    degBtn.classList.toggle("active-angle");
}

//Click event listener
input_element.addEventListener("click", event =>{
    const targetBtn = event.target;

    calculatorButtons.forEach(button => {
        if(button.name == targetBtn.id) calculator(button);
    })
})

//Calculadora
function calculator(button){
    if(button.type == "operator"){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    }else if(button.type == "number"){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    }else if(button.type == "trigoFunction"){
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);

    }else if(button.type == "mathFunction"){
        let symbol, formula;
        if(button.name == "factorial"){
            symbol = "!";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula)

        }else if( button.name == "power"){
            symbol = "^(";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);

        }else if( button.name == "square"){
            symbol = "^(";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);

            data.operation.push("2)");
            data.formula.push("2)");
       }else{
            symbol = button.symbol + "(";
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
       }       
    }else if(button.type == "key"){
        if (button.name == "clear"){
            data.operation = [];
            data.formula = [];

            updateOutputResult(0);
        }else if(button.name == "delete"){
            data.operation.pop();
            data.formula.pop();
        }else if(button.name == "rad"){
            RADIAN = true;
            angleToggler();
        }else if(button.name == "deg"){
            RADIAN = false;
            angleToggler();
        }
    }else if(button.type == "calculate"){
        formulaStr = data.formula.join('');

        //Buscar factoriales y funciones de potencias
        let POWER_SEARCH_RESULT = search(data.formula, POWER);
        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

        //Obtener bases de potencias y reemplazar por la formula correcta
        const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
        BASES.forEach( base =>{
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";

            formulaStr = formulaStr.replace(toReplace, replacement);
        })

        //Obtener numero factorial y reemplazar por la formula correcta
        const NUMBERS = factorialNumberGetter(data.formula, FACTORIAL_SEARCH_RESULT);
        NUMBERS.forEach(factorial =>{
            formulaStr = formulaStr.replace(factorial.toReplace, factorial.replacement);
        })

        //Calcular
        let result;
        try{
            result = eval(formulaStr);
        }catch(error){
            if(error instanceof SyntaxError){
                result = "Syntax Error!";
                updateOutputResult(result);
                return;
            }
        }

        //Guardar resultado en boton ANS
        ans = result;
        data.operation = [result];
        data.formula = [result];

        updateOutputResult(result);
        return;
    }

    updateOutputOperation(data.operation.join(''));
}

//Factorial number getter
function factorialNumberGetter(formula, FACTORIAL_SEARCH_RESULT){
    let numbers = []; //Guarda todos los numeros en el mismo array
    let factorialSequence = 0;

    FACTORIAL_SEARCH_RESULT.forEach(factorialIndex =>{
        let number = []; //Numero factorial actual

        let nextIndex = factorialIndex + 1;
        let nextInput = formula[nextIndex];

        if(nextInput == FACTORIAL){
            factorialSequence += 1;
            return
        }

        //Si hay una secuencia obtenemos el indice de la primer funcion factorial
        let firstFactorialIndex = factorialIndex - factorialSequence;
        //Obtener el numero anterior a la misma
        let previousIndex = firstFactorialIndex -1;
        let parenthesesCount = 0;

        while(previousIndex >= 0){

            if(formula[previousIndex] == "(" ) parenthesesCount--;
            if(formula[previousIndex] == ")" ) parenthesesCount++;

            let isOperator = false;
            OPERATORS.forEach(  OPERATOR =>{
                if(formula[previousIndex] == OPERATOR ) isOperator = true;
            })

            if(isOperator && parenthesesCount == 0) break;

            number.unshift( formula[previousIndex] );
            previousIndex--;
        }

        let numberStr = number.join('');
        const factorial = "factorial(", closeParenthesis = ")"
        let times = factorialSequence + 1;

        let toReplace = numberStr + FACTORIAL.repeat(times);
        let replacement = factorial.repeat(times) + numberStr + closeParenthesis.repeat(times);

        numbers.push({
            toReplace : toReplace,
            replacement : replacement
        })

        //Reset factorialSequence
        factorialSequence = 0;
    })

    return numbers;
}

//Obtener base de potencias
function powerBaseGetter(formula, POWER_SEARCH_RESULT){
    let powerBases = [] //Guarda todas las bases en el mismo array

    POWER_SEARCH_RESULT.forEach( powerIndex => {
        let base = [] //Base actual

        let parenthesesCount = 0;

        let previousIndex = powerIndex - 1;

        while(previousIndex >= 0){

            if(formula[previousIndex] == "(" ) parenthesesCount--;
            if(formula[previousIndex] == ")" ) parenthesesCount++;

            let isOperator = false;
            OPERATORS.forEach(  OPERATOR =>{
                if(formula[previousIndex] == OPERATOR ) isOperator = true;
            })
        

            let isPower = formula[previousIndex] == POWER;

            if((isOperator && parenthesesCount == 0) || isPower) break;

            base.unshift( formula[previousIndex] );
            previousIndex--;
        }

        powerBases.push(base.join('') );
    })

    return powerBases;
}

//Buscar Array
function search(array, keyword){
    let searchResult = [];

    array.forEach((element, index) =>{
        if(element == keyword) searchResult.push(index);
    })

    return searchResult;
}


//Actualizar output
function updateOutputOperation(operation){
    output_operation_element.innerHTML = operation;
}
function updateOutputResult(result){
    output_result_element.innerHTML = result;
}

//Funcion Factorial
function factorial(number){
    if(number === 0 || number === 1) return 1;
    if(number % 1 != 0) return gamma(number + 1);

    let result = 1;
    for(let i = 1; i <= number; i++){
        result *= i;
        if(result === Infinity) return Infinity
    }
    return result;
}

//Función Gamma
function gamma(n) {
    var g = 7,
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

//Funciones Trigonometricas
function trigo(callback, angle){
    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return callback(angle)
}
function invTrigo(callback, value){
    let angle = callback(value);

    if(!RADIAN){
        angle = angle * 180/Math.PI;
    }
    return angle;
}