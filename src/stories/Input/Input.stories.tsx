import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Input, InputProps } from '../../components/Input/Input';
import styles from './Input.module.css';

export default {
  title: 'Components/Input',
  component: Input,
  className: { type: 'string' },
  parameters: {
    placeholder: { type: 'string' },
    disabled: { type: 'boolean' },
    hasError: { type: 'boolean' },
    autofocus: { type: 'boolean' },
    focused: { type: 'boolean' },
    name: { type: 'string' },
    type: { type: 'string' },
    value: { type: 'any' },
    ref: { type: 'any' },
  },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Base = Template.bind({});

Base.args = {
  placeholder: 'base',
  type: 'text',
  className: styles.input,
};

export const autoFocus = Template.bind({});

autoFocus.args = {
  placeholder: 'autofocus',
  autoFocus: true,
  type: 'text',
  className: styles.input,
};

export const error = Template.bind({});

error.args = {
  placeholder: 'someemail@mail.com',
  hasError: true,
  type: 'text',
  className: styles.error,
};

export const disable = Template.bind({});

disable.args = {
  placeholder: 'disable',
  disabled: true,
  className: styles.disable,
};
