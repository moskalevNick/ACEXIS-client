import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ToggleSwitch, ToggleSwitchProps } from '../../components/ToggleSwitch/ToggleSwitch';
import styles from './ToggleSwitch.module.css';

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  className: { type: 'string' },
  parameters: {
    name: { type: 'string' },
    checked: { type: 'boolean' },
    value: { type: 'any' },
    disabled: { type: 'boolean' },
    readonly: { type: 'boolean' },
    labels: { type: 'React.ReactNode[]' },
  },
} as Meta;

const Template: Story<ToggleSwitchProps> = (args) => <ToggleSwitch {...args} />;

export const DarkLightLong = Template.bind({});

export const DarkLightShort = Template.bind({});

DarkLightShort.args = {
  size: 'short',
};

export const Lang = Template.bind({});

Lang.args = {
  labels: ['РУС', 'ENG'],
  className: styles.lang,
};
