<footer class="footer">

   <section class="box-container">

      <div class="box">
         <h3>quick links</h3>
         <a href="home.php"> <i class="fas fa-angle-right"></i> home</a>
         <a href="shop.php"> <i class="fas fa-angle-right"></i> shop</a>
         <a href="about.php"> <i class="fas fa-angle-right"></i> about</a>
         <a href="contact.php"> <i class="fas fa-angle-right"></i> contact</a>
      </div>

      <div class="box">
         <h3>extra links</h3>
         <a href="cart.php"> <i class="fas fa-angle-right"></i> cart</a>
         <a href="wishlist.php"> <i class="fas fa-angle-right"></i> wishlist</a>
         <a href="login.php"> <i class="fas fa-angle-right"></i> login</a>
         <a href="register.php"> <i class="fas fa-angle-right"></i> register</a>
      </div>

      <div class="box">
         <h3>contact info</h3>
         <p> <i class="fas fa-phone"></i> +123-456-7890 </p>
         <p> <i class="fas fa-phone"></i> +111-222-3333 </p>
         <p> <i class="fas fa-envelope"></i> shaikhanas@gmail.com </p>
         <p> <i class="fas fa-map-marker-alt"></i> mumbai, india - 400104 </p>
      </div>

      <div class="box">
         <h3>follow us</h3>
         <a href="#"> <i class="fab fa-facebook-f"></i> facebook </a>
         <a href="#"> <i class="fab fa-twitter"></i> twitter </a>
         <a href="#"> <i class="fab fa-instagram"></i> instagram </a>
         <a href="#"> <i class="fab fa-linkedin"></i> linkedin </a>
      </div>

   </section>

   <p class="credit"> &copy; copyright @ <?= date('Y'); ?> by <span>mr. web designer</span> | all rights reserved! </p>

</footer>

<!-- Floating Back to Top Button -->
<div id="scroll-top" class="scroll-top fas fa-arrow-up" title="Back to top"></div>

<!-- Interactive Quick View Modal -->
<div id="quick-view-modal" class="qv-modal" aria-hidden="true">
   <div class="qv-modal-overlay"></div>
   <div class="qv-modal-dialog">
      <button type="button" class="qv-close-btn" title="Close"><i class="fas fa-times"></i></button>
      <div class="qv-modal-body">
         <div class="qv-image-box">
            <img id="qv-img" src="" alt="Product Image">
         </div>
         <div class="qv-details-box">
            <span id="qv-category" class="qv-badge">Category</span>
            <h2 id="qv-name" class="qv-title">Product Name</h2>
            <div class="qv-price-tag">
               <span class="currency">₹</span><span id="qv-price">0</span><span class="unit">/-</span>
            </div>
            <p id="qv-desc" class="qv-desc">Freshly harvested organic grocery product delivered straight to your doorstep.</p>
            
            <form id="qv-form" action="" method="POST" class="qv-form">
               <input type="hidden" name="pid" id="qv-input-pid" value="">
               <input type="hidden" name="p_name" id="qv-input-name" value="">
               <input type="hidden" name="p_price" id="qv-input-price" value="">
               <input type="hidden" name="p_image" id="qv-input-image" value="">
               
               <div class="qv-qty-wrapper">
                  <label for="qv-qty">Quantity:</label>
                  <div class="stepper-box">
                     <button type="button" class="stepper-btn minus" id="qv-qty-minus"><i class="fas fa-minus"></i></button>
                     <input type="number" min="1" value="1" name="p_qty" id="qv-qty" class="qty-field">
                     <button type="button" class="stepper-btn plus" id="qv-qty-plus"><i class="fas fa-plus"></i></button>
                  </div>
               </div>
               
               <div class="qv-actions">
                  <button type="submit" name="add_to_cart" class="btn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                  <button type="submit" name="add_to_wishlist" class="option-btn"><i class="fas fa-heart"></i> Wishlist</button>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>