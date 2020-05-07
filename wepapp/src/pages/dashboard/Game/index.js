import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function Square({ value, onClick, version }) {
  const style = {
    minWidth: 30,
    width: 30,
    minHeight: 30,
    height: 30,
    margin: 5
  }

  if (version == 'plus') {
    style.backgroundColor = value == 'X' ? 'red' : value == 'O' ? 'blue' : ''
  }

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      style={style}
    >
      {value}
    </Button>
  )
}

function Restart({ onClick }) {
  return (
    <Button className='restart' onClick={onClick}>
      Play again
    </Button>
  )
}

const Game = ({ version }) => {
  const [ squares, setSquares ] = useState(Array(9).fill(null))
  const [ isXNext, setIsXNext ] = useState(true)
  const nextSymbol = isXNext ? 'X' : 'O'
  const winner = calculateWinner(squares)

  function getStatus() {
    if (winner) {
      return 'Winner: ' + winner
    } else if (isBoardFull(squares)) {
      return 'Draw!'
    } else {
      return 'Next player: ' + nextSymbol
    }
  }

  function renderSquare(i) {
    return (
      <Square
        version={version}
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return
          }
          const nextSquares = squares.slice()
          nextSquares[i] = nextSymbol
          setSquares(nextSquares)

          setIsXNext(!isXNext) // toggle turns
        }}
      />
    )
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null))
          setIsXNext(true)
        }}
      />
    )
  }

  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item sm={12}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </Grid>
        <Grid item sm={12}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </Grid>
        <Grid item sm={12}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </Grid>
      </Grid>

      <div className='game-info'>{getStatus()}</div>
      <div className='restart-button'>{renderRestartButton()}</div>
    </Container>
  )
}

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false
    }
  }
  return true
}

export default Game
