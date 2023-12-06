import { FacebookOutlined, LinkOutlined } from '@ant-design/icons';

import { FC, HTMLAttributes } from 'react';

import { DropDownProps, Dropdown, MenuProps, message } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <span
        onClick={() => {
          message.success('Copy link success!');
        }}
      >
        <LinkOutlined className="mr-3 text-base text-primary" />
        Copy link
      </span>
    ),
  },
  {
    key: '2',
    label: (
      <span
        onClick={() => {
          message.success('Share link success!');
        }}
      >
        <FacebookOutlined className="mr-3 text-base text-primary" />
        Share facebook
      </span>
    ),
  },
];

interface IDropDownProps extends HTMLAttributes<HTMLDivElement>, DropDownProps {}

export const DropDown: FC<IDropDownProps> = ({ children, ...props }) => {
  return (
    <Dropdown key="share" menu={{ items }} {...props}>
      {children}
    </Dropdown>
  );
};
