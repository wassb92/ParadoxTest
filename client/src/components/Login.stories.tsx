import { Meta, StoryObj } from "@storybook/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default {
  title: "Pages/Login",
  component: Login,
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          authToken: null,
          user: null,
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
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;
const Template: Story = {
  render: (args) => <Login {...args} />,
};
export const Default: Story = {
  ...Template,
  args: {
    onLogin: () => {
      console.log("Logged in");
    },
  },
};
