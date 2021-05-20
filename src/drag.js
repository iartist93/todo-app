const TARGET_CLASS = 'todo-list-container';

export const allowDrop = (ev) => {
  ev.preventDefault();
};

export const drop = (ev) => {
  ev.preventDefault();
  const todoId = ev.dataTransfer.getData('id');
  const todo = document.getElementById(todoId);

  const sourceSectionId = ev.dataTransfer.getData('parentId');
  // const sourceSecionClass = ev.dataTransfer.getData('parentClass');

  const targetSectionClass = ev.target.classList[0];
  const targetSectionId = ev.target.id;

  if (
    targetSectionClass === TARGET_CLASS &&
    targetSectionId !== sourceSectionId
  ) {
    console.log('shouldappe');
    ev.target.appendChild(todo);
  }
};

export const drag = (ev) => {
  ev.dataTransfer.setData('parentId', ev.target.parentNode.parentNode.id);
  ev.dataTransfer.setData(
    'parentClass',
    ev.target.parentNode.parentNode.classList[0]
  );
  ev.dataTransfer.setData('id', ev.target.id); // each todo item has unique id
};

const dragDist = document.querySelectorAll('.drag-dist');

dragDist.forEach((el) => {
  el.addEventListener('dragover', (event) => allowDrop(event));
  el.addEventListener('click', (event) => console.log('clicked'));
  el.addEventListener('drop', (event) => drop(event));
});

console.log('executed in drag.js');
console.log(dragDist);
