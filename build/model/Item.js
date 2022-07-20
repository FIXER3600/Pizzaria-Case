"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(id, pizzaId, quantity) {
        this.id = id;
        this.pizzaId = pizzaId;
        this.quantity = quantity;
    }
    getId() {
        return this.id;
    }
    getPizzaId() {
        return this.pizzaId;
    }
    getQuantity() {
        return this.quantity;
    }
    setId(id) {
        this.id = id;
    }
    setPizzaId(pizzaId) {
        this.pizzaId = pizzaId;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    static toItemModel(item) {
        return new Item(item.id, item.pizzaId, item.quantity);
    }
}
exports.Item = Item;
