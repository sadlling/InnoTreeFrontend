import api from "../api/api";

export const getAllToys = async () => {
  const response = await api.get("/Toys/GetAll");
  return response;
};

export const AddToy = async (newToy) => {
  // console.log(newToy.name + " значение в сервисе");
  // const toyData = {
  //   name: newToy.name,
  //   message: newToy.message,
  //   image: newToy.image,
  //   x: newToy.x,
  //   y: newToy.y,
  //   // Add any other required fields here
  // };

  const response = await api.post("/Toys/Create", { toy: newToy });
  return response;
};
