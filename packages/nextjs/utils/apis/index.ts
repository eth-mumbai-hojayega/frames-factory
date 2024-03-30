import { Frame, Journey } from "~~/types/commontypes";

export const getProductById = async (id: string) => {
  const response = await fetch(`/api/journey/${id}`);
  const product = await response.json();
  return product;
};

export const updateProduct = async (id: string, data: Partial<Journey>) => {
  const response = await fetch(`/api/journey/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const product = await response.json();
  return product;
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`/api/journey/${id}`, {
    method: "DELETE",
  });
  const product = await response.json();
  return product;
};

export const createProduct = async (data: Partial<Journey>) => {
  const response = await fetch(`/api/journey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const product = await response.json();
  return product;
};

export const getAllJourneys = async () => {
  const response = await fetch(`/api/journey`);
  const journeys = await response.json();
  return journeys;
};

export const createFrame = async (data: Partial<Frame>) => {
  const response = await fetch(`/api/frame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const frame = await response.json();
  return frame;
};

export const updateFrame = async (id: string, data: Partial<Frame>) => {
  const response = await fetch(`/api/frame/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const frame = await response.json();
  return frame;
};

export const deleteFrame = async (id: string) => {
  const response = await fetch(`/api/frame/${id}`, {
    method: "DELETE",
  });
  const frame = await response.json();
  return frame;
};

export const getFrameById = async (id: string) => {
  const response = await fetch(`/api/frame/${id}`);
  const frame = await response.json();
  return frame;
};
