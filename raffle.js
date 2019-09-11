function raffleDraw(object) {

  if ( typeof object === "object" ) {

    const { amountOfTickets, amountOfWinningTickets, winningTickets, events } = object;

    const a = amountOfTickets,
    random = () => Math.floor( Math.random() * a + 1 );
    let b = typeof amountOfWinningTickets === "number" ? amountOfWinningTickets : void 0,
    c = typeof winningTickets !== "undefined" ? winningTickets : void 0;

    if ( typeof ( a + b ) === "number" && Number.isInteger( a + b ) && b <= a || typeof a === "number" && Array.isArray(c) && c.length <= a ) {

      c = typeof c !== "undefined" && typeof c.reduce( ( a, b ) => a + b ) === "number" ? c : [];

      c.forEach( v => { if ( ( Number.isInteger(v) === true && v >= 0 && v <= a && c.slice( c.indexOf(v) + 1 ).indexOf(v) === -1 ) === false ) { throw TypeError(`\`${v}' is an invalid ticket number.`) } } );

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

        if ( typeof events !== "undefined" && Array.isArray(events) ) {

          events.forEach( v => {

            const requiredTickets = v.requiredTickets,
            callback = v.callback;

            if ( Array.isArray( requiredTickets ) && requiredTickets.length > 0 && requiredTickets.length <= 2 && typeof callback === "function" ) {

              const isNumber = typeof requiredTickets.reduce( ( a, b ) => a + b ) === "number",
              isBoolean = typeof requiredTickets === "boolean";

              if ( isNumber && requiredTickets.length === 1 && drawnTicket === requiredTickets[0] || isNumber && requiredTickets.length === 2 && drawnTicket >= requiredTickets[0] && drawnTicket <= requiredTickets[1] || isBoolean && requiredTickets === isWinning ) {

                callback();

              }

            }

          });

        }

        return { isWinning, winningTickets: c, drawnTicket };

      }

    }

  }

}
