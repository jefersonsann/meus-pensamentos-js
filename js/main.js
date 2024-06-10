const btnNew = document.querySelector(".newPost");
const modal = document.querySelector("#modal");
const form = document.querySelector(".form");

let POSTS = JSON.parse(localStorage.getItem("POSTS")) || [];

function renderPost() {
  const postList = document.querySelector(".post-list");
  postList.innerHTML = "";

  if (POSTS.length === 0)
    return (postList.innerHTML = "<li>Nenhum pensamento no momento</li>");

  POSTS.forEach((message, index) => {
    const newPost = document.createElement("li");
    newPost.classList.add("post");
    newPost.innerHTML = `
        <span>${message}</span>
        <div>
            <button onClick="handleEdit(${index})">
              Editar
            </button>
            <button onClick="handleDelete(${index})">
              Excluir
            </button>
        </div>
      `;
    newPost.setAttribute("data-index", index);
    postList.appendChild(newPost);
  });
}
renderPost();

function openModal() {
  modal.setAttribute("aria-modal", true);
  modal.style.display = "flex";
}

function closeModal() {
  modal.setAttribute("aria-modal", false);
  modal.style.display = "none";
}

function handleDelete(index) {
  POSTS.splice(index, 1);
  localStorage.setItem("POSTS", JSON.stringify(POSTS));
  renderPost();
}

function handleEdit(index) {
  openModal();
  const post = document.querySelector(`[data-index="${index}"]`);
  const message = post.querySelector("span");

  const textarea = form.querySelector("textarea#message");
  textarea.value = message.innerText;

  form.setAttribute("data-edit", index);
  POSTS[index] = textarea.value;

  textarea.focus();
}

btnNew.addEventListener("click", () => {
  openModal();
});

modal.addEventListener("click", (event) => {
  if (event.target.id === "modal") {
    closeModal();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = event.target[0].value;

  if (event.target.hasAttribute("data-edit")) {
    const index = event.target.getAttribute("data-edit");

    POSTS[index] = values;
    event.target.removeAttribute("data-edit");
  } else {
    POSTS.push(values);
  }

  localStorage.setItem("POSTS", JSON.stringify(POSTS));

  renderPost();

  modal.setAttribute("aria-modal", false);
  modal.style.display = "none";
  event.target[0].value = "";
  form.reset();
});
