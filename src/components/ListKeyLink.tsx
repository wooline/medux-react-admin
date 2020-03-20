import React, {ReactNode} from 'react';

interface Props {
  children?: ReactNode;
  href: string;
}
const Component: React.FC<Props> = ({href, children}) => {
  const onClick = React.useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const href = (event.target as HTMLAnchorElement).getAttribute('href')!.replace('${listKey}', Date.now() + '');
    historyActions.push(href);
  }, []);

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default React.memo(Component);
