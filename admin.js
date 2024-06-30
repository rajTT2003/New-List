// Sample products data (replace this with actual data from your database)
const sampleProducts = [
    { id: 1, name: 'Product 1', price: 19.99, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
    // Add more products as needed
];
let products = [
    { id: 1, name: 'Product 1', price: 19.99, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, name: 'Product 2', price: 29.99, description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
    // Add more products as needed
];


function loadProducts() {
    const mainContent = document.getElementById('adminMain');
    mainContent.innerHTML = ''; // Clear existing content
  
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-list');
  
    const productListHeader = document.createElement('div');
    productListHeader.classList.add('product-list-header');
    productListHeader.innerHTML = `
      <h2>Products</h2>
      <input type="text" id="productSearch" oninput="searchProducts()" placeholder="Search for products...">
      <div class="sort-buttons">
          <!-- ... (existing buttons) ... -->
      </div>
    `;
    productContainer.appendChild(productListHeader);
  
    const productCardsContainer = document.createElement('div');
    productCardsContainer.classList.add('product-cards-container');
  
    // Use fetch to get product data from the server
    fetch('http://localhost:3001/products') // Update the URL to match your server endpoint
      .then(response => response.json())
      .then(responseProducts => { // Change the variable name here
        responseProducts.forEach(product => { // Change the variable name here
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
  
          productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.imagePath}" alt="${product.name}" class="product-image">
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="viewProduct(${product.id})">View</button>
            <button onclick="editProduct(${product.id})">Edit</button>
          `;
  
          productCardsContainer.appendChild(productCard);
        });
  
        productContainer.appendChild(productCardsContainer);
        mainContent.appendChild(productContainer);
      })
      .catch(error => console.error('Error fetching products:', error));
  }
  


function sortProducts(criteria) {
    // Implement sorting logic based on the criteria
    // Update the 'products' array accordingly
    // Reload the products
    loadProducts();
}

function filterProducts(criteria) {
    // Implement filtering logic based on the criteria
    // Update the 'products' array accordingly
    // Reload the products
    loadProducts();
}


function viewProduct(productId) {
    // Use fetch to get product details from the server
    fetch(`http://localhost:3001/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productDetailsContainer = document.getElementById('productDetails');
            productDetailsContainer.innerHTML = `
                <h2>${product.name}</h2>
                <p>Description: ${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <!-- Add more details as needed -->
            `;

            openModal('viewProductModal');
        })
        .catch(error => console.error('Error fetching product details:', error));
}

function editProduct(productId) {
    // Use fetch to get product details from the server
    fetch(`http://localhost:3001/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const editProductNameInput = document.getElementById('editProductName');
            const editProductDescriptionInput = document.getElementById('editProductDescription');
            const editProductPriceInput = document.getElementById('editProductPrice');

            // Populate the edit modal with the current product information
            editProductNameInput.value = product.name;
            editProductDescriptionInput.value = product.description;
            editProductPriceInput.value = product.price;

            openModal('editProductModal');
        })
        .catch(error => console.error('Error fetching product details:', error));
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}


function searchProducts() {
    const searchInput = document.getElementById('productSearch').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('p').textContent.toLowerCase();
        const isVisible = productName.includes(searchInput) || productDescription.includes(searchInput);

        card.style.display = isVisible ? 'block' : 'none';
    });
}










































// Sample orders
let sampleOrders = [
    { id: 1, status: 'new', items: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }] },
    { id: 2, status: 'new', items: [{ productId: 3, quantity: 1 }] },
    { id: 3, status: 'completed', items: [{ productId: 2, quantity: 3 }] },
    { id: 4, status: 'outstanding', items: [{ productId: 1, quantity: 1 }] },
    // Add more sample orders as needed
];

function loadOrders(orderType) {
    // Use fetch to get data from the server
    fetch(`http://localhost:3001/orders?type=${orderType}`)
        .then(response => response.json())
        .then(orders => {
            const mainContent = document.getElementById('adminMain');
            mainContent.innerHTML = ''; // Clear existing content

            const orderContainer = document.createElement('div');
            orderContainer.classList.add('order-list');

            const orderListContainer = document.createElement('div');
            orderListContainer.classList.add('order-list-container');

            orders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.classList.add('order-card');

                orderCard.innerHTML = `
                    <h3>Order #${order.id}</h3>
                    <p>Customer ID: ${order.customerId}</p>
                    <ul>
                        ${order.items.map(item => `<li>Product ID: ${item.productId}, Quantity: ${item.quantity}</li>`).join('')}
                    </ul>
                    <button onclick="viewOrder(${order.id})">View</button>
                    <button onclick="editOrder(${order.id})">Edit</button>
                `;

                orderListContainer.appendChild(orderCard);
            });

            orderContainer.appendChild(orderListContainer);
            mainContent.appendChild(orderContainer);
        })
        .catch(error => console.error('Error fetching orders:', error));
}

// Function to simulate loading orders when a menu item is clicked
function loadOrdersForMenuItem(menuItem) {
    switch (menuItem) {
        case 'new':
        case 'all':
        case 'completed':
        case 'outstanding':
            loadOrders(menuItem);
            break;
        default:
            console.error('Invalid menu item:', menuItem);
    }
}





function viewOrder(orderId) {
    // Use fetch to get order details from the server
    fetch(`http://localhost:3001/orders/${orderId}`)
        .then(response => response.json())
        .then(order => {
            // Implement logic to display order details in a modal
            showModal('viewOrderModal');
            // Example: Update the content of 'orderDetails' in the modal
            document.getElementById('orderDetails').innerText = `Order #${order.id}, Customer ID: ${order.customerId}`;
        })
        .catch(error => console.error('Error fetching order details:', error));
}

function editOrder(orderId) {
    // Use fetch to get order details from the server
    fetch(`http://localhost:3001/orders/${orderId}`)
        .then(response => response.json())
        .then(order => {
            // Implement logic to populate and display the editOrderModal
            showModal('editOrderModal');
            // Example: Update the input fields in the modal with order details
            // You may want to use a form for editing orders
        })
        .catch(error => console.error('Error fetching order details:', error));
}

function saveOrderEdit() {
    // Implement logic to save edits made in the editOrderModal
    // Reload the orders after saving
    loadOrders('all');
}

// Define showModal function
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('Modal not found:', modalId);
    }
}

