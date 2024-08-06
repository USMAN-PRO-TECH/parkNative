import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik,  FormikProps } from "formik";
import * as Yup from "yup";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../db/firebaseConfig";
import { useNavigation } from '@react-navigation/native';


interface LoginFormValues {
  email: string;
  password: string;
}
const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("User logged in successfully");
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      setSubmitting(false);
  
      if (error.code === 'auth/user-not-found') {
        alert("No user found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        alert("Incorrect password. Please try again.");
      } else if (error.code === 'auth/network-request-failed') {
        alert("Network error. Please check your connection and try again.");
      } else if (error.code === 'auth/invalid-credential') {
        alert("invalid-credential.Email Or Password Wrong");
      }else {
        console.error("Login error", error);
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Sign in now</Text>
        <Text style={styles.subheading}>
          Please sign in to continue our app
        </Text>
      </View>

      <View>
        <Formik<LoginFormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }: FormikProps<LoginFormValues>) => (
            <View>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={!passwordVisible}
                  style={styles.inputField}
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#888"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity
                onPress={handleSubmit as any}
                style={styles.button}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign in</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.account}>
                  Don’t have an account?
                  <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('SignUp')}>SignUp</Text>
                </Text>
              </TouchableOpacity>
              <Text style={styles.connect}>Or connect</Text>
            </View>
          )}
        </Formik>
              <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" size={60} color="orange" />
      </TouchableOpacity>
      </View>

 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    color: "#333",
    fontWeight: "600",
  },
  subheading: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    color: "#7D848D",
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 300,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0D6EFD",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#0D6EFD",
    fontSize: 16,
    marginLeft: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
  },
  account: {
    fontFamily: "SF UI Display",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "center",
    color: "#707B81",
  },
  connect: {
    fontFamily: "SF UI Display",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "center",
    color: "#707B81",
    marginTop: 30,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    // backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop:10,
    borderRadius: 8,
  },
  googleButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;