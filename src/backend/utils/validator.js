const validators = {
  createPost: ["title", "body", "slug", "author"],
};

export function validator(action = "", fields = {}) {
  const validation = Object.keys(fields);
  return validators[action].every((check) => validation.includes(check));
}
