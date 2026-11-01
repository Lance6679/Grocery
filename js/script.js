// Groco Interactive Store JavaScript

document.addEventListener('DOMContentLoaded', () => {

   /* ===================================================
      1. DARK / LIGHT THEME TOGGLE
   =================================================== */
   const themeBtn = document.querySelector('#theme-btn');
   const currentTheme = localStorage.getItem('groco_theme');

   if (currentTheme === 'dark') {
      document.body.classList.add('dark');
      if (themeBtn) {
         themeBtn.classList.remove('fa-moon');
         themeBtn.classList.add('fa-sun');
      }
   }

   if (themeBtn) {
      themeBtn.onclick = () => {
         document.body.classList.toggle('dark');
         if (document.body.classList.contains('dark')) {
            themeBtn.classList.remove('fa-moon');
            themeBtn.classList.add('fa-sun');
            localStorage.setItem('groco_theme', 'dark');
            showToast('Dark mode enabled', 'info');
         } else {
            themeBtn.classList.remove('fa-sun');
            themeBtn.classList.add('fa-moon');
            localStorage.setItem('groco_theme', 'light');
            showToast('Light mode enabled', 'info');
         }
      };
   }

   /* ===================================================
      2. NAVBAR & PROFILE DROPDOWN
   =================================================== */
   const navbar = document.querySelector('.header .flex .navbar');
   const profile = document.querySelector('.header .flex .profile');
   const menuBtn = document.querySelector('#menu-btn');
   const userBtn = document.querySelector('#user-btn');

   if (menuBtn && navbar) {
      menuBtn.onclick = (e) => {
         e.stopPropagation();
         navbar.classList.toggle('active');
         if (profile) profile.classList.remove('active');
      };
   }

   if (userBtn && profile) {
      userBtn.onclick = (e) => {
         e.stopPropagation();
         profile.classList.toggle('active');
         if (navbar) navbar.classList.remove('active');
      };
   }

   document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target) && e.target !== menuBtn) {
         navbar.classList.remove('active');
      }
      if (profile && !profile.contains(e.target) && e.target !== userBtn) {
         profile.classList.remove('active');
      }
   });

   window.addEventListener('scroll', () => {
      if (profile) profile.classList.remove('active');
      if (navbar) navbar.classList.remove('active');

      // Scroll to Top button visibility
      const scrollTopBtn = document.querySelector('#scroll-top');
      if (scrollTopBtn) {
         if (window.scrollY > 250) {
            scrollTopBtn.classList.add('active');
         } else {
            scrollTopBtn.classList.remove('active');
         }
      }
   });

   /* ===================================================
      3. SCROLL TO TOP
   =================================================== */
   const scrollTopBtn = document.querySelector('#scroll-top');
   if (scrollTopBtn) {
      scrollTopBtn.onclick = () => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      };
   }

   /* ===================================================
      4. TOAST NOTIFICATIONS
   =================================================== */
   function initMessageToasts() {
      const messages = document.querySelectorAll('.message');
      messages.forEach(msg => {
         // Auto-dismiss after 4 seconds with fade-out
         setTimeout(() => {
            msg.classList.add('fade-out');
            setTimeout(() => msg.remove(), 400);
         }, 4000);

         const closeIcon = msg.querySelector('i');
         if (closeIcon) {
            closeIcon.onclick = () => {
               msg.classList.add('fade-out');
               setTimeout(() => msg.remove(), 300);
            };
         }
      });
   }
   initMessageToasts();

   function showToast(text, type = 'info') {
      const toast = document.createElement('div');
      toast.className = 'message dynamic-toast';
      const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
      toast.innerHTML = `
         <span><i class="fas ${icon}" style="margin-right: 0.8rem; color: var(--green);"></i>${text}</span>
         <i class="fas fa-times"></i>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
         toast.classList.add('fade-out');
         setTimeout(() => toast.remove(), 400);
      }, 3500);

      toast.querySelector('.fa-times').onclick = () => {
         toast.classList.add('fade-out');
         setTimeout(() => toast.remove(), 300);
      };
   }

   /* ===================================================
      5. QUANTITY STEPPERS (+ / -) & LIVE CART CALCULATION
   =================================================== */
   function setupQuantitySteppers() {
      const qtyInputs = document.querySelectorAll('input.qty');
      qtyInputs.forEach(input => {
         if (input.closest('.qty-stepper') || input.closest('.stepper-box')) return;

         const wrapper = document.createElement('div');
         wrapper.className = 'qty-stepper';

         const minusBtn = document.createElement('button');
         minusBtn.type = 'button';
         minusBtn.className = 'stepper-btn minus';
         minusBtn.innerHTML = '<i class="fas fa-minus"></i>';
         minusBtn.title = 'Decrease';

         const plusBtn = document.createElement('button');
         plusBtn.type = 'button';
         plusBtn.className = 'stepper-btn plus';
         plusBtn.innerHTML = '<i class="fas fa-plus"></i>';
         plusBtn.title = 'Increase';

         input.parentNode.insertBefore(wrapper, input);
         wrapper.appendChild(minusBtn);
         wrapper.appendChild(input);
         wrapper.appendChild(plusBtn);

         minusBtn.onclick = (e) => {
            e.preventDefault();
            let val = parseInt(input.value) || 1;
            if (val > 1) {
               input.value = val - 1;
               input.dispatchEvent(new Event('change', { bubbles: true }));
            }
         };

         plusBtn.onclick = (e) => {
            e.preventDefault();
            let val = parseInt(input.value) || 1;
            input.value = val + 1;
            input.dispatchEvent(new Event('change', { bubbles: true }));
         };

         // In cart.php: live calculate subtotal & grand total when quantity changes
         input.addEventListener('change', () => {
            const cartCard = input.closest('.box');
            if (!cartCard) return;

            const priceElem = cartCard.querySelector('.price');
            const subTotalElem = cartCard.querySelector('.sub-total span');
            const updateBtn = cartCard.querySelector('input[name="update_qty"]');

            if (priceElem && subTotalElem) {
               // Extract unit price (strip currency symbol and /-)
               const priceText = priceElem.textContent.replace(/[^0-9.]/g, '');
               const unitPrice = parseFloat(priceText) || 0;
               const qty = parseInt(input.value) || 1;
               const itemSubTotal = unitPrice * qty;

               subTotalElem.textContent = `₹${itemSubTotal}/-`;

               // Recalculate Grand Total across all cart boxes
               let newGrandTotal = 0;
               document.querySelectorAll('.shopping-cart .box').forEach(box => {
                  const subSpan = box.querySelector('.sub-total span');
                  if (subSpan) {
                     const subVal = parseFloat(subSpan.textContent.replace(/[^0-9.]/g, '')) || 0;
                     newGrandTotal += subVal;
                  }
               });

               const grandTotalElem = document.querySelector('.cart-total p span');
               if (grandTotalElem) {
                  grandTotalElem.textContent = `₹${newGrandTotal}/-`;
               }

               if (updateBtn) {
                  updateBtn.style.animation = 'pulseBtn 1s infinite alternate';
               }
            }
         });
      });
   }
   setupQuantitySteppers();

   /* ===================================================
      6. QUICK VIEW MODAL
   =================================================== */
   const qvModal = document.querySelector('#quick-view-modal');
   if (qvModal) {
      const qvImg = qvModal.querySelector('#qv-img');
      const qvName = qvModal.querySelector('#qv-name');
      const qvCategory = qvModal.querySelector('#qv-category');
      const qvPrice = qvModal.querySelector('#qv-price');
      const qvInputPid = qvModal.querySelector('#qv-input-pid');
      const qvInputName = qvModal.querySelector('#qv-input-name');
      const qvInputPrice = qvModal.querySelector('#qv-input-price');
      const qvInputImage = qvModal.querySelector('#qv-input-image');
      const qvQtyInput = qvModal.querySelector('#qv-qty');
      const qvQtyMinus = qvModal.querySelector('#qv-qty-minus');
      const qvQtyPlus = qvModal.querySelector('#qv-qty-plus');
      const qvCloseBtn = qvModal.querySelector('.qv-close-btn');
      const qvOverlay = qvModal.querySelector('.qv-modal-overlay');

      function openQuickView(card) {
         const name = card.dataset.name || (card.querySelector('.name') ? card.querySelector('.name').textContent.trim() : '');
         const category = card.dataset.category || 'fresh grocery';
         const price = card.dataset.price || (card.querySelector('.price span') ? card.querySelector('.price span').textContent.trim() : '0');
         const img = card.querySelector('img') ? card.querySelector('img').src : '';
         const pidInput = card.querySelector('input[name="pid"]');
         const nameInput = card.querySelector('input[name="p_name"]');
         const priceInput = card.querySelector('input[name="p_price"]');
         const imageInput = card.querySelector('input[name="p_image"]');

         if (qvName) qvName.textContent = name;
         if (qvCategory) qvCategory.textContent = category;
         if (qvPrice) qvPrice.textContent = price;
         if (qvImg) qvImg.src = img;

         if (qvInputPid && pidInput) qvInputPid.value = pidInput.value;
         if (qvInputName && nameInput) qvInputName.value = nameInput.value;
         if (qvInputPrice && priceInput) qvInputPrice.value = priceInput.value;
         if (qvInputImage && imageInput) qvInputImage.value = imageInput.value;
         if (qvQtyInput) qvQtyInput.value = 1;

         qvModal.classList.add('active');
         qvModal.setAttribute('aria-hidden', 'false');
         document.body.style.overflow = 'hidden';
      }

      function closeQuickView() {
         qvModal.classList.remove('active');
         qvModal.setAttribute('aria-hidden', 'true');
         document.body.style.overflow = '';
      }

      // Attach eye click listeners to all product cards
      document.querySelectorAll('.product-card .fa-eye, .products .box .fa-eye').forEach(eyeBtn => {
         eyeBtn.addEventListener('click', (e) => {
            // Left click only; let Cmd/Ctrl+Click open the link in a new tab
            if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
               e.preventDefault();
               const card = eyeBtn.closest('.box');
               if (card) openQuickView(card);
            }
         });
      });

      if (qvCloseBtn) qvCloseBtn.onclick = closeQuickView;
      if (qvOverlay) qvOverlay.onclick = closeQuickView;

      document.addEventListener('keydown', (e) => {
         if (e.key === 'Escape' && qvModal.classList.contains('active')) {
            closeQuickView();
         }
      });

      if (qvQtyMinus && qvQtyInput) {
         qvQtyMinus.onclick = () => {
            let val = parseInt(qvQtyInput.value) || 1;
            if (val > 1) qvQtyInput.value = val - 1;
         };
      }

      if (qvQtyPlus && qvQtyInput) {
         qvQtyPlus.onclick = () => {
            let val = parseInt(qvQtyInput.value) || 1;
            qvQtyInput.value = val + 1;
         };
      }
   }

   /* ===================================================
      7. LIVE SEARCH, CATEGORY PILLS & SORT ON SHOP PAGE
   =================================================== */
   const shopSearchInput = document.querySelector('#shop-search-input');
   const catPills = document.querySelectorAll('.cat-pill');
   const shopSortSelect = document.querySelector('#shop-sort-select');
   const productsGrid = document.querySelector('#products-grid');
   const resultsCountElem = document.querySelector('#results-count');

   if (productsGrid) {
      let activeCategory = 'all';
      let searchQuery = '';

      function filterAndSortProducts() {
         const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
         let visibleCount = 0;

         cards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const category = (card.dataset.category || '').toLowerCase();
            const price = card.dataset.price || '';

            const matchesCategory = activeCategory === 'all' || category.includes(activeCategory);
            const matchesSearch = !searchQuery || name.includes(searchQuery) || category.includes(searchQuery) || price.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
               card.style.display = '';
               card.classList.add('visible-card');
               visibleCount++;
            } else {
               card.style.display = 'none';
               card.classList.remove('visible-card');
            }
         });

         // Sort visible cards
         const sortVal = shopSortSelect ? shopSortSelect.value : 'default';
         if (sortVal !== 'default') {
            cards.sort((a, b) => {
               const priceA = parseFloat(a.dataset.price) || 0;
               const priceB = parseFloat(b.dataset.price) || 0;
               const nameA = a.dataset.name || '';
               const nameB = b.dataset.name || '';

               if (sortVal === 'price-low') return priceA - priceB;
               if (sortVal === 'price-high') return priceB - priceA;
               if (sortVal === 'name-asc') return nameA.localeCompare(nameB);
               return 0;
            });

            cards.forEach(c => productsGrid.appendChild(c));
         }

         if (resultsCountElem) {
            resultsCountElem.textContent = `Showing ${visibleCount} product${visibleCount === 1 ? '' : 's'}`;
         }

         // Show/hide empty state
         let emptyMsg = productsGrid.querySelector('.no-filter-results');
         if (visibleCount === 0) {
            if (!emptyMsg) {
               emptyMsg = document.createElement('div');
               emptyMsg.className = 'no-filter-results empty';
               emptyMsg.style.gridColumn = '1 / -1';
               emptyMsg.innerHTML = '<i class="fas fa-search" style="font-size:3rem; margin-bottom:1rem; display:block; color:var(--orange);"></i> No groceries found matching your search!';
               productsGrid.appendChild(emptyMsg);
            }
         } else if (emptyMsg) {
            emptyMsg.remove();
         }
      }

      if (shopSearchInput) {
         shopSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterAndSortProducts();
         });
      }

      catPills.forEach(pill => {
         pill.addEventListener('click', () => {
            catPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCategory = (pill.dataset.filter || 'all').toLowerCase();
            filterAndSortProducts();
         });
      });

      if (shopSortSelect) {
         shopSortSelect.addEventListener('change', () => {
            filterAndSortProducts();
         });
      }
   }

   /* ===================================================
      8. FAQ ACCORDION
   =================================================== */
   const faqItems = document.querySelectorAll('.faq-item');
   faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
         question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(other => other.classList.remove('active'));
            if (!isOpen) {
               item.classList.add('active');
            }
         });
      }
   });

   /* ===================================================
      9. PASSWORD VISIBILITY TOGGLE
   =================================================== */
   const passwordInputs = document.querySelectorAll('input[type="password"]');
   passwordInputs.forEach(input => {
      const toggle = document.createElement('i');
      toggle.className = 'fas fa-eye pass-toggle-icon';
      toggle.title = 'Show password';
      input.parentNode.style.position = 'relative';
      input.parentNode.appendChild(toggle);

      toggle.addEventListener('click', () => {
         if (input.type === 'password') {
            input.type = 'text';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
            toggle.title = 'Hide password';
         } else {
            input.type = 'password';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
            toggle.title = 'Show password';
         }
      });
   });

});
