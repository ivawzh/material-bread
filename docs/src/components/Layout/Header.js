import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Ripple } from '../../../../src';
import github from '../../assets/github.svg';
import githubWhite from '../../assets/github--white.svg';
import { Appbar } from '../../../../src';
import MediaQuery from 'react-responsive';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object,
    handleDrawerToggle: PropTypes.func,
    isTemporary: PropTypes.bool,
  };

  state = {
    backgroundOverride: false,
    isMobile: false,
  };

  componentDidMount() {
    const location = window && window.location;
    const pathName = location.pathname;
    if (pathName == '/') {
      this.setState({ backgroundOverride: true });
    }

    const mediaQuery = window.matchMedia('(min-width: 1000px)');

    if (mediaQuery.matches) {
      this.setState({ isMobile: false });
    } else {
      this.setState({ isMobile: true });
    }
    mediaQuery.addListener(mq => {
      if (mq.matches) {
        this.setState({ isMobile: false });
      } else {
        this.setState({ isMobile: true });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const location = window && window.location;
    const pathName = location.pathname;

    if (!prevState.backgroundOverride && pathName == '/') {
      this.setState({ backgroundOverride: true });
    } else if (prevState.backgroundOverride && pathName !== '/') {
      this.setState({ backgroundOverride: false });
    }
  }

  render() {
    const { handleDrawerToggle, isTemporary } = this.props;
    const { backgroundOverride, isMobile } = this.state;

    let backgroundColor = isTemporary
      ? 'linear-gradient(176deg, rgb(5, 2, 65) 0%, rgb(1, 1, 31) 100%)'
      : 'transparent';

    backgroundColor =
      backgroundOverride && !isMobile ? 'transparent' : backgroundColor;

    return (
      <div>
        <Appbar
          position={'fixed'}
          color={backgroundColor}
          style={{
            boxShadow: 'none',
            zIndex: 10,
            paddingHorizontal: 34,
          }}
          navigation={
            <IconButton
              color={backgroundOverride || isTemporary ? 'white' : '#263238'}
              size={28}
              name={'menu'}
              onPress={handleDrawerToggle}
            />
          }
          actionItems={[
            <a
              key={1}
              href={'https://github.com/codypearce/material-bread'}
              style={{ color: 'black' }}>
              <Ripple
                rippleContainerBorderRadius={100}
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MediaQuery maxWidth={1000}>
                  {backgroundOverride && (
                    <img style={{ width: 28, height: 28 }} src={githubWhite} />
                  )}
                </MediaQuery>

                <MediaQuery minWidth={1000}>
                  {backgroundOverride && (
                    <img style={{ width: 28, height: 28 }} src={github} />
                  )}
                </MediaQuery>

                <MediaQuery maxWidth={1180}>
                  {isTemporary && !backgroundOverride && (
                    <img style={{ width: 28, height: 28 }} src={githubWhite} />
                  )}
                </MediaQuery>

                {!backgroundOverride && !isTemporary && (
                  <img style={{ width: 28, height: 28 }} src={github} />
                )}
              </Ripple>
            </a>,
          ]}
        />
      </div>
    );
  }
}

export default Header;
