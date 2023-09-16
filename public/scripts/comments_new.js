async function fetch_json_comments() {
  try {
    let website_domain = 'https://web-backend-spk9.onrender.com';
    const url = website_domain + '/comment/all';
    let response = await fetch(url);
    let all_jsons = await response.json();
    return all_jsons;
  } catch (err) {
    return false;
  }
}

class CommentSection {
  constructor() {
    this.comment_section = document.querySelector('.comment-section');
    this.preloader = document.querySelector('.download-preloader');
    this.create_comments().then(this.remove_preloader);
  }

  async create_comments() {
    try {
      let comments = await fetch_json_comments();
      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        this.createUI(
          comment.title,
          comment.content,
          comment.authorId,
          comment.id,
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
    no_result.innerHTML = 'К сожалению не удалось загрузить комментарии';
    this.comment_section.appendChild(no_result);
  }

  createUI(title, content, authorId = null, id) {
    let title_el = document.createElement('p');
    let content_el = document.createElement('p');
    let info_el = document.createElement('p');
    let article_el = document.createElement('article');

    title_el.innerHTML = title;
    content_el.innerHTML = content;
    if (authorId === null) {
      info_el.innerHTML = 'AuthorId: Unknown CommentID: ' + id;
    } else {
      info_el.innerHTML = 'AuthorId: ' + authorId + ' CommentID: ' + id;
    }

    title_el.className = 'comment-header';
    info_el.className = 'comment-header';

    article_el.appendChild(title_el);
    article_el.appendChild(info_el);
    article_el.appendChild(content_el);

    this.comment_section.appendChild(article_el);
  }
}

const comment_section = new CommentSection();
const title_input_field = document.querySelector('.comment-title');
const content_input_field = document.querySelector('.comment-content');
const add_button = document.querySelector('.add-comment-button');

add_button.addEventListener('click', change_text);

async function change_text() {
  const title = title_input_field.value.trim();
  const content = content_input_field.value.trim();
  title_input_field.value = '';
  content_input_field.value = '';
  let website_domain = 'https://web-backend-spk9.onrender.com';
  const url = website_domain + '/comment/create';
  let comment = await post_request(url, {
    title: title,
    content: content,
    authorId: 1,
  });
  comment_section.createUI(
    comment.title,
    comment.content,
    comment.authorId,
    comment.id,
  );
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
