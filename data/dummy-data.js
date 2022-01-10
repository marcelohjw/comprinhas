import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Camisa Vermelha',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'Uma camisa vermelha, perfeita para qualquer dia.',
    149.99
  ),
  new Product(
    'p2',
    'u1',
    'Carpete Azul',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Combina com sua camisa vermelha perfeitamente. Apenas para o chão. Não vestir.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Caneca de Café',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Também pode ser utilizada para chá!',
    59.99
  ),
  new Product(
    'p4',
    'u3',
    'O Livro - Edição Limitada',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "Qual é o conteúdo? Porque isso importa? É uma edição limitada!",
    65.99
  ),
  new Product(
    'p5',
    'u3',
    'Power Book',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Hardware incrível, teclado bostinha e precinho salgado. Compre agora antes que um novo seja lançado!',
    10499.99
  ),
  new Product(
    'p6',
    'u1',
    'Papel & Caneta',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Com essa combinação com certeza uma história incrível será criada.",
    29.99
  )
];

export default PRODUCTS;
