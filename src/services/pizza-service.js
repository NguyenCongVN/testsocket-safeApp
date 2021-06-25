import * as io from "socket.io-client";
import { Observable } from "rxjs";

class PizzaService {
  constructor() {
    this._Url = "http://localhost:4000/pizza";
    this._Socket = io(this._Url);
  }

  getPizzaList() {
    return new Observable((observable) => {
      this._Socket.on("pizzaList", (pizzas) => {
        observable.next(pizzas);
      });
    });
  }

  getPizzaOrderCountByPizzaName() {
    return new Observable((observable) => {
      this._Socket.on("pizzaOrdersCount", (pizzaCount) => {
        observable.next(pizzaCount);
      });
    });
  }

  newCustomerOrder(order){
    this._Socket.emit("newPizzaOrder" , order);
  }
}

export default new PizzaService();