// ... (rest of your JavaScript code) ...


























// Sample customers
let sampleCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', phoneNumber: '987-654-3210' },
    // Add more sample customers as needed
];

// Function to load and display customers
function loadCustomers() {
    // Use fetch to get data from the server
    fetch('http://localhost:3001/customers')
        .then(response => response.json())
        .then(customers => {
            const mainContent = document.getElementById('adminMain');
            mainContent.innerHTML = ''; // Clear existing content

            const customerContainer = document.createElement('div');
            customerContainer.classList.add('customer-list');

            const customerListContainer = document.createElement('div');
            customerListContainer.classList.add('customer-list-container');

            customers.forEach(customer => {
                const customerCard = document.createElement('div');
                customerCard.classList.add('customer-card');

                customerCard.innerHTML = `
                    <h3>${customer.firstName} ${customer.lastName}</h3>
                    <p>Email: ${customer.email}</p>
                    <button onclick="viewCustomer(${customer.id})">View</button>
                    <button onclick="editCustomer(${customer.id})">Edit</button>
                `;

                customerListContainer.appendChild(customerCard);
            });

            customerContainer.appendChild(customerListContainer);
            mainContent.appendChild(customerContainer);
        })
        .catch(error => console.error('Error fetching customers:', error));
}

// Function to simulate loading customers when a menu item is clicked
function loadCustomersForMenuItem() {
    loadCustomers();
}

// Function to view customer details
function viewCustomer(customerId) {
    // Use fetch to get customer details from the server
    fetch(`http://localhost:3001/customers/${customerId}`)
        .then(response => response.json())
        .then(customer => {
            // Implement logic to display customer details in a modal
            showModal('viewCustomerModal');
            // Example: Update the content of 'customerDetails' in the modal
            document.getElementById('customerDetails').innerText = `Customer: ${customer.firstName} ${customer.lastName}, Email: ${customer.email}`;
        })
        .catch(error => console.error('Error fetching customer details:', error));
}


function editCustomer(customerId) {
    // Use fetch to get customer details from the server
    fetch(`http://localhost:3001/customers/${customerId}`)
        .then(response => response.json())
        .then(customer => {
            // Implement logic to populate and display the editCustomerModal
            showModal('editCustomerModal');
            // Example: Update the input fields in the modal with customer details
            document.getElementById('editCustomerFirstName').value = customer.firstName;
            document.getElementById('editCustomerLastName').value = customer.lastName;
            document.getElementById('editCustomerEmail').value = customer.email;
        })
        .catch(error => console.error('Error fetching customer details:', error));
}

