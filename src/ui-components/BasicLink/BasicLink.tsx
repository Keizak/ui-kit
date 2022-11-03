import React, { CSSProperties } from 'react';

export type BasicLinkPropsType = {
  path: string;
  style?: CSSProperties;
  text?: string;
};

export const BasicLink = (props: BasicLinkPropsType) => {
  return (
    <a href={props.path} target={'_blank'} rel="noreferrer" style={props.style}>
      {props.text ? props.text : props.path}
    </a>
  );
};
