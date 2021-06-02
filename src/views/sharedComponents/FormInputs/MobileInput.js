import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { MobileOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function MobileInput(props) {
  const [mobile, setMobile] = useState("");
  const [prefix, setPrefix] = useState("");
  const [validMobileValue, setValidMobileValue] = useState("");

  useEffect(() => {
    if (mobile && prefix) {
      setValidMobileValue(prefix + mobile);
      props.onMobileInputChange(validMobileValue);
    }
  }, [mobile, prefix, props, validMobileValue]);

  const changePhone = (value) => {
    let phone = value.target.value;
    if (phone.charAt(0) === "0") phone = phone.substring(1, phone.length);
    setMobile(phone);
  };

  const prefixHandler = (value) => {
    setPrefix(value);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 150,
        }}
        placeholder="phone prefix"
        allowClear
        onChange={prefixHandler}
      >
        {prefixNumber.map((value, index) => {
          let trueValue = value.substring(value.indexOf("+"), value.length);
          return (
            <Option value={trueValue} key={index}>
              {value}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <Form.Item
      name={"phone"}
      label="Mobile"
      rules={[
        {
          required: true,
          message: "Please input your mobile!",
        },
      ]}
      onChange={changePhone}
    >
     { props.value?
     <Input
     addonBefore={prefixSelector}
     prefix={<MobileOutlined />}
     placeholder="Mobile"
     defaultValue={`${props.value}`}
   />
     :
     <Input
        addonBefore={prefixSelector}
        prefix={<MobileOutlined />}
        placeholder="Mobile"
      />}
    </Form.Item>
  );
}

const prefixNumber = [
  "Algeria +213",
  "Andorra +376",
  "Angola +244",
  "Anguilla +1264",
  "Antigua &amp; Barbuda +1268",
  "rgentina +54",
  "Armenia +374",
  "Aruba +297",
  "ustralia +61",
  "ustria +43",
  "Azerbaijan +994",
  "Bahamas +1242",
  "Bahrain +973",
  "Bangladesh +880",
  "Barbados +1246",
  "Belarus +375",
  "Belgium +32",
  "Belize +501",
  "Benin +229",
  "Bermuda +1441",
  "Bhutan +975",
  "Bolivia +591",
  "Bosnia +387",
  "Botswana +267",
  "Brazil +55",
  "Brunei +673",
  "Bulgaria +359",
  "Burkina  +226",
  "Burundi +257",
  "Cambodia +855",
  "Cameroon +237",
  "Cnada +1",
  "Cape Verde Islands +238",
  "Cayman Islands +1345",
  "Central African Republic +236",
  "Chile +56",
  "China +86",
  "Colombia +57",
  "Comoros +269",
  "Congo +242",
  "Cook Islands +682",
  "Costa Rica +506",
  "Croatia +385",
  "Cuba +53",
  "Cyprus North +90392",
  "Cyprus South +357",
  "zech Republic +42",
  "enmark +45",
  "Djibouti +253",
  "Dominica +1809",
  "Dominican Republic +1809",
  "Ecuador +593",
  "Egypt +20",
  "El Salvador +503",
  "Equatorial Guinea +240",
  "Eritrea +291",
  "Estonia +372",
  "Ethiopia +251",
  "Falkland Islands +500",
  "Faroe Islands +298",
  "Fiji +679",
  "Finland +358",
  "rance +33",
  "French Guiana +594",
  "French Polynesia +689",
  "Gabon +241",
  "Gambia +220",
  "Georgia +7880",
  "Germany +49",
  "Ghana +233",
  "Gibraltar +350",
  "reece +30",
  "Greenland +299",
  "Grenada +1473",
  "Guadeloupe +590",
  "Guam +671",
  "Guatemala +502",
  "Guinea +224",
  "Guinea - Bissau +245",
  "Guyana +592",
  "Haiti +509",
  "Honduras +504",
  "Hong Kong +852",
  "Hungary +36",
  "Iceland +354",
  "ndia +91",
  "ndonesia +62",
  "ran +98",
  "Iraq +964",
  "Ireland +353",
  "taly +39",
  "Jamaica +1876",
  "Japan +81",
  "Jordan +962",
  "zakhstan +7",
  "Kenya +254",
  "Kiribati +686",
  "Korea North +850",
  "Korea South +82",
  "Kuwait +965",
  "Kyrgyzstan +996",
  "Laos +856",
  "Latvia +371",
  "Lebanon +961",
  "Lesotho +266",
  "Liberia +231",
  "Libya +218",
  "Liechtenstein +417",
  "Lithuania +370",
  "Luxembourg +352",
  "Macao +853",
  "Macedonia +389",
  "Madagascar +261",
  "Malawi +265",
  "Malaysia +60",
  "Maldives +960",
  "Mali +223",
  "Malta +356",
  "Marshall Islands +692",
  "Martinique +596",
  "Mauritania +222",
  "Mayotte +269",
  "exico +52",
  "Micronesia +691",
  "Moldova +373",
  "Monaco +377",
  "Mongolia +976",
  "Montserrat +1664",
  "Morocco +212",
  "Mozambique +258",
  "yanmar +95",
  "Namibia +264",
  "Nauru +674",
  "Nepal +977",
  "etherlands +31",
  "New Caledonia +687",
  "New Zealand +64",
  "Nicaragua +505",
  "Niger +227",
  "Nigeria +234",
  "Niue +683",
  "Norfolk Islands +672",
  "Northern Marianas +670",
  "Norway +47",
  "Oman +968",
  "Palau +680",
  "Panama +507",
  "Papua New Guinea +675",
  "Paraguay +595",
  "Peru +51",
  "Philippines +63",
  "Poland +48",
  "Portugal +351",
  "Puero Rico +1787",
  "Qatar +974",
  "Reunion +262",
  "Romania +40",
  "Rssia +7",
  "Rwanda +250",
  "San Marino +378",
  "Sao Tome &amp; Principe +239",
  "Saudi Arabia +966",
  "Senegal +221",
  "Serbia +381",
  "Seychelles +248",
  "Sierra Leone +232",
  "Singapore +65",
  "Slovak Republic +421",
  "Slovenia +386",
  "Solomon Islands +677",
  "Somalia +252",
  "South Africa +27",
  "Spain +34",
  "Sri Lanka +94",
  "St. Helena +290",
  "St. Kitts +1869",
  "St. Lucia +1758",
  "Sudan +249",
  "Suriname +597",
  "Swaziland +268",
  "weden +46",
  "witzerland +41",
  "Syria +963",
  "Taiwan +886",
  "jikstan +7",
  "hailand +66",
  "Togo +228",
  "Tonga +676",
  "Trinidad Tobago +1868",
  "Tunisia +216",
  "Turkey +90",
  "rkmenistan +7",
  "Turkmenistan +993",
  "Turks Caicos Islands +1649",
  "Tuvalu +688",
  "Uganda +256",
  "UK +44",
  "Ukraine +380",
  "United Arab Emirates +971",
  "Uruguay +598",
  "UA +1",
  "Ubekistan +7",
  "Vanuatu +678",
  "Vatican City +379",
  "Venezuela +58",
  "Vietnam +84",
  "Virgin Islands - British +1284",
  "Virgin Islands - US +1340",
  "Wallis &amp; Futuna +681",
  "Yemen North +969",
  "Yemen South +967",
  "Zambia +260",
  "Zimbabwe +263",
];
