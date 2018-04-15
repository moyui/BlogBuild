import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group'

import { throttle } from '../../constant/throttle.js';

class NavBar extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      switchHide: false
    };

    this.handleWheel = throttle(this.handleWheel.bind(this), 1000/60);
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handleWheel);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextState.switchHide === this.state.switchHide);
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleWheel);
  }

  handleWheel(event) {
    const state = event.deltaY > 0 ? true : false;
    this.setState({
      switchHide: state
    });
  }

  render() {
    return (
      <CSSTransitionGroup 
        transitionName="slide"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}>
        {
          (this.state.switchHide) ? null : 
          (
            <nav className="nav-bar">
              <ul className="nav-ul">
                <li><Link to="/home">首页</Link></li>
                <li><Link to="/archive">归档</Link></li>
              </ul>
            </nav>
          )
        }
      </CSSTransitionGroup>
    )
  }
}

export default NavBar;