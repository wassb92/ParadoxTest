import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CourseList from "./CourseList";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, IAuthContext, IUser } from "../context/AuthContext";

const dummyUser: IUser = {
  id: 1,
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  role: "student",
  progress: 50,
  enrolledCourses: [1, 2, 3],
  subscriptionType: null,
  stripeSubscriptionId: null,
  stripeCustomerId: "",
};

const dummyAuthContextValue: IAuthContext = {
  authToken: "dummy-token",
  user: dummyUser,
  login: () => {},
  logout: () => {},
};

export default {
  title: "Components/CourseList",
  component: CourseList,
  decorators: [
    (Story) => (
      <AuthContext.Provider value={dummyAuthContextValue}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </AuthContext.Provider>
    ),
  ],
} as Meta<typeof CourseList>;

const Template: StoryFn<typeof CourseList> = (args) => <CourseList {...args} />;

export const Default = Template.bind({});
Default.args = {};
