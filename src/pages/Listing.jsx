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
  FileInput,
  NumberInput,
} from "@mantine/core";
import { GoogleButton } from "../components/SocialButtons";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

export function Listing() {
  const Firebase = useFirebase();
  const navigate = useNavigate();
  const [LoadingBtn, setLoadingBtn] = useState(false);

  const [Image, setImage] = useState("");
  const [Price, setPrice] = useState("");
  const [Name, setName] = useState("");
  const [ISBN, setISBN] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      image: "",
      ISBN: "",
    },
  });

  const handleBooks = async () => {
    setLoadingBtn(true);
    // console.log(form.values);
    try {
      const response = await Firebase.addBook(form.values);
      console.log(response);
        showNotification({
          title: 'Book Added',
          icon : <IconCheck/>,
          color : "teal",
          message: 'Please Check Your Dashboard 👌',
        })
    } catch (error) {
      console.log(error);
      showNotification({
        title: 'Something Went Wrong',
        icon : <IconX/>,
        color : "red",
        message: 'Please Try Again Later 👌',
      })
    }
    setLoadingBtn(false);
  };
  return (
    <>
      <NavBar />
      <Flex justify="center" align="center" w="100%" h="80vh">
        <Paper radius="md" sx={{ width: "50%" }} shadow="xl" withBorder p="md">
          <Text size="lg" weight={500}>
            Welcome back to Bookify
          </Text>

          <form
            onSubmit={form.onSubmit(() => {
              handleBooks();
            })}
          >
            <Stack>
              <TextInput
                required
                label="Name"
                value={Name}
                onChange={(v) => (
                  setName(v.target.value), form.setFieldValue("name", v.target.value)
                )}
              />

              <NumberInput
                label="ISBN Number"
                value={ISBN}
                onChange={(v) => (
                  setISBN(v), form.setFieldValue("ISBN", v)
                )}
              />

              <NumberInput
                label="Price"
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "$ "
                }
                value={Price}
                onChange={(v) => (
                  setPrice(v), form.setFieldValue("price", v)
                )}
              />

              <FileInput
                required
                label="Upload files"
                placeholder="Upload files"
                accept="image/png,image/jpeg"
                value={Image}
                onChange={(v) => (
                  setImage(v), form.setFieldValue("image", v)
                )}
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Button color="red" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button color="green" type="submit" loading={LoadingBtn}>
                Add
              </Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </>
  );
}
