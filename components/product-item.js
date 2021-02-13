// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    super();
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    </style>
    <li class="product">
        <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
        <p class="title">jijijijijjpojpoj</p>
        <p class="price">ojpjpojhuhim</p>
        <button>Add to Cart</button>
    </li>`;
            
    this.root = this.attachShadow({mode: 'open'});
    this.root.appendChild(template.content.cloneNode(true));
    //let wrapper = document.createElement('img');
    //shadowRoot.innerHTML = ;
  }
  
  
  setSrc(val){
    (this.root.querySelector('img')).setAttribute('src', val);
  }

  setAlt(val){
    this.root.querySelector('img').setAttribute('alt', val);
  }

  setpTitle(val){
    this.root.querySelector('p.title').innerHTML = (val.toString()).trim();
  }

  setpPrice(val){
    this.root.querySelector('p.price').innerHTML = "$" + val.toString();
  }

  setBtnText(){
    this.root.querySelector('button').innerHTML = 'Remove from Cart';
  }

  getpTitle(){
    return this.root.querySelector('p.title').innerHTML;
  }

  startListener(clicks){
    var btn = this.root.querySelector('button');
    var cart = document.getElementById('cart-count');
    var key = (this.root.querySelector('p.title').innerHTML).toString();
    var object = this.root.toString();
    btn.addEventListener('click',function(){
      clicks++;
      if(clicks % 2 == 1){
        alert('Added to Cart!');
        cart.innerHTML = Number(document.getElementById('cart-count').innerHTML) + 1 ;
        btn.innerHTML = 'Remove from Cart';
        window.localStorage.setItem(key, key);
      }
      else{
        alert('Removed from Cart!');
        cart.innerHTML = Number(document.getElementById('cart-count').innerHTML) - 1 ;
        btn.innerHTML = 'Add to Cart';
        window.localStorage.removeItem(key);
      }
    });
  }
}

customElements.define('product-item', ProductItem);