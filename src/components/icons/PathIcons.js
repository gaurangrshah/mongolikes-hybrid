import { Box } from "@chakra-ui/react";

export const PathIcon = ({
  icon = {},
  size = "1.25rem",
  // color = "inherit",
  ...rest
}) => {
  const Icon = ({ size, ...rest }) => {
    const { d, viewBox, ...restIcon } = icon;
    return (
      <>
        <Box
          as='svg'
          viewBox={viewBox}
          width={size}
          height={size}
          {...rest}
          {...restIcon}
        >
          {/*
        NOTE:  svgs might have multiple paths in order to compose the icon, we'll render each one if we encounter an array
        */}
          {Array.isArray(icon.d) ? (
            d.map((d, i) => <path key={i} d={d} />)
          ) : (
            <path d={d} />
          )}
        </Box>
      </>
    );
  };

  return <Icon size={size} {...rest} />;
};
