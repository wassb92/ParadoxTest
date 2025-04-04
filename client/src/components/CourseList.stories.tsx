import { Meta, StoryFn } from "@storybook/react";
import CourseList from "./CourseList";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/CourseList",
  component: CourseList,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta<typeof CourseList>;

const Template: StoryFn<typeof CourseList> = (args) => <CourseList {...args} />;

export const Default = Template.bind({});
Default.args = {};
