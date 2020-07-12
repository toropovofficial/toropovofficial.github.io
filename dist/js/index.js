
window.addEventListener('DOMContentLoaded', function(){
    ' use strict ';
    
//  //перевод из арабских в римские
function myFunction(a) {
  let r = [["I","V"],["X","L"],["C","D"],["M",""]];
  let f = [[],[[0,1,0]],[[0,2,0]],[[0,3,0]],[[0,1,1],[0,1,0]],[[0,1,1]],
          [[0,1,0],[0,1,1]],[[0,2,0],[0,1,1]],[[0,3,0],[0,1,1]],[[1,1,0],[0,1,0]]];
  let num = a; let rim = "";

  String(num).split("").reverse().forEach((element, i) =>  
    	f[element].forEach((d) => 
  	     	rim = rim.concat (r[i+d[0]][d[2]].repeat(d[1]))));
      
  console.log(rim.split("").reverse().join(""));
}
        // перевод из римских в арабские      
function RomanToArabic() {
    let i, alph = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
    for(var h = 0, j = 0, n = 0; j < arguments[0].length; j++) {
        i = alph[arguments[0].charAt(j).toUpperCase()];
        if(i) n += h = (h < i ? i - (h << 1) : i);
    }
    return n;
}

function calculate(mass) {
    let arr = mass.split(' ')
    if(arr.length < 3) {
        return console.log('throws Error')
    }
    a = +arr[0],
    b = arr[1],
    c = +arr[2],
    d = arr[0],
    f = arr[2]
    if((a >= 1 && a <= 10) && (c >= 1 && c <= 10) && (a ^ 0) === a  && (c ^ 0) === c)   {
        if(b === '+') {
            let str = (a + c);
            return console.log((String(str)));
        } else if(b === '-') {
            let str = (a - c);
            return console.log((String(str)));
        } else if(b === '*') {
            let str = (a * c);
            return console.log((String(str)));
        } else if(b === '/') {
            let str = (a / c);
            return console.log((String(str.toFixed())));
        }
    } else if((a >= 1 ) || (c >= 1 )){
        return console.log('throws Error');
    } else {
        a = RomanToArabic(d);
        c = RomanToArabic(f);
    }
    if(b === '+') {
        let str = (a + c);
        myFunction(str);
    } else if(b === '-') {
        let str = (a - c);
        myFunction(str);
    } else if(b === '*') {
        let str = (a * c);
        myFunction(str);
    } else if(b === '/') {
        let str = (a / c);
        str.toFixed();
        myFunction(str.toFixed());
    }
}
calculate('5 * 7');


});