function raffleDraw(object) {

  if ( typeof object === "object" ) {

    const { amountOfTickets, amountOfWinningTickets, winningTickets, events } = object,
    a = amountOfTickets,
    random = () => Math.floor( Math.random() * a + 1 ),
    callbackReturn = [],
    ticketValidation = function(v){ if ( typeof v !== "undefined" && ( Number.isInteger(v) === true && v >= 0 && v <= a && c.slice( c.indexOf(v) + 1 ).indexOf(v) === -1 ) === false ) { throw TypeError(`\`${v}' is an invalid ticket number.`) } };

    let b = typeof amountOfWinningTickets === "number" ? amountOfWinningTickets : void 0,
    c = typeof winningTickets !== "undefined" ? winningTickets : void 0;

    if ( typeof ( a + b ) === "number" && a > 0 && Number.isInteger( a + b ) && b <= a || typeof a === "number" && a > 0 && Array.isArray(c) && c.length <= a ) {

      c = typeof c !== "undefined" && typeof c.reduce( ( a, b ) => a + b ) === "number" ? c : [];
      c.forEach( v => ticketValidation(v) );
      b = c.length > 0 ? c.length : b;

      if ( c.length === 0 ) {

        for ( let i = 0; i < b; i++ ) {

          let number = random();

          while ( c.includes( number ) ) {

            number = random();

          }

          c.push( number );

        }

      }

      if ( c.length > 0 ) {

        const drawnTicket = random(),
        isWinning = c.includes( drawnTicket );

        if ( typeof this === "function" && this.name === "raffleDraw" ) { 

          this.drawnTicket = drawnTicket;
          this.isWinning = isWinning;
          this.winningTickets = winningTickets;

        }

        if ( typeof events !== "undefined" && Array.isArray(events) ) {

          events.forEach( v => {

            const { callback, storeValue } = v;
            let { onSpecificTicket, onTicketRange, onIsWinningState } = v;

            if ( typeof onSpecificTicket !== "undefined" || typeof onTicketRange !== "undefined" || typeof onIsWinningState !== "undefined" ) {

              onSpecificTicket = typeof onSpecificTicket === "number" ? onSpecificTicket : void 0;
              onTicketRange = typeof onTicketRange !=="undefined" && Array.isArray(onTicketRange) && typeof onTicketRange.reduce( ( a, b ) => a + b ) === "number" ? onTicketRange : void 0;
              onIsWinningState = typeof onIsWinningState === "boolean" ? onIsWinningState : void 0;

              typeof onSpecificTicket !== "undefined" ? ticketValidation(onSpecificTicket) : void 0;
              typeof onTicketRange !== "undefined" && Array.isArray(onTicketRange) ? onTicketRange.forEach( v => ticketValidation(v) ) : void 0;

              if ( onSpecificTicket === drawnTicket || typeof onTicketRange !== "undefined" && drawnTicket >= onTicketRange[0] && drawnTicket <= onTicketRange[1] || onIsWinningState === isWinning ) {

                if ( typeof callback === "function" && typeof storeValue === "undefined" ) {

                  typeof this === "function" ? callback.bind(this)() : callback();

                }

                else if ( typeof callback === "function" && storeValue === true ) {

                  typeof this === "function" ? callbackReturn.push( callback.bind(this)() ) : callbackReturn.push( callback() );

                }

              }

            }

          });

        }

        return callbackReturn.length === 0 ? { isWinning, winningTickets: c, drawnTicket } : callbackReturn;

      }

    }

  }

}