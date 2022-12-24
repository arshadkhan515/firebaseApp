import { Flex, Loader } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React, { useEffect, useState } from "react";
import { BooksCard } from "../components/Card";
import NavBar from "../components/NavBar";
import { useFirebase } from "../context/Firebase";

const ViewOrders = () => {
  const firebase = useFirebase();
  const User = firebase.User;
  const [myBooks, setMyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyBooks = async () => {
    if (User.uid !== undefined) {
      setIsLoading(true);
      try {
        const response = await firebase.fetchMyBooks(User.uid);
        setMyBooks(response.docs);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBooks();
  }, [firebase]);


  if (User.uid === undefined) {
    return (
      <Flex justify="center" align="center" w="100%" h="80vh">
        <Loader />
      </Flex>
    );
  }

  return (
    <>
    <NavBar/>
    <Flex justify="space-around" align="center" wrap="wrap" w="100%" h="80vh">
      {isLoading ? (
        <Loader />
      ) : (
        myBooks.map((book, i) => (  
          <BooksCard {...book.data()} key={i} id={book.id} isDetail={true} />
        ))
      )}
    </Flex>
    </>
  );
};

export default ViewOrders;
