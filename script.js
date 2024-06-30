// Add this code at the beginning of your script.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let visible = false;


const dropdown = document.querySelector(".dropdownContainer");
dropdown.style.display = 'none';
function openProductDetails(productId) {
    const product = document.querySelector(`[data-product-id="${productId}"]`);
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductId = document.getElementById('modalProductId');

    modalProductName.textContent = product.dataset.productName;
    modalProductPrice.textContent = `$${parseFloat(product.dataset.productPrice).toFixed(2)}`;
    modalProductId.value = productId;

    document.getElementById('productModal').style.display = 'block';
}

function closeProductDetails() {
    document.getElementById('productModal').style.display = 'none';
}

document.querySelector(".fa-user").addEventListener('click',function(){
    const dropdown = document.querySelector(".dropdownContainer");
    
    if(!visible){
        dropdown.style.display = 'block';
        visible = true;
    }else{
        dropdown.style.display = 'none';
        visible = false;
    }
})

function submitOrder() {
    // In a real application, you would send the order information to the server
    // and handle the order processing there.
    alert('Order submitted!');
}

function openCart() {
    updateCart();
    document.getElementById('cartModal').style.display = 'flex';
}


// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};








// Global variable to track the logged-in user
let loggedInUser = null;

// Add these functions to the existing script.js

function openSignup() {
    document.getElementById('signupModal').style.display = 'flex';
}

function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
}

function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}


    // Function to handle signup form submission
    function signup(event) {
        event.preventDefault(); // Prevent the default form submission

        const firstName = document.getElementById('signupFirstName').value;
        const lastName = document.getElementById('signupLastName').value;
        const email = document.getElementById('signupEmail').value;
        const telephone = document.getElementById('signupTelephone').value;
        const password = document.getElementById('signupPassword').value;

        // Simulate sending data to the server for signup
        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                telephone,
                password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Signup successful:', data);
                // Optionally, close the signup modal or perform other actions
            } else {
                console.error('Signup failed:', data.message);
                // Optionally, display an error message to the user
            }
        })
        .catch(error => console.error('Error during signup:', error));
    }



    // Function to handle login form submission
function login(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate sending data to the server for login
    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful:', data);
            
            // Call the function to handle successful login
            handleLoginSuccess(data.customer);

            // Optionally, close the login modal or perform other actions
            closeLogin('loginModal');
        } else {
            console.error('Login failed:', data.message);
            // Optionally, display an error message to the user
        }
    })
    .catch(error => console.error('Error during login:', error));
}



// Add these functions to your existing script.js

// Function to add products to the shopping cart
function addToCart(productId) {
    console.log('Adding to cart. loggedInUser:', loggedInUser);

    if (!loggedInUser) {
        alert('Please log in or sign up before adding items to the cart.');
        return;
    }

    const product = document.querySelector(`[data-product-id="${productId}"]`);
    console.log('Product:', product);

    const productName = product.dataset.productName;
    const productPrice = parseFloat(product.dataset.productPrice);

    // Add the product to the cart array
    cart.push({ id: productId, name: productName, price: productPrice });
    console.log('Cart:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to update the shopping cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
        cartItems.appendChild(listItem);
        total += item.price;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add these lines to the closeCart() function to also close the modal:
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}






// Add these functions to your existing script.js

// Modify the existing filterProducts function
// Modify the existing filterProducts function
function filterProducts(event) {
    // Existing filter logic

    // Fetch and display products based on filters
    fetchProducts(searchInput, categoryFilter);
}

// Function to fetch and display products
// Function to fetch and display products
function fetchProducts(searchInput, categoryFilter) {
    // Use fetch to get products from the server API
    fetch('/path/to/products.json') // Update the path to your actual file location
        .then(response => response.json())
        .then(products => {
            displayProducts(products, searchInput, categoryFilter);
        })
        .catch(error => console.error('Error fetching products:', error));
}


// Function to display products based on filters
function displayProducts(products, searchInput, categoryFilter) {
    const productListing = document.getElementById('productListing');
    productListing.innerHTML = '';

    products.forEach(product => {
        // Check if the product matches the filters
        if (
            product.name.toLowerCase().includes(searchInput) &&
            (categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter)
        ) {
            // Create and append product HTML elements
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            // Add product details to productElement
            // ...

            // Append the product to the product listing container
            productListing.appendChild(productElement);
        }
    });
}



function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    // You can include logic to pass the search term to the server for fetching results
    // For simplicity, we'll redirect to the search-results.html page

}


// Updated JavaScript (Add this to your existing script.js)
function openProductDetails(productId) {
    const product = document.querySelector(`[data-product-id="${productId}"]`);
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');

    modalProductName.textContent = product.dataset.productName;
    modalProductPrice.textContent = `$${parseFloat(product.dataset.productPrice).toFixed(2)}`;

    document.getElementById('productModal').style.display = 'flex';
}


function closeProductDetails() {
    document.getElementById('productModal').style.display = 'none';
    // Also hide the second modal
    document.getElementById('productModal2').style.display = 'none';
}






// Add these functions to your existing script.js

// Function to store JWT in localStorage
function storeToken(token) {
    localStorage.setItem('token', token);
}

// Function to retrieve JWT from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Function to remove JWT from localStorage
function removeToken() {
    localStorage.removeItem('token');
}

// Use these functions in your signup and login functions to store the JWT.

// Example:
// In your signup and login success callback:
// storeToken(response.token);

// Logout function:
// removeToken();
// Modify your existing submitOrder() function
function submitOrder() {
    if (!loggedInUser) {
        alert('Please log in or sign up before submitting the order.');
        return;
    }

    // Make a POST request to the server to submit the order
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ items: cart }),
    })
    .then(response => response.json())
    .then(order => {
        alert(`Order placed successfully! Order ID: ${order.id}`);
        // Clear the cart after successful order placement
        cart = [];
        updateCart();
    })
    .catch(error => console.error('Error submitting order:', error));
}





























// Function to handle successful login
function handleLoginSuccess(customer) {
    // Update the global state
    loggedInUser = customer;

    // Store user information in localStorage if needed
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    // Replace the HTML content with the logged-in user information
    const mainContainer = document.querySelector('.mainContainer');
    mainContainer.innerHTML = `
        <div class="userContainer" onclick="toggleDropdown()">
            ${customer.lastName}, ${customer.firstName.charAt(0)} <i class="fa-solid fa-chevron-down"></i>
            <div class="dropdownContainer" id="userDropdown">
                <button onclick="logout()">Logout</button>
            </div>
        </div>
    `;
}





document.addEventListener('DOMContentLoaded', function () {
    // Retrieve loggedInUser from localStorage if available
    const storedUser = localStorage.getItem('loggedInUser');
    loggedInUser = storedUser ? JSON.parse(storedUser) : null;

    if (loggedInUser) {
        // If a user is logged in, render the UI accordingly
        handleLoginSuccess(loggedInUser);
    }
});

// Function to toggle the user dropdown
function toggleDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    userDropdown.classList.toggle('show');
}

// Function to handle logout
// Function to handle logout
function logout() {
    // Clear user information from localStorage
    localStorage.removeItem('loggedInUser');
    // Update the loggedInUser variable
    loggedInUser = null;

    // Replace the HTML content with the original login/signup UI
    const mainContainer = document.querySelector('.mainContainer');
    mainContainer.innerHTML = `
        <i class="fa-solid fa-user"></i>
        <div class="dropdownContainer">
            <button onclick="openSignup()">Sign Up</button>
            <button onclick="openLogin()">Login</button>
        </div>
    `;
}