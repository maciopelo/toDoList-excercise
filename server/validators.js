export const validateTask = (task) => {
  if (Object.keys(task).length === 0) {
    return `Missing property 'content'`;
  }

  for (const key of Object.keys(task)) {
    if (key !== "content") {
      return `Property '${key}' is not allowed`;
    }
  }

  if (typeof task.content !== "string") {
    return `Property 'content' should be of type 'string'`;
  }

  if (task.content.length > 35) {
    return `Property 'content' must have up to 35 characters length`;
  }
};
