"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, userId, itemId, total, createdAt) {
        this.id = id;
        this.userId = userId;
        this.itemId = itemId;
        this.total = total;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
    }
    getItemId() {
        return this.itemId;
    }
    getTotal() {
        return this.total;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setId(id) {
        this.id = id;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setItemId(itemId) {
        this.itemId = itemId;
    }
    setTotal(total) {
        this.total = total;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
    static toOrderModel(order) {
        return new Order(order.id, order.userId, order.itemId, order.total, order.createdAt);
    }
}
exports.Order = Order;
