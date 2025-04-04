import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Home from "./Home";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Pages/Home",
  component: Home,
} as Meta<typeof Home>;

const Template: StoryFn<typeof Home> = (args: JSX.IntrinsicAttributes) => (
  <Home {...args} />
);

export const Default = Template.bind({});
Default.args = {};
