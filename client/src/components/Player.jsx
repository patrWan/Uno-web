import React from 'react'

function Player({ player }) {

  return (
    <div className={`flex bg-slate-800 text-white w-80 p-7 rounded-md shadow-lg shadow-black items-center m-5 space-x-3 border-emerald-400 ${player.isActive ? 'border-4' : ''}`}>
      <div className='flex items-center'>
        <img className="object-cover h-10 mr-6" src='/mujer.png'></img>
        <p className='uppercase font-bold text-1xl '>{player.username}</p>
      </div>

      <div className='bg-cyan-400 p-3 rounded-sm'>
        <p className='uppercase font-bold text-2xl'>{player.hand ? player.hand.length : null}</p>
      </div>

    </div>
  )
}

export default Player