const selectOptions = document.getElementsByClassName('form-control'),
      selectOptionsArray = Array.from(selectOptions),
      optionsMenu = document.querySelector('.container.menu'),
      cardDesk = document.querySelector('.container.card-desk');

let currentLocation = window.location.href;

let cardsArray = [];
debugger
// onLoad();
// function onLoad() {
//     let link = window.location.pathname; 
//     if (link === '/fitness/') {
//     let href = link.replace("fitness/", "services");
//     }
// };


function detectLocation(currentLocation, state = '') {
    let locationArray = currentLocation.split('/').filter(function(item) {
        return item !== '';
    });

    if (locationArray[locationArray.length - 1] === 'fitness') {
        state = 'filteredCards';
    } else {
        state = locationArray[locationArray.length - 1];
    }
    return state;
};

if (detectLocation(currentLocation) != 'filteredCards') {
    let cards = document.getElementsByClassName('card');
    if (card.alias === detectLocation(currentLocation)) {
        card.hidden = false;
    } else {
        card.hidden = true;
    }

}
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
        <a class="link" href="/${this.alias}" data-link>
            <img src=${this.image} class="card-img-top rounded" alt=${this.alias}>
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

    buildSingleCard(card) {
        const singleCard = document.createElement('div');
        singleCard.classList.add('container');
        //singleCard.classList.add('container');
        //верстка!!
        singleCard.innerHTML = `
        <div class="card mb-3" style="max-width: 100%;">
        <div class="row no-gutters">
          <div class="col-md-4 col-lg-12">
                <img src=${this.image} class="card-img" alt=${this.alias}>
                </div>
            <div class="col-md-8 col-lg-12">
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        </div>
    
        `;
        //document.querySelector(this.parentSelector).insertBefore(singleCard);
       cardDesk.after(singleCard);


    };

};

// function buildUrl(state, pagetitle = 'Fitness House Market', url) {
//     // const state = { 'page_id': 1, 'user_id': 5 }
//     // const title = ''
//     // const url = 'hello-world.html'
//     //let state = 'service';
//     return history.pushState(state, pagetitle, url)
// };


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
            let state = new State('filteredCards').buildUrl();
            addCardToField(filteredCardsArray);
            addEventsToImages(filteredCardsArray);
        })
};

class State {
    constructor(state, ...cardUrl) {
    this.state = state;
    this.url = cardUrl;
    }
    buildUrl()  {
        if (this.state === 'filteredCards') {
            this.url = '';
        } else {
            this.state = 'oneCard';
            this.url = this.url.join();
        }
    const pageTitle = 'Fitness House'
    return history.pushState(this.state, pageTitle, this.url)   
        
    }
};



function addEventsToImages(filteredCardsArray) { 
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            clearFieldNoHeader();
            let state = new State('oneCard', e.target.alt);
            state.buildUrl();
            buildSingleCard(finedSelectedCard(filteredCardsArray, e.target.alt));

        })
    })

};

function finedSelectedCard(filteredCardsArray, cardAlt) {
    let cardObj;
    filteredCardsArray.forEach((card) => {
        if (card.alias === cardAlt) {   
            return cardObj = card;
        }
    })
    return cardObj;
}


function buildSingleCard(cardObj) {
    const singleCard = new CardItem(cardObj);
    singleCard.buildSingleCard(cardObj);

};



function clearFieldNoHeader() {
    optionsMenu.innerHTML = '';
    cardDesk.innerHTML = '';
}


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
