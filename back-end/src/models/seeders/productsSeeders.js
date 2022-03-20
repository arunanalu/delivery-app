const Product = require('../productSchema');

const products = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    urlImage: 'https://static3.minhalojanouol.com.br/clgatacado/produto/20200410000557_8712991288_D.png',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    urlImage: 'https://a-static.mlcdn.com.br/1500x1500/cerveja-heineken-600ml-premium-lager-caixa-com-12-garrafas/laerciomartinsdesouza/214a5d98ff6b11eba5cd4201ac185013/3d58e44e2b74bf915f315a2d830bf1ad.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    urlImage: 'https://courier-images-prod.imgix.net/produc_variant/00008735_59b64bbf-c11a-4575-a15c-db7c31080461.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: 7.5,
    urlImage: 'https://diskbebidasbh.com.br/wp-content/uploads/2016/10/brahma_600ml.png',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: 2.19,
    urlImage: 'https://d3gdr9n5lqb5z7.cloudfront.net/fotos/1818.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: 4.49,
    urlImage: 'http://bahiabeer.com.br/wp-content/uploads/2020/12/skol-beats-senses_313ml.png',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: 4.99,
    urlImage: 'https://images-americanas.b2w.io/produtos/01/00/img/514838/9/514838951_1GG.jpg',
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: 2.79,
    urlImage: 'https://emporiodacerveja.vtexassets.com/arquivos/ids/175906/BrahmaDuploMalte_lata_1000x1000.jpg?v=637196201142000000',
  },
  {
    id: 9, 
    name: 'Becks 600ml',
    price: 8.89,
    urlImage: 'https://choppbrahmaexpress.vtexassets.com/arquivos/ids/155589/70ca1861a6e7b5e4da6c69af29a970dc.png?v=637353454279370000',
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: 3.57,
    urlImage: 'https://s3-sa-east-1.amazonaws.com/static.vhsys.com/vh-drive/produtos/28643785/Skol__Beats_Senses_cx__com__8_Unidades_de__269ml__0c7ae4d.png',
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: 3.49,
    urlImage: 'https://supercordeiro.com.br/wp-content/uploads/2021/03/28771-Stella-Artois-Long-Neck-275-ML.png',
  },
];

const productsSeeders = async () => {
  try {
    await Product.insertMany(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports = productsSeeders;