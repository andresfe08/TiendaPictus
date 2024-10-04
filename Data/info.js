// URL del archivo JSON
const urlJson = './data/productos.json';

// Función para leer el contenido del archivo JSON
fetch(urlJson)
  .then(response => response.json())
  .then(data => {
    // Procesa el contenido del archivo JSON
    const cardsData = data;
    const cardsContainer = document.getElementById('cards-container');
    cardsData.forEach(card => {
      const cardHTML = `
        <div class="col-md-4">
          <div class="card mb-4 product-wap rounded-0">
            <div class="card rounded-0">
              <img class="card-img rounded-0 img-fluid" src="${card.image1}">
              <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                <ul class="list-unstyled">
                  <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                  <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                  <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <!-- Botones de opción múltiple -->
              <div class="container text-center mt-0">
                ${card.options
                  .map(option => {
                    return `
                      <div class="form-check form-check-inline">
                        <input class="custom-radio-input custom-radio-input${option.id}" type="radio" name="flexRadioDefault${card.id}" id="customRadio${option.id}-${card.id}" ${option.id === 1 ? "checked" : ""}>
                        <label class="custom-radio-label" for="customRadio${option.id}-${card.id}"></label>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
              <!-- Fin botones de opción múltiple -->
              <a href="shop-single.html" class="h3 text-decoration-none">${card.title}</a>
              <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                <li>S/M/L</li>
                <li class="pt-2">
                  <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                  <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                  <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                  <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                  <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                </li>
              </ul>
              <ul class="list-unstyled d-none justify-content-center mb-1">
                <li>
                  <i class="text-warning fa fa-star"></i>
                  <i class="text-warning fa fa-star"></i>
                  <i class="text-warning fa fa-star"></i>
                  <i class="text-muted fa fa-star"></i>
                  <i class="text-muted fa fa-star"></i>
                </li>
              </ul>
              <p class="text-center mb-0">$${card.price}.00</p>
            </div>
          </div>
        </div>
      `;
      cardsContainer.innerHTML += cardHTML;
      const image = document.querySelector(`#cards-container .col-md-4:nth-child(${cardsData.indexOf(card) + 1}) .card-img`);
      image.src = card.image1;
    });

    // Agrega eventos a los checkboxes
    const checkboxes = document.querySelectorAll('.custom-radio-input');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', event => {
        const cardId = event.target.name.split('flexRadioDefault')[1];
        const optionId = event.target.id.split('customRadio')[1].split('-')[0];
        const card = cardsData.find(card => card.id === parseInt(cardId));
        const option = card.options.find(option => option.id === parseInt(optionId));
        const image = document.querySelector(`#cards-container .col-md-4:nth-child(${cardId}) .card-img`);
        image.src = option.value === 'opcion1' ? card.image1 : card.image2;
        console.log(`Opción ${optionId} seleccionada para el producto ${card.title}`);
      });
    });
  })
  .catch(error => console.error('Error:', error));

console.log('URL del archivo JSON:', urlJson);
console.log('cardsData:', cardsData);
console.log('cardHTML:', cardHTML);