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


export function Register() {
  const Firebase = useFirebase();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 4 ? "Password must be 4 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSignUp = async () => {
    const { email, password } = form.values;
    const response = await Firebase.signUp(email, password);
    console.log(response);
  };

  return (
    <Flex justify="center" align="center" w="100%" h="90vh">
      <Paper radius="md" sx={{ width: "50%" }} shadow="xl" withBorder p="md">
        <Text size="lg" weight={500}>
          Welcome to Bookify
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton/>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit(() => {
            handleSignUp();
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
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm Password"
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs" onClick={() => navigate("/login")}>
              Already have an account? Login
            </Anchor>
            <Button type="submit">SignUp</Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
