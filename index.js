if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// making function
function ready() {
    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartitem);
    }


    // quantity changes 
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    console.log(quantityInputs);

    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantitychanged);
    }


    // add to cart
    var addcart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addcart.length; i++) {
        var button = addcart[i];
        button.addEventListener('click', addCartClicked);
    }

    // buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
// Buy Button
function buyButtonClicked() {
    alert('Your order is placed');
    var cartcontent = document.getElementsByClassName('cart-content')[0];
    while (cartcontent.hasChildNodes()) {
        cartcontent.removeChild(cartcontent.firstChild);
    }
    upadtetotal();
}


// remove items form cart
function removeCartitem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    upadtetotal();
}
// quantity changes
function quantitychanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    upadtetotal();
}


// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('name')[0].innerText;
    var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    var quantityElement = shopProducts.getElementsByClassName('cart-quantity')[0].value;
    // console.log(e)
    addProductTo(title, price, productImg, quantityElement);
    upadtetotal();
}
function addProductTo(title, price, productImg, quantityElement) {
    var cartshopbox = document.createElement('div');
    cartshopbox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartitemsname = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartitemsname.length; i++) {
        if (cartitemsname[i].innerHTML == title) {
            alert("You have already added this item to your cart");
            return;
        }
    }


    var cartboxcontent = `      <img src="${productImg}" alt="" class="cart-img">
                                <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-prices">${price}</div>
                                <input type="number" value="${quantityElement}" class="cart-quantity">
                                </div>
                 <!-- remove cart -->
                                <button class="remove" id="del">Remove</button> 
                        `;

    cartshopbox.innerHTML = cartboxcontent;
    cartItems.append(cartshopbox);
    cartshopbox.getElementsByClassName('remove')[0].addEventListener('click', removeCartitem);
    cartshopbox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantitychanged);
}




// upadte total
function upadtetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-prices')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // what if price cointains some cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}