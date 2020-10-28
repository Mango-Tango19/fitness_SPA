const menuItemsArr = document.querySelectorAll('.dropdown-item');
let cardArray = [];

class CardItem {
    constructor (arr, parentSelector = '.row.row-cols-1.row-cols-md-2') {
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


    renderCard() {
        const cardItem = document.createElement('div');
        cardItem.classList.add('col', 'mb-4');
        const tags = this.renderTags();
        // <a href="http://localhost:8888/service/${this.alias}"></a>
        cardItem.innerHTML = `
        <div class="card  h-100" style="width: 18rem;" id=${this.alias}>
        <img src=${this.image} class="card-img-top rounded" alt="Fitness-house">
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.description}</p>
            <span class="card-title pricing-card-title">Стоимость ${this.price} руб.</span>
           ${tags}
        </div>
    </div>
        `;
        document.querySelector(this.parentSelector).append(cardItem);
        
    };
};



const getData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    } else {
        return await res.json();
};
}

// getData('http://localhost:3000/services')
//     .then(data => {
//         data.forEach((arr) => {
//     new CardItem(arr).renderCard();
//     })
// });


getData('http://localhost:3000/services')
    .then(data => {
        data.forEach((obj) => {
    const card = new CardItem(obj);
    card.renderCard();
    pushCardToArray(card, cardArray);
    })
});

function pushCardToArray(card, arr) {
    arr.push(card);
};





menuItemsArr.forEach((item) => {
    item.addEventListener('click', (e) => {
        changeMenuValue(e.target);
        //console.log(e.target); <a class="dropdown-item" href="#">утро</a>
        showTargetCards(e.target);
    })
});

function changeMenuValue(chosenItemNode) {
    const parentMenuId = chosenItemNode.closest('div[id]').id;
    const menuTitle = document.getElementById(parentMenuId);
    const dropDownMenu = menuTitle.parentElement;
    const button = dropDownMenu.querySelector('button');
    button.textContent = chosenItemNode.textContent
};


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
    for ( let i=0; i < cardArray.length; i++) {
        let propsArr = cardArray[i].props;
        propsArr.forEach((obj) => {
            const arrObjValues = Object.values(obj);
            debugger
            if (arrObjValues.includes(nodeText)) {
                /// end
            }
        })
    }
    // cardArray.forEach((card) => {
    //     //console.log(cardArray);
    //     const cardTags = card.props;
    //     //console.log(cardTags);
    //     cardTags.forEach((tag) => {
    //         let arrTags = Object.values(tag);
    //         debugger
    //             switch (arrTags[1] === title) {
    //                 case true
    //                 break;

    //             };
                    
    //         });
        
    // });
    console.log(upperCards);
};

// function isMatch(elem, arr) {
//     return arr.includes(elem)

// };
