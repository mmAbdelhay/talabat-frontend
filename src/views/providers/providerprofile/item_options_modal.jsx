import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Radio } from "antd";
import { addToCart, defineProviderId } from "../../../routes/cartSlice";
import { Collapse } from "antd";
import { Checkbox } from "antd";
const { Panel } = Collapse;

export default function Item_options_Modal(props) {
   const [itemOptions, setItemOptions] = useState();
   const [additionalOptions, setAdditionalOptions] = useState({});
   const [isModalVisible, setIsModalVisible] = useState(false);
   const dispatch = useDispatch();

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      saveDispatcherState();
      setIsModalVisible(false);
   };

   const uuidv4 = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
         var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
         return v.toString(16);
      });
   };

   const checkBoxHandler = (event) => {
      const optionsArray = event.target.value.split("_");
      console.log(event);
      if (event.target.checked) {
         setAdditionalOptions({
            ...additionalOptions,
            [optionsArray[0]]: {
               name: optionsArray[0],
               price: optionsArray[1] ? optionsArray[1] : 0,
            },
         });
      } else {
         for (let checked of Object.values(additionalOptions)) {
            if (checked["name"] === optionsArray[0]) delete additionalOptions[optionsArray[0]];
         }
      }

      console.log("CHECKBOXES", additionalOptions);
   };
   const radioButtonHandler = (event) => {
      const optionsArray = event.target.value.split("_");
      setAdditionalOptions({
         ...additionalOptions,
         [optionsArray[2]]: {
            name: optionsArray[0],
            price: optionsArray[1] ? optionsArray[1] : 0,
         },
      });
      console.log("RadioButtons", additionalOptions);
   };
   const handleCancel = () => {
      setIsModalVisible(false);
   };
   useEffect(() => {
      setItemOptions(props?.item?.Item_Options);
   }, []);

   const saveDispatcherState = () => {
      let total_price = +props.item.price;
      let additional_string = "";
      console.log(additionalOptions);
      for (let additionalEntry of Object.values(additionalOptions)) {
         let additional = parseFloat(additionalEntry["price"])
            ? parseFloat(additionalEntry["price"])
            : 0;
         total_price = total_price + additional;

         additional_string += additionalEntry["name"] + " ";
      }
      const itemToBeSaved = {
         name: props.item.name,
         id: uuidv4(),
         item_id: props.item.id,
         quantity: 1,
         price: total_price,
         additional: additional_string,
      };
      console.log("ADDITIONAL STRING", additional_string);
      dispatch(defineProviderId(props?.providerId));
      dispatch(addToCart(itemToBeSaved));
   };

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
                                    <Radio
                                       key={option.id}
                                       value={
                                          option.option_name +
                                          "_" +
                                          option.additional_price +
                                          "_" +
                                          option.item_option_id
                                       }
                                       onChange={(e) => radioButtonHandler(e)}>
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
                                 <Checkbox
                                    key={option.id}
                                    value={
                                       option.option_name +
                                       "_" +
                                       option.additional_price +
                                       "_" +
                                       option.item_option_id
                                    }
                                    onChange={(e) => checkBoxHandler(e)}>
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
