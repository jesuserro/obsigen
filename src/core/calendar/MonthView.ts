import { Box, Flex, Text } from '@radix-ui/react';

const MonthCalendar = () => {
  return (
    <Box>
      <Flex align="center" justify="center" gap={1}>
        {/* Render the days */}
        {[...Array(31)].map((_, index) => (
          <Box
            key={index}
            css={{
              width: 60,
              height: 60,
              border: '1px solid gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Render the event icons */}
            <Text>Icon1</Text>
            <Text>Icon2</Text>
            {/* ... */}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default MonthCalendar;
