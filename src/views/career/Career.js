import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ServerIP } from "../../assets/config";
import { Form, Button, message, Typography, Input } from "antd";
import CountrySelector from "../sharedComponents/CountrySelector";
import MobileInput from "../sharedComponents/FormInputs/MobileInput";
import NameInput from "../sharedComponents/FormInputs/NameInput";
import EmailInput from "../sharedComponents/FormInputs/EmailInput";
import DateOfBirth from "../sharedComponents/FormInputs/DateOfBirth";
import GenderInput from "../sharedComponents/FormInputs/GenderInput";
import JobTitleInput from "./JobTitleInput";
import UploadCV from "./UploadCV";

const { Title } = Typography;
const { TextArea } = Input;

export default function Career() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [cv, setCV] = useState("");
  const [notes, setNotes] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const apply = () => {
    axios
      .post(`${ServerIP}/api/v1/careers/apply`, {
        name: name,
        email: email,
        gender: gender,
        date_of_birth: dateOfBirth,
        country: country,
        mobile: mobile,
        cv: cv,
        notes: notes,
        job_title: jobTitle,
      })
      .then((res) => {
        message.success("your application received successfully");
        history.push("/");
      })
      .catch((err) => {
        console.log(`err`, err.response.data.Message);
        message.error(`form is invalid ${err.response.data.Message}`);
      });
  };

  return (
    <div>
      <Title level={6} className="text-center" style={{ color: "#08399c" }}>
        Apply for your dream job
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form name="basic" style={{ width: "70%", marginTop: 10 }}>
          <JobTitleInput onNameInputChange={(value) => setJobTitle(value)} />
          <NameInput onNameInputChange={(value) => setName(value)} />
          <EmailInput onEmailInputChange={(value) => setEmail(value)} />
          <MobileInput onMobileInputChange={(value) => setMobile(value)} />
          <CountrySelector
            onSelectCountry={(value) => {
              setCountry(value.label);
            }}
          />
          <DateOfBirth onSelectDateOfBirth={(value) => setDateOfBirth(value)} />
          <GenderInput onGenderChange={(value) => setGender(value)} />
          <label>
            why you want to join us and what makes you the best candidate ?
          </label>
          <TextArea
            rows={4}
            placeholder="feel free to take"
            onChange={(e) => setNotes(e.target.value)}
          />
          <Form.Item style={{ marginTop: "10px" }}>
            <UploadCV onUploadLogoInputChange={(value) => setCV(value)} />
          </Form.Item>
          <Form.Item style={{ marginTop: "10px" }}>
            <Button block type="primary" htmlType="submit" onClick={apply}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
