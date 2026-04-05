const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: "servicesError",
      message: jsonResponse
    };
  }
}
export default class ExternalServices {
  constructor() {
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProducts(query) {
  const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

  let allProducts = [];

  for (const category of categories) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    allProducts = allProducts.concat(data.Result);
  }

  return allProducts.filter(product =>
    product.Name.toLowerCase().includes(query.toLowerCase()) ||
    product.Brand.Name.toLowerCase().includes(query.toLowerCase())
  );
}
}
