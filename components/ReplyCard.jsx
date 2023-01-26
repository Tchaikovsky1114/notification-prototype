import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import useSeparateTime from '../hooks/useSeparateTime';

const ReplyCard = ({
  createdAt,
  department,
  email,
  id,
  name,
  position,
  reply,
}) => {
  const { createdTime } = useSeparateTime(createdAt);
  const { width } = useWindowDimensions()  
  return (
    <View style={{borderWidth: 1, borderColor: '#dde', borderRadius: 4}}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: '#f6f9ff',
            paddingHorizontal: 8,
          }}
        >
          <Text>{reply}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.3}
          style={{
            borderLeftWidth: 1,
            borderLeftColor: '#ddd',
            paddingHorizontal: 8,
          }}
          
        >
          <Text>
            {name} {position}
          </Text>
          <Text style={{ textAlign: 'right', color: '#2d63e2' }}>
            {department}부서
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReplyCard;
