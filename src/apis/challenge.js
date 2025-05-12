// Add a new challenge
export const addChallengeApi = async (bodyObject, jwtToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${jwtToken}`
    },
    body: JSON.stringify(bodyObject),
  };
  try {
    debugger
    const response = await fetch(`${DOMAIN}/api/v1/challanges`, requestOptions);
    const result = await response.json();
    debugger
    if (response.ok) {
      return [result, ''];
    } else {
      return ['', result.status?.message || 'Unknown server error'];
    }
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};
import { DOMAIN } from "./config";

// Fetch all challenges
export const fetchChallengesApi = async () => {
  try {
    const response = await fetch(`${DOMAIN}/api/v1/challanges`);
    const result = await response.json();
    if (response.ok) {
      return [result, ''];
    } else {
      return ['', result.status?.message || 'Unknown server error'];
    }
  } catch (error) {
    return ['', `Server Down: ${error}`];
  }
};
