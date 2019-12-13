import React from 'react';

interface Props {
  href: string;
}

class Component extends React.PureComponent<Props> {
  onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const href = (event.target as HTMLAnchorElement).getAttribute('href')!.replace('${listKey}', Date.now() + '');
    historyActions.push(href);
  };
  public render() {
    const {href, children} = this.props;
    return (
      <a href={href} onClick={this.onClick}>
        {children}
      </a>
    );
  }
}

export default Component;
