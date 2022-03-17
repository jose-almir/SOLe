const express = require("express");
const qs = require("qs");
const axios = require("axios").default;
const { JSDOM } = require("jsdom");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("1");
});

app.post("/api/extract", (req, res) => {
  console.log(req.body);
  res.send("1");
});
// io.on("connection", (socket) => {
//   const extraction = async (q) => {
//     const obj = qs.parse(q);
//     const query = qs.stringify(obj);
//     const createUrl = (query) =>
//       `https://sol.sbc.org.br/busca/index.php/integrada/results?${query}`;
//     try {
//       let current = 1;
//       const references = [];
//       const res = await axios.get(createUrl(query));
//       const dom = new JSDOM(res.data);
//       const articlesCount = dom.window.document
//         .querySelector(".articles_count")
//         ?.innerHTML?.split(" ");
//       const total = articlesCount[articlesCount.length - 2];
//       socket.emit("article-progress", { current, total });

//       const totalPages = Math.ceil(total / 25);

//       for (let i = 1; i <= totalPages; ++i) {
//         obj.searchPage = i;
//         const results = await axios.get(createUrl(qs.stringify(obj)));
//         const resultsDom = new JSDOM(results.data);
//         const links =
//           resultsDom.window.document.querySelectorAll("a.record_title");

//         for (let e of links) {
//           const splittedLink = e.href.split("/");
//           const view_number = splittedLink[splittedLink.length - 1];
//           const type_art = splittedLink[4];
//           const link_art = `https://sol.sbc.org.br/index.php/${type_art}/article/cite/${view_number}/BibtexCitationPlugin`;
//           const link_abs = e.href;
//           const bibtexPage = await axios.get(link_art);
//           const absPage = await axios.get(link_abs);
//           const bibtexDom = new JSDOM(bibtexPage.data);
//           const absDom = new JSDOM(absPage.data);

//           const text =
//             bibtexDom.window.document.querySelector("textarea").value;
//           const abst =
//             absDom.window.document.querySelector("div.abstract").textContent;
//           console.log(current);
//           current++;
//           socket.emit("article-progress", { current, total });
//         }
//       }
//     } catch (error) {
//       console.log("Deu erro", error);
//       socket.emit("error-request");
//     }
//   };

//   socket.on("submit-query", extraction);

//   socket.on("disconnect", function () {
//     socket.offAny(extraction);
//     socket.disconnect();
//   });
// });

app.listen(process.env.PORT ?? 3000);
