//1. Deposit some money
//2. Determine no. of lines to bet on
//3. Collect a bet
//4. spin the slot machine\
//5. check if the user won
//6. give the reward
//7. play again

//function declaration in ES6 

const prompt = require("prompt-sync")();  //user unput

//designing the slot machine

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}


const SYMBOL_VALUS = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}


const  deposit = () => {
    
    while(true)
    {
    const depositAmount = prompt("Enter some amount: ");  //returns a string
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount >= 0)   //NaN checks if it is not a number
    console.log("Invalid deposit number. Try Again! ");

    else
    return numberDepositAmount;
    }

};


const getNumberOfLines = () => {

    while(true)
    {
    const lines = prompt("Enter the number of lines to bet on:  ");  //returns a string
    const numberOfLines = parseFloat(lines);

    if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines > 3)   //NaN checks if it is not a number
    console.log("Invalid deposit number. Try Again! ");

    else
    return numberOfLines;
    }
};


const getBet = (balance, lines) => {

    while(true)
    {
    const bet = prompt("Enter the total bet per line:  ");  //returns a string
    const numberBet = parseFloat(lines);

    if(isNaN(numberBet) || numberBet<=0 || numberBet > balance/lines)   //NaN checks if it is not a number
    console.log("Invalid bet. Try Again! ");

    else
    return numberBet;
    }
};


const spin = () => {
     
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOL_COUNT))
    {
       for(let i =0; i< count; i++)
       {
        symbols.push(symbol);
       }
    }     
    const reels = [[], [], []];
    for (let i =0; i<COLS; i++)
    {
        reels.push([]);
        const reelSymbols = [...symbols];  // copies the symbol array, remove symbols after we add it to one cell
        for(let j=0; j<ROWS; j++)
        {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
           const selectedSymbol = reelSymbols[randomIndex];
           reels[i].push(selectedSymbol);
           reelSymbols.splice(randomIndex ,1);
        }
    }
    return reels;
}; 

//transposing the array as it is a col array

const transpose = (reels) => {
    const rows = [];
    for(let i =o; i< ROWS; i++)
    {
        rows.push([]);
        for(let j =0; j< COLS; j++)
        {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};


const printRows =(rows) =>{

    for(const row of rows)
    {
        let rowString = "";    //we want A|B|C
        for(const [i, symbol] of rows.entries())
        {
           rowString += symbol;
           if(i != rows.length -1)
           {
                rowString += " | ";
           }
        }
        console.log(rowString);
    }
} 


const getWinnings = (rows, bet, lines)  =>{
    let winnings =0;
    for(let row = 0; row < lines; row++)
    {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols)
        {
            if(symbol !=  symbols[0])
            {
                allSame = false;
                break;
            }
        }
        if(allSame)
        {
            winnings += bet * SYMBOL_VALUS[symbols[0]];
        }
    }
    return winnings;
};


const game= () => {

    let balance = deposit();
    while(true)
    {
        console.log("Your Balnce is $"+balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You Won! $ "+winnings.toString());

        if(balance <= 0)
        {
            console.log("You ran out of Money");
            break;
        }
         const playAgain = prompt("Do you wish to play again (y/n)? ");
         if(playAgain != "y")break;
    }
};

game();


