import React, { Component } from 'react';
import './App.css';
import Board from "./Board";
import { createSecureContext } from 'tls';

interface State{
    value: any,
    squares: string[],
    XIsNext: boolean,
    history: any[],
    stepNumber: number,
}


export default class Game extends React.Component <{}, State>{
    constructor(props:any) {
        super(props);
        this.state = {
            value:null,
            squares: Array(9).fill(''),
            history:[{
                squares: Array(9).fill('')
            }],
            XIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i:any) {
        const history = this.state.history.slice(0, this.state.stepNumber +1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.XIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            XIsNext: !this.state.XIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            XIsNext: (step % 2 == 0),
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
            "Go to move #" + move :
            "Go to game Start";
            return(
                <li key={move}>
                    <button onClick ={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        }
        
        );

        let status;
        
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.XIsNext ? 'X' : 'O');
        }
        
        
        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares={current.squares}
                    onClick={(i: any) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares:string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}


