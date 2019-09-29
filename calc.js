const inputDisplay = document.querySelector("#input");
const display = document.querySelector("#inputLabel");
const ints = document.querySelectorAll('.int');
const int = document.querySelectorAll('.eqn1'); //for simultaneous 1
const ints2 = document.querySelectorAll('.eqn2'); //for simultaneous 2

const previousExp = []; //to store the previous expressions
let ans = 0; //to store the answer

//focus on input after pageload
display.innerHTML = '0';
window.onload = () => { inputDisplay.focus(); }

//get the input from keyboard directly or input or from ui btns clicked
const check = (char) => {
  //prevent alphabets
  const valid = /[0-9]|(Backspace)|(Shift)|[asitlogcpPCAexn+.!-*^/,]|(Shift+C)|(Shift+P)|(Shift+A)/.test(char);
  if (valid) {
    return true;
  } else {
    event.preventDefault();
  }
}

input.addEventListener('keypress', (event) => {
  const char = event.key;
  if (event.key === "Enter") { event.preventDefault(); }
  check(char);
});

const mean = () => {
  const ArrayOfVals = document.querySelector('#meanInput').value.split(',');
  const sum = ArrayOfVals.reduce((total, num) => {
    return total + Number(num);
  }, 0);
  const amtOfNums = ArrayOfVals.length;
  const mean = sum/amtOfNums;
  display.innerHTML = `The mean = ${mean}`;
  // pushBtn({value: 'AC'});
}

const solveQuad = () => {
  const a = Number(ints[0].value),
    b = Number(ints[1].value),
    c = Number(ints[2].value);
  let sqrt = Math.sqrt(b * b - (4 * a * c));
  let x1, x2;
  x1 = eval((-b - sqrt) / (2 * a));
  x2 = eval((-b + sqrt) / (2 * a));
  display.innerHTML = `<p>x<sub>1</sub> = ${x1}</p><p>x<sub>2</sub> = ${x2}</p>`
}

const solveSim = () => {
  let eqn1 = [Number(int[0].value), Number(int[1].value), Number(int[2].value)],
    eqn2 = [Number(ints2[0].value), Number(ints2[1].value), Number(ints2[2].value)];
  eqn11 = eqn1.map((i) => { return eqn2[0] * i });
  eqn21 = eqn2.map((i) => { return eqn1[0] * i });
  const y = (eqn11[2] - eqn21[2]) / (eqn11[1] - eqn21[1]);
  const x = (eqn1[2] - (eqn1[1] * (y))) / eqn1[0];
  display.innerHTML = `<p>x = ${x}</p><p>y = ${y}</p>`
}
const triAbc = () => {
  const a = Number(document.querySelector('#tri_a').value),
    b = Number(document.querySelector('#tri_b').value),
    c = Number(document.querySelector('#tri_c').value);
  const s = (a+b+c)/2;
  const Area = Math.sqrt(s*(s-a)*(s-b)*(s-c));
  display.innerHTML = `Triangle with a = ${a}, b = ${b}, c = ${c} is ${Area}`;
}
const triAng = () => {
  const a = Number(document.querySelector('#triA_a').value),
    b = Number(document.querySelector('#triA_b').value),
    C = Number(document.querySelector('#ang_c').value);
  const Area = 0.5 * (a * b * (Math.sin(C * 3.1416 / 180)));
  display.innerHTML = `Triangle a = ${a}, b = ${b}, &ang;C = ${C} Area = ${Area}`;
}
const triHeight = () => {
  const b = Number(document.querySelector('#Hb').value),
    h = Number(document.querySelector('#h').value);
  const Area = 0.5 * b * h;
  display.innerHTML = `Triangle b = ${b} and h = ${h} Area = ${Area}`;
}
const rectangle = () => {
  const b = Number(document.querySelector('#rect_b').value),
    l = Number(document.querySelector('#rect_l').value);
  const Area = b * l;
  display.innerHTML = `Rectangle b = ${b} and l = ${l} Area = ${Area}`;
}
const circle = () => {
  const r = Number(document.querySelector('#circle_r').value);
  const Area = r * r * Math.PI;
  display.innerHTML = `Circle r = ${r} Area = ${Area}`;
}
const sphere = () => {
  const r = Number(document.querySelector('#sphere_r').value);
  const Area = 4 *r * r * Math.PI;
  display.innerHTML = `Sphere r = ${r} Area = ${Area}`;
}
const cone = () => {
  const r = Number(document.querySelector('#cone_r').value),
    l = Number(document.querySelector('#cone_r').value);
  const Area = (r * l * Math.PI) + (r * r * Math.PI);
  display.innerHTML = `Cone r = ${r} & l = ${l} Area = ${Area}`;
}
const cylinder = () => {
  const r = Number(document.querySelector('#cyl_r').value),
    h = Number(document.querySelector('#cyl_h').value);
  const Area = (2 * Math.PI * r *h);
  display.innerHTML = `Cylinder r = ${r} & h = ${h} Area = ${Area}`;
}
const sector = () => {
  const r = Number(document.querySelector('#sec_r').value),
    theta = Number(document.querySelector('#theta').value);
  const Area = (theta/360 * Math.PI * r * r);
  display.innerHTML = `Sector r = ${r} & &theta; = ${theta} Area = ${Area}`;
}
const trapezium = () => {
  const a = Number(document.querySelector('#trap_a').value),
    b = Number(document.querySelector('#trap_b').value),
    h = Number(document.querySelector('#trap_h').value);
  const Area = ((a + b) *h)/2;
  display.innerHTML = `Trapezium a = ${a} b = ${b} & h = ${h} Area = ${Area}`;
}

