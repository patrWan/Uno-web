import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
import GameBoard from './components/GameBoard'

import Player from './components/Player'

const socket = io('http://localhost:4000')

function App() {
  const [usersOnline, setUsersOnline] = useState([]);

  const [username, setUserName] = useState('');
  const [player, setPlayer] = useState({});

  //estado que guarda el usuario actual

  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();

    var newPlayer = {
      id: socket.id,
      username,
      isActive : false,
    }

    setPlayer(newPlayer)

    socket.emit('joinRoom', newPlayer);

    setIsConnected(true);

  }

  const dropCard = (card) => {
    alert(card.color)
    socket.emit('drop card', card);
  }

  const leaveRoom = () => {
    socket.emit('leaveRoom', player)
    setIsConnected(false)
  }

  const startGame = () => {
    socket.emit('start_game')
    setGameState(true)
  }

  const stopGame = () => {
    setGameState(false)
    socket.emit('stop_game')
  }



  useEffect(() => {
    socket.on("joinRoom", (arg, usersOnline) => {
      console.log(arg); // world
      setUsersOnline(usersOnline)
    });

    socket.on("leaveRoom", (arg, usersOnline) => {
      console.log(arg); // world
      setUsersOnline(usersOnline)
    });


  }, [])

  useEffect(() => {
    console.log("use effect drop card ========")
    socket.on("drop card", (arg) => {
      console.log(arg); // world
      setUsersOnline(arg)
      const found = arg.find(user => user.id === player.id);
      setPlayer(found);
    });
  },[usersOnline])

  useEffect(() => {
    if (Object.keys(player).length !== 0) {
      socket.on("start_game", (arg) => {
        console.log(arg)
        setUsersOnline(arg);
        const found = arg.find(user => user.id === player.id);
        setPlayer(found);
        setGameState(true)
      });
    }

  }, [player]);

  useEffect(() => {
    //DEBE PODER LIMPIAR LA MANO
    socket.on("stop_game", (arg) => {
      console.log('stop_game',arg); // world
      setUsersOnline(arg)
      setGameState(false);
    });
  }, []);

  return (
    <div className='bg-slate-900'>
      <div className="container mx-auto bg-red-800 h-screen flex flex-col">
        <div className='flex w-full h-1/6 items-center justify-center'>
          <h1 className='text-5xl text-white text-center drop-shadow-lg font-Shojumaru'>UNO HUMILDE</h1>
        </div>

        <div className='flex flex-col items-center'>
          {isConnected ? null : <form action="" onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full mb-4">
            <input
              type="text"
              placeholder='Ingrese un nombre'
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              className="
                form-control w-2/4 text-center py-2 text-xl font-normal text-gray-700 bg-white bg-clip-paddingborder border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-4"

            />
            <input
              type='submit'
              value='entrar'
              disabled={isConnected}
              className="bg-green-500 w-2/4 p-4 border-2 border-white rounded-lg text-white font-bold uppercase hover:cursor-pointer "
            />

          </form>}


          {isConnected
            ?
            <>
              <button onClick={leaveRoom} className="bg-red-500 w-2/4 p-4 border-2 mb-5 border-white rounded-lg text-white font-bold uppercase hover:cursor-pointer">salir</button>
              {gameState ?
                <button onClick={stopGame} className="bg-yellow-500 w-2/4 p-4 border-2 border-white rounded-lg text-white font-bold uppercase hover:cursor-pointer">Detener juego</button>
                :
                <button onClick={startGame} className="bg-blue-500 w-2/4 p-4 border-2 border-white rounded-lg text-white font-bold uppercase hover:cursor-pointer">Comenzar</button>
              }


            </>
            : null}
        </div>


        <div className='flex items-center p-5'>
          {isConnected ?
            <>
              <h2 className='text-white font-bold m-5 text-lg'>Jugadores Conectados {usersOnline ? usersOnline.length : null}</h2>


              {usersOnline.map((player, index) => {
                return <Player key={index} player={player} />
              })}
            </>
            : null}

        </div>

        {gameState ? <GameBoard player={player} dropCard={dropCard}/> : null}


      </div>
    </div>
  )
}

export default App
