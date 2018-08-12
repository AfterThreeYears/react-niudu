const cnodeTabs = [
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
];

const v2exTabs = [
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
];

const nav = [
  {
    title: 'V2EX',
    id: 0,
    url: 'v2ex',
    tabs: v2exTabs,
  },
  {
    title: 'NodeJS',
    id: 1,
    url: 'cnode',
    tabs: cnodeTabs,
  },
];

export default nav;

export const pathMap = {
  '/v2ex': 0,
  '/cnode': 1,
};

export const cnodeMap = cnodeTabs.reduce((result, { title, tab }) => ({
  ...result,
  [tab]: title,
}));

export const v2exMap = v2exTabs.reduce((result, { title, tab }) => ({
  ...result,
  [tab]: title,
}));

