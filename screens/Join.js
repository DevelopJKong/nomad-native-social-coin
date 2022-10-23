import React, { useRef, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import { ActivityIndicator, Alert } from 'react-native';

const Container = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };

  const onSubmitPasswordEditing = async () => {
    if (email === '' || password === '') {
      return Alert.alert('Fill in the form');
    }
    if (loading) {
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        'tbaram10@naver.com',
        '123456',
      );
      console.log(userCredential);
    } catch (error) {
      switch (error.code) {
        case 'auth/weak-password':
          {
            Alert.alert('Write a stronger password!');
          }
          break;

        default:
          break;
      }
    }
  };
  return (
    <Container>
      <TextInput
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        value={email}
        returnKeyType='next'
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor={'rgba(255,255,255,0.7)'}
      />
      <TextInput
        ref={passwordInput}
        placeholder='Password'
        secureTextEntry
        value={password}
        returnKeyType='done'
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={(text) => onSubmitEmailEditing(text)}
        placeholderTextColor={'rgba(255,255,255,0.7)'}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? <ActivityIndicator color='white' /> : <BtnText>Create Account</BtnText>}
      </Btn>
    </Container>
  );
};

export default Join;
