// ========== CART SYSTEM ==========
const cart = [];

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = '$' + total.toFixed(2);
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    // Open cart sidebar briefly on add
    openCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
}

// Cart toggle / close listeners
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// Add to cart buttons (product cards in page3)
document.querySelectorAll('.product-card .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.product-card');
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        addToCart(name, price);

        // Visual feedback
        this.textContent = 'Added ✓';
        this.classList.add('added');
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.classList.remove('added');
        }, 1500);
    });
});

// Spotlight add to cart button (page4)
document.querySelector('.spotlight-btn').addEventListener('click', function () {
    const name = this.dataset.name;
    const price = parseFloat(this.dataset.price);
    addToCart(name, price);

    this.textContent = 'Added ✓';
    this.classList.add('added');
    setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.classList.remove('added');
    }, 1500);
});

// ========== LOCOMOTIVE SCROLL ==========
function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,

  tablet: { smooth: true },
  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
}

locoScroll();

// ========== CURSOR EFFECT ==========
function cursorEffect(){
    var page1Content = document.querySelector(".page1-content")
var cursor = document.querySelector(".cursor")

page1Content.addEventListener("mousemove",function(dets){
    gsap.to(".cursor",{
        x:dets.x,
        y:dets.y
    })
})

page1Content.addEventListener("mouseenter",function(){
    gsap.to(".cursor",{
        scale:1,
        opacity: 1
    })
})

page1Content.addEventListener("mouseleave",function(){
    gsap.to(".cursor",{
        scale:0,
        opacity: 0
    })
})
}
cursorEffect();

// ========== SCROLL ANIMATIONS ==========
function page2Animation(){
    gsap.from(".elem h1",{
        y:120,
        stagger:0.1,
        duration: 1,
        scrollTrigger: {
            trigger: "#page2",
            scroller: ".main",
            start: "top 47%",
            end: "top 46%",
            scrub: 5
        }
    })
}
page2Animation();

function swipperAnimation(){
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    slidePerView: 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    }
});
}

swipperAnimation();

function footerAnimation(){
    gsap.from(".bottom h1",{
        y:120,
        stagger:0.1,
        duration: 1,
        scrollTrigger: {
            trigger: "#footer",
            scroller: ".main",
            start: "top 47%",
            end: "top 46%",
            scrub: 5
        }
    })
}

footerAnimation();

function page3Animation(){
    gsap.from(".elements h1",{
        y:120,
        stagger:0.1,
        duration: 1,
        scrollTrigger: {
            trigger: "#page3-5",
            scroller: ".main",
            start: "top 47%",
            end: "top 46%",
            scrub: 5
        }
    })
}
page3Animation();
