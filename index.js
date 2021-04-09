function getData() {
  fetch("https://kea21-6a0c.restdb.io/rest/posts", {
    method: "GET",
    headers: {
      "x-apikey": "60339bce5ad3610fb5bb64e6",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
getData();

function showPosts(posts) {
  console.log(posts);

  //grab the template

  const template = document.querySelector("template.frontpagelist").content;
  posts.forEach((post) => {
    //clone
    const copy = template.cloneNode(true);

    //adjust stuff
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;
    copy.querySelector("a.readmore").href = `article.html?article=${post._id}`;
    //apend it
    document.querySelector("main").appendChild(copy);
  });
}
