const hourEl = document.querySelector(".hour");
const minEl = document.querySelector('.min');
const displayEl = document.querySelector('.display');

const acEL = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');
const addition = document.querySelector('.addition');
const subtraction = document.querySelector('.subtraction');
const division = document.querySelector('.division');
const multiply = document.querySelector('.multiplication');
const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');

const num1 = document.querySelector('.number-1');
const num2 = document.querySelector('.number-2')
const num3 = document.querySelector('.number-3')
const num4 = document.querySelector('.number-4')
const num5 = document.querySelector('.number-5')
const num6 = document.querySelector('.number-6')
const num7 = document.querySelector('.number-7')
const num8 = document.querySelector('.number-8')
const num9 = document.querySelector('.number-9')
const num0 = document.querySelector('.number-0')

const numberArray = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];

//variables
let valueStoredInMem = null;
let operatorInMem = null;

// functions

const getValueStr = () => {
    const currentDisplayStr = displayEl.textContent;
    return currentDisplayStr.split(',').join('');
};
const getValueNum = () => {
    return parseFloat(getValueStr());
};

const getResultOfOperationAsString = () => {
    const currentValueNum = getValueNum();

    const valueNumInMem = parseFloat(valueStoredInMem);

    let newValueNum;

    if (operatorInMem === "addition") {
        newValueNum = valueNumInMem + currentValueNum;
    } else if(operatorInMem === "subtraction") {
        newValueNum = valueNumInMem - currentValueNum;
    } else if(operatorInMem === "multiplication") {
        newValueNum = valueNumInMem * currentValueNum;
    } else if(operatorInMem === "division") {
        newValueNum = valueNumInMem / currentValueNum;
    } 
    return newValueNum.toString();
};

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getValueStr();
    if (currentDisplayStr === "0"){
        setStringValue(numStr);
    } else {
        setStringValue(currentDisplayStr + numStr);
    }
};
const handleOperatorClick = (operation) => {
    const currentValueStr = getValueStr();

    if (!valueStoredInMem) {
        valueStoredInMem = currentValueStr;
        operatorInMem = operation;
        setStringValue('0');
        return;
    }

    valueStoredInMem = getResultOfOperationAsString
    operatorInMem = operation;
    setStringValue('0');
};



const setStringValue = (valueStr) => {
    if (valueStr[valueStr.length -1] === ".") {
        displayEl.textContent += '.';
        return;
    };

const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else
        displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
};




//add event listeners to functions

acEL.addEventListener('click', () => {
    setStringValue('0')
    valueStoredInMem = null;
    operatorInMem = null;
});
pmEl.addEventListener('click', () => {
    const currentValueNum = getValueNum();
    const currentValueStr = getValueStr();

    if (currentValueStr === '-0') {
        setStringValue('0');
        return;
    }

    if (currentValueNum >= 0) {
        setStringValue('-' + currentValueStr);
    } else {
        setStringValue(currentValueStr.substring(1));
    }

});
percentEl.addEventListener('click', () => {
    const currentValueNum = getValueNum();
    const newValueNum = currentValueNum / 100;
    setStringValue(newValueNum.toString());
    valueStoredInMem = null;
    operatorInMem = null;
});

// add event listeners to operators

addition.addEventListener('click', () => {
    handleOperatorClick('addition');
});
subtraction.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});
multiply.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});
division.addEventListener('click', () => {
    handleOperatorClick('division');
});
equal.addEventListener('click', () => {
    if (valueStoredInMem) {
        setStringValue(getResultOfOperationAsString());
        valueStoredInMem = null;
        operatorInMem = null;
        
    }
});


// add event listeners # and .
for (let i=0; i < numberArray.length; i++) {
    const numberEL = numberArray[i];
    numberEL.addEventListener('click', () => {
        handleNumberClick(i.toString());

    })
}
decimal.addEventListener('click',() => {
    const currentValueAsAtring = getValueStr();
    if (!currentValueAsAtring.includes('.')) {
       setStringValue(currentValueAsAtring + '.');
    }

});



//time

const updateTime = () => {
    const time = new Date();
    let currentHour = time.getHours();
    const currentMin = time.getMinutes();

    if (currentHour > 12){
        currentHour = currentHour - 12;
    }

    hourEl.textContent = currentHour.toString();
    
    minEl.textContent = currentMin.toString().padStart(2, "0");
}
    
setInterval(updateTime, 1000)
updateTime();


