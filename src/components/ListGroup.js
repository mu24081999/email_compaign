"use client";

import { ListGroup } from "flowbite-react";

export function List({ listData }) {
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        {listData?.map((item, index) => (
          <ListGroup.Item onClick={item?.onClick}>{item?.title}</ListGroup.Item>
        ))}
      </ListGroup>

      {/* <ListGroup.Item>Settings</ListGroup.Item active>
      <ListGroup.Item>Messages</ListGroup.Item>
      <ListGroup.Item>Download</ListGroup.Item> */}
    </div>
  );
}
