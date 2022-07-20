"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pizza = void 0;
class Pizza {
    constructor(id, name, price, imgUrl, ingredients) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
        this.ingredients = ingredients;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getImgUrl() {
        return this.imgUrl;
    }
    getIngredients() {
        return this.ingredients;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setPrice(price) {
        this.price = price;
    }
    setImgUrl(imgUrl) {
        this.imgUrl = imgUrl;
    }
    setIngredients(ingredients) {
        this.ingredients = ingredients;
    }
    static toPizzaModel(pizza) {
        return new Pizza(pizza.id, pizza.name, pizza.price, pizza.imgUrl, pizza.ingredients);
    }
}
exports.Pizza = Pizza;
