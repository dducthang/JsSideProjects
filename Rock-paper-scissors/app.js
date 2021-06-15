const startGameBtn = document.getElementById('start-game-btn');
const THANG = 'Dang Thang';

const Numbers = [1,23,50,-23,10,-17];
const printNumber = (num)=>{
    console.log(num+" ");
}
startGameBtn.addEventListener('click', (printNumber, ...Numbers)=>{
    let sum =0;
    for(let num of Numbers ){
        printNumber(num);
        sum+=num;
    }
    console.log(`Sum of this array is: ${sum}`);
});

const randomFunc = (printNumber, ...Numbers)=>{
    let sum =0;
    for(let num of Numbers ){
        printNumber(num);
        sum+=num;
    }
    console.log(`Sum of this array is: ${sum}`);
}

randomFunc(printNumber, ...Numbers);





