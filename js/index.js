
class CardItem {
    constructor (arr, parentSelector = '.row.row-cols-1.row-cols-md-3') {
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
            return `<a href="#" title=${title} class="btn btn-primary">${value}</a>`;
        }).join('');

    };

    render() {
        const cardItem = document.createElement('div');
        cardItem.classList.add('col', 'mb-4');
        const tags = this.renderTags();
        cardItem.innerHTML = `
        <div class="card">
        <img src=${this.image} class="card-img-top" alt=${this.alias}>
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.description}</p>
            <span class="card-title pricing-card-title">${this.price}</span>
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
    }
};


getData('http://localhost:3000/services')
    .then(data => {
        data.forEach((arr) => {
    new CardItem(arr).render();
    })
    });