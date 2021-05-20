const TARGET_CLASS = 'drag-dist';

const tempDiv = document.querySelector('.temp-div');
const dragDist = document.querySelectorAll('.drag-dist');

dragDist.forEach((el) => {
  el.addEventListener('dragover', (e) => allowDrop(e));
  el.addEventListener('drop', (e) => drop(e));
  el.addEventListener('dragenter', (e) => handleDragEnter(e));
  el.addEventListener('dragleave', (e) => handleDragLeave(e));
  el.addEventListener('dragend', (e) => dragEnd(e));
  el.addEventListener('dragstart', (e) => dragStart(e));
  // el.addEventListener('click', (event) => console.log('clicked'));
});

// Note : currentSection must always have a reference section
const state = {
  currentSection: null,
  prevSection: null,
  currentTodoId: null,
  cloneId: 'cloned-todo-item-id',
  alreadyCloned: false,
  dragEntered: false,
  dragDropped: false,
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const resetUI = () => {
  //TODO: Refactor this
  const todoId = state.currentTodoId;
  const todoItem = document.getElementById(todoId);
  todoItem.style.display = 'flex';

  dragDist.forEach((section) => {
    section.style.backgroundColor = 'rgb(248, 250, 251)';
  });
  // remove the current clonned todo item if any
  const currentClonedTodo = document.getElementById(state.cloneId);
  if (currentClonedTodo) {
    currentClonedTodo.remove();
  }
  state.prevSection = drag.currentSection;
  state.alreadyCloned = false;
};

const handleDragLeave = (ev) => {
  ev.preventDefault();
  state.dragEntered = false;
  requestAnimationFrame(() => update());
};

const handleDragEnter = (ev) => {
  ev.preventDefault();
  const section = ev.currentTarget;

  if (state.dragEntered) return;

  if (section) {
    state.currentSection = section;
  }
  state.dragEntered = true;
  requestAnimationFrame(() => update());
};

const update = () => {
  resetUI();
  // state.currentSection.style.backgroundColor = '#EBEDF1';
  const todoId = state.currentTodoId;

  tempDiv.innerHTML = state.currentSection.id;
  if (todoId && !state.alreadyCloned) {
    const todoItem = document.getElementById(todoId);
    const todoItemClone = todoItem.cloneNode(true);
    todoItemClone.classList.add(state.cloneId);
    todoItemClone.id = state.cloneId;
    todoItemClone.addEventListener('drop', (e) => drop(e));
    console.log('Yes todo is there ', state.currentSection.id);
    state.currentSection.appendChild(todoItemClone);
    state.alreadyCloned = true;
    todoItem.style.display = 'none';
  }
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
    targetSectionId = state.currentSection.id;
    const section = document.getElementById(targetSectionId);
    section.appendChild(todo);
  }

  state.dragDropped = true;
};

const dragStart = (ev) => {
  state.dragDropped = false;
};

const dragEnd = (ev) => {
  ev.preventDefault();

  if (!state.dragDropped) {
    resetUI();
    const todoId = state.currentTodoId;
    const todo = document.getElementById(todoId);
    const targetSectionId = state.currentSection.id;
    const section = document.getElementById(targetSectionId);
    section.appendChild(todo);
  }
};

const setTodoId = (id) => {
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
