import { addOne } from "./list-todo-slice.js";

import { toggleModal } from "../todo-modal/todo-modal-slice.js";

import { showError } from "../error/error-slice.js";

import store from "../../app/store";

export default function addTodo(data) {
  fetch("/api/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.code === 200) {
        store.dispatch(addOne(result.data));
      } else {
        store.dispatch(showError());
      }
    })
    .catch((e) => new Error(e, "Server error"))
    .then(() =>
      store.dispatch(toggleModal({ description: "", title: "", priority: 1 }))
    );
}
