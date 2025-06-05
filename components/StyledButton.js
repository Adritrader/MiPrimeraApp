import { Pressable, Text } from 'react-native';

export default function StyledButton({ title, onPress, color = "bg-blue-600" }) {
  return (
    <Pressable
      className={`${color} px-5 py-3 rounded-lg shadow active:opacity-80`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-bold">{title}</Text>
    </Pressable>
  );
}