// Function to save edits made in the editCustomerModal
function saveCustomerEdit() {
    // Implement logic to save edits made in the editCustomerModal
    // Reload the customers after saving
    loadCustomers();
}

// ... rest of your JavaScript code ...











































// Inside your admin.js

function loadAddProduct() {
    openModal('addProductModal');
}

// ... (your existing code)

function addVariant() {
    const variantNameInputs = document.querySelectorAll('#variantInputs .variant-input');
    const variantInputsContainer = document.getElementById('variantInputs');
    const variantType = document.getElementById('addProductVariantType').value;
    const variantPhotoInput = document.getElementById('addProductVariantPhoto');
    const variantPhoto = variantPhotoInput.files[0]; // Assuming a single file for simplicity

    // Create input fields for a new variant
    const variantNameInput = document.createElement('input');
    variantNameInput.type = 'text';
    variantNameInput.placeholder = 'Variant Name';
    variantNameInput.classList.add('variant-input');

    const variantPriceInput = document.createElement('input');
    variantPriceInput.type = 'number';
    variantPriceInput.step = '0.01';
    variantPriceInput.placeholder = 'Variant Price';
    variantPriceInput.classList.add('variant-input');

    // Append new variant input fields to the container
    variantInputsContainer.appendChild(variantNameInput);
    variantInputsContainer.appendChild(variantPriceInput);

     // Collect data from variant input fields
     const variants = [];

     variantNameInputs.forEach((input, index) => {
         const variantName = input.value;
         const variantPriceInput = document.querySelectorAll('#variantInputs .variant-input')[index * 2 + 1];
         const variantPrice = variantPriceInput.value;
 
         // Check if both name and price are provided
         if (variantName && variantPrice) {
             variants.push({
                 name: variantName,
                 price: parseFloat(variantPrice),
                 type: variantType,
                 photo: variantPhoto,
             });
         }
     });
}

function addProduct() {
    const productName = document.getElementById('addProductName').value;
    console.log('Product Name:', productName);

    const productDescriptionElement = document.getElementById('addProductDescription');
    const productDescription = productDescriptionElement ? productDescriptionElement.value : '';
    console.log('Product Description:', productDescription);

    const productPriceInput = document.getElementById('addProductPrice');
    const productPrice = productPriceInput ? parseFloat(productPriceInput.value) : 0;
    console.log('Product Price:', productPrice);

    const productVariantTypeElement = document.getElementById('addProductVariantType');
    const productVariantType = productVariantTypeElement ? productVariantTypeElement.value : '';
    console.log('Product Variant Type:', productVariantType);

    const productVariantPhotoElement = document.getElementById('addProductVariantPhoto');
    const productVariantPhoto = productVariantPhotoElement ? productVariantPhotoElement.value : '';
    console.log('Product Variant Photo:', productVariantPhoto);

    // Get variant input fields
    const variantNameInputs = document.querySelectorAll('#variantInputs .variant-input');

    // Collect data from variant input fields
    const variants = [];

    variantNameInputs.forEach((input, index) => {
        const variantName = input.value;
        const variantPriceInput = document.querySelectorAll('#variantInputs .variant-input')[index * 2 + 1];

        // Check if variantPriceInput is not undefined
        if (variantPriceInput) {
            const variantPrice = variantPriceInput.value;

            // Check if both name and price are provided
            if (variantName && variantPrice) {
                variants.push({
                    name: variantName,
                    price: parseFloat(variantPrice),
                });
            }
        }
    });

    // Check if the payload is correctly formed
    console.log('Request Payload:', {
        name: productName,
        description: productDescription,
        price: productPrice,
        variants: variants,
        variantPhotos: productVariantPhoto ? [productVariantPhoto] : [], // Fix this line
    });


    // You can add validation logic here to ensure the required fields are filled

    // Send the data to the server
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);

    // Append variants as a JSON string
    formData.append('variants', JSON.stringify(variants));

    // Append the file input if available
    const fileInput = document.getElementById('addProductVariantPhoto');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        formData.append('file', file);
    }

    fetch('http://localhost:3001/products', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseText => {
        console.log('Response from server:', responseText);
        closeModal('addProductModal');
        loadProducts();
    })
    .catch(error => console.error('Error adding product:', error));
}



