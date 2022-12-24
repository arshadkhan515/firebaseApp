import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  Skeleton,
  Button,
  Table,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "300px",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function BooksCard({
  name,
  imageUrl,
  ISBN,
  photoURL,
  displayName,
  userEmail,
  price,
  id,
  isDetail,
}) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const [isLoadingImage, setLoadingImage] = useState(true);
  const navigate = useNavigate();

  const getUrl = async () => {
    setLoadingImage(true);
    try {
      const response = await firebase.getBookImage(imageUrl);
      setUrl(response);
    } catch (error) {
      console.log(error);
    }
    setLoadingImage(false);
  };

  useEffect(() => {
    getUrl();
  }, []);

  const { classes, theme } = useStyles();
  return (
    <Skeleton
      m="lg"
      radius="md"
      className={classes.card}
      visible={isLoadingImage}
    >
      <Card withBorder p="lg" radius="md" className={classes.card} shadow="lg">
        <Card.Section mb="sm">
          <Skeleton visible={isLoadingImage}>
            <Image src={url} alt={name} height={180} />
          </Skeleton>
        </Card.Section>
        <Badge>ISBM Number: {ISBN}</Badge>
        <Text weight={700} className={classes.title} mt="xs">
          {name}
        </Text>

        <Group mt="lg">
          <Avatar src={photoURL} radius="sm" />
          <div>
            <Text weight={500}>
              {displayName == null ? userEmail : displayName}
            </Text>
            <Text size="xs" color="dimmed">
              posted 34 minutes ago
            </Text>
          </div>
        </Group>

        <Card.Section mt="lg" className={classes.section}>
          <Group spacing={30}>
            <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                ${price}
              </Text>
              <Text
                size="sm"
                color="dimmed"
                weight={500}
                sx={{ lineHeight: 1 }}
                mt={3}
              >
                per unit
              </Text>
            </div>
            {isDetail ? (
              <Button
                radius="xl"
                style={{ flex: 1 }}
                onClick={() => navigate(`/book/order/${id}`)}
              >
                View Order
              </Button>
            ) : (
              <Button
                radius="xl"
                style={{ flex: 1 }}
                onClick={() => navigate(`/book/${id}`)}
              >
                View Book
              </Button>
            )}
          </Group>
        </Card.Section>
      </Card>
    </Skeleton>
  );
}
