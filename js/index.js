const selectOptions = document.getElementsByClassName('form-control'),
      selectOptionsArray = Array.from(selectOptions),
      optionsMenu = document.querySelector('.container.menu'),
      cardDesk = document.querySelector('.container.card-desk');

let cardsArray = [];
class CardItem {
    constructor(arr, parentSelector = '.card-desk') { //'.row-cols-3.row-cols-md-2'
        this.image = arr['image'];
        this.alias = arr['alias'];
        this.title = arr['title'];
        this.description = arr['description'];
        this.props = arr['properties'];
        this.price = arr['price'];
        this.parentSelector = parentSelector;
    };
    renderTags() {
        return this.props.map(({
            title,
            value
        }) => {
            return `<a href="#" title=${title} class="btn btn-outline-primary btn-sm m-1" role="button">${value}</a>`;
        }).join('');
    };


    buildCards(card) {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card', 'h100');
        cardItem.id = `${this.alias}`;
        const tags = this.renderTags();
        // <a href="http://localhost:8888/service/${this.alias}"></a>
        cardItem.innerHTML = `
        <a class="alias" href="#">
            <img src=${this.image} class="card-img-top rounded" alt="Fitness-house">
            </a>
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.description}</p>
                <span class="card-title pricing-card-title">Стоимость ${this.price} руб.</span>
            ${tags}
            </div>
            `;
        document.querySelector(this.parentSelector).append(cardItem);
    }

};

function buildUrl(state, pagetitle = 'Fitness House Market', url) {
    // const state = { 'page_id': 1, 'user_id': 5 }
    // const title = ''
    // const url = 'hello-world.html'
    //let state = 'service';
    return history.pushState(state, pagetitle, url)
};


const getCards = async (url) => {
    return await fetch(url);
    // if (!res.ok) {
    //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
    // } else {
    //      await res.json()

};
function renderCards(selectedFilters = []) {
    getCards(('http://localhost:3000/services'))
        .then(data => data.json())
        .then(cardsArray => {
            clearCardDesk();
            let filteredCardsArray = filteredCards(cardsArray, selectedFilters) //очищенный массив
            addCardToField(filteredCardsArray);
            addEventsToImages(filteredCardsArray);
            //buildUrl();
        })
};

function addEventsToImages(filteredCardsArray) { //передать состояние!!
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            debugger
            optionsMenu.innerHTML = '';
            cardDesk.innerHTML = '';
            
        })
    })

};


function filteredCards(cardsArray, selectedFilters) {

    if (selectedFilters.length === 0) {
        return cardsArray;
    }
    let newCardsArray = []
    cardsArray.forEach((card) => {
        let properties = card.properties.map(item => item.value);
        let result = selectedFilters.reduce((result, filter) => {
            if (result === false) {
                return false
            }
            if (properties.includes(filter)) {
                return true
            }
            return false;
        }, true);

        if (result) {
            newCardsArray.push(card);
        }
    })
    return newCardsArray;
};

function addCardToField(filteredCardsArray) {
    filteredCardsArray.forEach((obj) => {
        const card = new CardItem(obj);
        card.buildCards(card);

    })
}

function clearCardDesk() {
    const cardDesk = document.querySelector('.card-desk');
    cardDesk.innerHTML = '';
};

function pushCardToArray(card, cardArray) {
    cardArray.push(card);
}

renderCards();

//submitBtn.addEventListener('click', () => renderCards(getFilters()));

selectOptionsArray.forEach(item => {
    item.addEventListener('change', () => renderCards(getFilters()))
});

function getFilters() {
    let selectedFilters = [];
    selectOptionsArray.forEach((filter) => {
        if (filter.value) {
            selectedFilters.push(filter.value)
        }
    })
    return selectedFilters
};