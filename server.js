const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises; // Use the promises version of fs for asynchronous operations

const server = express();

server.use(bodyParser.json());
server.use(cors());

const delayMiddleware = (req, res, next) => {
  setTimeout(next, 1000);
};



server.post('/signup', (req, res) => {
  const { firstName, lastName, email, telephone, password } = req.body;

  // You should add proper validation and error handling here

  const customers = require('./db.json').customers;

  const newCustomerId = customers.length + 1;

  const newCustomer = {
    id: newCustomerId,
    firstName,
    lastName,
    email,
    telephone,
    password,
  };

  customers.push(newCustomer);

  const fs = require('fs');
  fs.writeFileSync('./db.json', JSON.stringify({ customers }));

  res.json({ success: true, message: 'Signup successful', customer: newCustomer });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;

  // You should add proper validation and error handling here

  const customers = require('./db.json').customers;

  const user = customers.find((customer) => customer.email === email && customer.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful', customer: user });
  } else {
    res.json({ success: false, message: 'Invalid email or password' });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.get('/products', async (req, res) => {
  try {
    const products = await fs.readFile('./products.json', 'utf-8');
    res.json(JSON.parse(products));
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder for storing uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


server.post('/products', upload.single('file'), async (req, res) => {
  try {
    const variantPhoto = req.file; // Single file

    const { name, description, price, variants } = req.body;

    // Check if variants is defined and parse it back to an array
    const parsedVariants = variants ? JSON.parse(variants) : [];

    // Check the received payload
    console.log('Received Payload:', {
      name: name,
      description: description,
      price: price,
      variants: parsedVariants,
      variantPhotos: [variantPhoto.path],
    });

    const products = JSON.parse(await fs.readFile('./products.json', 'utf-8'));

    const newProductId = products.length + 1;

    const newProduct = {
      id: newProductId,
      name,
      description,
      price: parseFloat(price),
      variants: parsedVariants,
      variantPhotos: [variantPhoto.path],
    };

    products.push(newProduct);

    await fs.writeFile('./products.json', JSON.stringify(products));

    res.json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
server.get('/products', async (req, res) => {
  try {
    const products = await fs.readFile('./products.json', 'utf-8');
    const parsedProducts = JSON.parse(products);

    // If you want to process variants before sending them, you can do it here
    const productsWithProcessedVariants = parsedProducts.map(product => {
      // Process product variants if needed
      return product;
    });

    res.json(productsWithProcessedVariants);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


server.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file, e.g., save it to a specific folder
  const filePath = req.file.path;
  res.json({ success: true, filePath });
});



server.get('/products', async (req, res) => {
  try {
    const products = await fs.readFile('./products.json', 'utf-8');
    const productsWithImages = JSON.parse(products).map(product => ({
      ...product,
      imagePath: `path/to/images/${product.id}.jpg`, // Adjust the path accordingly
    }));
    res.json(productsWithImages);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

















server.get('/orders', (req, res) => {
    const { status } = req.query;
  
    // If a status is provided, filter orders by status; otherwise, return all orders
    const orders = status ? require('./orders.json').orders.filter(order => order.status === status) : require('./orders.json').orders;
  
    res.json(orders);
  });
  



