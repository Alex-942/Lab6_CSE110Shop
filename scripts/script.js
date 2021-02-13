// Script.js
var storage = window.localStorage;
var container = document.getElementById('product-list');
var cartCount = document.getElementById('cart-count');

var clicks = 0;
var firstbtn = document.querySelector('button');
var firstTitle = document.querySelector('p.title').innerHTML;
//prevents default alert
firstbtn.onclick = 0;
if(storage.getItem(firstTitle.toString().trim()) != null){
  cartCount.innerHTML = Number(document.getElementById('cart-count').innerHTML) + 1 ;
  firstbtn.innerHTML = 'Remove from Cart';
  clicks++;
}

firstbtn.addEventListener('click',function(){
  clicks++;
  if(clicks % 2 == 1){
    alert('Added to Cart!');
    cartCount.innerHTML = Number(document.getElementById('cart-count').innerHTML) + 1 ;
    firstbtn.innerHTML = 'Remove from Cart';
    window.localStorage.setItem(firstTitle, firstTitle);
  }
  else{
    alert('Removed from Cart!');
    cartCount.innerHTML = Number(document.getElementById('cart-count').innerHTML) - 1 ;
    firstbtn.innerHTML = 'Add to Cart';
    window.localStorage.removeItem(firstTitle);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  var promise = fetch('https://fakestoreapi.com/products')
                  .then(response => response.json())
                  .then(data => {
                    var index = 1;
                    console.log(JSON.stringify(data));
                    //stores entire array into storage
                    storage.setItem('objects', JSON.stringify(data));

                    for(let key of data){
                      //sotres into local storage
                      var lookup = index.toString();
                      storage.setItem(lookup, JSON.stringify(key));

                      if(index !== 1){
                        //Get values
                        let src = key["image"];
                        let alt = key["title"];
                        let title = key["title"];
                        let price = key["price"];

                        //create the Javascript object
                        var currProduct = document.createElement('product-item');
                        //set atts
                        currProduct.setSrc(src);
                        currProduct.setAlt(alt);
                        currProduct.setpTitle(title);
                        currProduct.setpPrice(price);
                        
                        if(storage.getItem(title.toString().trim()) != null){
                          cartCount.innerHTML = Number(document.getElementById('cart-count').innerHTML) + 1 ;
                          currProduct.setBtnText();
                          currProduct.startListener(1);
                        }
                        else{
                          currProduct.startListener(0);

                        }
                        
                
                        container.appendChild(currProduct);
                      }
                      index++;
                    }
                  });
});

