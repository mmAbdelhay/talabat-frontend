import React from "react";
import FileBase64 from "react-file-base64";

export default function UploadCV(props) {
  const handleChange = (file) => {
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert("Invalid file type it should be a .pdf");
      return false;
    } else {
      props.onUploadLogoInputChange(file.base64);
    }
  };
  return (
    <div className="input-group">
      <label style={{ paddingRight: "10px" }}>
        <span style={{ color: "red" }}>*</span> Your CV :
      </label>
      <FileBase64 multiple={false} onDone={handleChange} />
      <span> * pdf files only * </span>
    </div>
  );
}
