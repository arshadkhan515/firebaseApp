import { Flex, Loader, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useFirebase } from "../context/Firebase";

const OrderList = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const MyOrders = async () => {
    setIsLoading(true);
    const response = await firebase.getMyOrders(id);
    setMyOrders(response.docs);
    setIsLoading(false);
  };

  useEffect(() => {
    MyOrders();
  }, []);

  const rows = myOrders.length ? (
    myOrders.map((order, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{order.data().displayName}</td>
        <td>{order.data().userEmail}</td>
        <td>{order.data().quantity}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No orders yet</td>
    </tr>
  );
  return (
    <>
      <NavBar />
      <Flex justify="space-around" align="center" wrap="wrap" w="100%">
        {isLoading ? (
          <Loader />
        ) : (
          <Table withBorder withColumnBorders m={20}>
            <thead>
              <tr>
                <th>Order number</th>
                <th>Buyer name</th>
                <th>Buyer email</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </Flex>
    </>
  );
};

export default OrderList;
