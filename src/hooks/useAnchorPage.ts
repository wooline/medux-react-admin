import {useEffect} from 'react';

let routeFlag = '';
let routeTimer = 0;

const scrollToAnchor = (flag: string) => {
  routeFlag = flag;
  if (routeTimer) {
    clearTimeout(routeTimer);
    routeTimer = 0;
  }
  routeTimer = setTimeout(() => {
    routeTimer = 0;
    const anchor = routeFlag.substr(1);
    const anchorTarget = anchor ? document.getElementById(anchor) : null;
    if (anchorTarget) {
      anchorTarget.scrollIntoView();
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, 100);
};

export default function Hooks(hash: string, history: {listen: (handler: (location: any) => void) => () => void}) {
  useEffect(() => {
    scrollToAnchor(hash);
    const unlisten = history.listen((location) => {
      scrollToAnchor(location.hash);
    });
    return () => {
      unlisten();
      if (routeTimer) {
        clearTimeout(routeTimer);
        routeTimer = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
