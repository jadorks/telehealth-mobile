import { client } from "./utilities/client";

type PatientInfo = {
  pk: Number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type AuthData = {
  access_token: string;
  refresh_token: string;
  user: PatientInfo;
};

export const registerPatient = async (user_data): Promise<AuthData> => {
  const user = await client
    .post("users/patients/register", user_data)
    .then((res) => {
      const _data: AuthData = res.data;
      return _data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });

  return user;
};

export const loginPatient = async (user_data): Promise<AuthData> => {
  const user = await client
    .post("users/patients/login", user_data)
    .then((res) => {
      const _data: AuthData = res.data;
      return _data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
  return user;
};
