import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './Gomoku.module.css'

type Player = 'white' | 'black'

type BoardSize = { width: number, height: number }
type BoardPointState = Player | undefined
type BoardPoint = { x: number, y: number }
type GameState = 'blackWin' | 'whiteWin' | 'draw' | 'playing'

type Props = BoardSize

export const Gomoku: React.FC<Props> = ({ width, height }) => {
  const [board, setBoard] = useState<Board>(new Board({ width, height }))
  const [turn, setTurn] = useState<Player>('black')
  const [gameState, setGameState] = useState<GameState>('playing')

  const putStone = (point: BoardPoint) => {
    if (gameState !== 'playing') {
      return
    }
    if (!board.add(turn, point)) {
      // Error
      return
    }
    const newGameState = board.checkResult(point)
    if (newGameState === 'playing') {
      setBoard(Board.new(board))
      setTurn(prev => prev === 'black' ? 'white' : 'black')
    } else {
      setGameState(newGameState)
    }
  }
  const gameStateMessage = useMemo(() => {
    switch(gameState) {
      case 'blackWin':
        return '黒の勝ちです'
      case 'whiteWin':
        return '白の勝ちです'
      case 'draw':
        return '引き分けです'
      default:
        return 'ゲーム中です'
    }
  }, [gameState])
  return (
    <div>
      <p>{`${turn === 'black' ? '黒' : '白'}のターンです`}</p>
      <p>{gameStateMessage}</p>
      <div>
        {
          [...range(0, board.height)].map(y => (
            <div key={`board-row-${y}`}>
              {
                [...range(0, board.width)].map(x => {
                  const point = board.find({ x, y })
                  const marker = point === 'black' ? '○' : point === 'white' ? '×' : ''
                  return (
                    <button
                      type='button'
                      className={styles.point}
                      id={`point-${x}-${y}`}
                      key={`point-${x}-${y}`}
                      onClick={() => putStone({ x, y })}>
                      {marker}
                    </button>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

function* range (begin: number, end: number, step = 1) {
  for (let i = begin; i < end; i += step) {
    yield i
  }
}

class Board {
  #width = 0
  #height = 0
  #points: BoardPointState[] = []

  constructor({ width, height }: BoardSize) {
    this.#width = width
    this.#height = height
    this.#points = Array.from(new Array(width * height))
  }

  get width () {
    return this.#width
  }

  get height () {
    return this.#height
  }

  add(player: Player, { x, y }: BoardPoint) {
    const idx = this.#getIndex({ x, y })
    if (this.#points[idx] !== undefined) {
      return false
    }
    this.#points[idx] = player
    return true
  }

  find = (point: BoardPoint) => this.#points[this.#getIndex(point)]

  checkResult({ x, y }: BoardPoint): GameState {
    // 横方向にスキャン
    const winnerBlackCondition = 'black|black|black|black|black'
    const winnerWhiteCondition = 'white|white|white|white|white'
    const pointsX = [...this.scanX(y)]
      .map(pt => this.#points[this.#getIndex(pt)])
      .join('|')
    const pointsY = [...this.scanY(x)]
      .map(pt => this.#points[this.#getIndex(pt)])
      .join('|')
    const pointsTL2BR = [...this.scanTopLeftToBottomRight({ x, y })]
      .map(pt => this.#points[this.#getIndex(pt)])
      .join('|')
    const pointsBL2TR = [...this.scanBottomLeftToTopRight({ x, y })]
      .map(pt => this.#points[this.#getIndex(pt)])
      .join('|')

    if (
      pointsX.includes(winnerBlackCondition) ||
      pointsY.includes(winnerBlackCondition) ||
      pointsTL2BR.includes(winnerBlackCondition) ||
      pointsBL2TR.includes(winnerBlackCondition)) {
      return 'blackWin'
    }
    if (
      pointsX.includes(winnerWhiteCondition) ||
      pointsY.includes(winnerWhiteCondition) ||
      pointsTL2BR.includes(winnerWhiteCondition) ||
      pointsBL2TR.includes(winnerWhiteCondition)) {
      return 'whiteWin'
    }
    if (this.#points.every(val => val === undefined)) {
      return 'draw'
    }
    return 'playing'
  }

  #getIndex ({ x, y }: BoardPoint) {
    return y * this.#width + x
  }

  *scanX (y: number) {
    for (let x = 0; x < this.#width; x++) {
      yield { x, y }
    }
  }

  *scanY (x: number) {
    for (let y = 0; y < this.#height; y++) {
      yield { x, y }
    }
  }

  *scanTopLeftToBottomRight ({ x, y }: BoardPoint) {
    const begin: BoardPoint = {
      x: x < y ? 0 : x - y,
      y: x > y ? 0 : y - x
    }
    const length = Math.min(this.#width - begin.x, this.#height - begin.y)
    for (let offset = 0; offset < length; offset++) {
      yield { x: begin.x + offset, y: begin.y + offset }
    }
  }

  *scanBottomLeftToTopRight ({ x, y }: BoardPoint) {
    const begin: BoardPoint = {
      x: x < (this.#height - 1 - y) ? 0 : x - (this.#height - 1 - y),
      y: x > (this.#height - 1 - y) ? this.#height - 1 : y + x
    }
    const length = Math.min(this.#width - begin.x, begin.y + 1)
    for (let offset = 0; offset < length; offset++) {
      yield { x: begin.x + offset, y: this.#height - offset - 1}
    }
  }

  static new(board: Board) {
    const newBoard = new Board({width: board.#width, height: board.#height})
    newBoard.#points = board.#points
    return newBoard
  }
}
