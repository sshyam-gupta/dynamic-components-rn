import React from 'react';
import styled from 'styled-components/native';
import {Keyboard, KeyboardEvent, Dimensions, Animated} from 'react-native';
import {isAndroid} from '../../lib/common';

const Scene = styled.View`
  position: absolute;
  padding: ${({theme}) => `0 ${theme.screenMargin}px`};
  left: 0;
  right: 0;
  align-self: stretch;
  z-index: 100;
`;

const AnimatedScene = Animated.createAnimatedComponent(Scene);

interface IFBCProps {
  bottom?: number;
}

interface IFBCState {
  bottom: number;
}

class FloatingButtonContainer extends React.Component<IFBCProps, IFBCState> {
  private animatedValue: any;
  private _isMounted: boolean = false;
  private _iskeyboardVisible: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {bottom: props.bottom || 30};
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this._isMounted = true;
    this.animate();

    Keyboard.addListener('keyboardDidShow', this._keyBoardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyBoardDidHide);
  }

  componentWillUnmount() {
    this._isMounted = false;

    Keyboard.removeListener('keyboardDidShow', this._keyBoardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyBoardDidHide);
  }

  _keyBoardDidShow = (e: KeyboardEvent) => {
    if (!this._isMounted) {
      return;
    }

    const navigationBarHeight = isAndroid
      ? Dimensions.get('screen').height - Dimensions.get('window').height
      : 20;

    const bottom = e.endCoordinates.height + navigationBarHeight;

    this.setState({bottom}, () => {
      if (!this._iskeyboardVisible) {
        this.animate();
      }
    });
    this._iskeyboardVisible = true;
  };

  _keyBoardDidHide = () => {
    if (!this._isMounted) {
      return;
    }
    this._iskeyboardVisible = false;
    this.setState({bottom: 30});
  };

  animate() {
    this.animatedValue.setValue(0);
    Animated.spring(this.animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {bottom: defaultBottom = 30} = this.props;
    const bottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.state.bottom - (100 + defaultBottom),
        this.state.bottom,
      ],
    });

    return (
      <AnimatedScene style={{bottom}}>{this.props.children}</AnimatedScene>
    );
  }
}

export default FloatingButtonContainer;
