// src/components/Profile.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Profile from "./Profile";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Exemple d'utilisateur
const dummyUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "student",
  progress: 50,
  enrolledCourses: [15, 16, 17],
};

export default {
  title: "Pages/Profile",
  component: Profile,
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          authToken: "dummy-token",
          user: dummyUser,
          login: () => {},
          logout: () => {},
        }}
      >
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AuthContext.Provider>
    ),
  ],
} as Meta<typeof Profile>;

const Template: StoryFn<typeof Profile> = (args) => <Profile {...args} />;

export const Default = Template.bind({});
Default.args = {};
