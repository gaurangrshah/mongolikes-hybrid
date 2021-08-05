// @link: https://twitter.com/NikolovLazar/status/1401611595743178760?s=20
import NextImage from "next/image";
import { chakra } from "@chakra-ui/react";

const Img = chakra(NextImage, {
  shouldForwardProp: (prop) => {
    return [
      "width",
      "height",
      "src",
      "alt",
      "layout",
      "placeholder",
      "loading",
    ].includes(prop);
  },
});

export const Image = (props) => {
  return <Img {...props} pos='relative' />;
};
