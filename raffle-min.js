function raffleDraw(e){if("object"==typeof e){const{amountOfTickets:n,amountOfWinningTickets:i,winningTickets:t}=e,r=n;let o="number"==typeof i?i:void 0,f=void 0!==t?t:void 0;if("number"==typeof(r+o)&&Number.isInteger(r+o)&&o<=r||"number"==typeof r&&Array.isArray(f)&&f.length<=r){const e=()=>Math.floor(Math.random()*r+1);(f=void 0!==f&&"number"==typeof f.reduce((e,n)=>e+n)?f:[]).forEach(e=>{if(!1==(!0===Number.isInteger(e)&&e>=0&&e<=r&&-1===f.slice(f.indexOf(e)+1).indexOf(e)))throw TypeError(`\`${e}' is an invalid ticket number.`)}),o=f.length>0?f.length:o;const n=Number((o/(r/100)).toFixed(2));if(0===f.length)for(let n=0;n<o;n++){let n=e();for(;f.includes(n);)n=e();f.push(n)}if(f.length>0){const i=e();return{isWinning:f.includes(i),winningTickets:f,drawnTicket:i,winPct:n}}}}}