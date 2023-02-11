const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const todo = [
    'Buy groceries',
    'Enroll in baking class',
    "Clean up kitty's litter",
    'Vacuum mattress',
];

//represent the stored items
const listItems = [];

let dragStartIndex;

//function for generatimg list
createList();

function createList() {
    //copy of const todo[]
    [...todo]
    //a is 'things' that is need to be sort randomly
    .map( a => ({value: a, sort: Math.random() }))
    //random sort everytime u refresh the page
    .sort((a, b) => a.sort - b.sort)
    //accessing and mapping it back value a
    .map(a => a.value)
    //forEach iterates things and index
    .forEach((things, index) => {
        console.log(things);
        const items = document.createElement('li');
        //items.classList.add('over');
        //items.classList.add('right');

        items.setAttribute('data-index', index);
        items.innerHTML = `
        <span class = "number">${index + 1}</span>
            <div class = "draggable" draggable = "true">
                <p class = "todo-name">${things}</p>
                <i class="fa-solid fa-grip-lines"></i>
            </div> `;

        //push is an array method that pushes items inside array
        listItems.push(items);
        draggable_list.appendChild(items);
    })

    addEventListener();
}

function dragStart(){
    dragStartIndex = this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

function dragEnter(){
   this.classList.add('over')
}

function dragLeave(){
    this.classList.remove('over')
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over')
}

function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}


function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(dragItem => {
        dragItem.addEventListener('dragover', dragOver);
        dragItem.addEventListener('drop', dragDrop);
        dragItem.addEventListener('dragenter', dragEnter);
        dragItem.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener("click", checkOrder);