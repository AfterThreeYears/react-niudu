const isProd = process.env.NODE_ENV === 'production';
const base = [
  {
    title: 'V2EX',
    id: 0,
    url: 'v2ex',
  },
  {
    title: 'NodeJS-Org',
    id: 1,
    url: 'cnode',
  },
];

const test = [
  {
    title: '知乎日报',
    id: 2,
    url: 'zhihu',
  },
  {
    title: 'test',
    id: 2,
    url: 'test',
  },
];

let nav = [];

if (isProd) {
  nav = [
    ...base,
  ];
} else {
  nav = [
    ...base,
    ...test,
  ];
}

function getRanDom(min, max) {
  return (Math.random() * (max - min + 1) + min).toFixed(0);
}

export default Array.from(Array(20)).map((item, index) => {
  return {
    title: getRanDom(10000, 100),
    id: index,
    url: '',
  }
});