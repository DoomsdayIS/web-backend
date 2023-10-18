const auth_div = document.querySelector('.authentication');
const email_input_field = document.querySelector('.auth_field_email');
const password1_input_field = document.querySelector('.auth_field_pass');
const reg_button = document.querySelector('.auth_button');
const out_button = document.querySelector('.logout_button');
out_button.style.display = 'none';

check();

reg_button.addEventListener('click', signin);
out_button.addEventListener('click', signout);

function signout() {
  localStorage.removeItem('user_name');
  basic_setup();
}

async function signin() {
  const email = email_input_field.value.trim();
  const pass1 = password1_input_field.value.trim();

  email_input_field.value = '';
  password1_input_field.value = '';
  let supertokens_response = await post_request(
    'https://web-backend-spk9.onrender.com/auth/signin',
    {
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: pass1,
        },
      ],
    },
  );
  if (supertokens_response.status === 'OK') {
    const user_id = supertokens_response.user.id;
    if (user_id !== '') {
      localStorage.setItem('user_name', JSON.stringify(user_id));
      let auth = JSON.parse(localStorage.getItem('user_name')) || '';
      alert(auth);
      change_auth_field(user_id);
    }
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

function check() {
  let auth = JSON.parse(localStorage.getItem('user_name')) || '';
  if (auth !== '') {
    change_auth_field(auth);
  } else {
    basic_setup();
  }
}

function change_auth_field(user) {
  email_input_field.style.display = 'none';
  password1_input_field.style.display = 'none';
  reg_button.style.display = 'none';
  const auth_word = document.querySelector('.authorized');
  auth_word.innerHTML = 'Вы успешно залогигены как ' + user;
  out_button.style.display = 'block';
}

function basic_setup() {
  email_input_field.style.display = 'inline-block';
  password1_input_field.style.display = 'inline-block';
  reg_button.style.display = 'inline-block';
  out_button.style.display = 'none';
  const auth_word = document.querySelector('.authorized');
  auth_word.innerHTML = '';
}
