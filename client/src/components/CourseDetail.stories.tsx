import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CourseDetail from "./CourseDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

axios.get = async <T = any, R = AxiosResponse<T>>(url: string): Promise<R> => {
  if (url === "http://localhost:5000/courses/1") {
    return Promise.resolve({
      data: {
        id: 1,
        title: "Cours de Test",
        description: "Ceci est un cours de test pour Storybook.",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        progress: 56,
      },
    } as unknown as R);
  }
  return Promise.reject(new Error("Not Found"));
};

export default {
  title: "Components/CourseDetail",
  component: CourseDetail,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/courses/1"]}>
        <Routes>
          <Route path="/courses/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} as Meta<typeof CourseDetail>;

export const Default: StoryObj<typeof CourseDetail> = {
  args: {},
};
