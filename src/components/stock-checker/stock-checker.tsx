import { Component, h} from "@stencil/core";

@Component({
    tag: "my-stock-checker",
    styleUrl: "./stock-checker.css",
    shadow: true
})

export class StockChecker {
    
    onShowPrice(event: Event) {
        event.preventDefault();
        console.log("fetching...")


    }
     
    render() {
        return [
            <form action="#" onSubmit={this.onShowPrice}>
                <input id="stock-checker-symbol"/>
                <button id="stock-checker-submit" type="submit">Show stock price</button>
            </form>,
            <div id="stock-checker-result">
                <p id="stock-checker-result-text">Price: </p>
                <p id="stock-checker-result-price">
                    {0}
                </p>
            </div>
        ]
    }
}