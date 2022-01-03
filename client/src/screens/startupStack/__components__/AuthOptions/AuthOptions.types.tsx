import {MainStackNavigationProp} from '../../../MainStack.types';

export interface Props extends MainStackNavigationProp<'StartupStack'> {
  variant: 'Login' | 'Signup';
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
