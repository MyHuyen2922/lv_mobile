import React from 'react';
import NumberFormat from 'react-number-format';
import { Text } from 'react-native';

export function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text>{formattedValue}</Text>}
    />
  );
}