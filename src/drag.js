const TARGET_CLASS = 'drag-dist';

export const allowDrop = (ev) => {
  ev.preventDefault();
};

export const drop = (ev) => {
  ev.preventDefault();
  const todoId = ev.dataTransfer.getData('id');
  const todo = document.getElementById(todoId);

  const sourceSectionId = ev.dataTransfer.getData('parentId');
  // const sourceSecionClass = ev.dataTransfer.getData('parentClasses');

  const targetSectionClass = Array.from(ev.target.classList);
  const targetSectionId = ev.target.id;

  if (
    targetSectionClass.includes(TARGET_CLASS) &&
    targetSectionId !== sourceSectionId
  ) {
    ev.target.appendChild(todo);
  } else {
  }
};

export const drag = (ev) => {
  ev.dataTransfer.setData('parentId', ev.target.parentNode.parentNode.id);
  ev.dataTransfer.setData(
    'parentClasses',
    Array.from(ev.target.parentNode.parentNode.classList)
  );
  ev.dataTransfer.setData('id', ev.target.id); // each todo item has unique id
};

const dragDist = document.querySelectorAll('.drag-dist');

dragDist.forEach((el) => {
  el.addEventListener('dragover', (event) => allowDrop(event));
  el.addEventListener('drop', (event) => drop(event));

  // el.addEventListener('click', (event) => console.log('clicked'));
  // el.addEventListener('dragend', (event) => console.log('drag end'));
  // el.addEventListener('dragstart', (event) => console.log('drag start'));
  // el.addEventListener('dragenter', (event) => console.log('drag enter'));
  // el.addEventListener('dragleave', (event) => console.log('drag leave'));
});

console.log('executed in drag.js');
console.log(dragDist);
