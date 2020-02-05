import { Component, h, State, Element} from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

// component built with stencil.js
// using "Fetch" api and the API of vantage.com
@Component({
    tag: "my-stock-checker",
    styleUrl: "./stock-checker.css",
    shadow: true
})

export class StockChecker {
    stockInput: HTMLInputElement;
    // @Element() el: HTMLElement;
    @State() price: number;
    @State() stockUserInputing: string;

    onUserInput(event: Event) {
        this.stockUserInputing = (event.target as HTMLInputElement).value;
        console.log(`user inputs = ${this.stockUserInputing}`);
        // la valeur en train d'etre taper, mise a jour a chaque user input key
    }

    onShowPrice(event: Event) {
        event.preventDefault();
        // const userInput = (this.el.shadowRoot.querySelector("#stock-checker-symbol") as HTMLInputElement).value.toUpperCase();
        const userInput = this.stockInput.value;
        console.log("fetching...")
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${userInput}&apikey=${AV_API_KEY}`)
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
                <input 
                    id="stock-checker-symbol" 
                    ref={element => this.stockInput = element}
                    // value={this.stockUserInputing}
                    onInput={this.onUserInput.bind(this)}
                    />
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