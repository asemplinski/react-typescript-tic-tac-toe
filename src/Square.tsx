import React, { Component } from 'react';
import './App.css';

interface Props{
    value: any,
    onClick?: any,
}
/*
interface State{
    value: any,
} 

export default class Square extends Component<Props, State> {
    constructor(Props:any) {
        super(Props);
        this.state = {
            value: null,
        }
    }
    render() {
        return (
        <button 
        className="square"
        onClick={() => this.props.onClick()}
        >
            {this.props.value}
        </button>
    )
    }
}
*/

export default function Square(Props:any) {
    return (
        <button 
        className="square"
        onClick={Props.onClick}
        >
            {Props.value}
        </button>
    )
}
 
