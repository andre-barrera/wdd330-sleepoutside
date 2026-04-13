import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { productCardTemplate } from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();

function getRandomItems(list, count) {
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

async function loadHighlights() {
  const results = await Promise.all(
    categories.map(async (category) => {
      const list = await dataSource.getData(category);
      const random = getRandomItems(list, 1);
      return random[0];
    })
  );

  const container = document.querySelector(".highlights ul");
  renderListWithTemplate(productCardTemplate, container, results);
}

loadHighlights();