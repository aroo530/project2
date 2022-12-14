import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    // TODO: output validators errors
    //
    confirmForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        creditCard: ['', Validators.required],
    });

    product: Product = {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is product 1',
        url: '',
        quantity: 0,
    };
    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    addToCart(tmpQuantity: number, tmpId: number) {
        this.cartService.addToCart(tmpQuantity, tmpId);
    }
    getCart(): Product[] {
        return this.cartService.getCart();
    }
    removeProduct(product: Product) {
        this.cartService.removeProduct(product);
    }

    getTotal() {
        return this.cartService.getTotal();
    }
    updateQuantity(event: any, product: Product) {
        if (event.target.value > 0) {
            this.cartService.updateQuantity(event.target.value, product);
        } else {
            this.cartService.removeProduct(product);
        }
    }
    confirm() {
        this.cartService.clientName = this.confirmForm.value.name ?? '';
        this.cartService.emptyCart();
        this.router.navigate(['confirm'], { relativeTo: this.route });
    }

    isEmpty(): boolean {
        //add null check for cart in localstorage
        if (localStorage.getItem('cart') === null) {
            return true;
        }
        return this.getCart().length !== 0;
    }
    ngOnInit(): void {}
}
