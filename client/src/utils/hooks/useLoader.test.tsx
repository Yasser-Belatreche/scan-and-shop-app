import {renderHook, act} from '@testing-library/react-hooks';
import {useLoader} from './useLoader';

describe('useLoader hook', () => {
  it('should start with isLoading set to false and the Loader to be null', () => {
    const {result} = renderHook(useLoader);

    expect(result.current.Loader()).toBeNull();
  });

  it('should change the state when calling setLoader and the Loader component should not be null', () => {
    const {result} = renderHook(useLoader);

    act(() => {
      result.current.setLoader(true);
    });
    expect(result.current.Loader()).not.toBeNull();
  });
});
