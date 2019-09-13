# raffle.js

Instead of using code like in the example above, raffle.js (improves?) randomizing events by creating an array of random numbers in a range between `1` and the `amountOfWinningTickets` variable and then randomizes a number, that if included in the array, will set isWinning to `true`. Also, this function allows making multiple function calls if the randomized number is included in **ranges of numbers** or is equal to a **particular integer** and stores the return values of all the events that provide a `storeValue` variable set to `true` into an array, returned at the end of the iteration.

### Example of randomizing a trigger the old way:
```js

const chance = 20,
random = Math.floor( Math.random() * 100 );

if ( random <= chance ) {
  // do something here
}

```

## Usage:
```js

const trigger = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 10 // in this case 10 is the equivalent of 10%

});

```

## `raffleDraw` returns an object with the following variables:
* **drawnTicket** is the number randomized by the function
* **isWinning** is a boolean, and it will be used exactly as `Math.floor( Math.random() * number1 ) <= number2` in an application
* **winningTickets** is an array of all the numbers that will set "isWinning" to true if randomized

#### Defining the array of `winningTickets` instead of letting the function randomize it:
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

*Obviously it's still `pseudo-random` because the numbers are created entirely with `Math.random`.*

## Adding a callback to the function:
```js

const trigger = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 50, // 50% of isWinning being set to true
  events: [
    { onIsWinningState: true, callback() { console.log("You won!") } }, // triggers if onIsWinningState is equal to the isWinning variable
    { onIsWinningState: false, callback() { console.log("You lost!") } },
    { onSpecificTicket: 25, callback() { console.log("Your ticket number is 25!") } }, // triggers exclusively if the drawnTicket variable is equal to the onSpecificTicket variable
    { onTicketRange: [25,35], callback() { console.log("Your ticket number is between 25 and 35!") } } // the number range includes the two numbers used to define it
  ]
  
})

```

## Returning randomized number after all the events are done:
```js

const random = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 50,
  events: [
    { onTicketRange: [1,10], callback() { /* do something */ } },
    { onTicketRange: [11,20], callback() { /* do something */ } },
    { onTicketRange: [21,30], callback() { /* do something */ } },
    { onTicketRange: [31,40], callback() { /* do something */ } },
    { onIsWinningState: true, callback() { /* do something if isWinning is true */ } },
    { onIsWinningState: false, callback() { /* do something if isWinning is false */ } }
  ]
  
}).drawnTicket;

```

## Returning an array containing all the callback values:
```js
const trigger = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 100, // 100% of isWinning being set to true
  events: [
    { onTicketRange: [1,100], storeValue: true, callback() { return 1 } }, // in this case, onTicketRange: [1,100] allows any randomized number to trigger the callback
    { onTicketRange: [1,100], storeValue: true, callback() { return 2 } },
    { onTicketRange: [1,100], storeValue: true, callback() { return 3 } },
    { onTicketRange: [1,100], callback() { return 4 } } // storeValue is not defined and as a result, "4" won't be pushed into the array.
  ]
  
});

console.log(trigger); // [1,2,3]

```
*All the callbacks with storeValue set to true will push into an array their return value, as a result `raffleDraw` will be an array with these values.*

## Accessing raffleDraw variables from the callbacks:
```js
const drawnTicket = raffleDraw.bind(raffleDraw)({
  
  amountOfTickets: 100,
  winningTickets: [0],
  
  events: [
  
    { onTicketRange: [1,100], callback() { console.log( this.drawnTicket, this.isWinning, this.winningTickets ) } } // a number from 1 to 100, false, [0]
  
  ]
  
})
```

---
P.S the randomized numbers inside of the `raffleDraw` function will constist of numbers between `1` and the `amountOfTickets` variable, so it's possible to make a trigger with no chance of winning by setting `winningTickets` to `[0]`, a number that cannot be randomized inside the function
