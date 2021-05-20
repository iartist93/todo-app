# TODO App

- I started this app from scratch as a simple exercise in one of my Udacity react sessions meetings, then I got inspired to continue working on it and add more features to see how far I can go with it.
- I don't used any framework or library, just Vanilla-JS and redux (will be replaced soon with my custom redux implementation) for state managment.

---

## Live Preview

- https://oknext.netlify.app/

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
- [ ] Filter each section to read it's slice from state only
- [ ] check the distination element for class "drag-dist", search the parents for class name and add the note to the section if the parent is "drag-dist"
- [ ] Make app responsive on web.
- [ ] Enhance the mobile experience.
- [ ] Update the todo state to reflect the current shelf.
- [ ] Add option to edit the note.
- [ ] Add my redux-implementation to the project.
- [ ] Implement search bar funcionality.
  - [ ] Filter the notes inside each seaction.
  - [ ] Clear the search field after submit.
- [ ] Add timestamp to the state.
- [ ] Add color coding to each node.
- [ ] Add filter button, to filter notes based on tag, time or color.

---
## Parcel Configuraion

- Webpack, highly configurable and customizable.
- Parcel, zero configuration.
- Convention over configruation.
- It will do css minification and optimization for us for both js and css.
- It will detect all imported packages and install it for us.

---

```sh
# Want package.json?
> npm init

# Start
> npm parcel src/index.html

# corss-env .. to setup-up environment variables in corss-platform
> nom -i corss-env


```

```js
// package.json
"start" : "corss-env NODE_ENV=production parcel build src/inde.html"
```
