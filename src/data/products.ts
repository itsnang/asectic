export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image1: string;
  image2: string;
  badge?: string;
  rating: number;
  reviews: number;
  category: string;
  color: string;
  size: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "SDFM Classic Black",
    price: 149.99,
    originalPrice: 199.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    badge: "Popular",
    rating: 4.8,
    reviews: 127,
    category: "hoodies",
    color: "black",
    size: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "SDFM Premium Gray",
    price: 154.99,
    originalPrice: 204.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    badge: "New",
    rating: 4.9,
    reviews: 89,
    category: "hoodies",
    color: "gray",
    size: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "SDFM Signature Navy",
    price: 159.99,
    originalPrice: 209.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    rating: 4.7,
    reviews: 156,
    category: "hoodies",
    color: "navy",
    size: ["M", "L", "XL"],
  },
  {
    id: 4,
    name: "SDFM Limited Edition",
    price: 199.99,
    originalPrice: 249.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    badge: "Limited",
    rating: 4.9,
    reviews: 203,
    category: "hoodies",
    color: "white",
    size: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "SDFM Urban Olive",
    price: 164.99,
    originalPrice: 214.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    rating: 4.6,
    reviews: 78,
    category: "hoodies",
    color: "green",
    size: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "SDFM Vintage Brown",
    price: 169.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    rating: 4.5,
    reviews: 92,
    category: "hoodies",
    color: "brown",
    size: ["M", "L", "XL", "XXL"],
  },
  {
    id: 7,
    name: "SDFM Essential White",
    price: 139.99,
    originalPrice: 179.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    badge: "Sale",
    rating: 4.7,
    reviews: 134,
    category: "hoodies",
    color: "white",
    size: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "SDFM Street Red",
    price: 174.99,
    originalPrice: 224.99,
    image1:
      "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    image2:
      "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
    badge: "Hot",
    rating: 4.8,
    reviews: 167,
    category: "hoodies",
    color: "red",
    size: ["S", "M", "L", "XL", "XXL"],
  },
];
