# TODO App

- I started this app from scratch as a simple exercise in one of my Udacity react sessions meetings, then I got inspired to continue working on it and add more features to see how far I can go with it.
- I don't used any framework or library, just Vanilla-JS and redux (will be replaced soon with my [custom redux implementation](https://github.com/iartist93/custom-redux)) for state managment.

---

## Live Preview

[![Netlify Status](https://api.netlify.com/api/v1/badges/3520050d-b577-4381-b9e5-d02151e3ee0f/deploy-status)](https://app.netlify.com/sites/oknext/deploys)

https://oknext.netlify.app

---

## Install Locally

```sh
> npm install
> npm start
```

---

## TODO List 😂😂

- [x] Button hover/focus heightlights.
- [x] Add new todo should be popup model.
- [x] Have 4 sectios "todo" "in-progress" "review" "done"
- [x] User can drag/drop item
- [x] New notes should be added to the top of the shelf.
- [x] Filter each section to read it's slice from state only
- [x] Update the todo state to reflect the current shelf.
- [x] Add timestamp to the state.
- [x] check the distination element for class "drag-dist", search the parents for class name and add the note to the section if the parent is "drag-dist"
- [ ] Add my redux-implementation to the project.
- [ ] Make app responsive on web.
- [ ] Enhance the mobile experience.
- [ ] Save and load todos state to local storage.
- [ ] ESC button to close the modal window.
- [ ] User should be able to reorder notes inside each shelf.
- [ ] Add option to edit the note title and content.
- [ ] Add option to quickly move todo item to another shelf without drag/drop. i.e. if the todo list is long.
- [ ] Implement search bar funcionality.
  - [ ] Filter the notes inside each seaction.
  - [ ] Clear the search field after submit.
- [ ] Add color coding to each node.
- [ ] Add filter button, to filter notes based on tag, time or color.
- [ ] Implement observer pattern for internal state.
- [ ] analysis the performance of the app.
- [ ] add dark theme.
- [ ] Solve parcel issue when build with `--no-minify`, I think It's something related to class or id names.
- [ ] Decide what databse solution to use for online presistance.
- [ ] Ad animation to todo item when dragged, e.g. rotate, based on the drag speed.

---
