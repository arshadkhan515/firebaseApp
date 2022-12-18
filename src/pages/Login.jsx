import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
} from "@mantine/core";
import { GoogleButton } from "../components/SocialButtons";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const Firebase = useFirebase();
  const navigate = useNavigate();
  const [LoadingBtn, setLoadingBtn] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 4 ? "Password must be 4 characters" : null,
    },
  });

  const handleSignIn = async () => {
    setLoadingBtn(true);
    const { email, password } = form.values;
    try {
        const response = await Firebase.signIn(email,password)
        console.log(response);   
    } catch (error) {
        console.log(error);
    }
    setLoadingBtn(false);
  };
  return (
    <Flex justify="center" align="center" w="100%" h="90vh">
      <Paper radius="md" sx={{ width: "50%" }} shadow="xl" withBorder p="md">
        <Text size="lg" weight={500}>
          Welcome back to Bookify
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton />
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit(() => {
            handleSignIn();
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />

          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs"  onClick={() => navigate("/register")}>
            You don't have an account?
            </Anchor>
            <Button type="submit" loading={LoadingBtn}>Login</Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
