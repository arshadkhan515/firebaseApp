import { Flex, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BooksCard } from "../components/Card";
import NavBar from "../components/NavBar";
import { useFirebase } from "../context/Firebase";

const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const response = await firebase.allBooks();
      setBooks(response.docs);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getBooks();
  }, [])
  
  return (
    <>
      <NavBar />
      <Flex justify="space-around" align="center" wrap='wrap' w="100%" h="80vh">
        { isLoading ? <Loader/> : books.map((book,i) => (
            <BooksCard {...book.data()} key={i} id={book.id}/>
          )) }
      </Flex>
    </>
  );
};

export default Home;
