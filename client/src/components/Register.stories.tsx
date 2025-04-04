import { Meta, StoryObj } from "@storybook/react";
import Register from "./Register";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Pages/Register",
  component: Register,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof Register>;

type Story = StoryObj<typeof Register>;
const Template: Story = {
  render: (args) => <Register {...args} />,
};
export const Default: Story = {
  ...Template,
  args: {
    onRegister: () => {
      console.log("Registered");
    },
  },
};