const evaluate = function () {
  let input = inputDisplay.innerHTML;
  previousExp.push(input);
  input = input.replace(/\)\(/g, ')*(');
  input = input.replace(/\%/g, '/100');
  input = input.replace(/Ans/g, ans);
  input = input.replace(/log\<sub\>2\<\/sub\>/g, 'lgtwo');
  //replace sin or cos<sup></sup> with asin or acos
  if (/(sin|cos|tan)<\w+>\-1<\/\w+>/.test(input)) {
    if (/(sin)<\w+>\-1<\/\w+>/.test(input)) {
      input = input.replace(/(sin)<\w+>\-1<\/\w+>/g, 'asin');
    } else if (/(cos)<\w+>\-1<\/\w+>/.test(input)) {
      input = input.replace(/(cos)<\w+>\-1<\/\w+>/g, 'acos');
    } else if (/(tan)<\w+>\-1<\/\w+>/.test(input)) {
      input = input.replace(/(tan)<\w+>\-1<\/\w+>/g, 'atan');
    }
  }
  if (/\d+(\.\d+)?<\w+>\-1<\/\w+>/.test(input)) {
    const matches = input.match(/\d+(\.\d+)?<\w+>\-1<\/\w+>/g);
    console.log('number of matches: ', matches.length);
    if (matches.length > 1) {
      for (let i = 0; i < matches.length; i++) {
        input = input.replace(/<\w+>\-1<\/\w+>/, 'm1');
      }
    }
    input = input.replace(/<\w+>\-1<\/\w+>/, 'm1');
  }
  if (/\^\-/.test(input)) { input = input.replace(/\^\-/g, 'm'); } //to replace 9² with 9p2
  if (/\^/.test(input)) { input = input.replace(/\^/g, 'p'); } //to replace 9² with 9p2
  if (/\²/.test(input)) { input = input.replace(/\²/g, 'p2'); } //to replace 9² with 9p2
  if (/\³/.test(input)) { input = input.replace(/\³/g, 'p3'); } //to replace 8³ with 8p3
  if (/(\)|\d+(\.\d+)?)x/.test(input)) { //to replace x with *
    input = input.replace(/\)x/g, ')*');
    const matches = input.match(/(\)|\d+(\.\d+)?)x/g);
    if (matches !== null) {
      matches.forEach((match, index) => {
        const digit = match.match(/\d+(\.\d+)?/)[0];
        input = input.replace(match, `${digit}*`);
      });
    }
  }
  if (/(\)|\d+(\.\d+)?)\π/.test(input)) { //to replace 3π or )π with 3*π
    input = input.replace(/\)π/g, ')*π');
    const matches = input.match(/(\)|\d+(\.\d+)?)\π/g);
    if (matches !== null) {
      matches.forEach((match, index) => {
        const digit = match.match(/\d+(\.\d+)?/)[0];
        input = input.replace(match, `${digit}*π`);
      });
    }
  }
  console.log(input);
  if (/\d+(\.\d+)?\(/.test(input)) { //to replace 9( with 9*(
    const matches = input.match(/\d+(\.\d+)?\(/g);
    matches.forEach((match, index) => {
      const digit = match.match(/\d+(\.\d+)?/)[0];
      input = input.replace(match, `${digit}*(`);
    });
  }
  if (/(\d+(\.\d+)?|\))(\∛|\√)/.test(input)) { //to turn 9cos to 9*cos 9²8³∛(√(
    input = input.replace(/\∛/g, '*∛');
    input = input.replace(/\√/g, '*√');
    console.log('replacer block gave: ', input);
  }
  input = input.replace(/\π/g, Math.PI);
  //Solve squares, roots, P and likes before getting and splitting input arr
  const squareRoot = (x) => {
    return Math.sqrt(Number(x));
  }
  const cubicRoot = (x) => {
    return Math.cbrt(Number(x));
  }
  const factorial = (x) => {
    x = Number(x);
    let factorial = 1;
    while (x > 1) {
      factorial *= x;
      x--;
    }
    return factorial;
  }
  const permutate = (n, r) => {//n!/(n-r)!
    return eval(factorial(n) / factorial(n - r));
  }
  const combine = (n, r) => {//n!/((n-r)!*r!)
    return eval(factorial(n) / (factorial(n - r) * factorial(r)));
  }
  const mega_regex = (str, fl) => {
    return new RegExp(str.replace(/\s/g, ''));
  }
  const eqnRegex = mega_regex(`
              (?<![a-zA-Z∛√])\\([-+]{0,1}\\d+(\\.\\d+)?(?![a-zA-Z(])\\)
            |  (?<![a-zA-Z])\\d+(\\.\\d+)?\\/\\d+(\\.\\d+)?(?![a-zA-Z(]) 
            |  (?<![a-zA-Z])\\d+(\\.\\d+)?\\*\\d+(\\.\\d+)?(?![a-zA-Z(])
            |  (?<![a-zA-Z])\\d+(\\.\\d+)?\\+\\d+(\\.\\d+)?(?![a-zA-Z(])
            |  (?<![a-zA-Z])\\d+(\\.\\d+)?\\-\\d+(\\.\\d+)?(?![a-zA-Z(])
            |  (?<![a-zA-Z])ep\\d+(\\.\\d+)?
            |  (?<![a-zA-Z])\\d+(\\.\\d+)?(p|m|C|P)\\d+(\\.\\d+)?
            |  (?<![a-zA-Z])\\d+(\\.\\d+)?\\!
            |  (\\∛|\\√)\\(\\d+(\\.\\d+)?\\)
            |  (?<![a-zA-Z])(sin|cos|tan|asin|acos|tan|exp|log|Ln)\\(\\d+(\\.\\d+)?\\)
        `);
  //for squares
  const checkInp = (equation) => {
    const toDeg = 3.1416 / 180; //to convert degrees to radians
    const toRad = 180 / 3.14159;
    if (/\(|\)/.test(equation)) {
      console.log('Bracket present');
      const openBracNum = (equation.match(/\(/g) !== null) ? equation.match(/\(/g).length : 0;
      const closeBracNum = (equation.match(/\)/g) !== null) ? equation.match(/\)/g).length : 0;
      console.log(openBracNum, closeBracNum);
      const diff = openBracNum - closeBracNum;
      for (let i = 0; i < diff; i++) {
        if (openBracNum === closeBracNum) {
          equation = equation;
        } else if (openBracNum > closeBracNum) {
          equation = `${equation})`;
        } else if (openBracNum < closeBracNum) {
          equation = `(${equation}`;
        }
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?C\d+(\.\d+)?/.test(equation)) { //for nCr
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?C\d+(\.\d+)?/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const valArr = matches[i].split('C');
        const n = valArr[0].match(/\d+(\.\d+)?/)[0];
        const r = valArr[1].match(/\d+(\.\d+)?/)[0];
        rslt = combine(n, r);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?C\d+(\.\d+)?/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?P\d+(\.\d+)?/.test(equation)) { //for nPr
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?P\d+(\.\d+)?/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const valArr = matches[i].split('P');
        const n = valArr[0].match(/\d+(\.\d+)?/)[0];
        const r = valArr[1].match(/\d+(\.\d+)?/)[0];
        rslt = permutate(n, r);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?P\d+(\.\d+)?/, `${rslt}`);
      }
    }
    //BODMAS first
    if (/(?<![a-zA-Z∛√])\([-+]{0,1}\d+(\.\d+)?(?![a-zA-Z(])\)/.test(equation)) {//for single nums in brackets
      let matches = equation.match(/(?<![a-zA-Z∛√])\([-+]{0,1}\d+(\.\d+)?(?![a-zA-Z(])\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        let match = equation.match(/(?<![a-zA-Z∛√])\([-+]{0,1}\d+(\.\d+)?(?![a-zA-Z(])\)/)[0];
        rslt = eval(match);
        equation = equation.replace(/(?<![a-zA-Z∛√])\([-+]{0,1}\d+(\.\d+)?(?![a-zA-Z(])\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?\/\d+(\.\d+)?(?![a-zA-Z(*])/.test(equation)) {//for divisions
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\/\d+(\.\d+)?(?![a-zA-Z(*])/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        let match = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\/\d+(\.\d+)?(?![a-zA-Z(*])/)[0];
        rslt = eval(match);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?\/\d+(\.\d+)?(?![a-zA-Z(*])/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?\*\d+(\.\d+)?(?![a-zA-Z(*])/.test(equation)) {//for multiplication
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\*\d+(\.\d+)?(?![a-zA-Z(*])/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        let match = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\*\d+(\.\d+)?(?![a-zA-Z(*])/)[0];
        rslt = eval(match);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?\*\d+(\.\d+)?(?![a-zA-Z(*])/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?\+\d+(\.\d+)?(?![a-zA-Z(])/.test(equation)) {//for addition
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\+\d+(\.\d+)?(?![a-zA-Z(*])/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        let match = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\+\d+(\.\d+)?(?![a-zA-Z(*])/)[0];
        rslt = eval(match);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?\+\d+(\.\d+)?(?![a-zA-Z(*])/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?\-\d+(\.\d+)?(?![a-zA-Z(*])/.test(equation)) {//for subtraction
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\-\d+(\.\d+)?(?![a-zA-Z(*])/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        let match = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\-\d+(\.\d+)?(?![a-zA-Z(*])/)[0];
        rslt = eval(match);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?\-\d+(\.\d+)?(?![a-zA-Z(*])/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?p\d+(\.\d+)?/.test(equation)) { //for x^y and ()
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?p\d+(\.\d+)?/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const valArr = matches[i].split('p');
        const val0 = valArr[0].match(/\d+(\.\d+)?/)[0];
        const val1 = valArr[1].match(/\d+(\.\d+)?/)[0];
        console.log('vals', val0, val1);
        rslt = Math.pow(Number(val0), Number(val1));
        console.log('rslt: ', rslt);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?p\d+(\.\d+)?/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])ep\d+(\.\d+)?/.test(equation)) { //for e^y and ()
      let matches = equation.match(/(?<![a-zA-Z])ep\d+(\.\d+)?/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const valArr = matches[i].split('p');
        const val = valArr[1].match(/\d+(\.\d+)?/)[0];
        rslt = Math.exp(Number(val));
        console.log('rslt: ', rslt);
        equation = equation.replace(/(?<![a-zA-Z])ep\d+(\.\d+)?/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?m\d+(\.\d+)?/.test(equation)) { //for x^-1
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?m\d+(\.\d+)?/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const valArr = matches[i].split('m');
        const val0 = valArr[0].match(/\d+(\.\d+)?/)[0];
        const val1 = valArr[1].match(/\d+(\.\d+)?/)[0];
        console.log('vals', val0, val1);
        rslt = Math.pow(Number(val0), -Number(val1));
        console.log('rslt: ', rslt);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?m\d+(\.\d+)?/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])\d+(\.\d+)?\!/.test(equation)) { //for factorial
      let matches = equation.match(/(?<![a-zA-Z])\d+(\.\d+)?\!/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const valArr = matches[i].split('!');
        const val = valArr[0].match(/\d+(\.\d+)?/)[0];
        let x = Number(val);
        rslt = factorial(x);
        equation = equation.replace(/(?<![a-zA-Z])\d+(\.\d+)?\!/, `${rslt}`);
      }
    }
    if (/\√\(\d+(\.\d+)?\)/.test(equation)) { //9²8³∛(√(
      let matches = equation.match(/\√\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        const replacee = new RegExp(`\\√\\(${val}\\)`, 'g');
        rslt = squareRoot(val);
        equation = equation.replace(replacee, rslt);
      }
    }
    if (/\∛\(\d+(\.\d+)?\)/i.test(equation)) { //9²8³∛(√(
      let matches = equation.match(/\∛\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        const replacee = new RegExp(`\\∛\\(${val}\\)`, 'g');
        rslt = cubicRoot(val);
        equation = equation.replace(replacee, rslt);
      }
    }
    if (/(?<![a-zA-Z])sin\(\d+(\.\d+)?\)/i.test(equation)) { //sin(67)
      let matches = equation.match(/(?<![a-zA-Z])sin\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.sin(Number(val) * toDeg);
        equation = equation.replace(/(?<![a-zA-Z])sin\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])cos\(\d+(\.\d+)?\)/i.test(equation)) { //cos(67)
      let matches = equation.match(/(?<![a-zA-Z])cos\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.cos(Number(val) * toDeg);
        equation = equation.replace(/(?<![a-zA-Z])cos\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])tan\(\d+(\.\d+)?\)/i.test(equation)) { //tan(67)
      let matches = equation.match(/(?<![a-zA-Z])tan\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.tan(Number(val) * toDeg);
        equation = equation.replace(/(?<![a-zA-Z])tan\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])asin\(\d+(\.\d+)?\)/i.test(equation)) { //asin(67)
      let matches = equation.match(/(?<![a-zA-Z])asin\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.asin(Number(val)) * toRad;
        equation = equation.replace(/(?<![a-zA-Z])asin\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])acos\(\d+(\.\d+)?\)/i.test(equation)) { //acos(67)
      let matches = equation.match(/(?<![a-zA-Z])acos\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.acos(Number(val)) * toRad;
        equation = equation.replace(/(?<![a-zA-Z])acos\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])atan\(\d+(\.\d+)?\)/i.test(equation)) { //atan(67)
      let matches = equation.match(/(?<![a-zA-Z])atan\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.atan(Number(val)) * toRad;
        equation = equation.replace(/(?<![a-zA-Z])atan\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])log\(\d+(\.\d+)?\)/i.test(equation)) { //log(67)
      let matches = equation.match(/(?<![a-zA-Z])log\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.log10(Number(val));
        equation = equation.replace(/(?<![a-zA-Z])log\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])Ln\(\d+(\.\d+)?\)/i.test(equation)) { //Ln(67)
      let matches = equation.match(/(?<![a-zA-Z])Ln\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.log(Number(val));
        equation = equation.replace(/(?<![a-zA-Z])Ln\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])lgtwo\(\d+(\.\d+)?\)/i.test(equation)) { //log2(67)
      let matches = equation.match(/(?<![a-zA-Z])lgtwo\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.log2(Number(val));
        equation = equation.replace(/(?<![a-zA-Z])lgtwo\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (/(?<![a-zA-Z])exp\(\d+(\.\d+)?\)/i.test(equation)) { //exp(67)
      let matches = equation.match(/(?<![a-zA-Z])exp\(\d+(\.\d+)?\)/g);
      matches = [...new Set(matches)];
      let rslt = 0;
      for (let i = 0; i < matches.length; i++) {
        const val = matches[i].match(/\d+(\.\d+)?/)[0];
        rslt = Math.exp(Number(val));
        equation = equation.replace(/(?<![a-zA-Z])exp\(\d+(\.\d+)?\)/, `${rslt}`);
      }
    }
    if (eqnRegex.test(equation) === true) {
      console.log(true, equation);
      equation = checkInp(equation);
    }
    try {
      equation = eval(equation);
      return equation;
    } catch (error) {
      console.log('error in check try block');
      return display.innerHTML = 'Error, invalid expression';
    }
  }
  try {
    console.log(input);
    result = eval(input);
  } catch (error) {
    console.log('catch block');
    result = checkInp(input);
  }
  display.innerHTML = result;
  inputDisplay.innerHTML = '';
  ans = result;
  console.log(previousExp);
  console.log(ans);
}
const prevExp = function () {
  let index = 1;
  return function (n) {
    if (previousExp.length === 0) { return; }
    index += n;
    if (index > previousExp.length) { index = 1; }
    if (index === 0) { index = previousExp.length; }
    inputDisplay.innerHTML = previousExp[index - 1];
    return index;
  }
}();
const pushBtn = (obj) => {
  const pushed = obj.value || obj.innerHTML;
  const inpLen = inputDisplay.innerHTML.length;
  switch (pushed) {
    case 'AC':
      display.innerHTML = '0';
      inputDisplay.innerHTML = "";
      Array.from(document.querySelectorAll('.hide')).forEach((field) => {
        field.style.display = "none";
      });
      document.querySelector("#input").style.display = "block";
      inputDisplay.focus();
      break;
    case 'Del':
      if (inputDisplay.innerHTML[inpLen - 1] === '(') {
        if (/n|s|p|g/.test(inputDisplay.innerHTML[inpLen - 2])) { //to delete operands like cos and log
          inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0, inpLen - 4);
          break;
        } else if (/\∛|\√/.test(inputDisplay.innerHTML[inpLen - 2])) {
          inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0, inpLen - 2);
          break;
        }
      }
      inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0, inpLen - 1);
      //input.focus();
      break;
    case 'area':
    case 'prev':
    case 'Back':
      Array.from(document.querySelectorAll('.hide')).forEach((field) => {
        field.style.display = "none";
      });
      document.querySelector("#input").style.display = "none";
      document.querySelector('#areaSelect1').style.display = "block";
      break;
    case 'next':
      Array.from(document.querySelectorAll('.hide')).forEach((field) => {
        field.style.display = "none";
      });
      document.querySelector("#input").style.display = "none";
      document.querySelector('#areaSelect2').style.display = "block";
      break;
    case 'simul':
    case 'quadInput':
    case 'triSelect':
    case 'triHeight':
    case 'triAng':
    case 'triAbc':
    case 'sphere':
    case 'trapezium':
    case 'circle':
    case 'sector':
    case 'rectangle':
    case 'cone':
    case 'cylinder':
      Array.from(document.querySelectorAll('.hide')).forEach((field) => {
        field.style.display = "none";
      });
      document.querySelector("#input").style.display = "none";
      document.querySelector(`#${pushed}`).style.display = "block";
      ints[0].focus();
      int[0].focus();
      break;
    case 'mean':
      Array.from(document.querySelectorAll('.hide')).forEach((field) => {
        field.style.display = "none";
      });
      document.querySelector("#input").style.display = "none";
      document.querySelector("#mean").style.display = "table-row";
      break;
    case '=':
      if (inputDisplay.innerHTML === '') {
        display.innerHTML = '0';
        inputDisplay.innerHTML = "";
        break;
      }
      try {
        evaluate();
        inputDisplay.focus();
      } catch (error) {
        display.innerHTML = "Error - Please make sure the expression is valid";
      }
      break;
    case 'cos(':
    case 'sin(':
    case 'tan(':
    case 'log(':
    case 'exp(':
    case 'sin<sup>-1</sup>(':
    case 'cos<sup>-1</sup>(':
    case 'tan<sup>-1</sup>(':
      if (inputDisplay.innerHTML.length > 0 && /[0-9]/.test(inputDisplay.innerHTML[inputDisplay.innerHTML.length - 1])) {
        inputDisplay.innerHTML += `*${pushed}`;
        break;
      }
      inputDisplay.innerHTML += pushed;
      break;
    default:
      inputDisplay.innerHTML += pushed;
  }
}