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
    if (response.ok) {
      const result = await response.json();
      return [result, ''];      
    }
    return ['', 'Server side Error']
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};