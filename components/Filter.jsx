import { Button, Stack } from "@chakra-ui/react";

const tags = [
  "All",
  "Software Engineering",
  "Managerial Finance",
  "Marketing",
  "Design",
  "Finance",
];

const Filter = ({ activeTag, setActiveTag }) => {
  return (
    <Stack
      direction="row"
      spacing={4}
      mt={10}
      mb={10}
      justifyContent="center"
      flexWrap={"wrap"}
      rowGap={4}
    >
      {tags.map((tag) => (
        <Button
          key={tag}
          colorScheme={activeTag === tag ? "blue" : "gray"}
          variant="solid"
          onClick={() => setActiveTag(tag)}
        >
          {tag}
        </Button>
      ))}
    </Stack>
  );
};

export default Filter;
