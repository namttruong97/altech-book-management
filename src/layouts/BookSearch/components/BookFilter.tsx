import { FC, useState } from 'react';

import { Switch } from 'antd';

interface IBookFilterProps {
  onFilter: (checked: boolean) => void;
}

export const BookFilter: FC<IBookFilterProps> = ({ onFilter }) => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = () => {
    setChecked(!checked);
    onFilter(!checked);
  };

  return (
    <div className="com__BookFilter mb-2 flex justify-end items-center">
      <span className="mr-2">Have French version:</span>
      <Switch size="small" onChange={handleOnChange} checked={checked} />
    </div>
  );
};
