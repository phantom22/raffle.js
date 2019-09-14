# Raffle.js
This function allows making multiple function calls if the randomized number is included in a **range of numbers** or is equal to a **particular one** and stores the return values of all the callbacks into an array.

##  function syntax
```js
raffleDraw({ amountOfTickets: 100, amountOfWinningTickets: 10, events: [] })
```
* **amountOfTickets**: the whole of a fraction

* **amountOfWinningTickets**: the dividend of a fraction

* **winningTickets**: replaces the `amountOfWinningTickets` variable or vice versa, it's an array of numbers that manually defined the `winningTickets` array.

* **events**: array of objects that defines all the events that depend on the `drawnTicket` and the `isWinning` variables.

The function will work only if `amountOfTickets` and `amountOfWinningTickets`/`winningTickets` variables are defined, the `events` variable is omittable if you don't need any events to occur.
## event syntax
```js
raffleDraw({ amountOfTickets: 100, amountOfWinningTickets: 100, events: [
  { onSpecificTicket: 1, callback() { console.log("Wow you're lucky!") } },
  { onTicketRange: [1, 100], callback() { return "Hello World!" } },
  { onIsWinningState: true, callback() { return "You won!" } }
]})
```
There are **three different events**:
* **onSpecificTicket**: its value must be a *number*, the event triggers when this number *matches* with the `drawnTicket` variable.

* **onTicketRange**: it's an array of two numbers, both numbers should be valid, and the event triggers when the `drawnTicket` variable is between these integers.

* **onIsWinningState**: it's a boolean, the event triggers when the `onIsWinningState` value matches with the `isWinning` variable.

All the callbacks that have a `return` value that is different from `undefined` will be stored inside the `storedValues` variable. In the example above the `storedValues` variable at the end of the iteration will consist of two values: `["Hello world!","You won!"]`

Also it's possible to make an instance that has `0 ` chance for the `isWinning` variable to be true, by setting `winningTickets` to `[0]`

## Valid ticket numbers
Only **valid** numbers will work for ticket variables like `winningTickets` , `onSpecificTicket` or `onTicketRange`
and they must be **positive integers** that are **smaller or equal** to the `amountOfTickets` variable.

Also the `drawnTicket` variable is a number that is **higher or equal** to `0` and **smaller or equal** to the `amountOfTickets` variable.

## This function returns an object with *four* variables
*  **drawnTicket**: number randomized by the *function*.

* **isWinning**: boolean, true if `drawnTicket` is equal to one of the numbers inside of the `winningTickets` array.

* **winningTickets**: array of all the numbers that will set `isWinning` to true if randomized.

* **storedValues**: array of all the `defined` values returned from the callbacks.

## Accessing `raffleDraw` variables from within a callback
```js
raffleDraw.bind(raffleDraw)({ amountOfTickets: 100, winningTickets: [0], events: [
  { 
    onTicketRange: [1, 100], 
    callback() { 
      console.log( this.drawnTicket, this.isWinning, this.winningTickets );
    } 
  }
]})
```
In the example above, no matter what is the value of the `drawnTicket` variable, the callback will log into the console the three accessible values which are `drawnTicket`, `isWinning` and `winningTickets`, no other variables are accessible with the prefix `this.`

---
#### Thanks for reading the documentation, if you want to give me some feedback I would be glad to hear it!
---
