function raffleDraw(object) {

  if ( typeof object === "object" ) {

    const { amountOfTickets, amountOfWinningTickets, winningTickets, events } = object,
    a = amountOfTickets,
    random = () => Math.floor( Math.random() * a + 1 ),
    storedValues = [],
    ticketValidation = function(v){ if ( typeof v !== "undefined" && ( Number.isInteger(v) === true && v >= 0 && v <= a && c.slice( c.indexOf(v) + 1 ).indexOf(v) === -1 ) === false ) { throw TypeError(`\`${v}' is an invalid ticket number.`) } };

    let b = typeof amountOfWinningTickets === "number" ? amountOfWinningTickets : void 0,
    c = typeof winningTickets !== "undefined" ? winningTickets : void 0,
    isBinded,
    isValidInput = typeof ( a + b ) === "number" && a > 0 && Number.isInteger( a + b ) && b <= a || typeof a === "number" && a > 0 && Array.isArray(c) && c.length <= a;

    if ( isValidInput === true ) {

      c = typeof c !== "undefined" && typeof c.reduce( ( a, b ) => a + b ) === "number" ? c : [];
      c.forEach( v => ticketValidation(v) );
      b = c.length >= 1 ? c.length : b;

      if ( c.length === 0 ) {

        for ( let i = 0; i < b; i++ ) {

          let number = random();

          while ( c.includes( number ) ) {

            number = random();

          }

          c.push( number );

        }

      }

      if ( c.length >= 1 ) {

        const drawnTicket = random(),
        isWinning = c.includes( drawnTicket );

        if ( typeof this === "function" && this.name === "raffleDraw" ) { 

          isBinded = true;
          this.drawnTicket = drawnTicket;
          this.isWinning = isWinning;
          this.winningTickets = winningTickets;

        }

        if ( typeof events !== "undefined" && Array.isArray(events) ) {

          events.forEach( v => {

            const { callback } = v;
            let { onSpecificTicket, onTicketRange, onIsWinningState } = v;

         	let eventIsTriggered;

            if ( typeof onSpecificTicket === "number" ) {

              ticketValidation(onSpecificTicket);
              eventIsTriggered = onSpecificTicket === drawnTicket;

            }

            if ( typeof onTicketRange !== "undefined" && Array.isArray(onTicketRange) === true ) {

              onTicketRange.forEach( v => ticketValidation(v) );
              eventIsTriggered = drawnTicket >= onTicketRange[0] && drawnTicket <= onTicketRange[1];

            }

            if ( typeof onIsWinningState === "boolean" ) {

              eventIsTriggered = onIsWinningState === isWinning;

            }

            if ( eventIsTriggered === true ) {

              let callbackValue;

              if ( isBinded === true ) {

                callbackValue = callback.bind(this)();

              }

              else {

                callbackValue = callback();

              }

              if ( typeof callbackValue !== "undefined" ) {

                storedValues.push( callbackValue );

              }

            }

          });

        }

        return { isWinning, winningTickets: c, drawnTicket, storedValues };

      }

    }

  }

}