import { Component, h, State, Prop} from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

// component built with stencil.js
// using "Fetch" api and the API of vantage.com
@Component({
    tag: "my-stock-checker",
    styleUrl: "./stock-checker.css",
    shadow: true
})

export class StockChecker {

    @State() price: number;
    @State() userInput: string;
    
    // getUserInput() {
    //     const input = document.getElementById("stock-checker-symbo");
    //     console.log(input);
    // }

    onShowPrice(event: Event) {
        event.preventDefault();
        console.log("fetching...")
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=FB&apikey=${AV_API_KEY}`)
        .then(resp => resp.json())
        .then(data => {
            this.price = +data['Global Quote']['05. price'];
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        return [
            <form action="#" onSubmit={this.onShowPrice.bind(this)}>
                <input id="stock-checker-symbol"/>
                <button id="stock-checker-submit" type="submit">Show stock price</button>
            </form>,
            <div id="stock-checker-result">
                <h4 id="stock-checker-result-text">Price:</h4>
                <h4 id="stock-checker-result-price">$ {this.price}</h4>
            </div>,
            <p>Stock checker proudly developped with Stencil.JS 🥰</p>
        ]
    }
}