import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ArticleItems } from './articleItems.js';

const ArticleList = ({articleItemsData, articleItemsStatus}) => {
  return (
    <React.Fragment>
      {
        articleItemsData.map((item) => {
          const status = item.status;//读取当前文章状态
          switch (status) {//根据状态渲染不同文章段
            case 'loading': {
              return (<div>加载进行中啊喵~</div>);
            }
            case 'success': {
              return (
                <ArticleItems key={item.id} id={item.id} {...item} />
              );
            }
            case 'failure': {
              return (<div>加载失败啊喵!</div>);
            }
            default: {
              throw new Error('unexpected status ' + status);
            }
          }
        })
      }
    </React.Fragment>
  );
};

ArticleList.propTypes = {
  articleItemsData: PropTypes.array.isRequired
};

export default ArticleList;