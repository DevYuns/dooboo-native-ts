import {
  RenderAPI,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Intro from '../Intro';
import {ReactElement} from 'react';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Intro] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Intro {...props} />);
    testingLib = render(component);
  });

  afterEach(cleanup);

  it('should render outer component and snapshot matches', () => {
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('should render [Dark] theme', () => {
    component = createTestElement(<Intro {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('should render [isLoading] status', () => {
    props = createTestProps({
      isLoading: true,
    });

    component = createTestElement(<Intro {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('should render [isDisabled] status', () => {
    props = createTestProps({
      isDisabled: true,
    });

    component = createTestElement(<Intro {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[Intro] Interaction', () => {
  afterEach(cleanup);

  it('should login when button has clicked', () => {
    testingLib = render(component);

    fireEvent.press(testingLib.getByTestId('btn-login'));

    jest.runAllTimers();

    expect(testingLib.toJSON()).toMatchSnapshot();
  });

  it('should navigate when button has clicked', () => {
    testingLib = render(component);

    fireEvent.press(testingLib.getByTestId('btn-navigate'));

    expect(props.navigation.navigate).toHaveBeenCalledWith('Temp', {
      param: 'GO BACK',
    });
  });

  it('should change theme when button has clicked', () => {
    testingLib = render(component);

    fireEvent.press(testingLib.getByTestId('btn-theme'));
  });
});
