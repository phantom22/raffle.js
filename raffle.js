function raffleDraw(object) {

	if ( typeof object === "object" ) {

		const { amountOfTickets, amountOfWinningTickets, winningTickets } = object;

		const a = amountOfTickets;
		let b = typeof amountOfWinningTickets === "number" ? amountOfWinningTickets : void 0,
		c = typeof winningTickets !== "undefined" ? winningTickets : void 0;

		if ( typeof ( a + b ) === "number" && Number.isInteger( a + b ) && b <= a || typeof a === "number" && Array.isArray(c) && c.length <= a ) {

			const random = () => Math.floor( Math.random() * a + 1 );

			c = typeof c !== "undefined" && typeof c.reduce( ( a, b ) => a + b ) === "number" ? c : [];

			c.forEach( v => { if ( ( Number.isInteger(v) === true && v >= 0 && v <= a && c.slice( c.indexOf(v) + 1 ).indexOf(v) === -1 ) === false ) { throw TypeError(`\`${v}' is an invalid ticket number.`) } } );

			b = c.length > 0 ? c.length : b;

			const winPct = Number( ( b / ( a / 100 ) ).toFixed(2) );

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

				return { isWinning, winningTickets: c, drawnTicket, winPct };

			}

		}

	}

}