import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ArticleItems } from './articleItems.js';

const ArticleList = ({articleInfo, articleStatus}) => {
  return (
    <React.Fragment>
      {
        articleInfo.map((item) => {
          const status = item.status;//读取当前文章状态
          switch (status) {//根据状态渲染不同文章段
            case 'loading': {
              return (<div>{item.show}</div>);
            }
            case 'success': {
              return (
                <ArticleItems key={item.id} id={item.id} {...item} />
              );
            }
            case 'failure': {
              return (<div>{item.show}</div>);
            }
            default: {
              throw new Error('unexpected status ' + status);
            }
          }
        })
      }
      {
        articleStatus === 'Success' ?
        (<Route path={`${articleInfo.url}/articels`} />) : null
      }
    </React.Fragment>
  );
};

ArticleList.propTypes = {
  articleInfo: PropTypes.array.isRequired
};

export default ArticleList