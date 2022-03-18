const qs = require("qs");
const axios = require("axios").default;
const { JSDOM } = require("jsdom");
const Query = require("./query");

module.exports = {
  async status(req, res) {
    const { value, error } = Query.validate(req.body);

    if (error) {
      console.log(error)
      return res.status(400).json({ message: "Query inválida" });
    }

    const obj = {
      "isAdvanced": "1",
      "archiveIds[]": "1",
      "searchPage": 1,
      "query": value.query,
      "field-7-fromDay": value.fromDay,
      "field-7-fromMonth": value.fromMonth,
      "field-7-fromYear": value.fromYear,
      "field-7-toDay": value.toDay,
      "field-7-toMonth": value.toMonth,
      "field-7-toYear": value.toYear,
      "field-10": value.langs
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
  },
  async extract(req, res) {
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
  },
};
