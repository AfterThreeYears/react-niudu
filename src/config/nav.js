const isProd = process.env.NODE_ENV === 'production';
const base = [
  {
    title: 'V2EX',
    id: 0,
    url: 'v2ex',
    tabs: [
      {
        title: '全部',
        tab: 'all',
      },
      {
        title: '技术',
        tab: 'tech',
      },
      {
        title: '创意',
        tab: 'creative',
      },
      {
        title: '好玩',
        tab: 'play',
      },
      {
        title: 'Apple',
        tab: 'apple',
      },
      {
        title: '酷工作',
        tab: 'jobs',
      },
      {
        title: '交易',
        tab: 'deals',
      },
      {
        title: '城市',
        tab: 'city',
      },
      {
        title: '问与答',
        tab: 'qna',
      },
      {
        title: '最热',
        tab: 'hot',
      },
      {
        title: 'R2',
        tab: 'r2',
      },
    ],
  },
  {
    title: 'NodeJS-Org',
    id: 1,
    url: 'cnode',
    tabs: [
      {
        title: '全部',
        tab: 'all',
      },
      {
        title: '问答',
        tab: 'ask',
      },
      {
        title: '招聘',
        tab: 'job',
      },
      {
        title: '分享',
        tab: 'share',
      },
      {
        title: '精华',
        tab: 'good',
      },
      {
        title: '测试',
        tab: 'dev',
      },
    ],
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
    id: 3,
    url: 'test',
  },
];

let nav = [];

if (isProd) {
  nav = base;
} else {
  nav = [
    ...base,
    ...test,
  ];
}

export default nav;

export const pathMap = {
  '/v2ex': 0,
  '/cnode': 1,
};

