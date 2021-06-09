import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Radio } from "antd";
import { Collapse } from "antd";
import { Checkbox } from "antd";
const { Panel } = Collapse;

export default function Item_options_Modal(props) {
   const [itemOptions, setItemOptions] = useState();
   const [isModalVisible, setIsModalVisible] = useState(false);
   const dispatch = useDispatch();

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };
   useEffect(() => {
      //   console.log("SECTION", props?.item?.Item_Options);
      setItemOptions(props?.item?.Item_Options);
   }, []);

   //    const saveDispatcherState = () => {
   //       const itemToBeSaved = {
   //          name: item.name,
   //          id: item.id,
   //          quantity: 1,
   //          price: item.price,
   //          itemPrice: item.price,
   //       };
   //       dispatch(defineProviderId(props?.providerId));
   //       dispatch(addToCart(itemToBeSaved));
   //    };

   return (
      <>
         <Button type="primary" onClick={showModal}>
            Add To Cart
         </Button>
         <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Collapse>
               {itemOptions?.map((section) => {
                  return (
                     <Panel header={section.section_name} key={section.id}>
                        {section.section_type === "RadioButton" ? (
                           <Radio.Group key={section.id}>
                              {section.Additional_Options.map((option) => {
                                 return (
                                    <Radio value={option.id}>
                                       {option.option_name}
                                       {option.additional_price
                                          ? `(+${option.additional_price})`
                                          : ``}
                                    </Radio>
                                 );
                              })}
                           </Radio.Group>
                        ) : (
                           section.Additional_Options.map((option) => {
                              return (
                                 <Checkbox>
                                    {" "}
                                    {option.option_name}
                                    {option.additional_price ? `(+${option.additional_price})` : ``}
                                 </Checkbox>
                              );
                           })
                        )}
                     </Panel>
                  );
               })}
            </Collapse>
         </Modal>
      </>
   );
}
