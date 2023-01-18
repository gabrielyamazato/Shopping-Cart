import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const produtoHTML = document.querySelector('.products');

const removeLoading = () => {
  const getBody = document.querySelector('body');
  const getH1 = document.querySelector('h1');

  getBody.removeChild(getH1);
};

const errorLoading = () => {
  const containerError = document.querySelector('body');
  const e = document.createElement('h1');
  e.className = 'error';
  e.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';

  containerError.appendChild(e);
};

const productGrid = async () => {
  try {
    const dataProductsList = await fetchProductsList('computer');

    dataProductsList.forEach((element) => {
      produtoHTML.appendChild(createProductElement(element));
    });
    removeLoading();
  } catch (error) {
    console.log(error);
    errorLoading();
  }
};

const loading = () => {
  const containerLoading = document.querySelector('body');
  const x = document.createElement('h1');
  x.className = 'loading';
  x.innerText = 'carregando...';

  containerLoading.appendChild(x);
};

const getStorage = () => {
  const getCart = document.querySelector('.cart__products');
  const arrayIDs = getSavedCartIDs();

  arrayIDs.forEach(async (id) => {
    const holdInfo = await fetchProduct(id);

    getCart.appendChild(createCartProductElement(holdInfo));
  });
};

const refreshCart = () => {
  const total = document.querySelector('.total-price');
  const itemsCarrinho = getSavedCartIDs();

  let soma = parseFloat(total.innerText)

  itemsCarrinho.forEach(async (id) => {
    const z = await fetchProduct(id)
    
    soma += parseFloat(z.price)
    total.innerText = `${soma}`
  });
};

function retiraCarrinho() {
  const deleteButtonCart = document.querySelectorAll('.cart__product__remove');

  console.log(deleteButtonCart)

  deleteButtonCart.forEach((ab) => ab.addEventListener('click', refreshCart()));
}

function loadScreen() {
  try {
    loading();
    productGrid();
    getStorage();
    retiraCarrinho();
    refreshCart();
  } catch (error) {
    console.log(error);
  }
}
loadScreen();
