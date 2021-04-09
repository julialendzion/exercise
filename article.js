const searchParams = new URLSearchParams(window.location.search);

const articleId = searchParams.get("article");

fetch(
  "https://kea21-6a0c.restdb.io/rest/posts/" +
    articleId +
    "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "60339bce5ad3610fb5bb64e6",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data);
  document.querySelector("h1").textContent = data.title;
  document.querySelector("h2 ").textContent = data.content;
  document.querySelector("p span").textContent = data.username;

  //grab the template
  const template = document.querySelector("template.comments").content;

  data.comments.forEach((comment) => {
    //clone
    const copy = template.cloneNode(true);

    //adjust stuff
    copy.querySelector("h3").textContent = comment.content;
    copy.querySelector("p span").textContent = comment.username;
    //apend it
    document.querySelector("main").appendChild(copy);
  });
  if (data.comments.length == 0) {
    const copy = template.cloneNode(true);

    copy.querySelector("h3").textContent = "No comments yet, be the first!";
    copy.querySelector("p span").textContent = "you";

    document.querySelector("main").appendChild(copy);
  }
}

const form = document.querySelector("#commentForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    username: form.elements.username.value,
    email: form.elements.email.value,
    content: form.elements.content.value,
    date: "",
  };
  console.log(payload);

  fetch(`https://kea21-6a0c.restdb.io/rest/posts/${articleId}/comments`, {
    method: "POST",
    headers: {
      "x-apikey": "60339bce5ad3610fb5bb64e6",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      const template = document.querySelector("template.comments").content;
      const copy = template.cloneNode(true);
      copy.querySelector("h3").textContent = comment.content;
      copy.querySelector("p span").textContent = comment.username;

      document.querySelector("main").appendChild(copy);

      form.elements.email.value = "";
      form.elements.username.value = "";
      form.elements.content.value = "";
    });
}
