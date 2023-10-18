async function fetch_json_photos() {
  try {
    let website_domain = 'https://web-backend-spk9.onrender.com';
    const url = website_domain + '/item/pictures';
    let response = await fetch(url);
    let all_jsons = await response.json();
    return all_jsons;
  } catch (err) {
    return false;
  }
}

class PhotosSection {
  constructor() {
    this.photos_section = document.querySelector('.available-photos');
    this.preloader = document.querySelector('.download-preloader');
    this.create_photos().then(this.remove_preloader);
  }

  async create_photos() {
    try {
      let photos = await fetch_json_photos();
      for (let i = 0; i < photos.length; i++) {
        let photo = photos[i];
        this.createUI(
          photo.name,
          photo.author,
          photo.description,
          photo.price,
          photo.id,
        );
      }
    } catch (err) {
      this.unsuccessful_result();
    }
  }

  remove_preloader = () => {
    this.preloader.style.display = 'none';
  };

  unsuccessful_result() {
    this.remove_preloader();
    let no_result = document.createElement('h3');
    no_result.innerHTML = 'К сожалению не удалось загрузить изображения';
    this.photos_section.appendChild(no_result);
  }

  createUI(name, author, desc, price, id) {
    let name_el = document.createElement('p');
    let author_el = document.createElement('p');
    let desc_el = document.createElement('p');
    let price_el = document.createElement('article');
    let id_el = document.createElement('article');
    id_el.className = 'id';
    let add_to_cart_button = document.createElement('button');
    let article_el = document.createElement('article');
    article_el.className = 'sale-photo';

    name_el.innerHTML = name + '  ';
    author_el.innerHTML = author + '<br>';
    desc_el.innerHTML = desc;
    price_el.innerHTML = price + '$';
    id_el.innerHTML = id;
    add_to_cart_button.innerHTML = 'Добавить товар в коризну';
    id_el.style.display = 'none';

    article_el.appendChild(name_el);
    article_el.appendChild(author_el);
    article_el.appendChild(desc_el);
    article_el.appendChild(price_el);
    article_el.appendChild(id_el);
    article_el.appendChild(add_to_cart_button);

    add_to_cart_button.addEventListener('click', () => {
      this.add_to_cart(article_el);
    });
    let cart_list = JSON.parse(localStorage.getItem('cart')) || [];
    if (
      cart_list.includes(article_el.getElementsByClassName('id')[0].innerHTML)
    ) {
      this.add_to_cart(article_el);
    } else {
      this.photos_section.appendChild(article_el);
    }
  }

  add_to_cart(li) {
    let cart_list = JSON.parse(localStorage.getItem('cart')) || [];
    cart_list.push(li.getElementsByClassName('id')[0].innerHTML);
    localStorage.setItem('cart', JSON.stringify(cart_list));
    let cart = document.querySelector('.items-bag');
    cart.appendChild(li);
    li.getElementsByTagName('button')[0].style.display = 'none';
  }
}

const photos = new PhotosSection();

const clear_button = document.querySelector('.clear-button');
clear_button.addEventListener('click', clear_cart);
const create_order_button = document.querySelector('.create-order');
create_order_button.addEventListener('click', create_order);

function clear_cart() {
  let cart_elements = document.querySelector('.items-bag').children;
  let photos = document.querySelector('.available-photos');
  for (let i = 0; i < cart_elements.length; i++) {
    localStorage.removeItem('cart');
    cart_elements[i].getElementsByTagName('button')[0].style.display =
      'visible';
    photos.appendChild(cart_elements[i]);
  }
  window.location.reload();
}

async function create_order() {
  let cart_list = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart_list.length > 0) {
    localStorage.removeItem('cart');
    let params = cart_list.join('&');
    alert(params);
    let website_domain = 'https://web-backend-spk9.onrender.com';
    const url = website_domain + '/order/create/' + params;
    alert(url);
    await post_request(url, {
      userId: 1,
    });
    window.location.reload();
  }
}

async function post_request(url = '', data = {}) {
  const response = await fetch(url, {
    // Метод, если не указывать, будет использоваться GET
    method: 'POST',
    // Заголовок запроса
    headers: {
      'Content-Type': 'application/json',
    },
    // Данные
    body: JSON.stringify(data),
  });
  return response.json();
}
