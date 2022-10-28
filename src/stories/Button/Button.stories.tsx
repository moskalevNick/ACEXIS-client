import { Meta, Story } from '@storybook/react';

import { Button, ButtonProps } from '../../components/Button/Button';
import React from 'react';
import { CrossIcon } from '../../components/Icons/CrossIcon';
import { PlusIcon } from '../../components/Icons/PlusIcon';

import styles from './Button.module.css';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    children: { type: 'React.ReactNode' },
    outlined: { type: 'boolean' },
    orange: { type: 'boolean' },
    disabled: { type: 'boolean' },
    beforeIcon: { type: 'React.ReactNode' },
    onClick: { type: 'function' },
    className: { type: 'string' },
  },
} as Meta;

const Cross = () => <CrossIcon />;
const Plus = () => <PlusIcon />;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Login = Template.bind({});
Login.args = {
  ...Login.args,
  children: 'Log in',
  className: styles.login,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Disabled.args,
  children: 'Log in',
  disabled: true,
  className: styles.login,
};

export const Cancel = Template.bind({});
Cancel.args = {
  ...Cancel.args,
  outlined: true,
  children: 'Cancel',
  className: styles.cancel,
};

export const Delete = Template.bind({});
Delete.args = {
  ...Delete.args,
  outlined: true,
  orange: true,
  children: 'Delete',
  className: styles.delete,
  beforeIcon: <Cross />,
};

export const Add = Template.bind({});
Add.args = {
  ...Add.args,
  beforeIcon: <Plus />,
  className: styles.plus,
};
