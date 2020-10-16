import {useCallback} from 'react';

export default function Hooks(isPop: boolean, dispatch: (action: any) => void) {
  const handleUserHome = useCallback(() => {
    if (isPop) {
      dispatch(actions.app.closesLoginOrRegisterPop());
    }
    historyActions.push(metaKeys.UserHomePathname);
  }, [dispatch, isPop]);

  const handleLogout = useCallback(() => {
    dispatch(actions.app.logout());
  }, [dispatch]);

  const handleRegister = useCallback(() => {
    if (isPop) {
      dispatch(actions.app.openLoginOrRegisterPop('register'));
    } else {
      historyActions.push(metaKeys.RegisterPathname);
    }
  }, [dispatch, isPop]);

  const handleLogin = useCallback(() => {
    if (isPop) {
      dispatch(actions.app.openLoginOrRegisterPop('login'));
    } else {
      historyActions.push(metaKeys.LoginPathname);
    }
  }, [dispatch, isPop]);

  return {handleUserHome, handleLogout, handleRegister, handleLogin};
}
