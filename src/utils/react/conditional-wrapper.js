// @SCOPE: conditionally wrap children with a wrapper element based on a given condition
// @link: https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
export function ConditionalWrapper({ condition, wrapper, children }) {
  return condition ? wrapper(children) : children;
}
