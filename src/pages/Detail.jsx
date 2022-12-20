import {
  Avatar,
  Button,
  Flex,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Icon123, IconCheck } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Detail = () => {
  const { bookId } = useParams();
  const firebase = useFirebase();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoadingOrdered, setIsLoadingOrdered] = useState(false);
  const getBook = async () => {
    setIsLoading(true);
    const response = await firebase.getBook(bookId);
    const imageUrl = await firebase.getBookImage(response.data().imageUrl);
    setUrl(imageUrl);
    setBook(response.data());
    setIsLoading(false);
  };

  const form = useForm({
    initialValues: {
      quantity: "",
    },
  });
  const addOrdered = async () => {
    setIsLoadingOrdered(true);
    const { quantity } = form.values;
    const response = await firebase.addOrdered(bookId, quantity);
    console.log(response);
    setIsLoadingOrdered(false);
    showNotification({
      title: "Ordered",
      message: "Your order has been added",
      color: "teal",
      icon: <IconCheck />,
    });
  };
  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <Flex justify="space-around" align="center" wrap="wrap" w="100%" h="80vh">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <h1>{book.name}</h1>
            <Image radius="md" src={url} alt={book.name} height={300} />
            <p>{book.detail}</p>
            <Text fw={700}>Price: ${book.price}</Text>
            <Group mt={16}>
              <Avatar src={book.photoURL} radius="sm" />
              <div>
                <Text size="sm">{book.displayName}</Text>
                <Text size="xs" color="dimmed">
                  posted 34 minutes ago
                </Text>
              </div>
            </Group>
            {/* ordered now */}
            <form
              onSubmit={form.onSubmit(() => {
                addOrdered();
              })}
            >
              <Stack spacing="md" my={16}>
                <TextInput
                  required
                  label="Quantity"
                  placeholder="Quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max="10"
                  {...form.getInputProps("quantity")}
                />
                <Button
                  type="submit"
                  radius="xl"
                  variant="gradient"
                  color="teal"
                  loading={isLoadingOrdered}
                >
                  Order Now
                </Button>
              </Stack>
            </form>
          </div>
        )}
      </Flex>
    </>
  );
};

export default Detail;
