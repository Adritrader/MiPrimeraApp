import { TextInput } from 'react-native';

export default function StyledInput({ placeholder, value, onChangeText, keyboardType = "default" }) {
  return (
    <TextInput
      className="border border-gray-300 rounded-lg p-4 mb-3 bg-white shadow-sm"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
}