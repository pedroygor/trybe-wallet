export const GET_EMAIL = 'GET_EMAIL';

export function getEmailActions(payload) {
  return {
    type: GET_EMAIL,
    payload,
  };
}
