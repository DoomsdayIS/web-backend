class CommentsSection {

}

function randomInteger(min = 1, max = 500) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetch_json_comments() {
    try {
        /*        let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                if (response.ok) {
                    let json = await response.json();
                    alert(json);
                } else {
                    alert('dfdf')
                }*/
        let response = await fetch('https://jsonplaceholder.typicode.com/comments');
        let all_jsons = await response.json();
        return all_jsons;
    } catch(err) {
        return false;
    }
}

class CommentSection{
    constructor(fetch_limit = 10) {
        this.fetch_limit = fetch_limit;
        this.comment_section = document.querySelector(".comment-section");
        this.preloader = document.querySelector('.download-preloader');
        this.create_comments()
            .then(this.remove_preloader);
    }

    async create_comments (){
        try {
            let sf = 0;
            let comment_jsons = await fetch_json_comments();
            for (let i = 0; i < this.fetch_limit; i++) {
                let json = comment_jsons[randomInteger()]
                this.createUI(json.name, json.body, json.email);
                sf += 1;
            }
            return sf;
        } catch (err) {
            this.unsuccessful_result();
        }
    }

     remove_preloader = () => {
        this.preloader.style.display = 'none';
    }

    unsuccessful_result () {
        this.remove_preloader();
        let no_result = document.createElement('h3');
        no_result.innerHTML = 'К сожалению не удалось загрузить комментарии';
        this.comment_section.appendChild(no_result);
    }

    createUI(name, body, email){
        let name_el = document.createElement("p");
        let email_el = document.createElement("p");
        let body_el = document.createElement("p");
        let article_el = document.createElement('article');

        name_el.innerHTML = name;
        email_el.innerHTML = email;
        body_el.innerHTML = body;

        name_el.className = 'comment-header';
        email_el.className = 'comment-header';

        article_el.appendChild(name_el);
        article_el.appendChild(email_el);
        article_el.appendChild(body_el);

        this.comment_section.appendChild(article_el);
    }

}

const comment_section = new CommentSection(12);