import { DOMAIN } from "./config";

export const registerApi  = async (bodyObject) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };
  
  try {
    const response = await fetch(`${DOMAIN}/users`, requestOptions);
    const result = await response.json();
    if (response.ok) {
      return [result, ''];      
    } else{
      return ['', result.status?.message || 'Unknown server error'];
    }
    
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};

export const loginApi  = async (bodyObject) => {
  console.log(bodyObject);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };
  
  try {
    const response = await fetch(`${DOMAIN}/users/login`, requestOptions)
    const result = await response.json();
    if (response.ok) {
      return [response, ''];      
    }
    else{
      return ['', result.status?.message || 'Unknown server error'];
    }
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};


export const logoutApi  = async (jwtToken) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": jwtToken
    }
  };
  
  try {
    const response = await fetch(`${DOMAIN}/users/logout`, requestOptions)
    const result = await response.json();
    if (response.ok) {
      return [response, ''];      
    }
    else{
      return ['', result.status?.message || 'Unknown server error'];
    }
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};