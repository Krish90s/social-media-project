import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/posts";

export function listNewsFeed(userId) {
  return http.get(apiEndpoint + "/feed/" + userId);
}

export function listByUser(userId) {
  return http.get(apiEndpoint + "/by/" + userId);
}

export function createPost(postData, userId) {
  return http.post(apiEndpoint + "/new/" + userId, postData);
}

export function removePost(postId) {
  return http.delete(apiEndpoint + "/" + postId);
}

export function like(body) {
  return http.put(apiEndpoint + "/like", body);
}

export function unlike(body) {
  return http.put(apiEndpoint + "/unlike", body);
}

export function commentPost(comment) {
  return http.put(apiEndpoint + "/comment", comment);
}

export function uncommentPost(comment) {
  return http.put(apiEndpoint + "/uncomment", comment);
}
