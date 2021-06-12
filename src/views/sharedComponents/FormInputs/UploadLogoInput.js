import React from "react";
import FileBase64 from "react-file-base64";

export default function UploadLogoInput(props) {
  const handleChange = (file) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert("Invalid file type");
      return false;
    } else {
      props.onUploadLogoInputChange(file.base64);
    }
  };
  return (
    <div className="input-group">
      <label style={{paddingRight:"10px"}}>Logo:  </label>
      <FileBase64 multiple={false} onDone={handleChange} />
    </div>
  );
}
