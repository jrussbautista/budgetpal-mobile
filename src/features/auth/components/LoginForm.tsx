import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { login } from '../slice';

import { useAppDispatch } from '@/app/hooks';
import { colors } from '@/theme/colors';

const defaultValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [fields, setFields] = useState(defaultValues);

  const handleChangeText = (value: string, name: string) => {
    setFields({ ...fields, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await dispatch(login(fields));
      unwrapResult(response);
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        label="Email"
        style={styles.textInput}
        value={fields.email}
        onChangeText={(val) => handleChangeText(val, 'email')}
      />
      <TextInput
        label="Password"
        secureTextEntry
        style={styles.textInput}
        value={fields.password}
        onChangeText={(val) => handleChangeText(val, 'password')}
      />
      <Button
        mode="contained"
        labelStyle={styles.btnLabelStyle}
        contentStyle={styles.btnContentStyle}
        style={styles.btnStyle}
        onPress={handleLogin}
      >
        Log In
      </Button>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 20,
    backgroundColor: colors.bg.primary,
  },
  btnContentStyle: {
    height: 50,
  },
  btnLabelStyle: {
    color: '#fff',
  },
  btnStyle: {
    marginTop: 20,
  },
});
