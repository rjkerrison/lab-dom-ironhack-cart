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
  // Create the row
  const productRowElement = document.createElement('tr');
  productRowElement.classList.add('product');

  // Add the cells
  addCellsToProductRow(productRowElement);

  // Append the row
  const tbody = document.querySelector('table#cart tbody');
  tbody.appendChild(productRowElement);
}

function getNewProductOptions() {
  const productNameInput = document.querySelector(
    '.create-product input[type="text"]'
  );
  const unitPriceInput = document.querySelector(
    '.create-product input[type="number"]'
  );
  return {
    name: productNameInput.value,
    unitPrice: parseFloat(unitPriceInput.value)
  };
}

function addCellsToProductRow(productRowElement) {
  const options = getNewProductOptions();

  // PRODUCT NAME
  const productNameCell = createProductCell(productRowElement, 'name');
  addTextCellToRow(productNameCell, options.name);
  // UNIT PRICE
  const unitPriceCell = createProductCell(productRowElement, 'price');
  addPriceToCell(unitPriceCell, options.unitPrice);
  // QUANTITY
  const quantityCell = createProductCell(productRowElement, 'quantity');
  addNumberInputToCell(quantityCell);
  // TOTAL PRICE
  const totalPriceCell = createProductCell(productRowElement, 'subtotal');
  addPriceToCell(totalPriceCell, 0);

  // remove button
  const removeButtonCell = createProductCell(productRowElement, 'remove');
  addRemoveButtonToCell(removeButtonCell);
}

function addTextCellToRow(cell, text) {
  const span = document.createElement('span');
  span.textContent = text;
  cell.appendChild(span);
}

function addNumberInputToCell(cell) {
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.value = 0;
  cell.appendChild(input);
}

function addRemoveButtonToCell(cell) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-remove');
  button.textContent = 'Remove';
  attachRemoveEventListener(button);
  cell.appendChild(button);
}

function addPriceToCell(cell, price, className) {
  const span = document.createElement('span');
  span.textContent = price.toFixed(2);

  cell.textContent = '$';
  cell.appendChild(span);
}

function createProductCell(productRowElement, className) {
  const productCellElement = document.createElement('td');
  productCellElement.classList.add(className);
  productRowElement.appendChild(productCellElement);
  return productCellElement;
}

function removeProductRow(removeButton) {
  const productRowElement = removeButton.closest('tr.product');
  productRowElement.remove();
  // we will need to update the total
  calculateAll();
}

const attachRemoveEventListener = (removeButton) => {
  removeButton.addEventListener('click', () => removeProductRow(removeButton));
};

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach(attachRemoveEventListener);

  const createButton = document.querySelector('button#create');
  createButton.addEventListener('click', createProduct);
  //... your code goes here
});
