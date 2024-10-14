const products = [
  {id: "1", title: "LDO1 LOUNGE CHAIR", price: "200", imageUrl:"./assets/image/1.png", count: 0},
  {id: "2", title: "LDO2 LOUNGE CHAIR", price: "250", imageUrl:"./assets/image/2.png", count: 0},
  {id: "3", title: "LDO3 LOUNGE CHAIR", price: "290", imageUrl:"./assets/image/3.png", count: 0},
  {id: "4", title: "LDO4 LOUNGE CHAIR", price: "200", imageUrl:"./assets/image/4.png", count: 0},
  {id: "5", title: "LDO5 LOUNGE CHAIR", price: "300", imageUrl:"./assets/image/5.png", count: 0},
  {id: "6", title: "LDO6 LOUNGE CHAIR", price: "200", imageUrl:"./assets/image/6.png", count: 0},
  {id: "7", title: "LDO7 LOUNGE CHAIR", price: "200", imageUrl:"./assets/image/7.png", count: 0},
  {id: "8", title: "LDO8 LOUNGE CHAIR", price: "200", imageUrl:"./assets/image/8.png", count: 0}
]

const cardContainer = document.querySelector('#card-container'); //card container to keep my cards
const chosenItemsList = document.querySelector('.chosen-items-list'); //chosen items that added to the list
const btnWrapper = document.querySelector('.action-buttons'); //keeps my close and checkout buttons
const shoppingIconEl = document.querySelector('.shopping-icon-wrapper');
const sidebarEl = document.querySelector('.sidebar');
const shoppinIconEl = document.querySelector('.shopping-icon-wrapper');
let totalPriceEl = document.querySelector('.total-price'); 

//render products when page is loaded
function renderProducts(){
  cardContainer.innerHTML = products.map(product=>`
    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-16">
            <div class="card" >
              <div class="card-header">
                <img src=${product.imageUrl} alt=${product.title} style="width: 150px; height:150px">
              </div>
              <div class="card-content">
                <p>${product.title}</p>
              </div>
              <div class="card-info">
                <div class="chair-price">
                  <p>${product.price} $</p>
                </div>
              </div>
              <div class="card-action">
                <button class="add-to-cart-btn" onclick='addToCart(${product.id})'>Add to Cart</button>
              </div>
            </div>
          </div>
    `).join('');



    for(let i=0; i<= products.length; i++){
      let index = i-1;
      let item = localStorage.getItem(i);
      let obj = JSON.parse(item);

      if(item === null){
        continue;
      } else{
        let newElement = document.createElement('div');
        newElement.classList.add('chair-item');
        newElement.innerHTML = `
          <div class="productInfo">
                  <img src="${obj.imageUrl}" alt="${obj.title}" class="productImg">
                  <span class="item-title">${obj.title}</span>
                  <span class="item-price">$${obj.price}</span>
          </div>
          <div class="countOfProduct">
                    <button class="prev-button" onclick=prevCount(${index})><</button>
                    <span class="item-price" id="span-el-${index}">${obj.count}</span>
                    <button class="next-button" onclick=nextCount(${index})>></button>
          </div>
        `
        chosenItemsList.append(newElement);
      }
    }

    btnWrapper.innerHTML = `
    <button class="close-btn" onclick="closeModule()">CLOSE</button>
    <button class="checkout-btn" onclick="getTotal()">CHECKOUT</button>`

    getShopCount();
}

//add item to the shopping cart
function addToCart(id){
  let index = id - 1;
  if(id in localStorage){
    let count = document.querySelector('#span-el-'+index);
    let item=JSON.parse(localStorage.getItem(id));
    item.count++;
    localStorage.setItem(id,JSON.stringify(item));

    count.innerHTML= `${item.count}`;
    getShopCount();

  } else{
    localStorage.setItem(id, JSON.stringify(products[index]));
    let item = JSON.parse(localStorage.getItem(id));
    item.count++;
    localStorage.setItem(id, JSON.stringify(item));

    let newElement = document.createElement('div');
    newElement.classList.add('chair-item');
    newElement.innerHTML = `
      <div class="productInfo">
              <img src="${products[index].imageUrl}" alt="${products[index].title}" class="productImg">
              <span class="item-title">${products[index].title}</span>
              <span class="item-price">$${products[index].price}</span>
      </div>
      <div class="countOfProduct">
                <button class="prev-button" onclick=prevCount(${index})><</button>
                <span class="item-price" id="span-el-${index}">${1}</span>
                <button class="next-button" onclick=nextCount(${index})>></button>
      </div>
    `
    chosenItemsList.append(newElement);
    getShopCount();
  }
}

//update total count
function getShopCount(){
  let count_num = 0;

  for(let i=0; i<=products.length; i++){
    let item = JSON.parse(localStorage.getItem(i));
    if(item===null){
      continue;
    } else{
      count_num += item.count;
    }
  }
  
  let countEl = document.querySelector('.quantity');
  countEl.innerHTML = count_num;
}

//works when i click prevCount button
function prevCount(index) {
  let id = index + 1;
  let item = JSON.parse(localStorage.getItem(id));
  let countEl = document.querySelector(`#span-el-${index}`);
  
  if (item.count <= 1) {
    // Remove the item from localStorage
    localStorage.removeItem(id);
    
    // Remove the corresponding product element from the DOM
    let productEl = countEl.closest('.chair-item');
    productEl.remove();

    getShopCount();
  } else {
    item.count--;
    localStorage.setItem(id, JSON.stringify(item));
    countEl.innerHTML = `${item.count}`;
    getShopCount();
  }
}


//works when i click nextCount button
function nextCount(index){
  let id = index + 1;
  let item = JSON.parse(localStorage.getItem(id));
  let countEl = document.querySelector(`#span-el-${index}`);
  item.count++;
  localStorage.setItem(id, JSON.stringify(item));
  countEl.innerHTML = `${item.count}`;
  getShopCount();
}

//give the total proce when i press checkout button
function getTotal(){
  let total = 0;
  for(let i=0;i<=products.length;i++){
    let item = JSON.parse(localStorage.getItem(i));
    if(item === null){
      continue;
    } else{
      total += item.price*item.count;
    }
  }
  totalPriceEl.innerHTML = `$${total}`;
}

//show module when i click on shopping cart icon
function showModule(){
  sidebarEl.classList.toggle('showCart');
}

//close module when i click
function closeModule(){
  sidebarEl.classList.toggle('showCart');
}

renderProducts();