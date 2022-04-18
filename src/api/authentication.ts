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

export type ErrorInfo = {
  error: string;
  status: Number;
}

export const registerPatient = async (user_data): Promise<AuthData> => {
  const user = await client
    .post("users/patients/register", user_data)
    .then((res) => {
      const _data: AuthData = res.data;
      return _data;
    })
    .catch((error) => {
      if(error.response){
        console.log(error.response.data);
      } else if(error.request){
        console.log(error.request);
      } else {
        console.log('Error', error.messsage)
      }
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
      if(error.response){
        console.log(error.response.data);
      } else if(error.request){
        console.log(error.request);
      } else {
        console.log('Error', error.messsage)
      }
      return null;
    });
  return user;
};
