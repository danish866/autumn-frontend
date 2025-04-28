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
    const response = await fetch(`${DOMAIN}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
    const result = await response.json();
    if (response.ok) {
      return [response, ''];      
    } else{
      return ['', result.status?.message || 'Unknown server error'];
    }
    
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};

export const loginApi  = async (bodyObject) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };
  
  try {
    const response = await fetch(`${DOMAIN}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
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