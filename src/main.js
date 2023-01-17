import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const produtoHTML = document.querySelector('.products');

const removeLoading = () => {
  const getLoad = document.querySelector('.loading');
  const getBody = document.querySelector('body');

  getBody.removeChild(getLoad);
};

const productGrid = async () => {
  const dataProductsList = await fetchProductsList('computer');

  dataProductsList.forEach((element) => {
    produtoHTML.appendChild(createProductElement(element));
  });
  removeLoading();
};

const loading = () => {
  const containerLoading = document.querySelector('body');
  const x = document.createElement('h1');
  x.className = 'loading';
  x.innerText = 'carregando...';

  containerLoading.appendChild(x);
};

function loadScreen() {
  try {
    loading();
    productGrid();
  } catch (error) {
    console.log(error);
  }
}
loadScreen();
