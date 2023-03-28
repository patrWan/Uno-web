

function Card({card, dropCard, turn}) {
    const color = card.color+'-500';

    return ( 
        <div 
            className={`bg-${color} w-1/6 h-36 rounded-md  border-white border-4 text-white content-center flex flex-col justify-center text-center font-bold text-5xl m-5 cursor-pointer`} 
            onClick={ turn ? () => dropCard(card) : () => alert('Debes esperar a tu turno')}
        >
            {card.number}
        </div>

    )
}

export default Card