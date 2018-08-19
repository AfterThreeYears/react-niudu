import qs from 'qs';

/**
 * 点击列表保存当前的位置
 */
export function savePositionIndex(props, index = 0) {
  const { location, history } = props;
  const { tabIndex = 0 } = qs.parse(location.search.substr(1));
  const search = qs.stringify({ tabIndex, index });
  history.push(`${location.pathname}?${search}`);
}

/**
 * 从详情页回列表页需要把url中index去掉
 */
export function clearPositionIndex(props) {
  const { location, history } = props;
  const { tabIndex = 0 } = qs.parse(location.search.substr(1));
  const search = qs.stringify({ tabIndex });
  history.push(`${location.pathname}?${search}`);
}
