import http from "http";
import { fileURLToPath } from "url";
import url from "url";
import fs from "fs";
import path from "path";
import { CardType, replaceTemplate } from "./utils/replaceTemplate.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const data: CardType[] = JSON.parse(dataJson);

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const cardProduct = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const newCardData = data
      .map((value) => replaceTemplate({ data: value, template: cardProduct }))
      .join("");

    const newOverviewTemplate = overviewTemplate.replace(
      "{%PRODUCT_CARDS%}",
      newCardData
    );

    res.end(newOverviewTemplate);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const id : string = query.id as string;

    const newTemplateProduct = replaceTemplate({
      template: templateProduct,
      data: data[id],
    });

    res.end(newTemplateProduct);
  } else {
    res.writeHead(400, {
      "Content-type": "text/html",
    });

    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, () => {
  console.log("Server is running");
});
