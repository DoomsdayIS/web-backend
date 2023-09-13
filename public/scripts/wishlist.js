const wishlistElement = document.querySelector('.wish-list');
wishlistElement.style.display = 'block';

class Wishlist {
    constructor(wishlist) {
        this.input_field = wishlist.querySelector('#todo');
        this.list = wishlist.querySelector("#list");
        this.add_button = wishlist.querySelector("#add-btn");
        this.clear_button = wishlist.querySelector("#clear-btn");
        this.items_cnt = wishlist.querySelector('.wish-list-cnt');
        this.LS_list = JSON.parse(localStorage.getItem("tasks")) || [];
        for (let i = 0; i < this.LS_list.length; i++){
           this.createUIItem( this.LS_list[i]);
        }
        this.add_button.addEventListener('click', this.add_new);
        this.clear_button.addEventListener("click", this.clear_list);
        this.input_field.addEventListener('keydown', (event) => {
            if (event.key === 'Enter'){
                this.add_new();
            }
        });

    }

    update_items_cnt = () => {
        this.items_cnt.textContent = this.list.children.length.toString();
    }

    add_new = () => {
        const wish_text = this.input_field.value.trim();
        if (wish_text !== "") {
            this.LS_list.push(wish_text);
            localStorage.setItem("tasks", JSON.stringify(this.LS_list));
            this.input_field.value = "";
            this.createUIItem(wish_text);
        }
    }


    createUIItem(wish_text)  {
        let li = document.createElement("li");
        li.innerHTML = '<a>' + wish_text +'</a>' + '<button>' + '-' +'</button>';
        this.list.appendChild(li);
        this.update_items_cnt();
        let button = li.getElementsByTagName('button')[0];
        button.addEventListener('click', () => {
            this.remove_element(button.parentNode);
        });
    }

    clear_list = () => {
        this.LS_list = [];
        localStorage.removeItem("tasks");
        this.list.innerHTML = '';
        this.update_items_cnt();
    }

    remove_element(li){
        const index = Array.from(this.list.children).indexOf(li);
        this.list.removeChild(li);
        this.LS_list.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.LS_list));
        this.update_items_cnt();
    }

}

const wishlist = new Wishlist(wishlistElement);
