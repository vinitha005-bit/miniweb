let cart = [];

function addToCart(id, name, price) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity++;
  else cart.push({ id, name, price, quantity: 1 });
  renderCart();
}

function increaseQty(id) {
  cart.forEach(item => {
    if (item.id === id) item.quantity++;
  });
  renderCart();
}

function decreaseQty(id) {
  cart.forEach(item => {
    if (item.id === id) item.quantity--;
  });
  cart = cart.filter(item => item.quantity > 0);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (₹${item.price})</span>
        <div>
          <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
          ${item.quantity}
          <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty! Add items first.");
    return;
  }
  alert("✅ Order placed successfully!\nThank you for shopping!!");
  cart = [];
  renderCart();
}