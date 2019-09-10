# raffle.js

Instead of using code like in the example above, raffle.js (improves?) randomizing by creating an array of random numbers in a range between 0 and the `amountOfWinningTickets` variable and then randomizes a random number, that if included in the array, will return `true`.

```js

const chance = 20,
random = Math.floor( Math.random() * 100 );

if ( random <= chance ) {
  // do something here
}

```

Usage:
```js

const trigger = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 10 // in this case 10 is the equivalent of 10%

});

```
`raffleDraw` returns an object with the following variables:
* **drawnTicket** is the number randomized by the function
* **isWinning** is a boolean, and it will be used exactly as `Math.floor( Math.random() * number1 ) <= number2` in an application
* **winPct** shows the chances of triggering
* **winningTickets** is an array of all the numbers that will set "isWinning" to true if randomized

Also it's possible to define the array of winningTickets instead of letting the function randomize it:
```js

const trigger = raffleDraw({

  amountOfTickets: 100,
  winningTickets: [5,10,15,20,25,30]

)};

```
If an invalid number will be passed to the `winningTickets` variable, then the function will return an error.
List of invalid numbers:
- non integer numbers
- negative numbers
- numbers that are higher than `amountOfTickets`
