import UserService from "../services/UserService";

export function userLoader({ params }) {
  return UserService.get(params.userId);
}