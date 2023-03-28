import Card from './Card'

function GameBoard({player, dropCard}) {

   

    return (
        <section className='bg-slate-500 h-full'>
            <div className='bg-slate-900 h-2/4'>
                Rest of game
            </div>

            <div className='bg-slate-900 h-2/4 flex'>
                {player.hand ? 
                player.hand.map((card, index) => (
                    <Card key={index} card={card} dropCard={dropCard} turn={player.isActive}/>
                ))
                : 'esperando...'}
                
            </div>
        </section>
    )
}

export default GameBoard