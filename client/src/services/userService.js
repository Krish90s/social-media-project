import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export function setupProfile(userData, userId) {
  return http.put(apiEndpoint + "/profile-setup/" + userId, userData);
}

export function findPeople(userId) {
  return http.get(apiEndpoint + "/find-people/" + userId);
}

export function follow(userId, peopleId) {
  const body = {
    userId: userId,
    followId: peopleId,
  };
  return http.put(apiEndpoint + "/follow", body);
}

export function unfollow(userId, peopleId) {
  const body = {
    userId: userId,
    unfollowId: peopleId,
  };
  return http.put(apiEndpoint + "/unfollow", body);
}

export function getUserById(userId) {
  return http.get(apiEndpoint + "/" + userId);
}
