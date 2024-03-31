import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Tr, Td, Thead, Tbody, Th, Text } from "@chakra-ui/react";

export const List = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/todos");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; 
      await axios.patch(`http://localhost:8080/todos/${id}`, { status: updatedStatus });
      setData(data.map(todo => todo.id === id ? { ...todo, status: updatedStatus } : todo));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <Link to="/create">Create new Todo</Link>
        </div>
        <Table border="1px" style={{ margin: "150px auto" }}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Due date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((todo) => (
              <Tr key={todo.id}>
                <Td>{todo.title}</Td>
                <Td>{todo.description}</Td>
                <Td onClick={() => handleStatus(todo.id, todo.status)}>
                  {todo.status ? "Completed" : "Not Completed"}
                </Td>
                <Td>{todo.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </>
  );
};
