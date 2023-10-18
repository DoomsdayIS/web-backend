const register_field = document.querySelector('.register');
const register_input_field = document.querySelector('.register-input');

const email_input_field = document.querySelector('.register-email');
const name_input_field = document.querySelector('.register-name');
const password1_input_field = document.querySelector('.register-password-1');
const password2_input_field = document.querySelector('.register-password-2');
const reg_button = document.querySelector('.register-button');

reg_button.addEventListener('click', register);

async function register() {
  const email = email_input_field.value.trim();
  const name = name_input_field.value.trim();
  const pass1 = password1_input_field.value.trim();
  const pass2 = password2_input_field.value.trim();

  email_input_field.value = '';
  name_input_field.value = '';
  password1_input_field.value = '';
  password2_input_field.value = '';
  if (pass1 !== pass2) {
    alert('passwords mismatches');
    return;
  }
  let website_domain = 'https://web-backend-spk9.onrender.com';
  const url = website_domain + '/user/create';
  let supertokens_response = await post_request(
    'https://web-backend-spk9.onrender.com/auth/signup',
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
  alert(supertokens_response.user.id);
  let user = await post_request(url, {
    email: email,
    password: pass1,
    name: name,
  });
  if (user.name === name) {
    register_input_field.style.display = 'none';
    let success = document.createElement('h2');
    success.innerHTML =
      ' Поздравляю ' + name + '! Учетная запись успешно зарегистрироваана';
    register_field.appendChild(success);
  } else {
    alert('К сожалению учетная запись не была создана!');
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
