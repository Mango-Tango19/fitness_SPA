const menuItemsArr = document.querySelectorAll('.dropdown-item'),
     submitBtn = document.querySelector('.submit-filters');
let filtersArray = [];

class CardItem {
    constructor (arr, parentSelector = '.card-desk') { //'.row-cols-3.row-cols-md-2'
        this.image = arr['image'];
        this.alias = arr['alias'];
        this.title = arr['title'];
        this.description = arr['description'];
        this.props = arr['properties'];
        this.price = arr['price'];
        this.parentSelector = parentSelector;
    };

    renderTags() {
        return this.props.map(({title, value}) => {
            return `<a href="#" title=${title} class="btn btn-outline-primary btn-sm m-1" role="button">${value}</a>`;
        }).join('');
    };


    renderCards(cardArray) {
        cardArray.forEach((card) => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card', 'h100');
        cardItem.id = `${this.alias}`;
        const tags = this.renderTags();
        // <a href="http://localhost:8888/service/${this.alias}"></a>
        cardItem.innerHTML = `
        <img src=${this.image} class="card-img-top rounded" alt="Fitness-house">
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.description}</p>
            <span class="card-title pricing-card-title">Стоимость ${this.price} руб.</span>
           ${tags}
        </div>
        `;
    })
        document.querySelector(this.parentSelector).append(cardItem);
    };

    //filterCards(cardsArray, filtersArray) {



};



const getCards = async (url) => {
    return await fetch(url);
    // if (!res.ok) {
    //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
    // } else {
    //      await res.json()

};

getCards(('http://localhost:3000/services'))
            .then(data => data.json()
            .then(cardsArray => {
                cardsArray.forEach((card) => {
                    filterCards(filtersArray, cardsArray);
                })
            }));

function getFilters() {

};

submitBtn.addEventListener('click', () => {
    //debugger!!!!
    let selectedOptions = document.getElementById('#amount');
    console.log(selectedOptions.value);
});



function filterCards(cardsArray, filtersArray) {

};

// getData('http://localhost:3000/services')
//     .then(data => {
//         data.forEach((obj) => {
//     const card = new CardItem(obj);
    // card.renderCard();
    // pushCardToArray(card, cardsArray);
    // pushTagToArray(card, tagsArray);

function pushCardToArray(card, arr) {
    arr.push(card);
}




menuItemsArr.forEach((item) => {
    item.addEventListener('click', (e) => {
        changeMenuValue(e.target);
        //console.log(e.target); <a class="dropdown-item" href="#">утро</a>
        showTargetCards(e.target);
    })
});

// function changeMenuValue(chosenItemNode) {
//     const parentMenuId = chosenItemNode.closest('div[id]').id;
//     const menuTitle = document.getElementById(parentMenuId);
//     const dropDownMenu = menuTitle.parentElement;
//     const button = dropDownMenu.querySelector('button');
//     button.textContent = chosenItemNode.textContent
// };






function showTargetCards(chosenItemNode) {
    //ChosenItemNode = <a class="dropdown-item" href="#">утро</a>
    const nodeText = chosenItemNode.textContent;
    cardArray.forEach((card) => {
        if (isContainItemNode(nodeText)) {
            console.log('что то с z-index');//
            
        } else {
            console.log('noooooo');
        }
    })

};

function isContainItemNode(nodeText) {
    upperCards = [];
};

// function isMatch(elem, arr) {
//     return arr.includes(elem)

// };
