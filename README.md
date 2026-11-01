# Groco - Interactive Grocery Store (PHP & MySQL)

A modern, responsive, and interactive online grocery shopping web application built with **PHP (PDO)**, **MySQL**, and modern **Vanilla JavaScript**. 

All prices are formatted in **Indian Rupees (₹)**.

![Groco Store](images/home-bg.jpg)

---

## 🌟 Key Features & Interactivity

### 🛍️ Customer Experience
- **Currency in Indian Rupees (₹)**: All product pricing, subtotals, grand totals, and admin dashboard financial summaries are formatted in `₹`.
- **🌙 Dark & Light Theme**: Seamless one-click dark/light mode toggle with `localStorage` persistence.
- **⚡ Interactive Live Filter & Search**: Instant real-time search on the shop page by name, category, or price without full page reloads.
- **🏷️ Instant Category Pills**: Filter products instantly between *All*, *Fruits*, *Vegetables*, *Fish*, and *Meat*.
- **📊 Real-time Price & Name Sorting**: Sort products instantly (Price: Low to High ₹, Price: High to Low ₹, Name: A-Z).
- **🔍 Quick View Modal**: Interactive modal with smooth image zoom, product details, quantity controls, and direct add-to-cart/wishlist buttons without navigating away.
- **🔢 Interactive Quantity Steppers**: Custom `+` and `-` quantity controls on product cards with smooth tactile feedback.
- **🛒 Dynamic Cart Calculation**: Editing item quantities in the shopping cart recalculates the item sub-total and grand total on the fly in `₹`.
- **🍞 Floating Toast Notifications**: Smooth animated toast notifications for user alerts (added to cart, item deleted, etc.) with auto-dismiss countdown.
- **⬆️ Smooth Back-to-Top Button**: Smooth floating circular button appears when scrolling down.
- **❓ Interactive FAQ Accordion**: Expandable FAQ section on the About page.
- **👁️ Password Visibility Toggles**: Interactive show/hide password buttons on login and registration pages.

### 🛡️ Admin Panel
- **Dashboard Metrics**: Real-time stats for pending orders (₹), completed orders (₹), total orders, registered users, and messages.
- **Product Management**: Add, update, view, and delete grocery items with image uploads and category assignments.
- **Order Processing**: Update order payment status (pending / completed) and manage customer details.
- **Message Center**: View and manage customer inquiries.

---

## 📁 Project Structure

```text
grocery store/
├── css/
│   ├── admin_style.css       # Admin dashboard styles
│   ├── components.css        # Core components, dark mode & interactive styles
│   └── style.css             # Storefront layout & themes
├── js/
│   └── script.js             # Modern interactive JS features
├── images/                   # UI icons and banners
├── project images/           # Product illustrations
├── uploaded_img/             # User profiles & uploaded product images
├── config.php                # Database PDO connection
├── shop_db.sql               # MySQL database schema & sample data
├── home.php                  # Storefront homepage
├── shop.php                  # Interactive grocery catalog with live filters
├── category.php              # Category-specific product pages
├── search_page.php           # Search page
├── view_page.php             # Individual product quick view
├── cart.php                  # Interactive shopping cart
├── wishlist.php              # Customer wishlist
├── checkout.php              # Order placement & checkout
├── orders.php                # Order history & status
├── about.php                 # About us & interactive FAQ
├── contact.php               # Contact form
├── login.php                 # User/Admin login
├── register.php              # User registration
├── logout.php                # Session logout
└── admin_*.php               # Admin management portal
```

---

## 🚀 Getting Started

### Prerequisites
- PHP 7.4+ or 8.x
- MySQL / MariaDB (e.g. XAMPP, WAMP, MAMP, or Docker)

### 1. Database Setup
1. Open **phpMyAdmin** or your MySQL client:
   ```bash
   mysql -u root -p
   ```
2. Create a database named `shop_db`:
   ```sql
   CREATE DATABASE shop_db;
   ```
3. Import `shop_db.sql`:
   ```bash
   mysql -u root -p shop_db < shop_db.sql
   ```

### 2. Configure Database Credentials
Edit [`config.php`](config.php) to match your local MySQL configuration:
```php
<?php
$db_name = "mysql:host=localhost;dbname=shop_db";
$username = "root";
$password = "";

$conn = new PDO($db_name, $username, $password);
?>
```

### 3. Run the Server
Using PHP's built-in web server:
```bash
cd "grocery store"
php -S localhost:8000
```
Then visit `http://localhost:8000` in your browser.

---

## 📄 License
This project is for educational and commercial development use.
