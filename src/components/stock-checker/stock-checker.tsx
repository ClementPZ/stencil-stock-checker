import { Component, h, Prop} from "@stencil/core";

// component built with stencil.js
// using "Fetch" api and the API of vantage.com
@Component({
    tag: "my-stock-checker",
    styleUrl: "./stock-checker.css",
    shadow: true
})

export class StockChecker {

    @Prop() price: number;
    
    onShowPrice(event: Event) {
        event.preventDefault();
        console.log("fetching...")
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo")
        .then(resp => resp.json())
        .then(data => console.log(data))
        // .catch(err => {
        //     console.log(err);
        // })
    }
    render() {
        return [
            <form action="#" onSubmit={this.onShowPrice}>
                <input id="stock-checker-symbol"/>
                <button id="stock-checker-submit" type="submit">Show stock price</button>
            </form>,
            <div id="stock-checker-result">
                <h3 id="stock-checker-result-text">Price:</h3>
                <h3 id="stock-checker-result-price">{this.price}</h3>
            </div>,
            <p>Stock checker proudly developped with Stencil.JS 🥰</p>
        ]
    }
}