import React from "react";
import { Card } from "antd";

export default function Reviews(props) {
  return (
    <div>
      {props?.reviews_count > 0 && (
        <p style={{ fontWeight: "bold", marginLeft: "10px" }}>
          reviews count : {props?.reviews_count}
        </p>
      )}
      {props?.reviews?.length > 0 &&
        props?.reviews.map((review) => {
          return (
            <Card key={review.id} style={{ margin: "5px" }}>
              <p>{review.content}</p>
            </Card>
          );
        })}
    </div>
  );
}
