# raffle.js

Usage:
```js

const trigger = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 10 // in this case 10 is the equivalent of 10%

});

/* raffleDraw returns an object
trigger.drawnTicket is the randomized number
trigger.isWinning is a boolean, and it will be used exactly as "Math.floor( Math.random() * number1 ) <= number2 " in an application
trigger.winPct shows the chances of triggering
trigger.winningTickets is an array of all the numbers that will set "isWinning" to true if randomized
*/

```
Also it's possible to define the array of winningTickets instead of letting the function randomize it:
```js

const trigger = raffleDraw({

  amountOfTickets: 100,
  winningTickets: [5,10,15,20,25,30]

)};

```
*If an invalid number will be passed to the `winningTickets` variable, then the function will return an error.
List of invalid numbers:
- non integer numbers
- negative numbers
- numbers that are higher than `amountOfTickets`*
