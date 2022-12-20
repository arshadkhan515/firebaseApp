import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const ViewOrders = () => {
  const firebase = useFirebase();
  useEffect(() => {
    const getOrders = async () => {
        try {
            const response = await firebase.fetchOrders();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    
    };
    getOrders();
  }, []);

  return <div>ViewOrders</div>;
};

export default ViewOrders;
