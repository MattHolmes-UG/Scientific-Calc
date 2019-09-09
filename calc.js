const input = document.querySelector("input");
const display = document.querySelector("#inputLabel");
const ints = document.querySelectorAll('.int');
const int = document.querySelectorAll('.eqn1'); //for simultaneous 1
const ints2 = document.querySelectorAll('.eqn2'); //for simultaneous 2
const equalTo = document.querySelector('#equalTo');

//focus on input after pageload
display.innerHTML = '0';
window.onload = ()=>{input.focus();}

//get the input from keyboard directly or input or from ui btns clicked
const check = (char) => {
    //prevent alphabets
    const valid = /[0-9]|(Backspace)|(Shift)|\+|-|\*|\//.test(char);
    if(valid){
      return true;
    } else {
      event.preventDefault();
    }
}

input.addEventListener('keypress', (event) => {
    const char = event.key;
    check(char);
});

const solveQuad = () => {
    const a = Number(ints[0].value),
    b = Number(ints[1].value),
    c = Number(ints[2].value);
    let sqrt = Math.sqrt(b*b - (4*a*c));
    let x1,x2;
    x1 = eval((-b-sqrt)/(2*a));
    x2 = eval((-b+sqrt)/(2*a));
    display.innerHTML = `<p>x<sub>1</sub> = ${x1}</p><p>x<sub>2</sub> = ${x2}</p>`
} 

const solveSim = () => {
    let eqn1 = [Number(int[0].value), Number(int[1].value), Number(int[2].value)], 
        eqn2 = [Number(ints2[0].value), Number(ints2[1].value), Number(ints2[2].value)];
    eqn11 = eqn1.map((i)=>{return eqn2[0]*i});
    eqn21 = eqn2.map((i)=>{return eqn1[0]*i});
    const y = (eqn11[2]-eqn21[2])/(eqn11[1]-eqn21[1]);
    const x = (eqn1[2]-(eqn1[1]*(y)))/eqn1[0];
    display.innerHTML = `<p>x = ${x}</p><p>y = ${y}</p>`
}

//to evaluate the expression when user presses enter
document.addEventListener('keypress', (event)=>{
    if(event.key==="Enter"){pushBtn(equalTo);}
});

const pushBtn = (obj) => {
    const pushed = obj.innerHTML;
    const toDeg =  3.1416/180; //to convert degrees to radians
    const toRad = 180/3.14159;

    //Change conditional statement to switch not if else
    switch(pushed){
        case 'AC':
            display.innerHTML = '0';
            input.value = "";
            document.querySelector("#input").style.display = "table-row";
            document.querySelector('#quadInput').style.display = "none";
            document.querySelector('#simul').style.display = "none";
            input.focus();
            break;
        case '=':
            try {
                display.innerHTML = eval(input.value);
            } catch (error) {
                display.innerHTML = "Error - Please make sure the expression is valid";
            }
            break;
        case 'sin':
            display.innerHTML = Math.sin(input.value*toDeg);
            input.value = `sin(${input.value})`;
            break;
        case 'cos':
            display.innerHTML = Math.cos(input.value*toDeg);
            input.value = `cos(${input.value})`;
            break;
        case 'tan':
            display.innerHTML = Math.tan(input.value*toDeg);
            input.value = `tan(${input.value})`;
            break;
        // case 'sin':
        // case 'cos':
        // case 'tan':
        //     let trigex = Number(`Math.${pushed}(${input.value}*${toDeg})`);
        //     display.innerHTML = trigex;
        //     input.value = `${pushed}(${input.value})`;
        //     break;
        case '^2':
            display.innerHTML = Math.pow(input.value,2);
            input.value = `${input.value}^2`;
            break;
        case '^3':
            display.innerHTML = Math.pow(input.value,3);
            input.value = `${input.value}^3`;
            break;
        case 'exp':
            display.innerHTML = Math.exp(input.value,2);
            input.value = `exp(${input.value})`;
            break;
        case 'log':
            display.innerHTML = Math.log10(input.value);
            input.value = `log(${input.value})`;
            break;
        case 'sin<sup>-1</sup>':
            display.innerHTML = Math.asin(input.value)*toRad;
            input.value = `asin(${input.value})`;
            break;
        case 'cos<sup>-1</sup>':
            display.innerHTML = Math.acos(input.value)*toRad;
            input.value = `acos(${input.value})`;
            break;
        case 'tan<sup>-1</sup>':
            display.innerHTML = Math.atan(input.value)*toRad;
            input.value = `atan(${input.value})`;
            break;
        case 'sqrt':
            display.innerHTML = Math.sqrt(input.value,2);
            input.value = `sqrt(${input.value})`;
            break;
        case '!':
            let x = Number(input.value);
            let factorial = 1;
            while(x>1){
                factorial *= x;
                x--;
            }
            display.innerHTML = factorial;
            input.value = `${input.value}!`
            break;
        case 'simul':
        case 'quad':
            document.querySelector("#input").style.display = "none";
            const visible = pushed ==='quad'?"block":"none",
                visSim = pushed === 'simul'?"block":"none";
            document.querySelector('#quadInput').style.display = visible;
            document.querySelector('#simul').style.display = visSim;
            
            ints[0].focus();
            int[0].focus();
        case 'del':
            input.value = input.value.slice(0, input.value.length - 1);
            input.focus();
            break;
        default:
            input.value += pushed;
    }
}