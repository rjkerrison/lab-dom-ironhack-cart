// ITERATION 1

function updateSubtotal(productRowElement) {
  // productRowElement is the tr element for the product
  console.log('Calculating subtotal, yey!', productRowElement);

  // GET THE UNIT PRICE
  const unitPriceElement = productRowElement.querySelector('.price span');
  const unitPrice = parseFloat(unitPriceElement.textContent);
  console.log(unitPrice);
  // GET THE QUANTITY
  const quantityInputElement =
    productRowElement.querySelector('.quantity input');
  const quantity = quantityInputElement.value;
  // MULTIPLY THEM TOGETHER
  const subtotal = unitPrice * quantity;
  // SET THE SUBTOTAL ON THE PRODUCT
  const subtotalElement = productRowElement.querySelector('.subtotal span');
  subtotalElement.textContent = subtotal;

  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.

  let total = 0;
  // end of test
  const allProducts = document.querySelectorAll('.product');
  allProducts.forEach((productRowElement) => {
    total += updateSubtotal(productRowElement);
  });

  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total;

  // ITERATION 3
  //... your code goes here
}

// ITERATION 4

function removeProduct(e, productRowElement) {
  productRowElement.remove();
}

// ITERATION 5

function createProduct() {
  //... your code goes here
  console.log('creating product');

  const productRowElement = document.createElement('tr');

  // PRODUCT NAME
  const productNameCell = createProductCell(productRowElement);
  productNameCell.innerHTML = '<span>Product Name/span>';
  // UNIT PRICE
  const unitPriceCell = createProductCell(productRowElement);
  addPriceToCell(unitPriceCell, 10000);

  const quantityCell = createProductCell(productRowElement);
  // total PRICE
  const totalPriceCell = createProductCell(productRowElement);
  addPriceToCell(totalPriceCell);

  const tbody = document.querySelector('table#cart tbody');
  tbody.appendChild(productRowElement);
}

function addPriceToCell(cell, price = 0) {
  const span = document.createElement('span');
  span.textContent = price;
  cell.textContent = '$';
  cell.appendChild(span);
}

function createProductCell(productRowElement) {
  const productCellElement = document.createElement('td');
  productRowElement.appendChild(productCellElement);
  return productCellElement;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach((removeButton) => {
    const productRowElement = removeButton.closest('tr.product');
    removeButton.addEventListener('click', function (event) {
      productRowElement.remove();
      // we will need to update the total
      calculateAll();
    });
  });
  const createButton = document.querySelector('button#create');
  createButton.addEventListener('click', createProduct);
  //... your code goes here
});
