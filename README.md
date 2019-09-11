# raffle.js

Instead of using code like in the example above, raffle.js (improves?) randomizing by creating an array of random numbers in a range between 0 and the `amountOfWinningTickets` variable and then randomizes a number, that if included in the array, will return `true`.

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
    { requiredTickets: true, callback() { console.log("You won!") } }, // triggers if requiredTickets is equal to the isWinning variable
    { requiredTickets: false, callback() { console.log("You lost!") } },
    { requiredTickets: [25], callback() { console.log("Your ticket number is 25!") } }, // triggers exclusively if the drawnTicket variable is equal to the requiredTickets[0] variable
    { requiredTickets: [25,35], callback() { console.log("Your ticket number is between 25 and 35!") } } // the number range includes the two numbers used to define it
  ]
})

```
## Returning randomized number after all the events are done:
```js

const random = raffleDraw({

  amountOfTickets: 100,
  amountOfWinningTickets: 50,
  events: [
    { requiredTickets: [1,10], callback() { // do something } }, // triggers if requiredTickets is equal to the isWinning variable
    { requiredTickets: [11,20], callback() { // do something } },
    { requiredTickets: [21,30], callback() { // do something } },
    { requiredTickets: [31,40], callback() { // do something} },
    { requiredTickets: true, callback() { // do something if isWinning is true } },
    { requiredTickets: false, callback() { // do something if isWinning is false } }
  ]
}).drawnTicket;

```
**Hope you enjoy this little project and give me some feedback!**
