import React, { Component } from 'react';

// 只做一件事，把`WrappedComponent`回传个`getInstance`（如果有的话）
export default (WrappedComponent) => {
  return class withRef extends Component {
    static displayName = `withRef(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    render() {
      // 这里重新定义一个props的原因是:
      // 你直接去修改this.props.ref在react开发模式下会报错，不允许你去修改
      const props = {
        ...this.props,
      };
      const { getInstance } = props;
      if (typeof getInstance === 'function') {
        // 在这里把getInstance赋值给ref，
        // 传给`WrappedComponent`，这样就getInstance能获取到`WrappedComponent`实例
        props.ref = getInstance;
      }
      return (
        <WrappedComponent {...props} />
      );
    }
  };
};

// 作者：牧羊童鞋
// 链接：https://www.jianshu.com/p/2609fd3777cd
// 來源：简书
// 简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。