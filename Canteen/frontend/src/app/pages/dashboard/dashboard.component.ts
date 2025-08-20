import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

type MenuItem = { id: number; name: string; price: number };
type OrderItem = {
  id?: number;
  itemName: string;
  quantity: number;
  total: number;
  userName?: string;
  tableNumber?: number;
  orderTime?: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(private http: HttpClient) {
    this.loadMenu();
    this.loadOrders();
  }

  tables = [1, 2, 3, 4, 5];
  menu = signal<MenuItem[]>([]);
  orders = signal<OrderItem[]>([]);
  currentOrder = signal<OrderItem[]>([]);

  newItem: { name: string; price: number | null } = { name: '', price: null };
  customerName = '';
  tableNumber: number | null = null;

  total = computed(() =>
    this.currentOrder().reduce((s, i) => s + i.total, 0)
  );

  loadMenu() {
    this.http
      .get<MenuItem[]>('/api/canteen/menu')
      .subscribe(items => this.menu.set(items));
  }

  loadOrders() {
    this.http
      .get<OrderItem[]>('/api/canteen/orders')
      .subscribe(items => this.orders.set(items));
  }

  addMenu() {
    const name = this.newItem.name?.trim();
    const price = Number(this.newItem.price);
    if (!name || !price || price <= 0) return;

    this.http
      .post<MenuItem>('/api/canteen/menu', { name, price })
      .subscribe(() => {
        this.newItem = { name: '', price: null };
        this.loadMenu();
      });
  }

  addToOrder(item: MenuItem) {
    const exists = this.currentOrder().find(i => i.itemName === item.name);
    if (exists) {
      exists.quantity += 1;
      exists.total = exists.quantity * item.price;
      this.currentOrder.set([...this.currentOrder()]);
    } else {
      this.currentOrder.set([
        ...this.currentOrder(),
        { itemName: item.name, quantity: 1, total: item.price }
      ]);
    }
  }

  placeOrder() {
    if (!this.customerName || !this.tableNumber || this.currentOrder().length === 0) return;

    const payload: OrderItem = {
      userName: this.customerName,
      tableNumber: Number(this.tableNumber),
      itemName: this.currentOrder().map(i => i.itemName).join(', '),
      quantity: this.currentOrder().reduce((s, i) => s + i.quantity, 0),
      total: this.total()
    };

    this.http.post<OrderItem>('/api/canteen/order', payload).subscribe(() => {
      this.currentOrder.set([]);
      this.customerName = '';
      this.tableNumber = null;
      this.loadOrders();
    });
  }
}
