const TARGET_CLASS = 'drag-dist';

const tempDiv = document.querySelector('.temp-div');
const dragDist = document.querySelectorAll('.drag-dist');

console.log(dragDist);

dragDist.forEach((el) => {
  el.addEventListener('dragover', (e) => allowDrop(e));
  el.addEventListener('drop', (e) => drop(e));
  el.addEventListener('dragenter', (e) => handleDragEnter(e));
  el.addEventListener('dragleave', (e) => handleDragLeave(e));
  // el.addEventListener('click', (event) => console.log('clicked'));
  // el.addEventListener('dragend', (event) => console.log('drag end'));
  // el.addEventListener('dragstart', (event) => console.log('drag start'));
});

// Note : currentSection must always have a reference section
const state = {
  currentSection: null,
  prevSection: null,
  currentTodoId: null,
  cloneId: 'cloned-todo-item-id',
  alreadyCloned: false,
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const resetUI = () => {
  dragDist.forEach((section) => {
    // reset the section color
    section.style.backgroundColor = 'white';
  });
  // remove the current clonned todo item if any
  const currentClonedTodos = Array.from(
    document.getElementsByClassName(state.cloneId)
  );
  if (currentClonedTodos.length) {
    currentClonedTodos.forEach((todo) => todo.remove());
  }
  state.prevSection = drag.currentSection;
  state.alreadyCloned = false;
  // console.log('Reset');
};

const handleDragLeave = (ev) => {
  ev.preventDefault();
  update();
};

const handleDragEnter = (ev) => {
  ev.preventDefault();
  const section = ev.currentTarget;
  if (section) {
    state.currentSection = section;
  }
  update();
};

const update = () => {
  resetUI();
  state.currentSection.style.backgroundColor = '#EAEBEE';
  const todoId = state.currentTodoId;
  tempDiv.innerHTML = state.currentSection.id;
  if (todoId) {
    const todoItem = document.getElementById(todoId);
    const todoItemClone = todoItem.cloneNode(true);
    todoItemClone.classList.add(state.cloneId);
    todoItemClone.addEventListener('drop', (e) => drop(e));
    state.currentSection.appendChild(todoItemClone);
    state.alreadyCloned = true;
  }
  // console.log('Enter');
};

const drop = (ev) => {
  ev.preventDefault();

  resetUI();

  // get the dragged todo node
  const todoId = ev.dataTransfer.getData('id');
  const todo = document.getElementById(todoId);

  // get the parent section of the dragged node
  const sourceSectionId = ev.dataTransfer.getData('parentId');
  // const sourceSecionClass = ev.dataTransfer.getData('parentClasses');

  // check if the target is a section or the clonned todo item
  let targetSectionId = ev.currentTarget.id;

  const targetSectionClass = Array.from(ev.currentTarget.classList);

  if (
    targetSectionClass.includes(TARGET_CLASS) &&
    targetSectionId !== sourceSectionId
  ) {
    ev.currentTarget.appendChild(todo);
  } else if (targetSectionClass.includes(state.cloneId)) {
    console.log('Target is todo node ', targetSectionId);
    targetSectionId = state.currentSection.id;
    const section = document.getElementById(targetSectionId);
    section.appendChild(todo);
  }
};

const setTodoId = (id) => {
  console.log('id = ', id);
  if (id) {
    state.currentTodoId = id;
  }
};

export const drag = (ev) => {
  // set the parent section id
  ev.dataTransfer.setData(
    'parentId',
    ev.currentTarget.parentNode.parentNode.id
  );

  // set the parent section classes
  ev.dataTransfer.setData(
    'parentClasses',
    Array.from(ev.currentTarget.parentNode.parentNode.classList)
  );

  // set the current note id
  ev.dataTransfer.setData('id', ev.currentTarget.id); // each todo item has unique id

  setTodoId(ev.currentTarget.id);
};
