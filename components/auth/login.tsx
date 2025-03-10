import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../ui/button";
import Input from "../ui/input";
import Password from "../ui/password-input";
import { useState } from "react";
import useAuth from "@/hook/useAuth";
import { layout } from "@/theme";

type RegisterType = {
  username: string;
  password: string;
};

const EmailLogin: React.FC = () => {
  const { login } = useAuth();

  const [validateOnChange, setValidateOnChange] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Zorunlu alan 🙃"),
    password: Yup.string().required("Zorunlu alan 🙃"),
  });
  const initialValues: RegisterType = {
    username: "",
    password: "",
  };
  const handleFormSubmit = async (submit: () => void) => {
    setValidateOnChange(true);
    submit();
  };
  return (
    <View style={[layout.container, styles.container]}>
      <Formik
        initialValues={initialValues}
        onSubmit={login}
        validationSchema={validationSchema}
        validateOnChange={validateOnChange}
      >
        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
          <View style={styles.content}>
            <View style={styles.box}>
              <Input
                onChangeText={handleChange("username")}
                value={values.username}
                error={errors.username}
                placeholder="Kullanıcı Adı"
                keyboardType="email-address"
                autoCapitalize="none"
                isTransparent
              />
              <Password
                onChangeText={handleChange("password")}
                value={values.password}
                error={errors.password}
                placeholder="Şifre"
                isTransparent
              />
            </View>
            <View style={styles.box}>
              <Button
                onPress={() => handleFormSubmit(handleSubmit)}
                label="Giriş Yap"
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EmailLogin;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    borderTopEndRadius: 36,
    borderTopStartRadius: 36,
  },
  content: {
    gap: 30,
  },
  box: {
    gap: 12,
  },
});
