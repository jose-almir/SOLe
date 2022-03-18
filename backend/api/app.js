const express = require("express");
const qs = require("qs");
const axios = require("axios").default;
const { JSDOM } = require("jsdom");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

app.use(compression())
app.use(helmet());
app.use(cors());
app.use(express.json());

app.post("/api/status", async (req, res) => {
  const obj = {
    ...req.body,
    isAdvanced: "1",
    "archiveIds[]": "1",
    searchPage: 1,
  };

  const query = qs.stringify(obj);

  try {
    const results = await axios.get(
      `https://sol.sbc.org.br/busca/index.php/integrada/results?${query}`
    );
    const dom = new JSDOM(results.data);

    const articles =
      dom.window.document
        .querySelector(".articles_count")
        ?.innerHTML.split(" ") ?? [];

    if (articles.length > 0) {
      const total = +articles[articles.length - 2] ?? 0;
      const articlesByPage = +articles[2] ?? 0;
      const pages = Math.ceil(total / articlesByPage) ?? 0;
      const links = [];

      for (let i = 1; i <= pages; ++i) {
        const data = { ...obj, searchPage: i };
        links.push(
          `https://sol.sbc.org.br/busca/index.php/integrada/results?${qs.stringify(
            data
          )}`
        );
      }

      res.json({ total, pages, links, query, data: req.body });
    } else {
      res.json({ total: 0, pages: 0, links: [], query, data: req.body });
    }
  } catch (err) {
    res.json({ total: 0, pages: 0, links: [], query, data: req.body });
  }
});

app.post("/api/extract", async (req, res) => {
  const { link } = req.body;
  const references = [];
  const results = await axios.get(link);
  const resultsDom = new JSDOM(results.data);
  const hrefs = resultsDom.window.document.querySelectorAll("a.record_title");

  for (let e of hrefs) {
    const splittedLink = e.href.split("/");
    const view_number = splittedLink[splittedLink.length - 1];
    const type_art = splittedLink[4];
    const link_art = `https://sol.sbc.org.br/index.php/${type_art}/article/cite/${view_number}/BibtexCitationPlugin`;
    const bibtexPage = await axios.get(link_art);
    const bibtexDom = new JSDOM(bibtexPage.data);

    const bibtex = bibtexDom.window.document.querySelector("textarea").value;

    references.push(bibtex);
  }

  res.json({ references });
});

app.listen(process.env.PORT ?? 3000);
