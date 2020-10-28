class DropItem {
    constructor (arr) {
        this.title =  title;
        this.value = value;

    };

    buildItem(value) {
        const dropItem = document.createElement('a');
        dropItem.classList.add('dropdown-item');
        dropItem.href = href;
        dropItem.textContent = value;
        return dropItem;
        // document.getElementById(id).append(dropItem);
    };

    insertItemInMenuById(menuId, item) {
        const parent = document.getElementById(menuId);
        parent.append(item);

    };

    renderDropItems() {
        arr.maps(({title, value}) => {
            switch(title) {
                case 'Количество занятий':
                    this.insertItemInMenuById('amount', buildItem(value))
                    break;
                case 'Срок действия':
                    renderdropItem(id='date', value);
                    break;
                case 'Время посещения':
                    renderTime(id='time',value);
                    break;
                case 'Тип секции':
                    renderType(id='type',value);
                    break;
                case 'Категория тренера':
                    renderTrainer(id='trainer',value);
                    break;
        };
    });
};

};